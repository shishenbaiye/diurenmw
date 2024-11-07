import { Constructor, MPlugin } from "../../framework/DI/MContainer";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { AT_PlayAnimation } from "../gasModule/gameAbilitys/AT/customAT/AT_PlayAnimation";
import { AT_WaitTime } from "../gasModule/gameAbilitys/AT/customAT/AT_WaitTime";
import { GameAbility } from "../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../gasModule/gameAbilitys/GA/GameAbilityType";
import { GameEffect } from "../gasModule/gameAbilitys/GE/GameEffect";
import { CoolDownByGameEffect } from "../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { CostByGameEffect } from "../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";
import { GE_Damage_Base } from "../skillModule/common/GE_Damage_Base";

@MPlugin()
export class GA_Trigger_Monster_OnHurtAnim extends GameAbility {
    tag: string = "GA.Trigger.Monster.OnHurtAnim";
    cancelTags: string[] = ["GA.Trigger.Monster.OnHurtAnim"];
    blockTags: string[];
    activationOwnedTags: string[];
    activationRequiredTags: string[];
    activationBlockedTags: string[] = ["State.Monster.Dead","State.Monster.Stun"];
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

    private animTask:AT_PlayAnimation;
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        let ownerChar = owner as Character;
        let duringTime:number;
        if(this.payload.customData){
            duringTime = this.payload.customData.duringTime;
        }
        console.log("duringTime:"+duringTime);

        let anim = ownerChar.loadAnimation("285427");
        anim.blendInTime = 0;
        
        this.animTask = AT_PlayAnimation.New(this,anim,0.5,ownerChar);
        this.animTask.activate();

        if(duringTime){
            AT_WaitTime.New(this,0.2).addEndListener(()=>{
                console.warn("pause");
                this.animTask.pauseTask();
            }).activate();

            AT_WaitTime.New(this,duringTime).addEndListener(()=>{
                console.warn("resume");
                this.animTask.resumeTask();
            }).activate();
        }
        
        
    }
    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        this.animTask.cancelTask();
    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        
    }

}