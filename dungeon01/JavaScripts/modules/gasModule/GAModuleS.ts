// import { PlayerAttributeSet } from "../boxingModule/PlayerAttributeSet";
import { AbilitySystemComponent } from "./gameAbilitys/ASC/AbilitySystemComponent";
import { GAModuleC } from "./GAModuleC";


export class GAModuleS extends ModuleS<GAModuleC,null>{
    protected onPlayerJoined(player: mw.Player): void {
        let component = player.character.addComponent(AbilitySystemComponent);
        this.registerAbilitys();
        this.initPlayerAbilitys(player);
        this.initAttributeSet(player);
        // MGSTool.report_Player_EnterGame(player);
    }

    registerAbilitys(){

    }

    initPlayerAbilitys(player: mw.Player){
        // let component = player.character.getComponent(AbilitySystemComponent);
        // if(component){
        //     component.giveAbility(GA_PropInvincible);
        //     component.giveAbility(GA_CancelProp);
        // }
    }

    initAttributeSet(player: mw.Player){
        // let component = player.character.getComponent(AbilitySystemComponent);
        // if(component){
        //     let attributeSet = new PlayerAttributeSet();
        //     component.setAttributeSet(attributeSet);
        // }
    }
    net_OnClick(){
        // let component = this.currentPlayer.character.getComponent(AbilitySystemComponent);
        // if(component){
        //     // console.log(component.attributeSet);
            
        //     (component.attributeSet as PlayerAttributeSet).hp.setCurrent((component.attributeSet as PlayerAttributeSet).hp.getCurrent()-20);
        // }
    }
}