import { MPlugin } from "../../../../framework/DI/MContainer";
import { Constructor } from "../../../../tools/Singleton";
import { PlayerAttributeSet } from "../../../AttributeModule/PlayerAttributeSet";
import { EPlayerAttributeSetType } from "../../../AttributeModule/PlayerAttributeSetType";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { AT_WaitTime } from "../../../gasModule/gameAbilitys/AT/customAT/AT_WaitTime";
import { GameAbility } from "../../../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../../../gasModule/gameAbilitys/GA/GameAbilityType";
import { CoolDownByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { CostByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";
import { GE_Damage_Weapon_ZhiYanFenTian } from "../ZhiYanFenTian/GA_Trigger_Weapon_ZhiYanFenTian";

@MPlugin()
export class GA_Trigger_Weapon_KeXue_Blood extends GameAbility{
    tag: string = "GA.Trigger.Weapon.KeXue.Blood";
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
        if(Math.random() > 0.1){
            this.isNotActive = true
        }
    }
    private addAtk:number = 0;
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        if(this.isNotActive || !this.payload){
            this.end();
            return;
        }
        let customData = this.payload.customData;
        let targetChar = customData.target as Character;

        
        this.sendGameEvent(targetChar,"Event.Monster.OnBlood",{damageValue:110,time:5});
        this.end();
    }
    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }

}