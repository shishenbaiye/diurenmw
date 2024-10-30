import { MPlugin } from "../../../../framework/DI/MContainer";
import { GameEffect } from "../../../gasModule/gameAbilitys/GE/GameEffect";
import { GameEffectComponent } from "../../../gasModule/gameAbilitys/GE/GameEffectComponent";
import { EGameEffectDurationType, EGameEffectCalculationType, EGameEffectPeriodicInhibitionPolicy } from "../../../gasModule/gameAbilitys/GE/GameEffectType";
import { GameModifierInfo } from "../../../gasModule/gameAbilitys/GE/GameModifierInfo";
import { MI_Warrior_Whirlwind_GameModifiterInfo1, MI_Warrior_Whirlwind_GameModifiterInfo2, MI_Warrior_Whirlwind_GameModifiterInfo3, MI_Warrior_Whirlwind_GameModifiterInfo4, MI_Warrior_Whirlwind_GameModifiterInfo5 } from "./MI_Warrior_Whirlwind_GameModifiterInfo";

@MPlugin()
export class GE_Damage_Warrior_Whirlwind1 extends GameEffect{
    durationPolicy: EGameEffectDurationType = EGameEffectDurationType.Instant;
    durationCalculationType: EGameEffectCalculationType;
    duration: number;
    period: number;
    periodInstant: boolean;
    periodicInhibitionPolicy: EGameEffectPeriodicInhibitionPolicy;
    geComponent: GameEffectComponent[];
    modifiers: GameModifierInfo[] = [MI_Warrior_Whirlwind_GameModifiterInfo1.New()]
    
    init(): void {
        super.init();
    }
}

@MPlugin()
export class GE_Damage_Warrior_Whirlwind2 extends GameEffect{
    durationPolicy: EGameEffectDurationType = EGameEffectDurationType.Instant;
    durationCalculationType: EGameEffectCalculationType;
    duration: number;
    period: number;
    periodInstant: boolean;
    periodicInhibitionPolicy: EGameEffectPeriodicInhibitionPolicy;
    geComponent: GameEffectComponent[];
    modifiers: GameModifierInfo[] = [MI_Warrior_Whirlwind_GameModifiterInfo2.New()]
    
    init(): void {
        super.init();
    }
}

@MPlugin()
export class GE_Damage_Warrior_Whirlwind3 extends GameEffect{
    durationPolicy: EGameEffectDurationType = EGameEffectDurationType.Instant;
    durationCalculationType: EGameEffectCalculationType;
    duration: number;
    period: number;
    periodInstant: boolean;
    periodicInhibitionPolicy: EGameEffectPeriodicInhibitionPolicy;
    geComponent: GameEffectComponent[];
    modifiers: GameModifierInfo[] = [MI_Warrior_Whirlwind_GameModifiterInfo3.New()]
    
    init(): void {
        super.init();
    }
}

@MPlugin()
export class GE_Damage_Warrior_Whirlwind4 extends GameEffect{
    durationPolicy: EGameEffectDurationType = EGameEffectDurationType.Instant;
    durationCalculationType: EGameEffectCalculationType;
    duration: number;
    period: number;
    periodInstant: boolean;
    periodicInhibitionPolicy: EGameEffectPeriodicInhibitionPolicy;
    geComponent: GameEffectComponent[];
    modifiers: GameModifierInfo[] = [MI_Warrior_Whirlwind_GameModifiterInfo4.New()]
    
    init(): void {
        super.init();
    }
}

@MPlugin()
export class GE_Damage_Warrior_Whirlwind5 extends GameEffect{
    durationPolicy: EGameEffectDurationType = EGameEffectDurationType.Instant;
    durationCalculationType: EGameEffectCalculationType;
    duration: number;
    period: number;
    periodInstant: boolean;
    periodicInhibitionPolicy: EGameEffectPeriodicInhibitionPolicy;
    geComponent: GameEffectComponent[];
    modifiers: GameModifierInfo[] = [MI_Warrior_Whirlwind_GameModifiterInfo5.New()]
    
    init(): void {
        super.init();
    }
}