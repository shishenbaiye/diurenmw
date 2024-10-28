import { MPlugin } from "../../../../framework/DI/MContainer";
import { GameEffect } from "../../../gasModule/gameAbilitys/GE/GameEffect";
import { GameEffectComponent } from "../../../gasModule/gameAbilitys/GE/GameEffectComponent";
import { EGameEffectDurationType, EGameEffectCalculationType, EGameEffectPeriodicInhibitionPolicy } from "../../../gasModule/gameAbilitys/GE/GameEffectType";
import { GameModifierInfo } from "../../../gasModule/gameAbilitys/GE/GameModifierInfo";
import { MI_Warrior_Whirlwind_GameModifiterInfo } from "./MI_Warrior_Whirlwind_GameModifiterInfo";

@MPlugin()
export class GE_Damage_Warrior_Whirlwind extends GameEffect{
    durationPolicy: EGameEffectDurationType = EGameEffectDurationType.Instant;
    durationCalculationType: EGameEffectCalculationType;
    duration: number;
    period: number;
    periodInstant: boolean;
    periodicInhibitionPolicy: EGameEffectPeriodicInhibitionPolicy;
    geComponent: GameEffectComponent[];
    modifiers: GameModifierInfo[] = [MI_Warrior_Whirlwind_GameModifiterInfo.New()]
    
    init(): void {
        super.init();
    }
}