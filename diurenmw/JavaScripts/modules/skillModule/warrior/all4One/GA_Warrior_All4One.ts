import { CameraManager } from "../../../../camera/CameraManager";
import { Constructor, MPlugin, MPropertiesInject, RpcPlugin } from "../../../../framework/DI/MContainer";
import { MathTool } from "../../../../tools/MathTool";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { AT_PlayAnimation } from "../../../gasModule/gameAbilitys/AT/customAT/AT_PlayAnimation";
import { AT_WaitTime } from "../../../gasModule/gameAbilitys/AT/customAT/AT_WaitTime";
import { GameAbility } from "../../../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../../../gasModule/gameAbilitys/GA/GameAbilityType";
import { CoolDownByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { CostByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";
import WeaponScript from "../../../weaponModule/WeaponScript";
import { SkillHelper } from "../../SkillHelper";
import { RegisterSkill } from "../../SkillManager";
import { ESkillType } from "../../SkillType";
import { GE_CoolDown_Warrior_All4One } from "./GE_CoolDown_Warrior_All4One";
import { GE_Cost_Warrior_All4One } from "./GE_Cost_Warrior_All4One";
import { GE_Damage_Warrior_All4One } from "./GE_Damage_Warrior_All4One";


@RegisterSkill(1013, ESkillType.GreatSword)
@MPlugin()
export class GA_Warrior_All4One extends GameAbility{
    tag: string = "GA.Warrior.All4One";
    cancelTags: string[];
    blockTags: string[];
    activationOwnedTags: string[] = ["State.Player.Skilling","State.Player.Invincible"];
    activationRequiredTags: string[];
    activationBlockedTags: string[];
    targetRequiredTags: string[];
    targetBlockedTags: string[];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[];
    cd: Constructor<CoolDownByGameEffect> = GE_CoolDown_Warrior_All4One;
    cost: Constructor<CostByGameEffect> = GE_Cost_Warrior_All4One;

    @MPropertiesInject(SkillHelper)
    private skillHelper:SkillHelper;

    @MPropertiesInject(CameraManager)
    private cameraManager:CameraManager;

    @MPropertiesInject(RpcPlugin)
    private rpc:RpcPlugin;

    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        
    }
    private feng:number
    private qi:number
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        let char = owner as Character;

        let anim3 = char.loadAnimation("269125");
        let animTask3 = AT_PlayAnimation.New(this,anim3,1.8,char);

        let anim1 = char.loadAnimation("298329");
        anim1.blendOutTime = 0;
        let animTask1 = AT_PlayAnimation.New(this,anim1,3,char);

        let anim2 = char.loadAnimation("269246");
        anim2.speed = 0.4;
        anim2.startTime = 0.8;
        let animTask2 = AT_PlayAnimation.New(this,anim2,3,char);

        this.skillHelper.changePlayerCanMove(char.player,false);

        animTask3.addEvent(0.8,()=>{
            this.feng = EffectService.playOnGameObject("123627",char,{scale:new Vector(1),slotType:HumanoidSlotType.Root,loopCount:0});
            EffectService.playOnGameObject("27426",char,{scale:new Vector(1),slotType:HumanoidSlotType.Root});
            EffectService.playOnGameObject("162430",char,{scale:new Vector(2,2,1),slotType:HumanoidSlotType.Root});
        })

        animTask3.addEvent(1,()=>{
            this.rpc.client(char.player,this,this.C_ShakeCamera,2.4,2);
        })

        animTask3.onFinished(()=>{
            this.qi = EffectService.playOnGameObject("162430",char,{scale:new Vector(1.5,1.5,2),slotType:HumanoidSlotType.Root,loopCount:0});
            this.rpc.client(char.player,this,this.C_ChangeLength,1500);
            animTask1.activate();
        })



        animTask1.addEvent(0.7,()=>{
            let weapon = char.getComponent(WeaponScript).getEquipWeapon();
            if(weapon){
                let model = weapon.model;
                EffectService.playOnGameObject("298635",model,{scale:new Vector(1.5,1.5,1.5)});
            }
            
        })


        animTask1.addEvent(0.8,()=>{
            animTask1.pauseTask();

            let weapon = char.getComponent(WeaponScript).getEquipWeapon();
            if(weapon){
                let model = weapon.model;
                EffectService.playOnGameObject("300331",model,{scale:new Vector(4,4,1.8),rotation:char.worldTransform.rotation});
            }

            AT_WaitTime.New(this,0.8).addEndListener(()=>{
                EffectService.stop(this.qi);
                animTask1.resumeTask();
            }).activate();
        })

        animTask1.addEvent(1.2,()=>{
            animTask1.cancelTask();
            animTask2.activate();
        })

        let onHurtArr:Character[] = [];

        animTask2.addEvent(0.4,()=>{
            let forward2 = char.worldTransform.getForwardVector().clone();
            let start = char.worldTransform.position.clone().add(forward2.clone().multiply(100));
            let end = char.worldTransform.position.clone().add(forward2.clone().multiply(800));
            let box = new Vector(100,100,100);
            let arr = MathTool.checkHitByBoxTrace(owner as Character,start,end,box,char.worldTransform.rotation);
            arr.forEach((obj:Character)=>{
                let asc = obj.getComponent(AbilitySystemComponent);
                if(asc){
                    if(asc.hasMatchingGameTag(this.targetBlockedTags)) return;
                    onHurtArr.push(obj);
                    this.sendGameEvent(obj,"Event.Monster.OnHurt",{damageGE:GE_Damage_Warrior_All4One});
                    this.sendGameEvent(obj,"Event.Monster.OnHurtAnim",{duringTime:2});
                }
            })
        })

        animTask2.addEvent(0.6,()=>{
            this.rpc.client(char.player,this,this.C_ShakeCamera,1,5);
            EffectService.playAtPosition("300330",char.getSlotWorldPosition(HumanoidSlotType.Root).clone().add(char.worldTransform.getForwardVector().multiply(100)),{scale:new Vector(1.2,2,1),rotation:char.worldTransform.rotation});
        })


        animTask2.addEvent(0.7,()=>{
            onHurtArr.forEach((obj:Character)=>{
                this.sendGameEvent(obj,"Event.Monster.OnHurtAnim");
                this.sendGameEvent(obj,"Event.Monster.OnHurt",{damageGE:GE_Damage_Warrior_All4One});
            })
        })
        animTask2.addEvent(0.8,()=>{
            onHurtArr.forEach((obj:Character)=>{
                this.sendGameEvent(obj,"Event.Monster.OnHurtAnim");
                this.sendGameEvent(obj,"Event.Monster.OnHurt",{damageGE:GE_Damage_Warrior_All4One});
            })
        })
        animTask2.addEvent(0.9,()=>{
            onHurtArr.forEach((obj:Character)=>{
                this.sendGameEvent(obj,"Event.Monster.OnHurtAnim");
                this.sendGameEvent(obj,"Event.Monster.OnHurt",{damageGE:GE_Damage_Warrior_All4One});
            })
        })
        animTask2.addEvent(0.7,()=>{
            EffectService.playAtPosition("300330",char.getSlotWorldPosition(HumanoidSlotType.Root).clone().add(char.worldTransform.getForwardVector().multiply(100)),{scale:new Vector(1.2,2,1),rotation:char.worldTransform.rotation});
        })

        animTask2.addEvent(1.0,()=>{
            animTask2.setSpeed(1);
        })

        animTask2.addEvent(0.5,()=>{
            EffectService.stop(this.feng);
        })

        animTask2.addEvent(2.2,()=>{
            
            this.rpc.client(char.player,this,this.C_ChangeLength,-1500);
        })

        animTask2.onFinished(()=>{
            this.end()
        })
        
        animTask3.activate()
        
    }

    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        this.skillHelper.changePlayerCanMove((owner as Character).player,true);
    }


    C_ChangeLength(length:number){
        this.cameraManager.moveCameraArmLength(length);
    }

    C_ShakeCamera(time:number,str:number){
        this.cameraManager.shakeCamera(time,str,str,60,60);
    }
}