import { GameConfig } from "../../../../configs/GameConfig";
import { MPlugin } from "../../../../framework/DI/MContainer";
import { GE_CoolDownBase } from "../../cdBase/GE_CoolDownBase";

@MPlugin()
export class GE_CoolDown_Warrior_RagingFury extends GE_CoolDownBase{
    tag: string = "GE.CoolDown.Warrior.RagingFury"
    time: number = GameConfig.SkillObj.getElement(1007).cd
}