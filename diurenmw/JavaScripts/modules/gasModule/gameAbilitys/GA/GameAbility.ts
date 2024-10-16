
import { MPlugin, Constructor } from "../../../../framework/DI/MContainer";
import { MFramework } from "../../../../framework/MFramework";
import { MObject } from "../../../../framework/Object/MObject";
import { AbilitySystemComponent } from "../ASC/AbilitySystemComponent";
import { AbilityTask } from "../AT/AbilityTask";
import { GameEffect } from "../GE/GameEffect";
import { CoolDownByGameEffect } from "../GE/GESpecial/CoolDownByGameEffect";
import { GameEvent } from "../GEvent/GameEvent";
import { Payload } from "../GEvent/Payload";
import { EGameAbilityTriggerSourceType } from "./GameAbilityType";

@MPlugin()
export abstract class GameAbility extends MObject {
    id: number;
    level: number = 1;
    abstract tag: string;
    owner: GameObject;
    target: GameObject;
    ownerAsc: AbilitySystemComponent;
    abilityTasks: AbilityTask[] = [];
    activeAbilityTasks: AbilityTask[] = [];

    isActivate: boolean = false;

    private isPlay: boolean = false;
    /** 取消的技能标签 */
    abstract cancelTags: string[];

    /** 锁定的技能标签 */
    abstract blockTags: string[];

    /** 激活的标签（添加这个标签，技能结束移除）*/
    abstract activationOwnedTags: string[];

    /** owner需要的技能标签 */
    abstract activationRequiredTags: string[];

    /** owner拥有此标签，当前技能会被阻止 */
    abstract activationBlockedTags: string[];

    /** target需要的技能标签 */
    abstract targetRequiredTags: string[];

    /** target拥有此标签，当前技能会被阻止 */
    abstract targetBlockedTags: string[];

    /**技能触发器 */
    abstract trigger: {tag:string,sourceType:EGameAbilityTriggerSourceType}[];

    /**技能CD */
    abstract cd:Constructor<CoolDownByGameEffect>

    /**gameEvent带的数据 */
    public payload: Payload|null = null;
    protected init() {

    }

    /**检查是否能释放技能 */
    canActivate(asc: AbilitySystemComponent, owner: GameObject, target?: GameObject): boolean {
        // 判断owner需要的标签
        if (this.activationRequiredTags) {
            let res = asc.hasAllMatchingGameTags(this.activationRequiredTags);
            if(!res){
                console.warn(`owner技能前置条件不满足${this.tag}`)
                return false;
            }
        }

        // 判断owner是否存在阻止标签
        if (this.activationBlockedTags) {
            for (let i = 0; i < this.activationBlockedTags.length; i++) {
                if (asc.gameTag.hasTag(this.activationBlockedTags[i])) {
                    console.warn(`owner技能被锁定不能释放${this.tag}`)
                    return false;
                }
            }
        }

        // 判断当前技能是否被锁
        if(asc.hasMatchingBlockTag(this.tag)){
            console.warn(`技能已经被锁定${this.tag}`)
            return false;
        }
        
        // 判断技能是否在CD中
        if(this.cd){
            let cdEffect = MFramework.createObject(this.cd) as CoolDownByGameEffect;
            let tag = cdEffect.tag;
            if(asc.hasMatchingBlockTag(tag)){
                console.warn(`技能在CD中${this.tag}`)
                return false;
            }
        }

        if (target) {
            let asc = target.getComponent(AbilitySystemComponent);
            if (asc) {
                let targetAsc = asc as AbilitySystemComponent;
                if (this.targetRequiredTags) {
                    let totalNum = this.targetRequiredTags.length;
                    let num = 0;
                    for (let i = 0; i < this.targetRequiredTags.length; i++) {
                        if (targetAsc.gameTag.hasTag(this.targetRequiredTags[i])) {
                            num++;
                        }
                    }
                    if (num !== totalNum) {
                        console.warn(`target技能前置条件不满足${this.tag}`)
                        return false;
                    }
                }

                if (this.targetBlockedTags) {
                    for (let i = 0; i < this.targetBlockedTags.length; i++) {
                        if (targetAsc.blockTag.hasTag(this.targetBlockedTags[i])) {
                            console.warn(`target技能被锁定不能释放${this.tag}`)
                            return false;
                        }
                    }
                }

            } else {
                console.warn(`target没有ASC组件`)
                return false;
            }
        }

        return true;
    }

    /**预先释放 */
    preActive(asc: AbilitySystemComponent) {  
        // 激活技能标签添加进Tag
        if(this.activationOwnedTags){
            this.activationOwnedTags.forEach((value) => {
                asc.gameTag.addTag(value);
            });
        }
         // 判断打断的技能
        asc.ApplyAbilityBlockAndCancelTags(this);
        this.onPreActive(this.ownerAsc, this.owner, this.target);
    }

    /**激活技能 */
    active(asc: AbilitySystemComponent) {
        this.ownerAsc = asc;
        this.isActivate = true;
        this.applyCDEffectToSelf(this.ownerAsc,this.cd);
        this.onActive(this.ownerAsc, this.owner, this.target);
    }

    /**结束技能 */
    end() {
        if(!this.isActivate) return;
        this.isActivate = false;
        this.onEnd(this.ownerAsc, this.owner, this.target);
        this.ownerAsc.endAbility(this);
    }

    /**打断技能 */
    cancel() {
        if(!this.isActivate) return;
        this.onCancel(this.ownerAsc, this.owner, this.target);
        if(this.abilityTasks){
            this.abilityTasks.forEach((value)=>{
                value.cancelTask();
            });
        }
        this.end();
    }

    /**发送GameEvent */
    sendGameEvent(target:GameObject, tag: string, customData?:any) {
        let gameEvent = GameEvent.New();
        let payload = Payload.New();
        payload.ability = this,
        payload.eventMagnitude = this.owner.worldTransform.position.clone();
        payload.customData = customData;
        payload.source = this.owner;
        gameEvent.send(tag,this.owner,target,payload);
    }

    /**应用效果 */
    applyGameEffectToTarget(gameEffect:Constructor<GameEffect>, target: GameObject) {
        this.ownerAsc.applyGameEffectToTarget( gameEffect, target);
    }

    /**应用CD */
    applyCDEffectToSelf(ownerAsc:AbilitySystemComponent,gameEffect:Constructor<CoolDownByGameEffect>){
        if(gameEffect){
            if(MFramework.createObject<CoolDownByGameEffect>(gameEffect).time == 0){
                return;
            }
            ownerAsc.applyGameEffectToSelf(gameEffect);
        }
    }


    // #region AbilityTask

    /**添加AbilityTask */
    addAbilityTask(abilityTask:AbilityTask){
        if(this.isActivate){
            this.abilityTasks.push(abilityTask);
        }
    }


    /**移除AbilityTask */
    removeAbilityTask(abilityTask:AbilityTask){
        let index = this.abilityTasks.indexOf(abilityTask);
        if(index != -1){
            this.abilityTasks.splice(index,1);
        }
    }



    protected abstract onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void;
    protected abstract onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void;
    protected abstract onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void;
    protected abstract onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void;
}