import { AbilitySystemComponent } from "../ASC/AbilitySystemComponent";
import { EGameCustomModOp } from "./GameEffectType";
import { GameModifierInfo } from "./GameModifierInfo";

export abstract class ModifierClass{
    /**计算方式 */
    abstract modifyOp:EGameCustomModOp;
    modify(sourceModifierInfo:GameModifierInfo,context:{sourceASC:AbilitySystemComponent,targetASC:AbilitySystemComponent}){
        let attr = context.targetASC.attributeSet.getAttr(sourceModifierInfo.modifierName);
        let oldValue = attr.getCurrent();
        let customValue = this.customModifyFunction(sourceModifierInfo,context);
        switch(this.modifyOp){
            case EGameCustomModOp.Add:
                context.targetASC.attributeSet.preAttributeChange(attr,oldValue+customValue);
                attr.setCurrent(oldValue+customValue);
                context.targetASC.attributeSet.postAttributeChange(attr,oldValue,oldValue+customValue);
                break;
            case EGameCustomModOp.Multiply:
                context.targetASC.attributeSet.preAttributeChange(attr,oldValue*customValue);
                attr.setCurrent(oldValue*customValue);
                context.targetASC.attributeSet.postAttributeChange(attr,oldValue,oldValue*customValue);
                break;
            case EGameCustomModOp.Divide:
                context.targetASC.attributeSet.preAttributeChange(attr,oldValue/customValue);
                attr.setCurrent(oldValue/customValue);
                context.targetASC.attributeSet.postAttributeChange(attr,oldValue,oldValue/customValue);
                break;
            case EGameCustomModOp.Subtract:
                context.targetASC.attributeSet.preAttributeChange(attr,oldValue-customValue);
                attr.setCurrent(oldValue-customValue);
                context.targetASC.attributeSet.postAttributeChange(attr,oldValue,oldValue-customValue);
                break;
            case EGameCustomModOp.Set:
                context.targetASC.attributeSet.preAttributeChange(attr,customValue);
                attr.setCurrent(customValue);
                context.targetASC.attributeSet.postAttributeChange(attr,oldValue,customValue);
                break;
        }    
    }
    abstract customModifyFunction(sourceModifierInfo:GameModifierInfo,context:{sourceASC:AbilitySystemComponent,targetASC:AbilitySystemComponent}):number;
}