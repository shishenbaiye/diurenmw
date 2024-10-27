import { MPlugin } from "../../../framework/DI/MContainer";
import { CostByGameEffect } from "../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";

@MPlugin()
export class GE_Cost_Warrior_Whirlwind extends CostByGameEffect{
    costAttr: string = "mp";
    costValue: number = 60;
}