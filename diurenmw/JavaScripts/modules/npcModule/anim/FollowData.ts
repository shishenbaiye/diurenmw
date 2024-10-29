import { MonsterAttributeSet } from "../MonsterAttributeSet";

//默认停止跟随距离
const stopDis: number = 50
export class FollowBase {

    /** 当前的寻路Index */
    protected _curIndex: number = 0;

    protected _points: Vector[] = [];

    private _timer: number = 0;

    protected _tempArr: number[] = [];

    private _tempVec: Vector = Vector.zero;

    private _followTarget: mw.Character;

    private _stopDis: number;

    tempDes: Vector = null;

    tempStopDis: number = 0;

    protected get nextPoint(): Vector {
        if (this._curIndex >= this._points.length) return null;
        return this._points[this._curIndex];
    }

    public constructor(protected _character: mw.Character, private _FightBase: MonsterAttributeSet) { }

    public addPath(points: Vector[]) {
        this._points = points.slice(0);
        this._curIndex = 0;
    }

    /** 移动下个点 */
    public nearPointMove() {
        this._curIndex = 0;
        let npcPos = this._tempVec.set(this._character.worldTransform.position);
        let minDis = Vector.squaredDistance(npcPos, this._points[0]);
        for (let index = 1; index < this._points.length; index++) {
            const element = this._points[index];
            let dis = Vector.squaredDistance(npcPos, element);
            if (dis < minDis) {
                this._curIndex = index;
            }
        }
        //停止当前寻路
        this.stopFollow();
        //是否非跟随状态
        //TODO 状态检查
        //下次寻路
        this.navFindPath();

    }

    /** 停止跟随 */
    public stopMove() {
        Navigation.stopNavigateTo(this._character);
        this.tempDes = null;
        this.tempStopDis = 0;
    }

    /** 重置位置 */
    public resetPos() {
        let posAll = this._FightBase.getSpawnPos();
        let posCur = posAll[MathUtil.randomInt(0, posAll.length)];
        let offset = Vector.forward.multiply(200);
        this._character.worldTransform.position = offset.add(posCur).add(Vector.up.multiply(200));
    }

    /** 路径刷新 */
    public updatePath(dt: number) {
        //TODO 状态检查
        if (this._followTarget && this._followTarget.worldTransform) {
            this._timer += dt;
            if (this._timer < 0.2) return;
            this._timer = 0;
            this.updateFollow();
        }
        else {
            this._timer += dt;
            if (this._timer < 0.5) return;
            this._followTarget = null;
            this._timer = 0;
            this.updateHang();
        }
    }

    /** 目标切换 */
    public followTarget(npc: mw.Character, stopDis: number) {
        Navigation.stopNavigateTo(this._character);
        this._followTarget = npc;
        this._stopDis = stopDis;
    }

    /** 停止跟随 */
    public stopFollow() {
        Navigation.stopNavigateTo(this._character);
        this._followTarget = null;
    }

    /** 添加冲量 */
    public addImpulse(impulse: Vector) {
        if (this.tempDes) {
            Navigation.stopNavigateTo(this._character);
            setTimeout(() => {
                if (this.tempDes) {
                    Navigation.navigateTo(this._character, this.tempDes, this.tempStopDis);
                }
            }, 100);
        }
        this._character.addImpulse(impulse, true);
    }

    /** 寻路 */
    private navFindPath() {
        this.tempDes = this._points[this._curIndex].clone();
        this.tempStopDis = stopDis;
        Navigation.navigateTo(this._character, this._points[this._curIndex], stopDis,
            () => {
                this.tempDes = null;
                this.tempStopDis = 0;
            },
            () => {
                setTimeout(() => {
                    try {
                        //TODO 状态检查
                        this.resetPos();
                        this.nearPointMove();
                    } catch (error) {
                        console.error(error);
                    }
                }, 1000);
            });
    }
    /** 刷新跟随 */
    private updateFollow() {
        const targetLoc = Vector.one.set(this._followTarget.worldTransform.position);
        let dis = Vector.distance(targetLoc, this._character.worldTransform.position);
        if (dis >= this._stopDis) {
            this.tempDes = targetLoc;
            this.tempStopDis = this._stopDis;
            if (this._character.movementEnabled) {
                Navigation.navigateTo(this._character, targetLoc, this._stopDis,
                    () => {
                    },
                    () => {
                    });
            }
        }
        else {
            this.tempDes = null;
            this.tempStopDis = 0;
            Navigation.stopNavigateTo(this._character)
        }
    }
    /** 刷新闲逛 */
    private updateHang(): number {
        if (this._character.worldTransform.position.z < -10000) {
            this.resetPos();
        }
        if (!this.nextPoint) {
            return;
        }
        let dis = Vector.distance(this._character.worldTransform.position, this.nextPoint);
        if (dis < 400) {
            this._tempArr.length = 0;
            for (let index = 0; index < this._points.length; index++) {
                if (index != this._curIndex) {
                    this._tempArr.push(index);
                }
            }
            let rd = MathUtil.randomInt(0, this._tempArr.length);
            this._curIndex = this._tempArr[rd];
            if (this.nextPoint == null) {
                return;
            }
            this.tempDes = this.nextPoint.clone();
            this.tempStopDis = stopDis;
            Navigation.navigateTo(this._character, this.nextPoint, stopDis,
                () => {
                    this.tempDes = null;
                    this.tempStopDis = 0;
                },
                () => { });
        }
        return dis;
    }


}
