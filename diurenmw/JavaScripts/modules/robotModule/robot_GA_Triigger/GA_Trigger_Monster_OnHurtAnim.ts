import { MPlugin } from "../../../framework/DI/MContainer";
import { Constructor } from "../../../tools/Singleton";
import { AbilitySystemComponent } from "../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { EAbilityTaskTimeType } from "../../gasModule/gameAbilitys/AT/AbilityTaskType";
import { AT_PlayAnimation } from "../../gasModule/gameAbilitys/AT/customAT/AT_PlayAnimation";
import { AT_WaitTime } from "../../gasModule/gameAbilitys/AT/customAT/AT_WaitTime";
import { GameAbility } from "../../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../../gasModule/gameAbilitys/GA/GameAbilityType";
import { CoolDownByGameEffect } from "../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { CostByGameEffect } from "../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";


@MPlugin()
export class GA_Trigger_Monster_OnHurtAnim extends GameAbility {
    tag: string = "GA.Trigger.Monster.OnHurtAnim";
    cancelTags: string[] = ["GA.Trigger.Monster.OnHurtAnim"];
    blockTags: string[];
    activationOwnedTags: string[];
    activationRequiredTags: string[];
    activationBlockedTags: string[] = ["State.Monster.Dead", "State.Monster.Stun"];
    targetRequiredTags: string[];
    targetBlockedTags: string[];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[] = [
        {
            tag: "Event.Monster.OnHurtAnim",
            sourceType: EGameAbilityTriggerSourceType.GameEvent
        }
    ]
    cd: Constructor<CoolDownByGameEffect>;
    cost: Constructor<CostByGameEffect>;
    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {

    }

    private animTask: AT_PlayAnimation;
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        if (this.payload.customData) {
            if (this.payload.customData.onHurtType) {

                if (this.payload.customData.onHurtType == "Hurt") {
                    this.playOnHurtAnim(asc, owner, target);
                }

                if (this.payload.customData.onHurtType == "Crit") {
                    this.playOnCritAnim(asc, owner, target);
                }


            } else {
                this.playOnHurtAnim(asc, owner, target);
            }
        } else {
            this.playOnHurtAnim(asc, owner, target);
        }




    }

    private playOnHurtAnim(asc: AbilitySystemComponent, owner: GameObject, target: GameObject) {
        let ownerChar = owner as Character;
        let duringTime: number;
        if (this.payload.customData) {
            duringTime = this.payload.customData.duringTime;
        }
        let anim = ownerChar.loadAnimation("285427");
        anim.blendInTime = 0;
        anim.speed = 1.2;
        anim.startTime = 0.2

        this.animTask = AT_PlayAnimation.New(this, anim, 0.5, ownerChar);
        this.animTask.activate();

        if (this.payload.customData.force) {
            ownerChar.addImpulse(this.payload.customData.force, true);
        }

        if (duringTime) {
            AT_WaitTime.New(this, 2, EAbilityTaskTimeType.Frame).addEndListener(() => {

                this.animTask.pauseTask();

                AT_WaitTime.New(this, duringTime).addEndListener(() => {
                    this.animTask.resumeTask();
                }).activate();

            }).activate();
        }
    }

    private playOnCritAnim(asc: AbilitySystemComponent, owner: GameObject, target: GameObject) {
        let ownerChar = owner as Character;
        let anim = ownerChar.loadAnimation("364448");
        anim.blendInTime = 0;
        anim.speed = 0.8;


        this.animTask = AT_PlayAnimation.New(this, anim, 1.8, ownerChar);
        this.animTask.activate();

        AT_WaitTime.New(this, 0.8).addEndListener(() => {
            console.warn("pause");
            this.animTask.pauseTask();
        }).activate();

        AT_WaitTime.New(this, 1.5).addEndListener(() => {
            console.warn("resume");
            this.animTask.resumeTask();
        }).activate();
    }

    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        this.animTask.cancelTask();
    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {

    }

}