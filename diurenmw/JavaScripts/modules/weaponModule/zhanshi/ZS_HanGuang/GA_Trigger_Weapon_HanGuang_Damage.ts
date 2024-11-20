import { Constructor, MPlugin } from "../../../../framework/DI/MContainer";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { GameAbility } from "../../../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../../../gasModule/gameAbilitys/GA/GameAbilityType";
import { EGameModOp } from "../../../gasModule/gameAbilitys/GE/GameEffectType";
import { GameModifierInfo } from "../../../gasModule/gameAbilitys/GE/GameModifierInfo";
import { CoolDownByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { CostByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";
import { ModifierClass } from "../../../gasModule/gameAbilitys/GE/ModifierClass";
import { EMonsterAttributeSetType } from "../../../npcModule/MonsterAttributeSetType";
import { GE_Damage_Base } from "../../../skillModule/common/GE_Damage_Base";

@MPlugin()
export class GA_Trigger_Weapon_HanGuang_Damage extends GameAbility{
    tag: string = "GA.Trigger.Weapon.HanGuang.Damage";
    cancelTags: string[];
    blockTags: string[];
    activationOwnedTags: string[];
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
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        if(!this.payload) return;
        let char = owner as Character;
        let customData = this.payload.customData;
        let targetChar = customData.target as Character;
        // 计算概率，百分之10的概率触发
        if(Math.random() > 0.03) return;
        this.sendGameEvent(targetChar,"Event.Monster.OnHurt",{damageGE:GE_Damage_Weapon_HanGuangSword})
        this.end();
    }
    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
}

@MPlugin()
export class GE_Damage_Weapon_HanGuangSword extends GE_Damage_Base{
    init(): void {
        super.init();

        let modifier1 = MI_Weapon_HanGuangSword_GameModifiterInfo.New();
        modifier1.ownerEffect = this;
        modifier1.init();
        if(!this.modifiers){
            this.modifiers = [];
        }
        this.modifiers.push(modifier1)
    }
}

export class MI_Weapon_HanGuangSword_GameModifiterInfo extends GameModifierInfo{
    
    static New(): MI_Weapon_HanGuangSword_GameModifiterInfo {
        return new MI_Weapon_HanGuangSword_GameModifiterInfo();
    }

    modifierName: string = EMonsterAttributeSetType.hp;
    modifierOp: EGameModOp = EGameModOp.Subtract;
    modifierValue: number = 1500;
    modifierClass: ModifierClass;
    sourceMustNeedTags: string[];
    sourceMustNotNeedTags: string[];
    targetMustNeedTags: string[];
    targetMustNotNeedTags: string[];  
}
