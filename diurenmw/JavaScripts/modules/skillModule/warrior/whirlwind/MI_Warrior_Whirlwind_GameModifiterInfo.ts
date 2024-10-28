import { GameConfig } from "../../../../configs/GameConfig";
import { MathTool } from "../../../../tools/MathTool";
import { PlayerAttributeSet } from "../../../AttributeModule/PlayerAttributeSet";
import { EPlayerAttributeSetType } from "../../../AttributeModule/PlayerAttributeSetType";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { EGameCustomModOp, EGameModOp } from "../../../gasModule/gameAbilitys/GE/GameEffectType";
import { GameModifierInfo } from "../../../gasModule/gameAbilitys/GE/GameModifierInfo";
import { ModifierClass } from "../../../gasModule/gameAbilitys/GE/ModifierClass";
import { MonsterAttributeSet } from "../../../npcModule/MonsterAttributeSet";
import { EMonsterAttributeSetType } from "../../../npcModule/MonsterAttributeSetType";


export class MI_Warrior_Whirlwind_GameModifiterInfo extends GameModifierInfo{

    static New(): MI_Warrior_Whirlwind_GameModifiterInfo {
        return new MI_Warrior_Whirlwind_GameModifiterInfo();
    }

    modifierName: string = EMonsterAttributeSetType.hp;
    modifierOp: EGameModOp = EGameModOp.Custom;
    modifierValue: number;
    modifierClass: ModifierClass = MI_Warrior_Whirlwind_ModifierClass.New();
    sourceMustNeedTags: string[];
    sourceMustNotNeedTags: string[];
    targetMustNeedTags: string[];
    targetMustNotNeedTags: string[];
}

export class MI_Warrior_Whirlwind_ModifierClass extends ModifierClass{

    static New(): MI_Warrior_Whirlwind_ModifierClass {
        return new MI_Warrior_Whirlwind_ModifierClass();
    }

    modifyOp: EGameCustomModOp = EGameCustomModOp.Subtract;
    customModifyFunction(sourceModifierInfo: GameModifierInfo, context: { sourceASC: AbilitySystemComponent; targetASC: AbilitySystemComponent; }): number {
        let sourceAttr = context.sourceASC.attributeSet as PlayerAttributeSet;
        let targetAttr = context.targetASC.attributeSet as MonsterAttributeSet;
        let damage = MathTool.damageFormula(1,GameConfig.SkillObj.getElement(1001).damage[0]/100,
            sourceAttr.getAttr(EPlayerAttributeSetType.atk).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.matk).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.str).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.int).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.damage).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.skillDamage).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.crit).getCurrent(),
            sourceAttr.getAttr(EPlayerAttributeSetType.critDamage).getCurrent()        
        )

        let finalDamage = MathTool.calculateActualDamage(damage,
            targetAttr.getAttr(EMonsterAttributeSetType.def).getCurrent(),
            targetAttr.getAttr(EMonsterAttributeSetType.level).getCurrent()
        );
        console.warn("造成伤害",finalDamage);
        return finalDamage;
    }
    
}