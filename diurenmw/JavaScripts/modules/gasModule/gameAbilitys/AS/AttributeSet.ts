import { AbilitySystemComponent } from "../ASC/AbilitySystemComponent";
import { AttributeSetData } from "./AttributeSetData";

@Component
export abstract class AttributeSet extends Script{
    

    protected ownerAsc:AbilitySystemComponent;
    bindAbilitySystemComponent(asc:AbilitySystemComponent){
        this.ownerAsc = asc;
    }
    /**属性修改前回调 */
    abstract preAttributeChange(attribute:AttributeSetData,newValue:number): void;
    /**属性修改后回调 */
    abstract postAttributeChange(attribute:AttributeSetData,oldValue:number,newValue:number): void;
}