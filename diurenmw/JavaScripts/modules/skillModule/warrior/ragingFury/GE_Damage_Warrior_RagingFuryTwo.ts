import { MPlugin } from "../../../../framework/DI/MContainer";
import { EGameModOp } from "../../../gasModule/gameAbilitys/GE/GameEffectType";
import { GameModifierInfo } from "../../../gasModule/gameAbilitys/GE/GameModifierInfo";
import { ModifierClass } from "../../../gasModule/gameAbilitys/GE/ModifierClass";
import { EMonsterAttributeSetType } from "../../../npcModule/MonsterAttributeSetType";
import { GE_Damage_Base } from "../../common/GE_Damage_Base";
import { MI_Player_Damage_ModifierClass } from "../../common/MI_Player_Damage_ModifierClass";

@MPlugin()
export class GE_Damage_Warrior_RagingFuryTwo extends GE_Damage_Base{
    public skillDamageAdd:number = 1;
    init(): void {
        super.init()
        if(this.geContext.sourceASC.hasMatchingGameTag(["Weapon.SpecialEffect.PoKong.AddRagingFuryDamage"])){
            this.skillDamageAdd = 1.2;
        }
        let modifier1 = MI_Warrior_RagingFuryTwo_GameModifiterInfo.New();
        modifier1.ownerEffect = this;
        modifier1.init();
        if(!this.modifiers){
            this.modifiers = [];
        }
        this.modifiers.push(modifier1)
    }
}

export class MI_Warrior_RagingFuryTwo_GameModifiterInfo extends GameModifierInfo{
    
    static New(): MI_Warrior_RagingFuryTwo_GameModifiterInfo {
        return new MI_Warrior_RagingFuryTwo_GameModifiterInfo();
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
        this.modifierClass = MI_Player_Damage_ModifierClass.New({id:1007,index:1,skillDamageAdd:(this.ownerEffect as GE_Damage_Warrior_RagingFuryTwo).skillDamageAdd});
    }  
}