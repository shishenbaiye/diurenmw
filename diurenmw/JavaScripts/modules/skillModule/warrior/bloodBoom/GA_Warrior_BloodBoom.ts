import { CameraManager } from "../../../../camera/CameraManager";
import { Constructor, MPlugin, MPropertiesInject, RpcPlugin } from "../../../../framework/DI/MContainer";
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
import { GE_Damage_Warrior_JumpChop } from "../jumpChop/GE_Damage_Warrior_JumpChop";
import { GE_CoolDown_Warrior_BloodBoom } from "./GE_CoolDown_Warrior_BloodBoom";
import { GE_Cost_Warrior_BloodBoom } from "./GE_Cost_Warrior_BloodBoom";
import { GE_Damage_Warrior_BloodBoom } from "./GE_Damage_Warrior_BloodBoom";

@RegisterSkill(1006,ESkillType.GreatSword)
@MPlugin()
export class GA_Warrior_BloodBoom extends GameAbility{
    tag: string = "GA.Warrior.BloodBoom"
    cancelTags: string[] = ["GA.Warrior"]
    blockTags: string[];
    activationOwnedTags: string[] = ["State.Player.Skilling","State.Player.Stun"]
    activationRequiredTags: string[];
    activationBlockedTags: string[] = ["State.Player.BackJump","State.Player.NotCancel"]
    targetRequiredTags: string[];
    targetBlockedTags: string[] = ["Club.Player","State.Monster.Dead","State.Monster.Invincible"];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[];
    cd: Constructor<CoolDownByGameEffect> = GE_CoolDown_Warrior_BloodBoom;
    cost: Constructor<CostByGameEffect> = GE_Cost_Warrior_BloodBoom;

    @MPropertiesInject(SkillHelper)
    private skillHelper:SkillHelper;

    @MPropertiesInject(EffectTool)
    private effectTool:EffectTool;

    @MPropertiesInject(CameraManager)
    private cameraManager:CameraManager;

    @MPropertiesInject(RpcPlugin)
    private rpc:RpcPlugin;

    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        
    }
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        let char = owner as Character;
        let anim = char.loadAnimation("281036");
        anim.speed = 1;
        anim.blendInTime = 0;
        let animTask = AT_PlayAnimation.New(this,anim,1.83,char);

        this.skillHelper.changePlayerCanMove(char.player,false);

        animTask.addEvent(1,()=>{
            let charPos = char.worldTransform.position.clone();
            this.effectTool.playAtPosition("265665",charPos,{scale:new Vector(1.5,6,1),color:LinearColor.red});
            this.effectTool.playAtPosition("265666",charPos,{scale:new Vector(1),color:LinearColor.red})
            
            this.rpc.client(char.player,this,this.C_ShakeCamera,0.4,5);

            let arr = MathTool.checkHitByPosition(owner as Character,charPos,500);
            arr.forEach((obj:Character)=>{
                let asc = obj.getComponent(AbilitySystemComponent);
                if(asc){
                    if(asc.hasMatchingGameTag(this.targetBlockedTags)) return;
                    this.sendGameEvent(obj,"Event.Monster.OnHurt",{damageGE:GE_Damage_Warrior_BloodBoom});
                    this.sendGameEvent(obj,"Event.Monster.OnHurtAnim",{onHurtType:"Crit",duringTime:0.5});
                }
            })

            // AT_WaitTime.New(this,0.6).addEndListener(()=>{
            //     animTask.resumeTask();
            // }).activate();
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
    
    C_ShakeCamera(time:number,str:number){
        this.cameraManager.shakeCamera(time,str,str,60,60);
    }
}