import { Constructor, MPlugin, MPropertiesInject } from "../../../../framework/DI/MContainer";
import { EffectTool } from "../../../../tools/EffectTool";
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
import { GE_Damage_Warrior_Slash } from "../slash/GE_Damage_Warrior_Slash";
import { GE_CoolDown_Warrior_SwordWave } from "./GE_CoolDown_Warrior_SwordWave";
import { GE_Cost_Warrior_SwordWave } from "./GE_Cost_Warrior_SwordWave";
import { GE_Damage_Warrior_SwordWave } from "./GE_Damage_Warrior_SwordWave";


@RegisterSkill(1005,ESkillType.GreatSword)
@MPlugin()
export class GA_Warrior_SwordWave extends GameAbility{
    tag: string = "GA.Warrior.SwordWave";
    cancelTags: string[] = ["GA.Warrior"]
    blockTags: string[];
    activationOwnedTags: string[] = ["State.Player.Skilling","State.Player.Stun"]
    activationRequiredTags: string[];
    activationBlockedTags: string[] = ["State.Player.BackJump","State.Player.NotCancel"]
    targetRequiredTags: string[];
    targetBlockedTags: string[] = ["Club.Player","State.Monster.Dead","State.Monster.Invincible"];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[];
    cd: Constructor<CoolDownByGameEffect> = GE_CoolDown_Warrior_SwordWave;
    cost: Constructor<CostByGameEffect> = GE_Cost_Warrior_SwordWave;

    @MPropertiesInject(SkillHelper)
    private skillHelper:SkillHelper;

    @MPropertiesInject(EffectTool)
    private effectTool:EffectTool;

    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        
        let char = owner as Character;
        let anim = char.loadAnimation("279634");
        anim.speed = 1.3;
        anim.blendInTime = 0;
        let animTask = AT_PlayAnimation.New(this,anim,2,char);

        this.skillHelper.changePlayerCanMove(char.player,false);

        animTask.addEvent(1.0,()=>{
            EffectService.playAtPosition("123627",char.getSlotWorldPosition(HumanoidSlotType.Root),{scale:new Vector(1),duration:0.5,});
        })

        animTask.addEvent(1.0,()=>{
            let forward = char.worldTransform.getForwardVector().clone();
            let charPos = char.worldTransform.position.clone();
            charPos.z = char.getSlotWorldPosition(HumanoidSlotType.LeftFoot).z;
            let pos = charPos.add(forward.multiply(100));
            this.effectTool.playAtPosition("168834",pos,{scale:new Vector(0.5),rotation:char.worldTransform.rotation,color:LinearColor.red});

            let forward2 = char.worldTransform.getForwardVector().clone();
            let start = char.worldTransform.position.clone().add(forward2.clone().multiply(100));
            let end = char.worldTransform.position.clone().add(forward2.clone().multiply(600));
            let box = new Vector(100,100,100);
            let arr = MathTool.checkHitByBoxTrace(owner as Character,start,end,box,char.worldTransform.rotation);
            arr.forEach((obj:Character)=>{
                let asc = obj.getComponent(AbilitySystemComponent);
                if(asc){
                    if(asc.hasMatchingGameTag(this.targetBlockedTags)) return;
                    this.sendGameEvent(obj,"Event.Monster.OnHurt",{damageGE:GE_Damage_Warrior_SwordWave});
                    this.sendGameEvent(obj,"Event.Monster.OnHurtAnim",{duringTime:0.5});
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
        // throw new Error("Method not implemented.");
        this.skillHelper.changePlayerCanMove((owner as Character).player,true);
    }
    
}