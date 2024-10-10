import { Constructor, MPlugin } from "../../../framework/DI/MContainer";
import { AbilitySystemComponent } from "../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { GameAbility } from "../../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../../gasModule/gameAbilitys/GA/GameAbilityType";
import { CoolDownByGameEffect } from "../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { RegisterSkill } from "../SkillManager";
import { ESkillType } from "../SkillType";
import { GE_CoolDown_Warrior_Whirlwind } from "./GE_CoolDown_Warrior_Whirlwind";

@RegisterSkill(ESkillType.GreatSword)
@MPlugin()
export class GA_Warrior_Whirlwind extends GameAbility{
    tag: string = "GA.Warrior.Whirlwind";
    cancelTags: string[];
    blockTags: string[];
    activationOwnedTags: string[];
    activationRequiredTags: string[];
    activationBlockedTags: string[];
    targetRequiredTags: string[];
    targetBlockedTags: string[];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[];

    cd: Constructor<CoolDownByGameEffect> = GE_CoolDown_Warrior_Whirlwind;

    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }

}