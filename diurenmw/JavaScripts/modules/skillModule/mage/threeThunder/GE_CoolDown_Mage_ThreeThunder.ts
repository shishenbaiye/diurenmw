import { GameConfig } from "../../../../configs/GameConfig";
import { MPlugin } from "../../../../framework/DI/MContainer";
import { GE_CoolDownBase } from "../../cdBase/GE_CoolDownBase";

@MPlugin()
export class GE_CoolDown_Mage_ThreeThunder extends GE_CoolDownBase{
    tag: string = "GE.CoolDown.Mage.ThreeThunder"
    time: number = GameConfig.SkillObj.getElement(2006).cd;
}