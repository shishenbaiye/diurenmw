import { GameEffect } from "../GameEffect";
import { GameEffectComponent } from "../GameEffectComponent";
import { EGameEffectDurationType, EGameEffectCalculationType, EGameEffectPeriodicInhibitionPolicy } from "../GameEffectType";
import { BlockAbilityWithTag } from "../GEComponet/BlockAbilityWithTag";

export abstract class CoolDownByGameEffect extends GameEffect{
    /**冷却tag */
    abstract tag: string;
    /**冷却cd时长 */
    abstract time: number;

    durationPolicy: EGameEffectDurationType = EGameEffectDurationType.HasDuration;
    durationCalculationType: EGameEffectCalculationType = EGameEffectCalculationType.FixedValue;
    duration: number;
    period: number;
    periodInstant: boolean;
    periodicInhibitionPolicy: EGameEffectPeriodicInhibitionPolicy;
    geComponent: GameEffectComponent[] = [];
    geAttribute: { [key: string]: number; }[];
    
    init(){
        if(this.time){
            this.duration = this.time;
        }else{
            this.duration = 0;
        }
        let cdComponent = BlockAbilityWithTag.create([this.tag]);
        this.geComponent.push(cdComponent);
        super.init();
    }
}