import { MPlugin } from "../../../../framework/DI/MContainer";
import { Constructor } from "../../../../tools/Singleton";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { AT_WaitTime } from "../../../gasModule/gameAbilitys/AT/customAT/AT_WaitTime";
import { GameAbility } from "../../../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../../../gasModule/gameAbilitys/GA/GameAbilityType";
import { CoolDownByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { CostByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";
import { GE_Damage_Weapon_ZhiYanFenTian } from "../ZhiYanFenTian/GA_Trigger_Weapon_ZhiYanFenTian";

@MPlugin()
export class GA_Trigger_Weapon_ZiWuQiXing_DefDown extends GameAbility{
    tag: string = "GA.Trigger.Weapon.ZiWuQiXing.DefDown";
    cancelTags: string[];
    blockTags: string[];
    activationOwnedTags: string[];
    activationRequiredTags: string[];
    activationBlockedTags: string[];
    targetRequiredTags: string[];
    targetBlockedTags: string[];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[] = [{
        tag:"Event.Player.HurtMonster",
        sourceType:EGameAbilityTriggerSourceType.GameEvent
    }]
    cd: Constructor<CoolDownByGameEffect>;
    cost: Constructor<CostByGameEffect>;
    private isNotActive:boolean = false;
    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        if(Math.random() > 0.1) {
            this.isNotActive = true;
        }
    }
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        if(this.isNotActive || !this.payload){
            this.end();
            return;
        }

        let customData = this.payload.customData;
        let targetChar = customData.target as Character;
        let targetAsc = targetChar.getComponent(AbilitySystemComponent);
        targetAsc.gameTag.addTag("Event.Player.OnDefDown");
        AT_WaitTime.New(this,20).addEndListener(()=>{
            this.end();
        }).activate();
    }
    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        if(this.isNotActive) return;
        if(!this.payload) return;
        let customData = this.payload.customData;
        let targetChar = customData.target as Character;
        let targetAsc = targetChar.getComponent(AbilitySystemComponent);
        targetAsc.gameTag.removeTag("Event.Player.OnDefDown");
    }

}