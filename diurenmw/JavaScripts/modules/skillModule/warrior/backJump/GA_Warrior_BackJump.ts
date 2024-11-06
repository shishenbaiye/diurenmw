import { Constructor, MPlugin, MPropertiesInject } from "../../../../framework/DI/MContainer";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { AT_PlayAnimation } from "../../../gasModule/gameAbilitys/AT/customAT/AT_PlayAnimation";
import { GameAbility } from "../../../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../../../gasModule/gameAbilitys/GA/GameAbilityType";
import { CoolDownByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { CostByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";
import { SkillHelper } from "../../SkillHelper";
import { RegisterSkill } from "../../SkillManager";
import { ESkillType } from "../../SkillType";
import { GE_CoolDown_Warrior_BackJump } from "./GE_CoolDown_Warrior_BackJump";
import { GE_Cost_Warrior_BackJump } from "./GE_Cost_Warrior_BackJump";

@RegisterSkill(1014,ESkillType.GreatSword)
@MPlugin()
export class GA_Warrior_BackJump extends GameAbility{
    tag: string = "GA.Warrior.BackJump";
    cancelTags: string[] = ["GA.Warrior"]
    blockTags: string[];
    activationOwnedTags: string[] = ["State.Player.BackJump","State.Player.Invincible"]
    activationRequiredTags: string[];
    activationBlockedTags: string[] = ["State.Player.NotCancel"]
    targetRequiredTags: string[];
    targetBlockedTags: string[];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[];
    cd: Constructor<CoolDownByGameEffect> = GE_CoolDown_Warrior_BackJump;
    cost: Constructor<CostByGameEffect> = GE_Cost_Warrior_BackJump;

    @MPropertiesInject(SkillHelper)
    private skillHelper:SkillHelper;


    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        let char = owner as Character;
        let anim = char.loadAnimation("284609");
        anim.speed = 1.5;
        anim.blendInTime = 0;
        // anim.blendOutTime = 0;
        let animTask = AT_PlayAnimation.New(this,anim,0.5,char);

        this.skillHelper.changePlayerCanMove(char.player,false);


        animTask.addEvent(0.1,()=>{
            this.skillHelper.addImpulse(char.player,char.worldTransform.getForwardVector().clone().multiply(800).multiply(-1).add(new Vector(0,0,150)));
        })

        animTask.onFinished(()=>{
            this.end();
        })

        animTask.activate();
    }
    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        this.skillHelper.changePlayerCanMove((owner as Character).player,true);
    }
    
}