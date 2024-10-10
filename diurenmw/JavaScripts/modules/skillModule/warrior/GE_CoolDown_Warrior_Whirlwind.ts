import { MPlugin } from "../../../framework/DI/MContainer";
import { GE_CoolDownBase } from "../cdBase/GE_CoolDownBase";

@MPlugin()
export class GE_CoolDown_Warrior_Whirlwind extends GE_CoolDownBase{
    tag: string = "GE.CoolDown.Warrior.Whirlwind";
    time: number = 10;
}