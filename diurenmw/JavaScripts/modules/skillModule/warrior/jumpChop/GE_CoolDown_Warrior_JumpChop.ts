import { GameConfig } from "../../../../configs/GameConfig";
import { MPlugin } from "../../../../framework/DI/MContainer";
import { GE_CoolDownBase } from "../../cdBase/GE_CoolDownBase";


@MPlugin()
export class GE_CoolDown_Warrior_JumpChop extends GE_CoolDownBase{
    tag: string = "GE.CoolDown.Warrior.JumpChop"
    time: number = GameConfig.SkillObj.getElement(1008).cd
}