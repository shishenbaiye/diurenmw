import { Constructor, MPlugin } from "../../../../framework/DI/MContainer";
import { EPlayerAttributeSetType } from "../../../AttributeModule/PlayerAttributeSetType";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { AT_WaitTime } from "../../../gasModule/gameAbilitys/AT/customAT/AT_WaitTime";
import { GameAbility } from "../../../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../../../gasModule/gameAbilitys/GA/GameAbilityType";
import { CoolDownByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { CostByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";


@MPlugin()
export class GA_Trigger_Weapon_QingGuang_Str extends GameAbility {
    tag: string = "GA.Trigger.Weapon.QingGuang.Str";
    cancelTags: string[] = ["GA.Trigger.Weapon.QingGuang.Str"]
    blockTags: string[];
    activationOwnedTags: string[];
    activationRequiredTags: string[];
    activationBlockedTags: string[];
    targetRequiredTags: string[];
    targetBlockedTags: string[];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[] = [{
        tag: "Event.Player.HurtMonster",
        sourceType: EGameAbilityTriggerSourceType.GameEvent
    }]
    cd: Constructor<CoolDownByGameEffect>;
    cost: Constructor<CostByGameEffect>;

    private isNotActive: boolean = false;
    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // 计算概率，百分之3的概率触发
        if (Math.random() > 0.03) {
            this.isNotActive = true;
        }
    }
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        if (this.isNotActive || !this.payload) {
            this.end();
            return;
        }

        // 30秒增加30点力量
        asc.attributeSet.getAttr(EPlayerAttributeSetType.str).add(30);

        AT_WaitTime.New(this, 30).addEndListener(() => {
            this.end();
        }).activate();

    }
    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        if(this.isNotActive){
            return;
        }
        asc.attributeSet.getAttr(EPlayerAttributeSetType.str).sub(30);
    }
}