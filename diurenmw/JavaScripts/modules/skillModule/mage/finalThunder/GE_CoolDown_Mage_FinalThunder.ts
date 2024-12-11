import { GameConfig } from "../../../../configs/GameConfig";
import { MPlugin } from "../../../../framework/DI/MContainer";
import { GE_CoolDownBase } from "../../cdBase/GE_CoolDownBase";

@MPlugin()
export class GE_CoolDown_Mage_FinalThunder extends GE_CoolDownBase{
    tag: string = "GE.CoolDown.Mage.FinalThunder"
    time: number = GameConfig.SkillObj.getElement(2099).cd;
}