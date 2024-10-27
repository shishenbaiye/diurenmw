import { IBehavior } from "../interface/IBehavior";
import { BehaviorController } from "./BehaviorController";

export abstract class Behavior implements IBehavior {

    public controller: BehaviorController

    constructor(public owner: INpcClientCtrlBase) { }

    abstract checkCondition(dt: number): boolean;

    abstract onReset()

    public setFollow(isFollow: boolean, stopDistance: number = 30) {
        if (isFollow == this.controller.isInFollowing) {
            return;
        }
        if (isFollow) {
            this.owner.npcCom.startFollow(stopDistance);
        }
        else {
            // console.log("stopFollow")
            this.owner.npcCom.stopFollow()
        }
        this.controller.isInFollowing = isFollow;
    }

    /**
     * 
     * @param exitType 
     * @returns 
     */
    protected checkExitCd(exitType: NpcExitType): boolean {
        if (this.controller.exitCdMap.has(exitType)) {
            //console.log(exitType + "exitType" + this.controller.exitCdMap.get(exitType))
            return this.controller.exitCdMap.get(exitType) <= 0;
        }
        else {
            return true;
        }
    }


}