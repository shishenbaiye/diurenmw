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
import WeaponScript from "../../../weaponModule/WeaponScript";
import { SkillHelper } from "../../SkillHelper";
import { RegisterSkill } from "../../SkillManager";
import { ESkillType } from "../../SkillType";
import { GE_CoolDown_Mage_FinalThunder } from "./GE_CoolDown_Mage_FinalThunder";
import { GE_Cost_Mage_FinalThunder } from "./GE_Cost_Mage_FinalThunder";
import { GE_Damage_Mage_FinalThunder } from "./GE_Damage_Mage_FinalThunder";


@RegisterSkill(2099, ESkillType.Staff)
@MPlugin()
export class GA_Mage_FinalThunder extends GameAbility {
    tag: string = "GA.Mage.FinalThunder";
    cancelTags: string[];
    blockTags: string[];
    activationOwnedTags: string[] = ["State.Player.Skilling", "State.Player.Invincible", "State.Player.NotCancel"];
    activationRequiredTags: string[];
    activationBlockedTags: string[] = ["State.Player.BackJump", "State.Player.NotCancel"]
    targetRequiredTags: string[];
    targetBlockedTags: string[] = ["Club.Player", "State.Monster.Dead", "State.Monster.Invincible"];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[];
    cd: Constructor<CoolDownByGameEffect> = GE_CoolDown_Mage_FinalThunder;
    cost: Constructor<CostByGameEffect> = GE_Cost_Mage_FinalThunder;

    @MPropertiesInject(SkillHelper)
    private skillHelper: SkillHelper;

    @MPropertiesInject(CameraManager)
    private cameraManager: CameraManager;

    @MPropertiesInject(EffectTool)
    private effectTool: EffectTool;

    @MPropertiesInject(RpcPlugin)
    private rpc: RpcPlugin;

    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        this.sendGameEvent(owner, "Event.Player.ReleaseSkill");
    }
    private feng: number
    private qi: number
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        let char = owner as Character;
        let aim1 = char.loadAnimation("285599");
        let aim2 = char.loadAnimation("280691");
        this.skillHelper.changePlayerCanMove(char.player, false);

        let animTask1 = AT_PlayAnimation.New(this, aim1, 1.5, char);
        let animTask2 = AT_PlayAnimation.New(this, aim2, 2, char);

        let pos = char.getSlotWorldPosition(HumanoidSlotType.Root).clone().add(char.worldTransform.getForwardVector().normalize().multiply(700));
        let posUp = pos.clone().add(new Vector(0,0,100))
        let cameraOffsetY = Math.abs(pos.y - char.getSlotWorldPosition(HumanoidSlotType.Root).clone().y)
        let xi: number = 0;
        animTask1.addEvent(0.2, () => {
            EffectService.playAtPosition("219368", char.getSlotWorldPosition(HumanoidSlotType.Root), { scale: new Vector(1.5) })
        })

        animTask1.addEvent(0.8, () => {
            this.rpc.client(char.player, this, this.C_ChangeLight, -3.9);
        })

        animTask1.addEvent(1.0, () => {
            xi = this.effectTool.playAtPosition("108250", posUp, { scale: new Vector(3) })
            this.rpc.client(char.player, this, this.C_ChangeCamera,char.worldTransform.getForwardVector().clone(),0,cameraOffsetY);
            this.startHollow(posUp);
        })

        animTask1.addEvent(1.2, () => {
            animTask1.pauseTask();

            AT_WaitTime.New(this, 3).addEndListener(() => {
                this.effectTool.stopEffect(xi);
                this.stopHollow();
                animTask1.cancelTask();

                animTask2.addEvent(1.5, () => {
                    this.effectTool.playAtPosition("151574", posUp, { scale: new Vector(15), color: new LinearColor(1, 219 / 255, 149 / 255) });
                    this.effectTool.playAtPosition("151573", posUp, { scale: new Vector(15), color: new LinearColor(1, 219 / 255, 149 / 255) });
                })

                animTask2.addEvent(1.5,()=>{
                    let arr = MathTool.checkHitByPosition(char, posUp, 600);
                    arr.forEach((chars) => {
                        let asc = chars.getComponent(AbilitySystemComponent);
                        if (asc) {
                            if (asc.hasMatchingGameTag(this.targetBlockedTags)) return
                            this.sendGameEvent(this.owner, "Event.Player.HurtMonster", { target: chars });
                            let force = chars.worldTransform.position.clone().subtract(pos).normalize().multiply(1000)
                            this.sendGameEvent(chars, "Event.Monster.OnHurtAnim", { onHurtType:"Crit",duringTime:0.5,force: force});
                            this.sendGameEvent(chars, "Event.Monster.OnHurt", { damageGE: GE_Damage_Mage_FinalThunder });
                        }
                    })
                })

                animTask2.addEvent(1.8,()=>{
                    this.rpc.client(char.player, this, this.C_ChangeCamera,char.worldTransform.getForwardVector().clone(),cameraOffsetY,0);
                    this.rpc.client(char.player, this, this.C_ChangeLight, +3.9);
                })

                animTask2.onFinished(()=>{
                    this.end();
                })

                animTask2.activate();
            }).activate();
        })

        animTask1.activate();

    }

    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        this.skillHelper.changePlayerCanMove((owner as Character).player, true);
    }

    private fun: () => void;
    startHollow(_pos: Vector) {
        let ownerChar = this.owner as Character;
        let pos = _pos.clone();
        this.fun = () => {
            let arr = MathTool.checkHitByPosition(ownerChar, pos, 500);
            arr.forEach((char) => {
                let asc = char.getComponent(AbilitySystemComponent);
                if (asc) {
                    if (asc.hasMatchingGameTag(["Club.Player"])) return
                    char.addImpulse(pos.clone().subtract(char.worldTransform.position).normalize().multiply(500), true);
                }
            })
        }
        TimeUtil.onEnterFrame.add(this.fun, this);
    }

    stopHollow() {
        TimeUtil.onEnterFrame.remove(this.fun, this);
    }


    C_ChangeLength(length: number) {
        this.cameraManager.moveCameraArmLength(length);
    }

    C_ShakeCamera(time: number, str: number) {
        this.cameraManager.shakeCamera(time, str, str, 60, 60);
    }

    C_ChangeLight(light: number) {
        let currentLight = Lighting.directionalLightIntensity;
        let change = currentLight + light;
        new Tween({ l: currentLight }).to({ l: change }, 500).onUpdate((obj) => {
            Lighting.directionalLightIntensity = obj.l;
        }).start()
    }

    C_ChangeCamera(_pos:Vector,slength:number,elength:number){ 
        this.cameraManager.mainForcusPos(_pos,slength,elength);
    }
}