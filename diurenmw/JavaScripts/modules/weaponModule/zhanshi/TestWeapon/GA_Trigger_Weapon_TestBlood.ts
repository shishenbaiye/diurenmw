import { Constructor, MPlugin } from "../../../../framework/DI/MContainer";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { GameAbility } from "../../../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../../../gasModule/gameAbilitys/GA/GameAbilityType";
import { CoolDownByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { CostByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";

@MPlugin()
export class GA_Trigger_Weapon_TestBlood extends GameAbility{
    tag: string = "GA.Trigger.Weapon.TestBlood";
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
    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        if(!this.payload) return;
        let char = owner as Character;
        let customData = this.payload.customData;
        let targetChar = customData.target as Character;
        // 计算概率，百分之10的概率触发
        if(Math.random() > 0.1) return;
        this.sendGameEvent(targetChar,"Event.Monster.OnBlood",{damageValue:10,time:5})
        this.end();
    }
    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }

}