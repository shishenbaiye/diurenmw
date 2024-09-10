import { MPlugin } from "../../../../framework/DI/MContainer";
import { MFramework } from "../../../../framework/MFramework";
import { MObject } from "../../../../framework/Object/MObject";
import { GameAbility } from "../GA/GameAbility";

@MPlugin()
export class Payload extends MObject{
    protected init(): void {
        
    }
    static createPayload(){
        return MFramework.createObject(Payload) as Payload;
    }
    /**发送的tag */
    eventTag:string;

    /**发送人 */
    source:GameObject;

    /**接收人 */
    target:GameObject;

    /**触发事件的能力 */
    ability:GameAbility;

    /**事件发生的位置*/
    eventMagnitude:Vector;

    /**其他自定义数据 */
    customData:any;
}