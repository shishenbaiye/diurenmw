import { Constructor, MPlugin } from "../../../framework/DI/MContainer";
import { AbilitySystemComponent } from "../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { GameAbility } from "../../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../../gasModule/gameAbilitys/GA/GameAbilityType";
import { CoolDownByGameEffect } from "../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { CostByGameEffect } from "../../gasModule/gameAbilitys/GE/GESpecial/CostByGameEffect";

@MPlugin()
export class GA_Trigger_NotFullMp extends GameAbility{
    tag: string = "GA.Trigger.NotFullMp";
    cancelTags: string[];
    blockTags: string[];
    activationOwnedTags: string[];
    activationRequiredTags: string[];
    activationBlockedTags: string[];
    targetRequiredTags: string[];
    targetBlockedTags: string[];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[] = [
        {
            tag:"State.Mp.NotFull",
            sourceType:EGameAbilityTriggerSourceType.OwnedTagPresent
        }
    ]
    cd: Constructor<CoolDownByGameEffect>;
    cost: Constructor<CostByGameEffect>;
    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        
    }
    private idd:number;
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        this.idd = setInterval(()=>{
            if(asc.attributeSet){
                let currentMp = asc.attributeSet.getAttr("mp").getCurrent();
                let currentMaxMp = asc.attributeSet.getAttr("maxMp").getCurrent();
                if(currentMp < currentMaxMp){
                    let subMp = currentMaxMp - currentMp;
                    if(subMp >= 1){
                        asc.attributeSet.getAttr("mp").add(1);
                    }else{
                        asc.attributeSet.getAttr("mp").add(subMp);
                    }
                }else{
                    console.log(`已经满了`);
                }
            }
        },100)  
    }
    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
       
    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        if(this.idd){
            clearInterval(this.idd);
        }
    }
    
}