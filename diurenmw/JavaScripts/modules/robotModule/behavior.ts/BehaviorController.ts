import { RobotObject } from "../base/RobotObject";
import { BehaviorAttack, BehaviorFollow } from "./Behavior";
import { BehaviorBase } from "./IBehavior";

export class BehaviorController {
    private list: BehaviorBase[] = [];

    public distance: number = 0;

    public constructor(public npc: Character, base: RobotObject) { }

    //重启行为树
    public reset() {
        for (let index = 0; index < this.list.length; index++) {
            const element = this.list[index];
            element.onReset();
        }
    }

    //添加行为
    public addBehavior(...behavior: BehaviorBase[]) {
        for (let index = 0; index < behavior.length; index++) {
            let entity = behavior[index];
            entity.controller = this;
            this.list.push(entity);
        }
    }

    public onUpdate(dt: number) {
        //条件检查
        for (let index = 0; index < this.list.length; index++) {
            const element = this.list[index];
            if (element.checkCondition(dt)) break;
        }
    }
}
export class SceneOneBehaviorController extends BehaviorController {

    constructor(public npc: Character, base: RobotObject) {
        super(npc, base);
        this.addBehavior(new BehaviorFollow(base, this));
        this.addBehavior(new BehaviorAttack(base, this));
    }

}