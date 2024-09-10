import { AbilitySystemComponent } from "../ASC/AbilitySystemComponent";

export abstract class GameEffectComponent{
    abstract init():void;
    abstract canApply(context:{sourceASC:AbilitySystemComponent,targetASC:AbilitySystemComponent}): boolean;
    abstract active(context:{sourceASC:AbilitySystemComponent,targetASC:AbilitySystemComponent}):void;
    abstract end(context:{sourceASC:AbilitySystemComponent,targetASC:AbilitySystemComponent}):void;
    abstract update(dt:number):void;
}