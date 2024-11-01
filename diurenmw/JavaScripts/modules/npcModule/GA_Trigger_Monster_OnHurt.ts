import { Constructor, MPlugin } from "../../framework/DI/MContainer";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { GameAbility } from "../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../gasModule/gameAbilitys/GA/GameAbilityType";
import { GameEffect } from "../gasModule/gameAbilitys/GE/GameEffect";
import { CoolDownByGameEffect } from "../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { CostByGameEffect } from "../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";
import { GE_Damage_Base } from "../skillModule/common/GE_Damage_Base";

@MPlugin()
export class GA_Trigger_Monster_OnHurt extends GameAbility {
    tag: string = "GA.Trigger.Monster.OnHurt";
    cancelTags: string[];
    blockTags: string[];
    activationOwnedTags: string[];
    activationRequiredTags: string[];
    activationBlockedTags: string[] = ["State.Monster.Dead", "State.Monster.Invincible"];
    targetRequiredTags: string[];
    targetBlockedTags: string[];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[] = [
        {
            tag: "Event.Monster.OnHurt",
            sourceType: EGameAbilityTriggerSourceType.GameEvent
        }
    ]
    cd: Constructor<CoolDownByGameEffect>;
    cost: Constructor<CostByGameEffect>;
    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {

    }
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        let ownerChar = owner as Character;
        if(!asc.hasMatchingGameTag(["State.Monster.Stun"])){
            
            let anim = ownerChar.loadAnimation("268673");
            anim.blendInTime = 0;
            anim.play();
            EffectService.playOnGameObject("13595", ownerChar, { scale: new Vector(5) })
        }
        let customData = this.payload.customData as {damageGE:Constructor<GameEffect>}
        let sourceChar = this.payload.source as Character;
        let sourceAsc = sourceChar.getComponent(AbilitySystemComponent);
        if(customData && sourceAsc){
            let res = sourceAsc.applyGameEffectToTarget(customData.damageGE,ownerChar) as GE_Damage_Base;
            if(res){
                if(res.isCrit){
                    console.log("暴击");
                    console.log("伤害值："+res.damageValue);
                }else{
                    console.log("未暴击");
                    console.log("伤害值："+res.damageValue);
                }
            }
            this.end();
        }
        
    }
    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {

    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {

    }

}