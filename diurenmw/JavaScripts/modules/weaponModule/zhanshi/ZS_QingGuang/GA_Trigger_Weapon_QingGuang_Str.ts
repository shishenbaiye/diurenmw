import { Constructor, MPlugin } from "../../../../framework/DI/MContainer";
import { EPlayerAttributeSetType } from "../../../AttributeModule/PlayerAttributeSetType";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { AT_WaitTime } from "../../../gasModule/gameAbilitys/AT/customAT/AT_WaitTime";
import { GameAbility } from "../../../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../../../gasModule/gameAbilitys/GA/GameAbilityType";
import { CoolDownByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { CostByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";


@MPlugin()
export class GA_Trigger_Weapon_QingGuang_Str extends GameAbility{
    tag: string = "GA.Trigger.Weapon.QingGuang.Str";
    cancelTags: string[];
    blockTags: string[] = ["GA.Trigger.Weapon.QingGuang.Str"]
    activationOwnedTags: string[] = ["GA.Trigger.Weapon.QingGuang.Str"];
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
        // 计算概率，百分之3的概率触发
        if(Math.random() > 0.03) return;
        asc.attributeSet.getAttr(EPlayerAttributeSetType.str).add(30);
        AT_WaitTime.New(this,30).addEndListener(()=>{
            asc.attributeSet.getAttr(EPlayerAttributeSetType.str).sub(30);
            this.end();
        }).activate();
        
    }
    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
}