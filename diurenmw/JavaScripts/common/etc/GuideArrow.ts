
/**
 * 新手引导客户端模块
 */
@Component
export default class GuideArrow extends mw.Script {
    /**
     * 引导线间隔
     */
    @mw.Property({ displayName: "裁剪距离", tooltip: "指向显示的最大长度，默认1600，超过后会只显示一部分，不影响指向;默认静态模型正方体的边长=100", group: "配置" })
    public maxDis: number = 300;
    /**
     * 引导线地标信息
     */
    @mw.Property({ displayName: "箭头特效", tooltip: "指向目标的箭头特效", group: "配置" })
    public arrowGuid: string = "129380";

    @mw.Property({ displayName: "箭头缩放", tooltip: "箭头缩放大小默认(1,1,1)", group: "配置" })
    public arrowScale: Vector = mw.Vector.one;

    @mw.Property({ displayName: "箭头旋转偏移", tooltip: "箭头旋转偏移", group: "配置" })
    public arrowRotationOffset: Rotation = new Rotation(90, 0, 90);

    @mw.Property({ displayName: "引导线位置刷新间隔时间", tooltip: "默认刷新0.2秒", group: "配置" })
    public intervalTime: number = 0.2;

    @mw.Property({ displayName: "箭头显示数量", tooltip: "默认10", group: "配置" })
    public arrowCount: number = 10;

    // 实例化声明
    public static instance: GuideArrow;
    private player: mw.Player;
    private character: mw.Character;
    private startTime: number = -1;

    private lastCharPos: Vector = mw.Vector.zero;
    private _cachePointerGo: mw.GameObject[] = [];
    private newPosArr = [];
    private targetPos: mw.Vector = mw.Vector.zero;
    private paths: mw.Vector[] = [];
    protected async onStart() {
        console.log(`test:this is`);
        GuideArrow.instance = this;
        this.init();
    }

    private async init() {
        if (SystemUtil.isServer()) {
            return;
        }
        Player.asyncGetLocalPlayer().then((_player) => {
            this.player = _player;
            this.character = this.player.character;
            this.useUpdate = true;
        });

        AssetUtil.assetLoaded(this.arrowGuid);
    }

    protected async onUpdate(DeltaTime: number) {
        if (!this.player || !this.character) return;

        this.onUpdateHandler(DeltaTime);
    }

    private async onUpdateHandler(DeltaTime: number) {
        if (this.targetPos.x == 0 && this.targetPos.y == 0 && this.targetPos.z == 0) return;

        if (this.startTime >= 0 && this.startTime < this.intervalTime) {
            this.startTime += DeltaTime;
            return;
        }

        if (this.lastCharPos.x == this.character.worldTransform.position.x && this.lastCharPos.y == this.character.worldTransform.position.y && this.lastCharPos.z == this.character.worldTransform.position.z) {
            return;
        }
        this.lastCharPos = this.character.worldTransform.position;
        this.paths = Navigation.findPath(this.character.worldTransform.position.clone(), this.targetPos);

        if (this.paths && this.paths.length > 0) {
            this.show(this.paths);

            this.startTime = 0;
        } else {
            this.destoryArrow();
        }
    }

    public clearDirToLoc() {
        this.showHideArrow(false);

        this.lastCharPos = mw.Vector.zero;

        this.targetPos = mw.Vector.zero;

        this.destoryArrow();
    }

    private destoryArrow() {
        //销毁箭头
        this.startTime = -1;
        this.newPosArr = [];
        if (this._cachePointerGo) {
            for (let i = this._cachePointerGo.length - 1; i >= 0; i--) {
                GameObjPool.despawn(this._cachePointerGo[i]);

                this._cachePointerGo[i].setVisibility(mw.PropertyStatus.Off);
                this._cachePointerGo[i].destroy();
                this._cachePointerGo[i] = null;
            }
        }
        this._cachePointerGo = [];
        GameObjPool.clear(this.arrowGuid, GameObjPoolSourceType.Asset);
    }

    /**
     * 指向某个目标
     * @param _targetPos 3
     */
    public async dirToLoc(_targetPos: mw.Vector) {
        this.showHideArrow(true, _targetPos);
    }
    /**
     * 显隐箭头相关
     * @param _isActive
     * @param _targetPos
     */
    private showHideArrow(_isActive: boolean, _targetPos: mw.Vector = mw.Vector.zero) {
        if (_isActive) {
            this.targetPos = _targetPos;
            this.lastCharPos = mw.Vector.zero;
        }
        this.useUpdate = _isActive;
    }

    /**
     * 显示隐藏引导线地标
     * @param _posArr
     */
    private async show(_posArr: mw.Vector[]) {
        if (_posArr.length <= 0) {
            return;
        }

        this.newPosArr = [];
        for (let i = _posArr.length - 1; i >= 0; i--) {
            let curPos = _posArr[i];
            if (i - 1 < 0) {
                break;
            }
            this.newPosArr.push(curPos);
            let nextPos = _posArr[i - 1];
            let dirInfo = nextPos.clone().subtract(curPos);
            let length = dirInfo.length;
            let dirNormal = dirInfo.normalized;
            let count = 1;
            while (length > this.maxDis) {
                this.newPosArr.push(curPos.clone().add(dirNormal.clone().multiply(this.maxDis * count)));
                length -= this.maxDis;
                count++;
            }
        }

        _posArr = this.newPosArr;
        let lastDir: mw.Vector;

        let cacheLength = this._cachePointerGo.length;
        let useCount = 0;
        for (let i = Math.max(0, _posArr.length - this.arrowCount); i < _posArr.length; i++) {
            let go: mw.GameObject = null;

            const index = i;
            if (useCount >= cacheLength) {
                go = await GameObjPool.spawn(this.arrowGuid, GameObjPoolSourceType.Asset); // SpawnManager.asyncSpawn<mw.Effect>({ guid: this.getGuideArrowPointerGuid(), replicates: false, transform: trans })
                await go.asyncReady();
                go.setCollision(mw.PropertyStatus.Off);
                go.worldTransform.scale = this.arrowScale;
                this._cachePointerGo.push(go);
            } else {
                go = this._cachePointerGo[useCount];
            }
            go.worldTransform.position = _posArr[index];
            useCount++;

            if (_posArr.length > index + 1) {
                lastDir = _posArr[index].subtract(_posArr[index + 1]);
                let dir = lastDir.toRotation();
                dir.x = this.arrowRotationOffset.x;
                dir.y = this.arrowRotationOffset.y;
                dir.z = dir.z - this.arrowRotationOffset.z;
                lastDir = dir.getForce();
                go.worldTransform.rotation = dir;
            } else {
                if (lastDir) {
                    let dir = lastDir.toRotation();
                    dir.x = this.arrowRotationOffset.x;
                    dir.y = this.arrowRotationOffset.y;
                    dir.z = dir.z;
                    go.worldTransform.rotation = dir;
                } else {
                    //   go.worldTransform.rotation = mw.Rotation.zero;
                }
            }
            go.setVisibility(mw.PropertyStatus.On);
            (go as mw.Effect).loop = true;
            (go as mw.Effect).play();
        }

        for (let i = useCount; i < cacheLength; i++) {
            GameObjPool.despawn(this._cachePointerGo[i]);
            this._cachePointerGo[i].setVisibility(mw.PropertyStatus.Off);
        }
    }

    protected onDestroy(): void {
        this.clearDirToLoc();
    }
}
