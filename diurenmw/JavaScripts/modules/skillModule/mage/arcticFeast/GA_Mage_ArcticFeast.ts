import { CameraManager } from "../../../../camera/CameraManager";
import { Constructor, MPlugin, MPropertiesInject, RpcPlugin } from "../../../../framework/DI/MContainer";
import { MFramework } from "../../../../framework/MFramework";
import { EffectTool } from "../../../../tools/EffectTool";
import { MathTool } from "../../../../tools/MathTool";
import { EPlayerAttributeSetType } from "../../../AttributeModule/PlayerAttributeSetType";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { AT_PlayAnimation } from "../../../gasModule/gameAbilitys/AT/customAT/AT_PlayAnimation";
import { GameAbility } from "../../../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../../../gasModule/gameAbilitys/GA/GameAbilityType";
import { CoolDownByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { CostByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";
import { SkillHelper } from "../../SkillHelper";
import { RegisterSkill } from "../../SkillManager";
import { ESkillType } from "../../SkillType";
import { ArcticFeastObj } from "./ArcticFeastObj";
import { GE_CoolDown_Mage_ArcticFeast } from "./GE_CoolDown_Mage_ArcticFeast";
import { GE_Cost_Mage_ArcticFeast } from "./GE_Cost_Mage_ArcticFeast";
import { GE_Damage_Mage_ArcticFeast2 } from "./GE_Damage_Mage_ArcticFeast2";



@MPlugin()
@RegisterSkill(2007, ESkillType.Staff)
export class GA_Mage_ArcticFeast extends GameAbility {
    tag: string = "GA.Mage.ArcticFeast";
    cancelTags: string[] = ["GA.Mage"]
    blockTags: string[];
    activationOwnedTags: string[] = ["State.Player.Skilling","State.Player.NotCancel"]
    activationRequiredTags: string[];
    activationBlockedTags: string[] = ["State.Player.BackJump", "State.Player.NotCancel"]
    targetRequiredTags: string[];
    targetBlockedTags: string[] = ["Club.Player", "State.Monster.Dead", "State.Monster.Invincible"];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[];
    cd: Constructor<CoolDownByGameEffect> = GE_CoolDown_Mage_ArcticFeast;
    cost: Constructor<CostByGameEffect> = GE_Cost_Mage_ArcticFeast;


    @MPropertiesInject(SkillHelper)
    private skillHelper: SkillHelper;

    @MPropertiesInject(EffectTool)
    private effectTool: EffectTool;

    @MPropertiesInject(CameraManager)
    private cameraManager: CameraManager;

    @MPropertiesInject(RpcPlugin)
    private rpc: RpcPlugin;

    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }

    private effectId:number;
    private isCamera:boolean = false;
    private cameraOffsetY:number;
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        let char = owner as Character;
        let attrSpeed = asc.attributeSet.getAttr(EPlayerAttributeSetType.castSpeed).getCurrent();
        let aim = char.loadAnimation("285599");
        // let aim = char.loadAnimation("269040");
        aim.blendInTime = 0;
        aim.speed = 1.1 * attrSpeed;

        let animTask1 = AT_PlayAnimation.New(this, aim, 1.5, char);
        let animTask2 = AT_PlayAnimation.New(this, aim, 1.5, char);
        let animTask3 = AT_PlayAnimation.New(this, aim, 1.5, char);

        this.skillHelper.changePlayerCanMove(char.player, false);

        let pos = char.getSlotWorldPosition(HumanoidSlotType.Root).clone().add(char.worldTransform.getForwardVector().normalized.multiply(700));
        let ice = MFramework.createObject(ArcticFeastObj) as ArcticFeastObj;
        ice.init(pos,char,asc,this);
        ice.activate();
        let cameraOffsetY = Math.abs(pos.y - char.getSlotWorldPosition(HumanoidSlotType.Root).y);
        this.cameraOffsetY = cameraOffsetY;
        this.rpc.client(char.player, this, this.C_ChangeCamera,char.worldTransform.getForwardVector().clone(),0,cameraOffsetY);
        this.isCamera = true;

        animTask1.addEvent(0.2, () => {
            EffectService.playAtPosition("219368", char.getSlotWorldPosition(HumanoidSlotType.Root),{scale:new Vector(1.5)})
            this.effectTool.playAtPosition("152215",pos,{scale:new Vector(2)});
        })       
        animTask1.addEvent(0.5, () => {
            
        })
        animTask1.addEvent(1.2,()=>{
            let arr = MathTool.checkHitByPosition(char,pos,500);
            arr.forEach((monster) => {
                let asc = monster.getComponent(AbilitySystemComponent);
                if (asc) {
                    if (asc.hasMatchingGameTag(this.targetBlockedTags)) return
                    this.sendGameEvent(this.owner, "Event.Player.HurtMonster", { target: monster });
                    this.sendGameEvent(monster, "Event.Monster.OnHurtAnim", { onHurtType:"Crit",duringTime:0.5 });
                    this.sendGameEvent(monster, "Event.Monster.OnHurt", { damageGE: GE_Damage_Mage_ArcticFeast2 });
                }
            })
        })
        animTask1.onFinished(() => {
            animTask2.activate();
        })



        animTask2.addEvent(0.2, () => {
            EffectService.playAtPosition("219368", char.getSlotWorldPosition(HumanoidSlotType.Root),{scale:new Vector(1.5)})
            this.effectTool.playAtPosition("152215",pos,{scale:new Vector(2)});
        })
        animTask2.addEvent(1.2,()=>{
            let arr = MathTool.checkHitByPosition(char,pos,500);
            arr.forEach((monster) => {
                let asc = monster.getComponent(AbilitySystemComponent);
                if (asc) {
                    if (asc.hasMatchingGameTag(this.targetBlockedTags)) return
                    this.sendGameEvent(this.owner, "Event.Player.HurtMonster", { target: monster });
                    this.sendGameEvent(monster, "Event.Monster.OnHurtAnim", { onHurtType:"Crit",duringTime:0.5 });
                    this.sendGameEvent(monster, "Event.Monster.OnHurt", { damageGE: GE_Damage_Mage_ArcticFeast2 });
                }
            })
        })
        animTask2.onFinished(() => {
            animTask3.activate();
        })

        

        animTask3.addEvent(0.2, () => {
            EffectService.playAtPosition("219368", char.getSlotWorldPosition(HumanoidSlotType.Root),{scale:new Vector(1.5)})
            this.effectTool.playAtPosition("152215",pos,{scale:new Vector(2)});
        })
        animTask3.addEvent(0.5, () => {

        })
        animTask3.addEvent(1.2,()=>{
            let arr = MathTool.checkHitByPosition(char,pos,500);
            arr.forEach((monster) => {
                let asc = monster.getComponent(AbilitySystemComponent);
                if (asc) {
                    if (asc.hasMatchingGameTag(this.targetBlockedTags)) return
                    this.sendGameEvent(this.owner, "Event.Player.HurtMonster", { target: monster });
                    this.sendGameEvent(monster, "Event.Monster.OnHurtAnim", { onHurtType:"Crit",duringTime:0.5 });
                    this.sendGameEvent(monster, "Event.Monster.OnHurt", { damageGE: GE_Damage_Mage_ArcticFeast2 });
                }
            })
        })
        animTask3.onFinished(() => {
            this.rpc.client(char.player, this, this.C_ChangeCamera,char.worldTransform.getForwardVector().clone(),cameraOffsetY,0);
            this.isCamera = false;
            ice.cancel();
            this.end();
        })

        animTask1.activate()
    }
    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        if(this.isCamera){
            let char = owner as Character;
            this.rpc.client(char.player, this, this.C_ChangeCamera,char.worldTransform.getForwardVector().clone(),this.cameraOffsetY,0);
        }
    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        this.skillHelper.changePlayerCanMove((owner as Character).player, true);
    }

    C_ChangeCamera(_pos:Vector,slength:number,elength:number){ 
        this.cameraManager.mainForcusPos(_pos,slength,elength);
    }
}