import { Constructor, MPlugin, MPropertiesInject } from "../../../../framework/DI/MContainer";
import { MFramework } from "../../../../framework/MFramework";
import { EffectTool } from "../../../../tools/EffectTool";
import { MathTool } from "../../../../tools/MathTool";
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
import { GE_CoolDown_Warrior_RagingFury } from "./GE_CoolDown_Warrior_RagingFury";
import { GE_Cost_Warrior_RagingFury } from "./GE_Cost_Warrior_RagingFury";
import { GE_Damage_Warrior_RagingFuryOne } from "./GE_Damage_Warrior_RagingFuryOne";
import { GE_Damage_Warrior_RagingFuryTwo } from "./GE_Damage_Warrior_RagingFuryTwo";
import { RagingFuryObj } from "./RagingFuryObj";

@RegisterSkill(1007,ESkillType.GreatSword)
@MPlugin()
export class GA_Warrior_RagingFury extends GameAbility{
    tag: string = "GA.Warrior.RagingFury"
    cancelTags: string[] = ["GA.Warrior"]
    blockTags: string[];
    activationOwnedTags: string[] = ["State.Player.Skilling","State.Player.Stun"]
    activationRequiredTags: string[];
    activationBlockedTags: string[] = ["State.Player.BackJump","State.Player.NotCancel"]
    targetRequiredTags: string[];
    targetBlockedTags: string[] = ["Club.Player","State.Monster.Dead","State.Monster.Invincible"];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[];
    cd: Constructor<CoolDownByGameEffect> = GE_CoolDown_Warrior_RagingFury;
    cost: Constructor<CostByGameEffect> = GE_Cost_Warrior_RagingFury;

    @MPropertiesInject(SkillHelper)
    private skillHelper:SkillHelper;

    @MPropertiesInject(EffectTool)
    private effectTool:EffectTool;

    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        
    }
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        let char = owner as Character;
        let anim = char.loadAnimation("269224");
        anim.speed = 1.5;
        anim.blendInTime = 0;

        this.skillHelper.changePlayerCanMove(char.player,false);

        let animTask = AT_PlayAnimation.New(this,anim,1,char);


       

        animTask.addEvent(0,()=>{
            let ragingFury = MFramework.createObject<RagingFuryObj>(RagingFuryObj);
            ragingFury.init(asc,owner,target,this)
            ragingFury.start();
        })
        
        animTask.onFinished(()=>{
            this.end();
        })

        animTask.activate();
    }
    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        
    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        this.skillHelper.changePlayerCanMove((owner as Character).player,true);
    }
    
}