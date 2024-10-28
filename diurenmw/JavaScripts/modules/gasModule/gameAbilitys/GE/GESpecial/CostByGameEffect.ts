import { AttributeSet } from "../../AS/AttributeSet";
import { GameEffect } from "../GameEffect";
import { GameEffectComponent } from "../GameEffectComponent";
import { EGameEffectDurationType, EGameEffectCalculationType, EGameEffectPeriodicInhibitionPolicy } from "../GameEffectType";
import { GameModifierInfo } from "../GameModifierInfo";

export abstract class CostByGameEffect extends GameEffect {

    /**消耗的属性名 */
    abstract costAttr:string;

    /**消耗值 */
    abstract costValue:number;


    durationPolicy: EGameEffectDurationType = EGameEffectDurationType.Instant;
    durationCalculationType: EGameEffectCalculationType = EGameEffectCalculationType.FixedValue;
    duration: number;
    period: number;
    periodInstant: boolean;
    periodicInhibitionPolicy: EGameEffectPeriodicInhibitionPolicy;
    geComponent: GameEffectComponent[];
    modifiers: GameModifierInfo[];
    
    init(){
       super.init();
    }

    canCost(attribute:AttributeSet):boolean{
        if(!this.costAttr){
            return true;
        }

        if(!this.costValue){
            return true;
        }


        let costAttrData = attribute.getAttr(this.costAttr);
        if(costAttrData){
            if(costAttrData.getCurrent() >= this.costValue){
                return true;
            }else{
                console.warn(`属性${this.costAttr}值不足`)
                return false;
            }
        }else{
            console.warn(`属性${this.costAttr}不存在`)
            return false;
        }     
    }
    
    apply(){
        super.apply();
        let costAttrData = this.geContext.sourceASC.attributeSet.getAttr(this.costAttr);
        if(costAttrData){
            costAttrData.sub(this.costValue);
        }
    }
}