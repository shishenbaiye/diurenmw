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


export class MI_Warrior_Whirlwind_GameModifiterInfo1 extends GameModifierInfo{

    static New(): MI_Warrior_Whirlwind_GameModifiterInfo1 {
        return new MI_Warrior_Whirlwind_GameModifiterInfo1();
    }

    modifierName: string = EMonsterAttributeSetType.hp;
    modifierOp: EGameModOp = EGameModOp.Custom;
    modifierValue: number;
    modifierClass: ModifierClass = MI_Warrior_Whirlwind_ModifierClass.New({id:1008,index:1});
    sourceMustNeedTags: string[];
    sourceMustNotNeedTags: string[];
    targetMustNeedTags: string[];
    targetMustNotNeedTags: string[];
}

export class MI_Warrior_Whirlwind_GameModifiterInfo2 extends GameModifierInfo{

    static New(): MI_Warrior_Whirlwind_GameModifiterInfo2 {
        return new MI_Warrior_Whirlwind_GameModifiterInfo2();
    }

    modifierName: string = EMonsterAttributeSetType.hp;
    modifierOp: EGameModOp = EGameModOp.Custom;
    modifierValue: number;
    modifierClass: ModifierClass = MI_Warrior_Whirlwind_ModifierClass.New({id:1008,index:2});
    sourceMustNeedTags: string[];
    sourceMustNotNeedTags: string[];
    targetMustNeedTags: string[];
    targetMustNotNeedTags: string[];
}


export class MI_Warrior_Whirlwind_GameModifiterInfo3 extends GameModifierInfo{

    static New(): MI_Warrior_Whirlwind_GameModifiterInfo3 {
        return new MI_Warrior_Whirlwind_GameModifiterInfo3();
    }

    modifierName: string = EMonsterAttributeSetType.hp;
    modifierOp: EGameModOp = EGameModOp.Custom;
    modifierValue: number;
    modifierClass: ModifierClass = MI_Warrior_Whirlwind_ModifierClass.New({id:1008,index:3});
    sourceMustNeedTags: string[];
    sourceMustNotNeedTags: string[];
    targetMustNeedTags: string[];
    targetMustNotNeedTags: string[];
}

export class MI_Warrior_Whirlwind_GameModifiterInfo4 extends GameModifierInfo{

    static New(): MI_Warrior_Whirlwind_GameModifiterInfo4 {
        return new MI_Warrior_Whirlwind_GameModifiterInfo4();
    }

    modifierName: string = EMonsterAttributeSetType.hp;
    modifierOp: EGameModOp = EGameModOp.Custom;
    modifierValue: number;
    modifierClass: ModifierClass = MI_Warrior_Whirlwind_ModifierClass.New({id:1008,index:4});
    sourceMustNeedTags: string[];
    sourceMustNotNeedTags: string[];
    targetMustNeedTags: string[];
    targetMustNotNeedTags: string[];
}

export class MI_Warrior_Whirlwind_GameModifiterInfo5 extends GameModifierInfo{

    static New(): MI_Warrior_Whirlwind_GameModifiterInfo5 {
        return new MI_Warrior_Whirlwind_GameModifiterInfo5();
    }

    modifierName: string = EMonsterAttributeSetType.hp;
    modifierOp: EGameModOp = EGameModOp.Custom;
    modifierValue: number;
    modifierClass: ModifierClass = MI_Warrior_Whirlwind_ModifierClass.New({id:1008,index:5});
    sourceMustNeedTags: string[];
    sourceMustNotNeedTags: string[];
    targetMustNeedTags: string[];
    targetMustNotNeedTags: string[];
}

export class MI_Warrior_Whirlwind_ModifierClass extends ModifierClass{

    customData:{id:number,index:number};
    static New(data:any): MI_Warrior_Whirlwind_ModifierClass {
        let obj = new MI_Warrior_Whirlwind_ModifierClass();
        obj.customData = data;
        return obj;
    }

    modifyOp: EGameCustomModOp = EGameCustomModOp.Subtract;
    customModifyFunction(sourceModifierInfo: GameModifierInfo, context: { sourceASC: AbilitySystemComponent; targetASC: AbilitySystemComponent; }): number {
        let sourceAttr = context.sourceASC.attributeSet as PlayerAttributeSet;
        let targetAttr = context.targetASC.attributeSet as MonsterAttributeSet;
        let damage = MathTool.damageFormula(1,GameConfig.SkillObj.getElement(this.customData.id).damage[this.customData.index]/100,
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