import { GameConfig } from "../../../configs/GameConfig";
import { MathTool } from "../../../tools/MathTool";
import { PlayerAttributeSet } from "../../AttributeModule/PlayerAttributeSet";
import { EPlayerAttributeSetType } from "../../AttributeModule/PlayerAttributeSetType";
import { AbilitySystemComponent } from "../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { EGameCustomModOp } from "../../gasModule/gameAbilitys/GE/GameEffectType";
import { GameModifierInfo } from "../../gasModule/gameAbilitys/GE/GameModifierInfo";
import { ModifierClass } from "../../gasModule/gameAbilitys/GE/ModifierClass";
import { MonsterAttributeSet } from "../../robotModule/base/MonsterAttributeSet";
import { EMonsterAttributeSetType } from "../../robotModule/base/MonsterAttributeSetType";
import { GE_Damage_Base } from "./GE_Damage_Base";

export class MI_Player_Damage_ModifierClass extends ModifierClass {

    customData: { id: number, index: number, skillDamageAdd?: number , type?:number};
    static New(data: any): MI_Player_Damage_ModifierClass {
        let obj = new MI_Player_Damage_ModifierClass();
        obj.customData = data;
        return obj;
    }

    modifyOp: EGameCustomModOp = EGameCustomModOp.Subtract;
    customModifyFunction(sourceModifierInfo: GameModifierInfo, context: { sourceASC: AbilitySystemComponent; targetASC: AbilitySystemComponent; }): number {
        if(!this.customData.type){
            this.customData.type = 1;
        }
        let sourceAttr = context.sourceASC.attributeSet as PlayerAttributeSet;
        let targetAttr = context.targetASC.attributeSet as MonsterAttributeSet;
        let damage = MathTool.damageFormula(this.customData.type, GameConfig.SkillObj.getElement(this.customData.id).damage[this.customData.index] / 100 * (this.customData.skillDamageAdd || 1),
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