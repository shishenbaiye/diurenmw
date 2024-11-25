import { Constructor, MPlugin, MPropertiesInject } from "../../../../framework/DI/MContainer";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { AT_PlayAnimation } from "../../../gasModule/gameAbilitys/AT/customAT/AT_PlayAnimation";
import { AT_WaitTime } from "../../../gasModule/gameAbilitys/AT/customAT/AT_WaitTime";
import { GameAbility } from "../../../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../../../gasModule/gameAbilitys/GA/GameAbilityType";
import { CoolDownByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { CostByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";
import { SkillHelper } from "../../SkillHelper";
import { RegisterSkill } from "../../SkillManager";
import { ESkillType } from "../../SkillType";
import { GE_CoolDown_Mage_BackJump } from "./GE_CoolDown_Mage_BackJump";
import { GE_Cost_Mage_BackJump } from "./GE_Cost_Mage_BackJump";

@RegisterSkill(2003,ESkillType.Staff)
@MPlugin()
export class GA_Mage_BackJump extends GameAbility{
    tag: string = "GA.Mage.BackJump";
    cancelTags: string[] = ["GA.Mage"]
    blockTags: string[];
    activationOwnedTags: string[] = ["State.Player.BackJump","State.Player.Invincible"]
    activationRequiredTags: string[];
    activationBlockedTags: string[] = ["State.Player.NotCancel"]
    targetRequiredTags: string[];
    targetBlockedTags: string[];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[];
    cd: Constructor<CoolDownByGameEffect> = GE_CoolDown_Mage_BackJump;
    cost: Constructor<CostByGameEffect> = GE_Cost_Mage_BackJump;

    @MPropertiesInject(SkillHelper)
    private skillHelper:SkillHelper;


    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        let char = owner as Character;

        let waitTime = AT_WaitTime.New(this,0.1);

        waitTime.addEndListener(()=>{
            this.skillHelper.addImpulse(char.player,char.worldTransform.getForwardVector().clone().multiply(800).multiply(-1).add(new Vector(0,0,200)));

            AT_WaitTime.New(this,0.3).addEndListener(()=>{
                this.end();
            }).activate();
        })

        waitTime.activate();

        // let anim = char.loadAnimation("284782");

        // anim.speed = 1.5;
        // anim.blendInTime = 0;
        // // anim.blendOutTime = 0;
        // let animTask = AT_PlayAnimation.New(this,anim,1,char);

        // this.skillHelper.changePlayerCanMove(char.player,false);


        // animTask.addEvent(0.1,()=>{
        //     this.skillHelper.addImpulse(char.player,char.worldTransform.getForwardVector().clone().multiply(800).multiply(-1).add(new Vector(0,0,200)));
        // })

        // animTask.onFinished(()=>{
        //     this.end();
        // })

        // animTask.activate();
    }
    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        this.skillHelper.changePlayerCanMove((owner as Character).player,true);
    }
    
}