
import { MPlugin } from "../../../../framework/DI/MContainer";
import { MFramework } from "../../../../framework/MFramework";
import { MObject } from "../../../../framework/Object/MObject";
import { AbilitySystemComponent } from "../ASC/AbilitySystemComponent";
import { Payload } from "./Payload";

@MPlugin()
export class GameEvent extends MObject{
    protected init(): void {
        
    }


    static createEvent(){
        return MFramework.createObject(GameEvent) as GameEvent;
    }


    private tag:string;
    private target:GameObject;
    private payload:Payload;

    send(tag:string,source:GameObject,target:GameObject,payload:Payload){
        this.tag = tag;
        this.target = target;
        payload.target = this.target;
        payload.source = source;
        payload.eventTag = this.tag;
        this.payload = payload;

        if(this.tag && this.target){
            let asc:AbilitySystemComponent = this.target.getComponent(AbilitySystemComponent);
            if(asc){
                asc.onGameEventAction.call(this.tag,this.payload);
            }
        }
    }
}