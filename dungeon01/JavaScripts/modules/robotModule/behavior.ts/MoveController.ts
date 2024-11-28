export const stopDis: number = 50
export class MoveController {

    protected path_index: number = 0;
    protected path_list: Vector[] = [];

    protected temp_list: number[] = [];
    protected temp_vec: Vector = Vector.zero;

    private time_follow: number = 0;
    private follow_target: mw.Character;
    private follow_stopDis: number;

    private target_pos: Vector = null;
    private target_stopDis: number = 0;

    constructor(protected _npc: mw.Character) { }

    protected get nextPoint(): Vector {
        if (this.path_index >= this.path_list.length)
            return null;
        return this.path_list[this.path_index];
    }

    public initPath(points: Vector[]) {
        this.path_index = 0;
        this.path_list = points.slice(0);
    }

    public updatePath(dt: number) {
        if (this.follow_target && this.follow_target.worldTransform) {
            this.time_follow += dt;
            if (this.time_follow < 0.2) return;
            this.time_follow = 0;
            this.followUpdate();
        } else {
            this.time_follow += dt;
            if (this.time_follow < 0.5) return;
            this.time_follow = 0;
            this.follow_target = null;
            this.hangUpdate();
        }
    }

    //下一个路径点
    public findNearIndex() {
        this.path_index = 0;
        let curPos = this.temp_vec.set(this._npc.worldTransform.position);
        let minDis = Vector.squaredDistance(curPos, this.path_list[0]);
        for (let index = 1; index < this.path_list.length; index++) {
            const element = this.path_list[index];
            let dis = Vector.squaredDistance(curPos, element);
            if (dis < minDis) {
                this.path_index = index;
            }
        }
        this.stopFollow();
        this.startMove();

    }

    //重置出生点
    public resetRobotPos() {
        //随机点位
        const pos = Vector.zero;
        let offset = Vector.forward.multiply(200);
        // 设置位置偏移，防止重合
        this._npc.worldTransform.position = offset.add(pos).add(Vector.up.multiply(200));
    }

    //路径点寻路
    public startMove() {
        this.target_pos = this.path_list[this.path_index].clone();
        this.target_stopDis = stopDis;
        Navigation.navigateTo(this._npc, this.target_pos, stopDis, () => {
            this.target_pos = null;
            this.target_stopDis = 0;
        }, () => {
            setTimeout(() => {
                try {
                    this.resetRobotPos();
                    this.findNearIndex();
                } catch (error) {
                    console.error(error);
                }
            }, 1000);
        });
    }

    //停止寻路
    public stopMove() {
        Navigation.stopNavigateTo(this._npc);
        this.target_pos = null;
        this.target_stopDis = 0;
    }

    //设置跟随目标
    public followTarget(npc: mw.Character, stopDis: number) {
        Navigation.stopNavigateTo(this._npc);
        this.follow_target = npc;
        this.follow_stopDis = stopDis;
    }

    //停止跟随
    public stopFollow() {
        this.follow_target = null;
        Navigation.stopNavigateTo(this._npc);
    }

    //跟随刷新
    private followUpdate() {
        const targetLoc = Vector.one.set(this.follow_target.worldTransform.position);
        let dis = Vector.distance(targetLoc, this._npc.worldTransform.position);
        if (dis >= this.follow_stopDis) {
            this.target_pos = targetLoc;
            this.target_stopDis = this.follow_stopDis;
            if (this._npc.movementEnabled) {
                Navigation.navigateTo(this._npc, targetLoc, this.follow_stopDis,
                    () => { },
                    () => { });
            }
        } else {
            this.target_pos = null;
            this.target_stopDis = 0;
            Navigation.stopNavigateTo(this._npc)
        }
    }

    //巡逻刷新
    private hangUpdate(): number {
        //位置容错
        if (this._npc.worldTransform.position.z < -10000) {
            this.resetRobotPos();
        }
        //无寻路点
        if (!this.nextPoint) {
            return;
        }
        let dis = Vector.distance(this._npc.worldTransform.position, this.nextPoint);
        if (dis < 400) {
            this.temp_list.length = 0;
            this.temp_list = this.path_list.map((val, index) => index);
            this.temp_list = this.temp_list.filter((val) => val != this.path_index);
            this.path_index = this.temp_list[MathUtil.randomInt(0, this.temp_list.length)];
            if (this.nextPoint == null) return;
            this.target_pos = this.nextPoint.clone();
            this.target_stopDis = stopDis;
            Navigation.navigateTo(this._npc, this.nextPoint, stopDis, () => {
                this.target_pos = null;
                this.target_stopDis = 0;
            });
        }
        return dis;
    }

}