import { IEntityBase } from "../entity/IEntityBase";

/** 接口 */
export interface IBehavior {
    owner: any;
    /** 当这个行为成立的时候不会去执行下个行为 */
    checkCondition(dt: number): boolean;
    /** 重启行为树 */
    onReset();
}
/** 基类 */
export abstract class BaseBehavior implements IBehavior {

    public controller: BehaviorController

    public constructor(public owner: any) { }

    public onReset() { }

    abstract checkCondition(dt: number): boolean;
}
/** 控制类 */
export class BehaviorController {
    /** 行为数组 */
    private _behaviorList: BaseBehavior[] = [];
    /** 控制者 */
    private _owner: IEntityBase;

    public distance: number = 0;

    public isInFollowing: boolean = false;
    public isInCatching: boolean = false;

    public constructor(owner: IEntityBase) {
        this._owner = owner;
    }

    public reset() {
        for (let index = 0; index < this._behaviorList.length; index++) {
            const element = this._behaviorList[index];
            element.onReset();
        }
        this.isInFollowing = false;
        this.isInCatching = false;
    }

    public addBehavior(...behavior: BaseBehavior[]) {
        for (let index = 0; index < behavior.length; index++) {
            let entity = behavior[index];
            entity.controller = this;
            this._behaviorList.push(entity);
        }
    }

    onUpdate(dt: number) {
        let char = this._owner.target();
        this.distance = Vector.distance(this._owner.self().worldTransform.position, char.worldTransform.position);
        this._owner.fightBase.exitMap.forEach((v, k) => {
            v -= dt;
            this._owner.fightBase.exitMap.set(k, v)
        })
        for (let index = 0; index < this._behaviorList.length; index++) {
            const element = this._behaviorList[index];
            if (element.checkCondition(dt)) {
                break;
            }
        }
    }
};