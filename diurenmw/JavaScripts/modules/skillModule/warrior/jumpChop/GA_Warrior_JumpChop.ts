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
import { GE_CoolDown_Warrior_JumpChop } from "./GE_CoolDown_Warrior_JumpChop";
import { GE_Cost_Warrior_JumpChop } from "./GE_Cost_Warrior_JumpChop";
import { GE_Damage_Warrior_JumpChop } from "./GE_Damage_Warrior_JumpChop";

@RegisterSkill(1008,ESkillType.GreatSword)
@MPlugin()
export class GA_Warrior_JumpChop extends GameAbility{
    tag: string = "GA.Warrior.JumpChop"
    cancelTags: string[] = ["GA.Warrior"]
    blockTags: string[];
    activationOwnedTags: string[] = ["State.Player.Skilling","State.Player.Stun","State.Player.NotCancel"]
    activationRequiredTags: string[];
    activationBlockedTags: string[] = ["State.Player.BackJump","State.Player.NotCancel"]
    targetRequiredTags: string[];
    targetBlockedTags: string[] = ["Club.Player","State.Monster.Dead","State.Monster.Invincible"];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[];
    cd: Constructor<CoolDownByGameEffect> = GE_CoolDown_Warrior_JumpChop;
    cost: Constructor<CostByGameEffect> = GE_Cost_Warrior_JumpChop;
    
    @MPropertiesInject(SkillHelper)
    private skillHelper:SkillHelper;

    @MPropertiesInject(EffectTool)
    private effectTool:EffectTool;

    @MPropertiesInject(CameraManager)
    private cameraManager:CameraManager;

    @MPropertiesInject(RpcPlugin)
    private rpc:RpcPlugin;

    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        let char = owner as Character;
        let anim = char.loadAnimation("279697");
        anim.speed = 1.3;
        anim.blendInTime = 0;
        let animTask = AT_PlayAnimation.New(this,anim,1.5,char);

        this.skillHelper.changePlayerCanMove(char.player,false);

        animTask.addEvent(0.2,()=>{
            this.skillHelper.callPlayerMove(char.player,true,char.worldTransform.getForwardVector().normalize().multiply(1));
        })

        animTask.addEvent(0.7,()=>{
            this.skillHelper.callPlayerMove(char.player,false);
        })

        animTask.addEvent(0.87,()=>{

            let arr = MathTool.checkHitByCharacter(owner as Character,200,120);
            arr.forEach((obj:Character)=>{
                let asc = obj.getComponent(AbilitySystemComponent);
                if(asc){
                    if(asc.hasMatchingGameTag(this.targetBlockedTags)) return;
                    animTask.pauseTask()
                    this.sendGameEvent(obj,"Event.Monster.OnHurt",{damageGE:GE_Damage_Warrior_JumpChop});
                    this.sendGameEvent(obj,"Event.Monster.OnHurtAnim",{duringTime:0.5});
                }
            })

            AT_WaitTime.New(this,0.2).addEndListener(()=>{
                animTask.resumeTask()
            }).activate()
        })
        animTask.addEvent(0.97,()=>{

            let arr = MathTool.checkHitByCharacter(owner as Character,200,120);
            arr.forEach((obj:Character)=>{
                let asc = obj.getComponent(AbilitySystemComponent);
                if(asc){
                    if(asc.hasMatchingGameTag(this.targetBlockedTags)) return;
                    animTask.pauseTask()
                    this.sendGameEvent(obj,"Event.Monster.OnHurt",{damageGE:GE_Damage_Warrior_JumpChop});
                    this.sendGameEvent(obj,"Event.Monster.OnHurtAnim",{duringTime:0.5});
                }
            })

            AT_WaitTime.New(this,0.2).addEndListener(()=>{
                animTask.resumeTask()
            }).activate()
        })
        animTask.addEvent(1.05,()=>{
            let forward = char.worldTransform.getForwardVector().clone();
            let charPos = char.worldTransform.position.clone();
            charPos.z = char.getSlotWorldPosition(HumanoidSlotType.Root).z;
            let pos = charPos.add(forward.multiply(200));
            this.effectTool.playAtPosition("27450",pos,{scale:new Vector(2),color:LinearColor.red});

            this.rpc.client(char.player,this,this.C_ShakeCamera,0.3,2);

            let arr = MathTool.checkHitByPosition(owner as Character,pos,333);
            arr.forEach((obj:Character)=>{
                let asc = obj.getComponent(AbilitySystemComponent);
                if(asc){
                    if(asc.hasMatchingGameTag(this.targetBlockedTags)) return;
                    animTask.pauseTask()
                    this.sendGameEvent(obj,"Event.Monster.OnHurt",{damageGE:GE_Damage_Warrior_JumpChop});
                    this.sendGameEvent(obj,"Event.Monster.OnHurtAnim",{onHurtType:"Crit",duringTime:0.5});
                }
            })

            AT_WaitTime.New(this,0.2).addEndListener(()=>{
                animTask.resumeTask()
            }).activate()
        })

        animTask.onFinished(()=>{
            this.end();
        })

        animTask.activate();
    }
    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        this.skillHelper.callPlayerMove((owner as Character).player,false);
    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        this.skillHelper.changePlayerCanMove((owner as Character).player,true);
    }
    
    C_ShakeCamera(time:number,str:number){
        this.cameraManager.shakeCamera(time,str,str,100,100);
    }
}