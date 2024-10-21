import { Constructor, MPlugin } from "../../../framework/DI/MContainer";
import { AbilitySystemComponent } from "../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { AT_PlayAnimation } from "../../gasModule/gameAbilitys/AT/customAT/AT_PlayAnimation";
import { GameAbility } from "../../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../../gasModule/gameAbilitys/GA/GameAbilityType";
import { CoolDownByGameEffect } from "../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { RegisterSkill } from "../SkillManager";
import { ESkillType } from "../SkillType";
import { GE_CoolDown_Warrior_Whirlwind } from "./GE_CoolDown_Warrior_Whirlwind";

@RegisterSkill(1001,ESkillType.GreatSword)
@MPlugin()
export class GA_Warrior_Whirlwind extends GameAbility{
    tag: string = "GA.Warrior.Whirlwind";
    cancelTags: string[];
    blockTags: string[];
    activationOwnedTags: string[] = [];
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
        let char = owner as Character;
        let aim = char.loadAnimation("298003");
        aim.blendInTime = 0;
        aim.blendOutTime = 0;
        AT_PlayAnimation.New(this,aim,3.33,char).addEvent(3,()=>{
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