import { GameEffect } from "../../gasModule/gameAbilitys/GE/GameEffect";
import { GameEffectComponent } from "../../gasModule/gameAbilitys/GE/GameEffectComponent";
import { EGameEffectDurationType, EGameEffectCalculationType, EGameEffectPeriodicInhibitionPolicy } from "../../gasModule/gameAbilitys/GE/GameEffectType";
import { GameModifierInfo } from "../../gasModule/gameAbilitys/GE/GameModifierInfo";

export class GE_Damage_Base extends GameEffect{
    durationPolicy: EGameEffectDurationType = EGameEffectDurationType.Instant;
    durationCalculationType: EGameEffectCalculationType;
    duration: number;
    period: number;
    periodInstant: boolean;
    periodicInhibitionPolicy: EGameEffectPeriodicInhibitionPolicy;
    geComponent: GameEffectComponent[];
    modifiers: GameModifierInfo[] = []
    
    damageValue:number = 0;
    isCrit: boolean = false;
}