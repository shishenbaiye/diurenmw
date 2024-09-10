
import { Constructor, MContainer } from "../../../../framework/DI/MContainer";
import { MFramework } from "../../../../framework/MFramework";
import { Logger, LoggerManager } from "../../../../tools/LoggerTool";
import { GameTags } from "../../gameTags/GameTags";
import { AttributeSet } from "../AS/AttributeSet";
import { GameAbility } from "../GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../GA/GameAbilityType";
import { GameEffect } from "../GE/GameEffect";
import { Payload } from "../GEvent/Payload";

@Component
export class AbilitySystemComponent extends Script {
    private Gas_AbilitySystemComponent = "AbilitySystemComponent";

    _gameTag: GameTags = null;
    _blockTag: GameTags = null;
    public attributeSet:AttributeSet = null;
    private haveAbilitysByName: Map<string, Constructor<GameAbility>[]> = new Map<string, Constructor<GameAbility>[]>();
    private haveAbilitysByTag: Map<string, Constructor<GameAbility>[]> = new Map<string, Constructor<GameAbility>[]>();
    private activatedAbilitys: GameAbility[] = [];

    private gameEffect: GameEffect[] = [];

    private randomId: number = 0;
    private log: Logger;
    //#region 初始化
    private async init() {
        if(SystemUtil.isServer()){
            if (!this._gameTag) {
                this._gameTag = this.gameObject.addComponent(GameTags);
                this._gameTag.Gas_GameTags_Name = "ASC_GameTags";
            }
            if(!this._blockTag){
                this._blockTag = this.gameObject.addComponent(GameTags);
                this._blockTag.Gas_GameTags_Name = "ASC_BlockTags";
            }
        }else{
            let findGameTag = true;
            while(findGameTag){
                let res = this.gameObject.getComponents(GameTags);
                for(let i = 0; i < res.length; i++){
                    if(res[i].Gas_GameTags_Name === "ASC_GameTags"){
                        this._gameTag = res[i];
                        findGameTag = false;
                        break;
                    }
                }
                await TimeUtil.delaySecond(TimeUtil.deltatime());
            }
            let findBlockTag = true;
            while(findBlockTag){
                let res = this.gameObject.getComponents(GameTags);
                for(let i = 0; i < res.length; i++){
                if(res[i].Gas_GameTags_Name === "ASC_BlockTags"){
                        this._blockTag = res[i];
                        findBlockTag = false;
                        break;
                    }
                }
                await TimeUtil.delaySecond(TimeUtil.deltatime());
            }

            console.warn(`客户端获取gametag成功`)
        }
        this.gameTag.addTagAction.add((tag) => {
            if (this.triggerOwnedTagAdded.has(tag)) {
                this.triggerOwnedTagAdded.get(tag).forEach((value) => {
                    this.tryActiveGameAbilityByClassOrName(value);
                })
            }

            if (this.triggerOwnedTagPresent.has(tag)) {
                this.triggerOwnedTagPresent.get(tag).forEach((value) => {
                    if (!this.triggerOwnedTagPresentInstance.has(tag)) {
                        this.triggerOwnedTagPresentInstance.set(tag, []);
                    }
                    let gameAbilityInstance = this.triggerTryActiveGameAbilityByClass(value);
                    if (gameAbilityInstance) {
                        this.triggerOwnedTagPresentInstance.get(tag).push(gameAbilityInstance);
                        gameAbilityInstance.preActive(this);
                        this.activatedAbilitys.push(gameAbilityInstance);
                        gameAbilityInstance.active(this); 
                    }
                })
            }
        })

        this.gameTag.removeTagAction.add((tag) => {
            if (this.triggerOwnedTagPresentInstance.has(tag)) {
                this.triggerOwnedTagPresentInstance.get(tag).forEach((value) => {
                    value.cancel();
                })
            }
            this.triggerOwnedTagPresentInstance.set(tag, [])
        });

        this.onGameEventAction.add(this.onListenGameEvent, this)
    }
    // #endregion
    
    //#region 对外接口
    /**给ASC组件一个技能结构 */
    giveAbility(gameAbility: Constructor<GameAbility>): boolean {
        let gameAbilityInstance = MFramework.createObject<GameAbility>(gameAbility);
        let tag = gameAbilityInstance.tag;
        if (!tag) {
            this.log.error(`${gameAbility.name}技能标签不能为空`);
            return false
        }
        this.registerAbilityTrigger(gameAbilityInstance, gameAbility);
        if (!this.haveAbilitysByTag.has(tag)) {
            this.haveAbilitysByTag.set(tag, []);
        }
        if (!this.haveAbilitysByName.has(gameAbility.name)) {
            this.haveAbilitysByName.set(gameAbility.name, []);
        }
        this.haveAbilitysByTag.get(tag).push(gameAbility);
        this.haveAbilitysByName.get(gameAbility.name).push(gameAbility);
        return true;
    }

    /**移除ASC组件一个技能结构 */
    removeAbility(gameAbility: Constructor<GameAbility>): boolean {
        let gameAbilityInstance = MFramework.createObject<GameAbility>(gameAbility);
        let tag = gameAbilityInstance.tag;
        if (!tag) {
            this.log.error(`${gameAbility.name}技能标签不能为空`);
            return false
        }
        if (this.haveAbilitysByTag.has(tag)) {
            let index = this.haveAbilitysByTag.get(tag).indexOf(gameAbility);
            if (index !== -1) {
                this.haveAbilitysByTag.get(tag).splice(index, 1);
            }
        }
        if (this.haveAbilitysByName.has(gameAbility.name)) {
            let index = this.haveAbilitysByName.get(gameAbility.name).indexOf(gameAbility);
            if (index !== -1) {
                this.haveAbilitysByName.get(gameAbility.name).splice(index, 1);
            }
        }
        this.removeAbilityTrigger(gameAbilityInstance, gameAbility);
        return true;
    }

    /**是否拥有某个技能 */
    isHaveAbility(ability: Constructor<GameAbility>): boolean {
        let gameAbilityInstance = MFramework.createObject<GameAbility>(ability);
        let tag = gameAbilityInstance.tag;
        if (!tag) {
            this.log.error(`${ability.name}技能标签不能为空`);
            return false
        }
        if (this.haveAbilitysByTag.has(tag)) {
            return this.haveAbilitysByTag.get(tag).indexOf(ability) !== -1;
        }
        return false
    }

    /**尝试释放一个技能 (类型和名字)*/
    tryActiveGameAbilityByClassOrName(ability: string | Constructor<GameAbility>): boolean {
        let abilityName = '';
        if (typeof ability === 'string') {
            abilityName = ability;
        } else {
            abilityName = ability.name;
        }
        if (abilityName === '') {
            this.log.error(`技能名字为空`);
            return false;
        }
        let gameAbilitys = this.haveAbilitysByName.get(abilityName);
        if (!gameAbilitys) {
            this.log.error(`没有找到name为${abilityName}的技能`);
            return false;
        }
        gameAbilitys.forEach((gameAbility) => {
            let gameAbilityInstance = MFramework.createObject<GameAbility>(gameAbility);
            if (gameAbilityInstance) {
                gameAbilityInstance.owner = this.gameObject;
                if (!gameAbilityInstance.canActivate(this, this.gameObject)) return false;
                gameAbilityInstance.id = this.randomId++;
                gameAbilityInstance.preActive(this);
                this.activatedAbilitys.push(gameAbilityInstance);
                gameAbilityInstance.active(this);
                return true;
            } else {
                this.log.error(`没有找到tag为${abilityName}的技能`);
                return false;
            }
        })
        return true;
    }

    /**尝试释放一个技能通过标签 */
    tryActiveGameAbilityByTag(tag: string): boolean {
        if (!tag) {
            this.log.error(`技能标签为空`);
            return false;
        }
        let gameAbilitys = this.haveAbilitysByTag.get(tag);
        if (!gameAbilitys) {
            this.log.error(`没有找到tag为${tag}的技能`);
            return false;
        }
        gameAbilitys.forEach((value) => {
            let gameAbilityInstance = MFramework.createObject<GameAbility>(value);
            if (gameAbilityInstance) {
                gameAbilityInstance.owner = this.gameObject;
                if (!gameAbilityInstance.canActivate(this, this.gameObject)) return ;
                gameAbilityInstance.id = this.randomId++;
                gameAbilityInstance.preActive(this);
                this.activatedAbilitys.push(gameAbilityInstance);
                gameAbilityInstance.active(this);
            } else {
                this.log.error(`没有找到tag为${tag}的技能`);
                return false;
            }
        })
        return true;
    }

    // 给予一个技能并激活一次
    giveAbilityAndActivateOnce(ability: Constructor<GameAbility>, target?: GameObject,payload?:Payload): GameAbility {
        let abilityName = '';
        abilityName = ability.name;
        if (abilityName === '') {
            this.log.error(`技能名字为空`);
            return null;
        }
        let gameAbilityInstance = MFramework.createObject<GameAbility>(ability);
        if (gameAbilityInstance) {
            gameAbilityInstance.owner = this.gameObject;
            if (!gameAbilityInstance.canActivate(this, this.gameObject,target)){
                return null;
            } 
            gameAbilityInstance.id = this.randomId++;
            
            if(payload) gameAbilityInstance.payload = payload;

            gameAbilityInstance.preActive(this);
            this.activatedAbilitys.push(gameAbilityInstance);
            gameAbilityInstance.active(this);
            return gameAbilityInstance;
        } else {
            this.log.error(`无法创建${abilityName}的技能`);
            return null;
        }
    }

    /**是否有匹配的标签 */
    hasMatchingGameTag(tags: string[]): boolean {
        if(!tags) return false;
        for (let i = 0; i < tags.length; i++) {
            if (this.gameTag.hasTag(tags[i])) {
                return true;
            }
        }
        return false;
    }

    hasAllMatchingGameTags(tags: string[]):boolean{
        if(!tags) return false;
        for (let i = 0; i < tags.length; i++) {
            if (!this.gameTag.hasTag(tags[i])) {
                return false;
            }
        }
        return true;
    }

    /**应用效果 */
    applyGameEffectToTarget(gameEffect: Constructor<GameEffect>,target: GameObject) {
        let targetAsc = target.getComponent<AbilitySystemComponent>(AbilitySystemComponent);
        if(!targetAsc){
            return;
        }
        let gameEffectInstance = MFramework.createObject<GameEffect>(gameEffect);
        gameEffectInstance.geContext = {sourceASC:this,targetASC:targetAsc,sourceEffect:gameEffectInstance};
        if(gameEffectInstance.canApply()){
            gameEffectInstance.init();
            targetAsc.gameEffect.push(gameEffectInstance);
            gameEffectInstance.active()
        }  
    }

    /**应用效果给自己 */
    applyGameEffectToSelf(gameEffect: Constructor<GameEffect>) {
        let gameEffectInstance = MFramework.createObject<GameEffect>(gameEffect);
        gameEffectInstance.geContext = {sourceASC:this,targetASC:this,sourceEffect:gameEffectInstance};
        if(gameEffectInstance.canApply()){
            gameEffectInstance.init();
            this.gameEffect.push(gameEffectInstance);
            gameEffectInstance.active();
        }  
    }

    /**添加AS */
    addAttributeSet(attributeSet: Constructor<AttributeSet>) {
        this.attributeSet = MContainer.instance.injectInstance(this.gameObject.addComponent(attributeSet));
        this.attributeSet.bindAbilitySystemComponent(this);
    }

    /**获取GameTag */
    get gameTag(): GameTags|null {
        if(!this._gameTag){
            let tags = this.gameObject.getComponents(GameTags);
            for(let i = 0; i < tags.length; i++){
                if(tags[i].Gas_GameTags_Name === "ASC_GameTags"){
                    this._gameTag = tags[i];
                    break;
                }
            }
        }
        if(!this._gameTag){
            return null;
        }else{
            return this._gameTag;
        }
    }

    /**获取blockTag */
    get blockTag(): GameTags|null {
        if(!this._blockTag){
            let tags = this.gameObject.getComponents(GameTags);
            for(let i = 0; i < tags.length; i++){
                if(tags[i].Gas_GameTags_Name === "ASC_BlockTags"){
                    this._blockTag = tags[i];
                    break;
                }
            }
        }
        if(!this._blockTag){
            return null;
        }else{
            return this._blockTag;
        }
    }
    //#endregion
    
    //#region 内部方法
    // 检测技能锁定和需要的tag
    public ApplyAbilityBlockAndCancelTags(ability: GameAbility) {
        if (ability.blockTags) {
            for (let i = 0; i < ability.blockTags.length; i++) {
                this.blockTag.addTag(ability.blockTags[i]);
            }
        }

        if (ability.cancelTags) {
            for (let i = 0; i < ability.cancelTags.length; i++) {
                this.activatedAbilitys.forEach((value) => {
                    if (this.checkAbilityCancel(ability.cancelTags[i], value.tag)) {
                        value.cancel();
                    }
                })
            }
        }
    }

    // 检查技能是否被取消 A取消B
    private checkAbilityCancel(aTag: string, bTag: string): boolean {
        let a = aTag.split('.');
        let b = bTag.split('.');
        if (a.length > b.length) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }

    public endAbility(ability: GameAbility) {
        if(ability.blockTags){
            ability.blockTags.forEach((value) => {
                this.blockTag.removeTag(value);
            });
        }
        if(ability.activationOwnedTags){
            ability.activationOwnedTags.forEach((value) => {
                this.gameTag.removeTag(value);
            })
        }
        let index = this.activatedAbilitys.indexOf(ability);
        if (index !== -1) {
            this.activatedAbilitys.splice(index, 1);
        }
    }

    public endEffect(effect: GameEffect) {
        let index = this.gameEffect.indexOf(effect);
        if (index !== -1) {
            this.gameEffect.splice(index, 1);
        }
    }

    public hasMatchingBlockTag(tag: string): boolean {
        if(!tag) return false;
        if (this.blockTag.hasTag(tag)) {
            return true;
        }
        return false;
    }
    //#endregion

    //#region 技能触发器
    private triggerGameEvent: Map<string, Constructor<GameAbility>[]> = new Map<string, Constructor<GameAbility>[]>();
    private triggerOwnedTagAdded: Map<string, Constructor<GameAbility>[]> = new Map<string, Constructor<GameAbility>[]>();
    private triggerOwnedTagPresent: Map<string, Constructor<GameAbility>[]> = new Map<string, Constructor<GameAbility>[]>();
    private triggerOwnedTagPresentInstance: Map<string, GameAbility[]> = new Map<string, GameAbility[]>();
    public registerAbilityTrigger(ability: GameAbility, abilityClass: Constructor<GameAbility>) {
        if (ability.trigger) {
            ability.trigger.forEach((value) => {
                if (value.sourceType === EGameAbilityTriggerSourceType.GameEvent) {
                    if (!this.triggerGameEvent.has(value.tag)) {
                        this.triggerGameEvent.set(value.tag, []);
                    }
                    this.triggerGameEvent.get(value.tag).push(abilityClass);
                }
                if (value.sourceType === EGameAbilityTriggerSourceType.OwnedTagAdded) {
                    if (!this.triggerOwnedTagAdded.has(value.tag)) {
                        this.triggerOwnedTagAdded.set(value.tag, []);
                    }
                    this.triggerOwnedTagAdded.get(value.tag).push(abilityClass);
                }
                if (value.sourceType === EGameAbilityTriggerSourceType.OwnedTagPresent) {
                    if (!this.triggerOwnedTagPresent.has(value.tag)) {
                        this.triggerOwnedTagPresent.set(value.tag, []);
                    }
                    this.triggerOwnedTagPresent.get(value.tag).push(abilityClass);
                }
            })
        }
    }
    private removeAbilityTrigger(ability: GameAbility, abilityClass: Constructor<GameAbility>) {
        ability.trigger.forEach((value) => {
            if(this.triggerGameEvent.has(value.tag)){
                let index = this.triggerGameEvent.get(value.tag).indexOf(abilityClass);
                if(index !== -1){
                    this.triggerGameEvent.get(value.tag).splice(index,1);
                }
            }
            if(this.triggerOwnedTagAdded.has(value.tag)){
                let index = this.triggerOwnedTagAdded.get(value.tag).indexOf(abilityClass);
                if(index !== -1){
                    this.triggerOwnedTagAdded.get(value.tag).splice(index,1);
                }
            }
            if(this.triggerOwnedTagPresent.has(value.tag)){
                let index = this.triggerOwnedTagPresent.get(value.tag).indexOf(abilityClass);
                if(index !== -1){
                    this.triggerOwnedTagPresent.get(value.tag).splice(index,1);
                }
            }
        });   
    }

    /**尝试释放一个技能 (类型和名字)*/
    private triggerTryActiveGameAbilityByClass(ability: Constructor<GameAbility>): GameAbility {
        let abilityName = '';
        if (typeof ability === 'string') {
            abilityName = ability;
        } else {
            abilityName = ability.name;
        }
        if (abilityName === '') {
            this.log.error(`技能名字为空`);
            return null;
        }
        let gameAbilityInstance = MFramework.createObject<GameAbility>(ability);
        if (gameAbilityInstance) {
            gameAbilityInstance.owner = this.gameObject;
            if (!gameAbilityInstance.canActivate(this, this.gameObject)) return null;
            gameAbilityInstance.id = this.randomId++;
            this.activatedAbilitys.push(gameAbilityInstance);
            return gameAbilityInstance;
        } else {
            this.log.error(`Trigger没有找到类为${abilityName}的技能`);
            return null;
        }
    }

    //#endregion

    //#region GameEvent
    public onGameEventAction: Action2<string, Payload> = new Action2<string, Payload>();
    private payload: Payload = null;
    private onListenGameEvent(tag: string, payload: Payload) {
        this.payload = payload;
        if (this.triggerGameEvent.has(tag)) {
            this.triggerGameEvent.get(tag).forEach((value) => {
                let ability = this.triggerTryActiveGameAbilityByClass(value);
                if(ability){
                    ability.payload = this.payload;
                    ability.preActive(this);
                    this.activatedAbilitys.push(ability);
                    ability.active(this);
                }
            })
        }else{
            console.warn(`没有找到tag为${tag}的技能`);
        }
    }

    //#endregion

    protected onStart(): void {
        this.useUpdate = true;
        this.log = MContainer.instance.getPluginByName<LoggerManager>("LoggerManager").getLogger("AbilitySystemComponent");
        this.log.warn('AbilitySystemComponent onStart');
        this.init();
    }

    protected onUpdate(dt: number): void {
        this.gameEffect.forEach((value) => {
            value.update(dt);
        });
    }
}