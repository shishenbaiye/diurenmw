import { MPlugin } from "../../../../framework/DI/MContainer";
import { GE_CoolDownBase } from "../../cdBase/GE_CoolDownBase";

@MPlugin()
export class GE_CoolDown_Mage_BackJump extends GE_CoolDownBase{
    tag: string = "GE.CoolDown.Mage.BackJump";
    time: number = 0.5;
}