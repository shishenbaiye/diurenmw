import { GameConfig } from "../../../../configs/GameConfig";
import { MPlugin } from "../../../../framework/DI/MContainer";
import { GE_CoolDownBase } from "../../cdBase/GE_CoolDownBase";

@MPlugin()
export class GE_CoolDown_Mage_ArcticFeast extends GE_CoolDownBase{
    tag: string = "GE.CoolDown.Mage.ArcticFeast"
    time: number = GameConfig.SkillObj.getElement(2007).cd;
}