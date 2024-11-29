import { MPlugin } from "../../../../framework/DI/MContainer";
import { EGameModOp } from "../../../gasModule/gameAbilitys/GE/GameEffectType";
import { GameModifierInfo } from "../../../gasModule/gameAbilitys/GE/GameModifierInfo";
import { ModifierClass } from "../../../gasModule/gameAbilitys/GE/ModifierClass";
import { EMonsterAttributeSetType } from "../../../robotModule/base/MonsterAttributeSetType";
import { GE_Damage_Base } from "../../common/GE_Damage_Base";
import { MI_Player_Damage_ModifierClass } from "../../common/MI_Player_Damage_ModifierClass";

@MPlugin()
export class GE_Damage_Mage_NightHollow2 extends GE_Damage_Base {
    init(): void {
        super.init();

        let modifier1 = MI_Mage_NightHollow2_GameModifiterInfo.New();
        modifier1.ownerEffect = this;
        modifier1.init();
        if (!this.modifiers) {
            this.modifiers = [];
        }
        this.modifiers.push(modifier1)
    }
}

export class MI_Mage_NightHollow2_GameModifiterInfo extends GameModifierInfo {

    static New(): MI_Mage_NightHollow2_GameModifiterInfo {
        return new MI_Mage_NightHollow2_GameModifiterInfo();
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
        this.modifierClass = MI_Player_Damage_ModifierClass.New({ id: 2009, index: 1 ,skillDamageAdd:1 , type:2});
    }
}