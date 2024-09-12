// import { PlayerAttributeSet } from "../boxingModule/PlayerAttributeSet";
import { AttributeDataInit } from "./gameAbilitys/AS/AttributeHelper";
import { AbilitySystemComponent } from "./gameAbilitys/ASC/AbilitySystemComponent";
import { GAModuleC } from "./GAModuleC";
import { GAModuleData } from "./GAModuleData";
import { PlayerAttributeSet } from "./PlayerAttributeSet";


export class GAModuleS extends ModuleS<GAModuleC, GAModuleData> {
    protected onPlayerJoined(player: mw.Player): void {
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
            AttributeDataInit(as, "level", data.level);
            AttributeDataInit(as, "exp", data.exp);
            AttributeDataInit(as, "hp", data.hp);
            AttributeDataInit(as, "maxHp", data.maxHp);
            AttributeDataInit(as, "mp", data.mp);
            AttributeDataInit(as, "maxMp", data.maxMp);
            AttributeDataInit(as, "atk", data.atk);
            AttributeDataInit(as, "magicAtk", data.magicAtk);
            AttributeDataInit(as, "def", data.def);
            AttributeDataInit(as, "spd", data.spd);
            AttributeDataInit(as, "crit", data.crit);
            AttributeDataInit(as, "critDamage", data.critDamage);
        }
    }

    protected onPlayerLeft(player: mw.Player): void {
        console.log(`玩家离开`);
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