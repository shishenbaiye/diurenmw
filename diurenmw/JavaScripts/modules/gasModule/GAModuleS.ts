// import { PlayerAttributeSet } from "../boxingModule/PlayerAttributeSet";
import { AbilitySystemComponent } from "./gameAbilitys/ASC/AbilitySystemComponent";
import { GAModuleC } from "./GAModuleC";


export class GAModuleS extends ModuleS<GAModuleC, null> {
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
            console.log(`带过来的数据：`,data)
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
        // let component = player.character.getComponent(AbilitySystemComponent);
        // if(component){
        //     let attributeSet = new PlayerAttributeSet();
        //     component.setAttributeSet(attributeSet);
        // }
    }

    protected onStart(): void {
        let obj = <Trigger>GameObject.findGameObjectById(`27E26E19`);
        obj.onEnter.add((obj: GameObject) => {
            if (obj instanceof Character) {
                TeleportService.asyncTeleportToScene(`dungeon01`,[obj.player.userId],{
                    teleportData:{
                        a:1,
                        b:2
                    }
                })
            }
        })
    }

    net_OnClick() {
        // let component = this.currentPlayer.character.getComponent(AbilitySystemComponent);
        // if(component){
        //     // console.log(component.attributeSet);

        //     (component.attributeSet as PlayerAttributeSet).hp.setCurrent((component.attributeSet as PlayerAttributeSet).hp.getCurrent()-20);
        // }
    }
}