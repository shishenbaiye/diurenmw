import { GameConfig } from "../../../../configs/GameConfig";
import { MPlugin } from "../../../../framework/DI/MContainer";
import { EPlayerAttributeSetType } from "../../../AttributeModule/PlayerAttributeSetType";
import { CostByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";

@MPlugin()
export class GE_Cost_Warrior_SwordWave extends CostByGameEffect {
    costAttr = EPlayerAttributeSetType.mp;
    costValue = GameConfig.SkillObj.getElement(1005).cost;
}