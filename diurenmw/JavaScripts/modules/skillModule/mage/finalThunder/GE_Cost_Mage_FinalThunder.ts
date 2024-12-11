import { GameConfig } from "../../../../configs/GameConfig";
import { MPlugin } from "../../../../framework/DI/MContainer";
import { EPlayerAttributeSetType } from "../../../AttributeModule/PlayerAttributeSetType";
import { CostByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";

@MPlugin()
export class GE_Cost_Mage_FinalThunder extends CostByGameEffect{
    costAttr: string = EPlayerAttributeSetType.mp;
    costValue: number = GameConfig.SkillObj.getElement(2099).cost
}