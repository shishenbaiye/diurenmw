import { Constructor, MPlugin } from "../../framework/DI/MContainer";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { GameAbility } from "../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../gasModule/gameAbilitys/GA/GameAbilityType";
import { CoolDownByGameEffect } from "../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { CostByGameEffect } from "../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";
import { MonsterAttributeSet } from "./MonsterAttributeSet";
import { EMonsterAttributeSetType } from "./MonsterAttributeSetType";

@MPlugin()
export class GA_Trigger_Monster_OnDefDown extends GameAbility {
    tag: string = "GA.Trigger.Monster.OnDefDown";
    cancelTags: string[];
    blockTags: string[];
    activationOwnedTags: string[] = ["State.Monster.OnDefDown"];
    activationRequiredTags: string[];
    activationBlockedTags: string[];
    targetRequiredTags: string[];
    targetBlockedTags: string[];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[] = [
        {
            tag: "Event.Player.OnDefDown",
            sourceType: EGameAbilityTriggerSourceType.OwnedTagPresent
        }
    ]
    cd: Constructor<CoolDownByGameEffect>;
    cost: Constructor<CostByGameEffect>;
    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {

    }
    private downDef:number = 0;
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        let ownerAttribute = asc.attributeSet as MonsterAttributeSet;
        if (ownerAttribute) {
            let def = ownerAttribute.getAttr(EMonsterAttributeSetType.def).getCurrent();
            this.downDef = def * 0.25;
            ownerAttribute.getAttr(EMonsterAttributeSetType.def).sub(this.downDef);
        }
    }
    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {

    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        let ownerAttribute = asc.attributeSet as MonsterAttributeSet;
        if (ownerAttribute) {
            ownerAttribute.getAttr(EMonsterAttributeSetType.def).add(this.downDef);
        }
    }

}