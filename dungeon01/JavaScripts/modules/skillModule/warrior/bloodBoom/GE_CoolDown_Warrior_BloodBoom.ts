import { GameConfig } from "../../../../configs/GameConfig";
import { MPlugin } from "../../../../framework/DI/MContainer";
import { GE_CoolDownBase } from "../../cdBase/GE_CoolDownBase";

@MPlugin()
export class GE_CoolDown_Warrior_BloodBoom extends GE_CoolDownBase{
    tag: string = "GE.CoolDown.Warrior.BloodBoom"
    time: number = GameConfig.SkillObj.getElement(1006).cd;
}