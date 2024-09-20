// import { PlayerAttributeSet } from "../boxingModule/PlayerAttributeSet";
import { GameEventBus } from "../../common/eventBus/EventBus";
import { GameConfig } from "../../configs/GameConfig";
import { AttributeDataInit } from "../gasModule/gameAbilitys/AS/AttributeHelper";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { AttributeModuleC } from "./AttributeModuleC";
import { AttributeModuleData } from "./AttributeModuleData";
import { PlayerAttributeSet } from "./PlayerAttributeSet";


export class AttributeModuleS extends ModuleS<AttributeModuleC, AttributeModuleData> {
    protected onPlayerEnterGame(player: mw.Player): void {
        // 添加asc组件
        player.character.addComponent(AbilitySystemComponent);
        // 注册技能
        this.registerAbilitys();
        // 初始化玩家技能
        this.initPlayerAbilitys(player);
        // 初始化玩家属性
        this.initAttributeSet(player);
        // 获取来源数据
        if (player.teleportId) {
            let data = TeleportService.getTeleportData(player.teleportId);
            console.log(`带过来的数据：`, data)
        }
        GameEventBus.emit(`AttributeModule_Ready`,player);
    }

    registerAbilitys() {

    }

    initPlayerAbilitys(player: mw.Player) {
        // let component = player.character.getComponent(AbilitySystemComponent);
        // if(component){
        //     component.giveAbility(GA_PropInvincible);
        //     component.giveAbility(GA_CancelProp);
        // }
    }

    initAttributeSet(player: mw.Player) {
        let component = player.character.getComponent(AbilitySystemComponent);
        if (component) {
            component.addAttributeSet(PlayerAttributeSet);
            let as = component.attributeSet as PlayerAttributeSet;
            let data = this.getPlayerData(player);
            data.owner = player;
            let excelData = GameConfig.PlayerLevelAttribute.getElement(data.level);
            AttributeDataInit(as, "level", data.level);
            AttributeDataInit(as, "exp", data.exp);
            AttributeDataInit(as, "hp", excelData.hp);
            AttributeDataInit(as, "maxHp", excelData.hp);
            AttributeDataInit(as, "mp", excelData.mp);
            AttributeDataInit(as, "maxMp", excelData.mp);
            AttributeDataInit(as, "str", excelData.strength);
            AttributeDataInit(as, "int", excelData.intellect);
            AttributeDataInit(as, "vit", excelData.vitality);

            AttributeDataInit(as, "atk", excelData.atk);
            AttributeDataInit(as, "magicAtk", excelData.matk);
            AttributeDataInit(as, "def", excelData.armor);

            AttributeDataInit(as, "skillDamage", 0);
            AttributeDataInit(as, "damage", 0);

            AttributeDataInit(as, "crit", excelData.crit);
            AttributeDataInit(as, "critDamage", 1.5);

            as.refreshAttribute();
            console.warn(`初始化属性完成`);
        }
    }

    /**增加经验 */
    addExp(player: mw.Player, exp: number) {
        let playerData = this.getPlayerData(player);
        let excelData = GameConfig.PlayerLevelAttribute.getElement(playerData.level);
        if(excelData.isMaxLevel) return;
        playerData.exp += exp;
        if (playerData.exp >= excelData.exp) {
            this.levelUp(player);
            let excuteExp = playerData.exp - excelData.exp;
            this.addExp(player, excuteExp);
        }else{
            let as = (player.character.getComponent(AbilitySystemComponent).attributeSet as PlayerAttributeSet);
            if (as) {
                as.exp.setCurrent(playerData.exp);
            }
        }
    }

    private levelUp(player: mw.Player) {
        let playerData = this.getPlayerData(player);
        let currentLevel = playerData.level;
        if (!GameConfig.PlayerLevelAttribute.getElement(currentLevel).isMaxLevel) {
            playerData.level++;
            playerData.exp = 0;
            let as = (player.character.getComponent(AbilitySystemComponent).attributeSet as PlayerAttributeSet);
            if (as) {
                as.level.setBase(playerData.level);
                as.level.setCurrent(playerData.level);

                as.exp.setBase(GameConfig.PlayerLevelAttribute.getElement(playerData.level).exp);
                as.exp.setCurrent(0);
            }
        }else{
            console.error(`已经满级`);
            playerData.exp = 0;
        }

    }

    protected onPlayerLeft(player: mw.Player): void {
        let playerData = this.getPlayerData(player);
        playerData.save(false);
    }

    protected onStart(): void {

    }

    net_OnClick() {
        // let component = this.currentPlayer.character.getComponent(AbilitySystemComponent);
        // if(component){
        //     // console.log(component.attributeSet);

        //     (component.attributeSet as PlayerAttributeSet).hp.setCurrent((component.attributeSet as PlayerAttributeSet).hp.getCurrent()-20);
        // }
    }
}