import { AbilitySystemComponent } from "../ASC/AbilitySystemComponent";
import { GameEffect } from "./GameEffect";
import { EGameModOp } from "./GameEffectType";
import { ModifierClass } from "./ModifierClass";

export abstract class GameModifierInfo{

    ownerEffect:GameEffect;
    /**属性名称 */
    abstract modifierName:string;
    /**计算方式 */
    abstract modifierOp:EGameModOp;
    /**数值 */
    abstract modifierValue:number;
    /**计算类 */
    abstract modifierClass:ModifierClass;
    /**源目标必须有的标签 */
    abstract sourceMustNeedTags:string[];
    /**源目标不能有的标签*/
    abstract sourceMustNotNeedTags:string[];
    /**目标必须有的标签 */
    abstract targetMustNeedTags:string[];
    /**目标不能有的标签 */
    abstract targetMustNotNeedTags:string[];

    init():void{}

    canApply(context:{sourceASC:AbilitySystemComponent,targetASC:AbilitySystemComponent}):boolean{
        if(!this.modifierName) return false;
        if(!context.targetASC.attributeSet || !context.targetASC.attributeSet.getAttr(this.modifierName)) return false;
        if(!this.modifierOp) return false;
        if(this.sourceMustNeedTags){
            let res = context.sourceASC.hasAllMatchingGameTags(this.sourceMustNeedTags);
            if(!res) {
                return false;
            }
        }

        if(this.sourceMustNotNeedTags){
            let res = context.sourceASC.hasMatchingGameTag(this.sourceMustNotNeedTags);
            if(res) {
                return false;
            }
        }

        if(this.targetMustNeedTags){
            let res = context.targetASC.hasAllMatchingGameTags(this.targetMustNeedTags);
            if(!res) {
                return false;
            }
        }

        if(this.targetMustNotNeedTags){
            let res = context.targetASC.hasMatchingGameTag(this.targetMustNotNeedTags);
            if(res) {
                return false;
            }
        }
        return true;
    }

    apply(context:{sourceASC:AbilitySystemComponent,targetASC:AbilitySystemComponent}):void{
        if(this.modifierOp === EGameModOp.Add){
            if(this.modifierValue){
                let oldValue = context.targetASC.attributeSet.getAttr(this.modifierName).getCurrent();
                let newValue = oldValue + this.modifierValue;
                context.targetASC.attributeSet.preAttributeChange(context.targetASC.attributeSet.getAttr(this.modifierName),newValue);
                context.targetASC.attributeSet.getAttr(this.modifierName).add(this.modifierValue);
                context.targetASC.attributeSet.postAttributeChange(context.targetASC.attributeSet.getAttr(this.modifierName),oldValue,newValue)
            }
        }
        if(this.modifierOp === EGameModOp.Multiply){
            if(this.modifierValue){
                let oldValue = context.targetASC.attributeSet.getAttr(this.modifierName).getCurrent();
                let newValue = oldValue * this.modifierValue;
                context.targetASC.attributeSet.preAttributeChange(context.targetASC.attributeSet.getAttr(this.modifierName),newValue);
                context.targetASC.attributeSet.getAttr(this.modifierName).setCurrent(newValue);
                context.targetASC.attributeSet.postAttributeChange(context.targetASC.attributeSet.getAttr(this.modifierName),oldValue,newValue)
            }
        }
        if(this.modifierOp === EGameModOp.Divide){
            if(this.modifierValue){
                let oldValue = context.targetASC.attributeSet.getAttr(this.modifierName).getCurrent();
                let newValue = oldValue / this.modifierValue;
                context.targetASC.attributeSet.preAttributeChange(context.targetASC.attributeSet.getAttr(this.modifierName),newValue);
                context.targetASC.attributeSet.getAttr(this.modifierName).setCurrent(newValue);
                context.targetASC.attributeSet.postAttributeChange(context.targetASC.attributeSet.getAttr(this.modifierName),oldValue,newValue)
            }
        }
        if(this.modifierOp === EGameModOp.Subtract){
            if(this.modifierValue){
                let oldValue = context.targetASC.attributeSet.getAttr(this.modifierName).getCurrent();
                let newValue = oldValue - this.modifierValue;
                context.targetASC.attributeSet.preAttributeChange(context.targetASC.attributeSet.getAttr(this.modifierName),newValue);
                context.targetASC.attributeSet.getAttr(this.modifierName).setCurrent(newValue);
                context.targetASC.attributeSet.postAttributeChange(context.targetASC.attributeSet.getAttr(this.modifierName),oldValue,newValue)
            }
        }
        if(this.modifierOp === EGameModOp.Set){
            if(this.modifierValue){
                let oldValue = context.targetASC.attributeSet.getAttr(this.modifierName).getCurrent();
                context.targetASC.attributeSet.preAttributeChange(context.targetASC.attributeSet.getAttr(this.modifierName),this.modifierValue);
                context.targetASC.attributeSet.getAttr(this.modifierName).setCurrent(this.modifierValue);
                context.targetASC.attributeSet.postAttributeChange(context.targetASC.attributeSet.getAttr(this.modifierName),oldValue,this.modifierValue)
            }
        }
        if(this.modifierOp === EGameModOp.Custom){
            if(this.modifierClass){
                this.modifierClass.modify(this,context);
            }
        }

    }
}