import { RobotObject } from "../base/RobotObject";
import { BehaviorController } from "./BehaviorController";

export interface IBehavior {
    owner: any;
    /** 当这个行为成立的时候不会去执行下个行为 */
    checkCondition(dt: number): boolean;
    /** 重启行为树 */
    onReset();
}

export abstract class BehaviorBase implements IBehavior {
    public constructor(public owner: RobotObject, public controller: BehaviorController) { }

    public onReset() { }

    abstract checkCondition(dt: number): boolean;
}