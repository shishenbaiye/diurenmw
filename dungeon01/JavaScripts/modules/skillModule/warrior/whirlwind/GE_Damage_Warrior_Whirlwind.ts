import { MPlugin } from "../../../../framework/DI/MContainer";
import { GameEffectComponent } from "../../../gasModule/gameAbilitys/GE/GameEffectComponent";
import { EGameEffectDurationType, EGameEffectCalculationType, EGameEffectPeriodicInhibitionPolicy } from "../../../gasModule/gameAbilitys/GE/GameEffectType";
import { GameModifierInfo } from "../../../gasModule/gameAbilitys/GE/GameModifierInfo";
import { GE_Damage_Base } from "../../common/GE_Damage_Base";
import { MI_Warrior_Whirlwind_GameModifiterInfo1 } from "./MI_Warrior_Whirlwind_GameModifiterInfo";

@MPlugin()
export class GE_Damage_Warrior_Whirlwind1 extends GE_Damage_Base{
    init(): void {
        super.init();

        let modifier1 = MI_Warrior_Whirlwind_GameModifiterInfo1.New();
        modifier1.ownerEffect = this;
        modifier1.init();
        if(!this.modifiers){
            this.modifiers = [];
        }
        this.modifiers.push(modifier1)
    }
}