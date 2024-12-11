import { BehaviorBase } from "./IBehavior";

//跟随行为
export class BehaviorFollow extends BehaviorBase {
    checkCondition(dt: number): boolean {
        //TODO 跟随条件满足
        if (this.owner.controller_move) {
            this.owner.controller_move.followStart(null, 400);
        }
        return true;
    }
}

//攻击行为
export class BehaviorAttack extends BehaviorBase {
    checkCondition(dt: number): boolean {
        //TODO 攻击条件满足
        if (this.owner.controller_move) {
            this.owner.controller_move.followStop();
            //开始攻击
        }
        return true;
    }
}
