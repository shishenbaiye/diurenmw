import { Constructor, MPlugin } from "../../../../framework/DI/MContainer";
import { MathTool } from "../../../../tools/MathTool";
import { PlayerAttributeSet } from "../../../AttributeModule/PlayerAttributeSet";
import { EPlayerAttributeSetType } from "../../../AttributeModule/PlayerAttributeSetType";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { GameAbility } from "../../../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../../../gasModule/gameAbilitys/GA/GameAbilityType";
import { EGameModOp, EGameCustomModOp } from "../../../gasModule/gameAbilitys/GE/GameEffectType";
import { GameModifierInfo } from "../../../gasModule/gameAbilitys/GE/GameModifierInfo";
import { CoolDownByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { CostByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";
import { ModifierClass } from "../../../gasModule/gameAbilitys/GE/ModifierClass";
import { MonsterAttributeSet } from "../../../npcModule/MonsterAttributeSet";
import { EMonsterAttributeSetType } from "../../../npcModule/MonsterAttributeSetType";
import { GE_Damage_Base } from "../../../skillModule/common/GE_Damage_Base";

@MPlugin()
export class GA_Trigger_Weapon_ZhiYanFenTian extends GameAbility{
    tag: string = "GA.Trigger.Weapon.ZhiYanFenTian";
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
        if(Math.random() > 0.05) return;
        let targetAsc = targetChar.getComponent(AbilitySystemComponent);


        if(targetAsc.hasMatchingGameTag(this.targetBlockedTags)) return;
        this.sendGameEvent(targetChar,"Event.Monster.OnHurt",{damageGE:GE_Damage_Weapon_ZhiYanFenTian});
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
export class GE_Damage_Weapon_ZhiYanFenTian extends GE_Damage_Base{
    init(): void {
        super.init();

        let modifier1 = MI_Weapon_ZhiYanFenTian_GameModifiterInfo.New();
        modifier1.ownerEffect = this;
        modifier1.init();
        if(!this.modifiers){
            this.modifiers = [];
        }
        this.modifiers.push(modifier1)
    }
}

export class MI_Weapon_ZhiYanFenTian_GameModifiterInfo extends GameModifierInfo{
    
    static New(): MI_Weapon_ZhiYanFenTian_GameModifiterInfo {
        return new MI_Weapon_ZhiYanFenTian_GameModifiterInfo();
    }

    modifierName: string = EMonsterAttributeSetType.hp;
    modifierOp: EGameModOp = EGameModOp.Custom;
    modifierValue: number;
    modifierClass: ModifierClass;
    sourceMustNeedTags: string[];
    sourceMustNotNeedTags: string[];
    targetMustNeedTags: string[];
    targetMustNotNeedTags: string[];

    init(): void {
        this.modifierClass = MI_Weapon_ZhiYanFenTian_ModifierClass.New({value:1200});
    }
    
}


export class MI_Weapon_ZhiYanFenTian_ModifierClass extends ModifierClass{

    customData:{value:number};
    static New(data:any): MI_Weapon_ZhiYanFenTian_ModifierClass {
        let obj = new MI_Weapon_ZhiYanFenTian_ModifierClass();
        obj.customData = data;
        return obj;
    }

    modifyOp: EGameCustomModOp = EGameCustomModOp.Subtract;
    customModifyFunction(sourceModifierInfo: GameModifierInfo, context: { sourceASC: AbilitySystemComponent; targetASC: AbilitySystemComponent; }): number {
        let sourceAttr = context.sourceASC.attributeSet as PlayerAttributeSet;
        let targetAttr = context.targetASC.attributeSet as MonsterAttributeSet;
        let damage = MathTool.damageFormula(1,this.customData.value/100,
            sourceAttr.getAttr(EPlayerAttributeSetType.atk).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.matk).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.str).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.int).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.damage).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.skillDamage).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.crit).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.critDamage).getCurrent()        
        )

        let finalDamage = MathTool.calculateActualDamage(damage.damage,
            targetAttr.getAttr(EMonsterAttributeSetType.def).getCurrent(),
            targetAttr.getAttr(EMonsterAttributeSetType.level).getCurrent()
        );
        (sourceModifierInfo.ownerEffect as GE_Damage_Base).isCrit = damage.isCrit;
        (sourceModifierInfo.ownerEffect as GE_Damage_Base).damageValue = finalDamage;
        return finalDamage;
    }
    
}