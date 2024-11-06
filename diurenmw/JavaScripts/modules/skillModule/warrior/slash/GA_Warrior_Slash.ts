import { Constructor, MPlugin, MPropertiesInject } from "../../../../framework/DI/MContainer";
import { MathTool } from "../../../../tools/MathTool";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { AT_PlayAnimation } from "../../../gasModule/gameAbilitys/AT/customAT/AT_PlayAnimation";
import { GameAbility } from "../../../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../../../gasModule/gameAbilitys/GA/GameAbilityType";
import { CoolDownByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { CostByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";
import { SkillHelper } from "../../SkillHelper";
import { RegisterSkill } from "../../SkillManager";
import { ESkillType } from "../../SkillType";
import { GE_CoolDown_Warrior_Slash } from "./GE_CoolDown_Warrior_Slash";
import { GE_Cost_Warrior_Slash } from "./GE_Cost_Warrior_Slash";
import { GE_Damage_Warrior_Slash } from "./GE_Damage_Warrior_Slash";

@RegisterSkill(1004,ESkillType.GreatSword)
@MPlugin()
export class GA_Warrior_Slash extends GameAbility{
    tag: string = "GA.Warrior.Slash";
    cancelTags: string[] = ["GA.Warrior"]
    blockTags: string[];
    activationOwnedTags: string[] = ["State.Player.Skilling","State.Player.Stun"]
    activationRequiredTags: string[];
    activationBlockedTags: string[] = ["State.Player.BackJump"]
    targetRequiredTags: string[];
    targetBlockedTags: string[] = ["Club.Player","State.Monster.Dead","State.Monster.Invincible"];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[];
    cd: Constructor<CoolDownByGameEffect> = GE_CoolDown_Warrior_Slash;
    cost: Constructor<CostByGameEffect> = GE_Cost_Warrior_Slash;

    @MPropertiesInject(SkillHelper)
    private skillHelper:SkillHelper;

    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }

    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // 269246
        let char = owner as Character;
        let anim = char.loadAnimation("269246");
        anim.speed = 1.3;
        anim.blendInTime = 0;
        let animTask = AT_PlayAnimation.New(this,anim,3,char);

        this.skillHelper.changePlayerCanMove(char.player,false);
        animTask.addEvent(1.3,()=>{
            let forward = char.worldTransform.getForwardVector().clone();
            let charPos = char.worldTransform.position.clone();
            charPos.z = char.getSlotWorldPosition(HumanoidSlotType.LeftFoot).z;
            let pos = charPos.add(forward.multiply(200));
            EffectService.playAtPosition("27450",pos,{scale:new Vector(1.5)});

            let arr = MathTool.checkHitByPosition(owner as Character,pos,250);
            arr.forEach((obj:Character)=>{
                let asc = obj.getComponent(AbilitySystemComponent);
                if(asc){
                    if(asc.hasMatchingGameTag(this.targetBlockedTags)) return;
                    this.sendGameEvent(obj,"Event.Monster.OnHurt",{damageGE:GE_Damage_Warrior_Slash});
                }
            })
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