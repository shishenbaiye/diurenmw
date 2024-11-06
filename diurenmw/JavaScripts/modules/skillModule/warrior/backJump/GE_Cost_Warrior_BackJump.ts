import { MPlugin } from "../../../../framework/DI/MContainer";
import { EPlayerAttributeSetType } from "../../../AttributeModule/PlayerAttributeSetType";
import { CostByGameEffect } from "../../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";

@MPlugin()
export class GE_Cost_Warrior_BackJump extends CostByGameEffect{
    costAttr: string = EPlayerAttributeSetType.mp;
    costValue: number = 10;
}