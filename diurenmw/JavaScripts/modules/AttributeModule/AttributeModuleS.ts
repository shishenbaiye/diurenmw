// import { PlayerAttributeSet } from "../boxingModule/PlayerAttributeSet";
import { GameEventBus } from "../../common/eventBus/EventBus";
import { GameConfig } from "../../configs/GameConfig";
import { MathTool } from "../../tools/MathTool";
import { PlayerAnimationMgr } from "../animationModule/PlayerAnimationMgr";
import ArmorScript from "../armorModule/ArmorScript";
import { ArmorPart } from "../armorModule/ArmorType";
import { AttributeDataInit } from "../gasModule/gameAbilitys/AS/AttributeHelper";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { GA_Trigger_NotFullMp } from "../skillModule/common/GA_Trigger_NotFullMp";
import { GA_Mage_BackJump } from "../skillModule/mage/backJump/GA_Mage_BackJump";
import { GA_Mage_NormalAttack1 } from "../skillModule/mage/normalAttack/GA_Mage_NormalAttack1";
import { GA_Warrior_All4One } from "../skillModule/warrior/all4One/GA_Warrior_All4One";
import { GA_Warrior_BackJump } from "../skillModule/warrior/backJump/GA_Warrior_BackJump";
import { GA_Warrior_NormalAttack1 } from "../skillModule/warrior/normalAttack/GA_Warrior_NormalAttack1";
import { GA_Warrior_NormalAttack2 } from "../skillModule/warrior/normalAttack/GA_Warrior_NormalAttack2";
import { GA_Warrior_NormalAttack3 } from "../skillModule/warrior/normalAttack/GA_Warrior_NormalAttack3";
import { WeaponModuleS } from "../weaponModule/WeaponModuleS";
import WeaponScript from "../weaponModule/WeaponScript";
import { AttributeModuleC } from "./AttributeModuleC";
import { AttributeModuleData } from "./AttributeModuleData";
import { PlayerAttributeSet } from "./PlayerAttributeSet";


export class AttributeModuleS extends ModuleS<AttributeModuleC, AttributeModuleData> {
    protected onPlayerEnterGame(player: mw.Player): void {
        // 添加asc组件
        let asc = player.character.addComponent(AbilitySystemComponent);
        // 注册技能
        this.registerAbilitys();
        // 初始化添加脚本
        this.initPlayerOtherScript(player);
        // 初始化玩家标签
        this.initPlayerGameTags(player);
        // 初始化玩家技能
        this.initPlayerAbilitys(player);
        // 初始化玩家属性
        this.initAttributeSet(player);
        // 获取来源数据
        if (player.teleportId) {
            let data = TeleportService.getTeleportData(player.teleportId);
            console.log(`带过来的数据：`, data)
        }

        asc.isReady.add((char:Character)=>{
            GameEventBus.emit(`AttributeModule_Ready`, char.player);
        })
    }

    private registerAbilitys() {
        
    }

    private initPlayerOtherScript(player: mw.Player) {
        player.character.addComponent(PlayerAnimationMgr)
    }

    private initPlayerGameTags(player: mw.Player) {
        let component = player.character.getComponent(AbilitySystemComponent);
        if (component) {
            component.preTags(["Club.Player"])
        }
    }

    private initPlayerAbilitys(player: mw.Player) {
        let component = player.character.getComponent(AbilitySystemComponent);
        if(component){
            component.giveAbility(GA_Trigger_NotFullMp);
            // 大剑
            component.giveAbility(GA_Warrior_NormalAttack1);
            component.giveAbility(GA_Warrior_NormalAttack2);
            component.giveAbility(GA_Warrior_NormalAttack3);
            component.giveAbility(GA_Warrior_BackJump);
            component.giveAbility(GA_Warrior_All4One);

            // 法杖
            component.giveAbility(GA_Mage_NormalAttack1);
            component.giveAbility(GA_Mage_BackJump)
        }
    }



    private initAttributeSet(player: mw.Player) {
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
            AttributeDataInit(as, "matk", excelData.matk);
            AttributeDataInit(as, "def", excelData.armor);

            AttributeDataInit(as, "skillDamage", 1);
            AttributeDataInit(as, "damage", 1);

            AttributeDataInit(as, "crit", excelData.crit);
            AttributeDataInit(as, "critDamage", 1);

            AttributeDataInit(as, "atkSpeed", 1);
            AttributeDataInit(as, "castSpeed", 1);

            as.refreshAttribute();
            console.warn(`初始化属性完成`);
        }
    }

    /**刷新属性 */
    refeshAttr(player: mw.Player) {
        GameEventBus.emit(`AttributeModule_refeshAttr`, player);
    }

    /**增加经验 */
    addExp(player: mw.Player, exp: number) {
        let playerData = this.getPlayerData(player);
        let excelData = GameConfig.PlayerLevelAttribute.getElement(playerData.level);
        if (excelData.isMaxLevel) return;
        playerData.exp += exp;
        if (playerData.exp >= excelData.exp) {
            let excuteExp = playerData.exp - excelData.exp;
            this.levelUp(player);
            this.addExp(player, excuteExp);
        } else {
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
            EffectService.playOnGameObject("181022",player.character,{scale:new Vector(1.5),position:new Vector(0,0,-player.character.getBoundingBox().z/2)});
            let as = (player.character.getComponent(AbilitySystemComponent).attributeSet as PlayerAttributeSet);
            if (as) {
                as.level.setBase(playerData.level);
                as.level.setCurrent(playerData.level);
                let oldData = GameConfig.PlayerLevelAttribute.getElement(currentLevel);
                let newData = GameConfig.PlayerLevelAttribute.getElement(playerData.level);
                as.exp.setBase(newData.exp);
                as.exp.setCurrent(0);

                as.atk.add(newData.atk- oldData.atk);
                as.matk.add(newData.matk - oldData.matk);
                as.def.add(newData.armor - oldData.armor);
                as.hp.add(newData.hp - oldData.hp);
                as.maxHp.add(newData.hp - oldData.hp);
                as.mp.add(newData.mp - oldData.mp);
                as.maxMp.add(newData.mp - oldData.mp);
                as.str.add(newData.strength - oldData.strength);
                as.int.add(newData.intellect - oldData.intellect);
                as.vit.add(newData.vitality - oldData.vitality);
                
                this.refeshAttr(player);
            }
        } else {
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

    async net_add() {
        let player = this.currentPlayer;
        let res = player.character.getComponent(ArmorScript).addArmor(20002);
        if (res) {
            return true;
        }
    }

    async net_OnClick() {
        let player = this.currentPlayer;
        let res = await player.character.getComponent(WeaponScript).equepWeapon("019228b7-7393-af93-a224-c9342fa1b295");
        if (res) {
            let attr = player.character.getComponent(AbilitySystemComponent).attributeSet as PlayerAttributeSet;

            console.warn(`造成伤害：`, MathTool.damageFormula(1, 2.6,
                attr.atk.getCurrent(),
                attr.matk.getCurrent(),
                attr.str.getCurrent(),
                attr.int.getCurrent(),
                attr.damage.getCurrent(),
                attr.skillDamage.getCurrent(),
                attr.crit.getCurrent(),
                attr.critDamage.getCurrent()));
            return true;
        } else {
            return res;
        }

    }

    async net_Onclick2() {
        let player = this.currentPlayer;
        let res = await player.character.getComponent(ArmorScript).equepArmor(ArmorPart.Body, "019228be-435a-1345-1d51-4f3fb1eeb2eb");
        if (res) {
            let attr = player.character.getComponent(AbilitySystemComponent).attributeSet as PlayerAttributeSet;

            console.warn(`造成伤害：`, MathTool.damageFormula(1, 2.6,
                attr.atk.getCurrent(),
                attr.matk.getCurrent(),
                attr.str.getCurrent(),
                attr.int.getCurrent(),
                attr.damage.getCurrent(),
                attr.skillDamage.getCurrent(),
                attr.crit.getCurrent(),
                attr.critDamage.getCurrent()));
            return true;
        } else {
            return res;
        }
    }
}