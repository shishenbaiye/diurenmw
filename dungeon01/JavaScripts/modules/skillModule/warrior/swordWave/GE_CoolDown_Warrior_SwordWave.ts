import { GameConfig } from "../../../../configs/GameConfig";
import { MPlugin } from "../../../../framework/DI/MContainer";
import { GE_CoolDownBase } from "../../cdBase/GE_CoolDownBase";

@MPlugin()
export class GE_CoolDown_Warrior_SwordWave extends GE_CoolDownBase{
    tag: string = "GE.CoolDown.Warrior.SwordWave";
    time: number = GameConfig.SkillObj.getElement(1005).cd;  
}