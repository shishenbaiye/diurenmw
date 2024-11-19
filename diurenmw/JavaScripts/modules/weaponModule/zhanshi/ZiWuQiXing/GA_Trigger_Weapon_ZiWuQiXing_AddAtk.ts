import { MPlugin } from "../../../../framework/DI/MContainer";
import { Constructor } from "../../../../tools/Singleton";
import { PlayerAttributeSet } from "../../../AttributeModule/PlayerAttributeSet";
import { EPlayerAttributeSetType } from "../../../AttributeModule/PlayerAttributeSetType";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { AT_WaitTime } from "../../../gasModule/gameAbilitys/AT/customAT/AT_WaitTime";
import { GameAbility } from "../../../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../../../gasModule/gameAbilitys/GA/GameAbilityType";
import { CoolDownByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { CostByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";
import { GE_Damage_Weapon_ZhiYanFenTian } from "../ZhiYanFenTian/GA_Trigger_Weapon_ZhiYanFenTian";

@MPlugin()
export class GA_Trigger_Weapon_ZiWuQiXing_AddAtk extends GameAbility{
    tag: string = "GA.Trigger.Weapon.ZiWuQiXing.AddAtk";
    cancelTags: string[];
    blockTags: string[] = ["GA.Trigger.Weapon.ZiWuQiXing.AddAtk"]
    activationOwnedTags: string[] = ["GA.Trigger.Weapon.ZiWuQiXing.AddAtk"]
    activationRequiredTags: string[];
    activationBlockedTags: string[];
    targetRequiredTags: string[];
    targetBlockedTags: string[];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[] = [{
        tag:"Event.Player.HurtMonster",
        sourceType:EGameAbilityTriggerSourceType.GameEvent
    }]
    cd: Constructor<CoolDownByGameEffect>;
    cost: Constructor<CostByGameEffect>;
    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    private addAtk:number = 0;
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        if(!this.payload) return;
        let char = owner as Character;
        let customData = this.payload.customData;
        let targetChar = customData.target as Character;

        if(Math.random() > 0.05) return;
        let ownerAttr = asc.attributeSet as PlayerAttributeSet;
        this.addAtk = ownerAttr.getAttr(EPlayerAttributeSetType.atk).getCurrent() * 0.30;
        ownerAttr.getAttr(EPlayerAttributeSetType.atk).add(this.addAtk);
        AT_WaitTime.New(this,30).addEndListener(()=>{
            ownerAttr.getAttr(EPlayerAttributeSetType.atk).sub(this.addAtk);
            this.end();
        }).activate();
    }
    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }

}