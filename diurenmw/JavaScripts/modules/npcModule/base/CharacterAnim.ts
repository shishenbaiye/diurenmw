
/** 动画数据类型 */
export type AnimExType = {
    /** 资源id */
    assetId: string;
    /** 循环次数,0无限循环
     * @default 1 
     */
    loop?: number;
    /** 播放速度
     * @default 1
     */
    speed?: number;
    /** 插槽
     * @default 0
     */
    slot?: number;
    /** 淡入时间
     * @default 0.3
     */
    blendInTime?: number;
    /** 淡出时间
     * @default 0
     */
    blendOutTime?: number;
    /** 开始时间
     * @default 0
     */
    startTime?: number;
    /** 结束时间，用于播放一段动画的一部分
     * @default 0
     */
    endTime?: number;
    /** 结束时是否暂停
     * @default false
     */
    pauseAtEnd?: boolean;
    /** 优先级
     * @default 0
     */
    priority?: number;

    /** 被移动打断 */
    stopByMove?: boolean;
}

/** 动画同步 */
@Serializable
export class AnimExInfo {

    assetId: string = "";

    loop: number = 1;

    speed: number = 1;

    slot: number = 0;

    blendInTime: number = 0.3;

    blendOutTime: number = 0.3;

    startTime: number = 0;

    endTime: number = 0;

    pauseAtEnd: boolean = false;

    pausing: boolean = false;

    priority: number = 0;

    stopByMove: boolean = false;

    constructor(info: AnimExType) {
        this.assetId = info.assetId;
        this.loop = info.loop != null ? info.loop : 1;
        this.speed = info.speed != null ? info.speed : 1;
        this.slot = info.slot != null ? info.slot : 0;
        this.blendInTime = info.blendInTime != null ? info.blendInTime : 0.3;
        this.blendOutTime = info.blendOutTime != null ? info.blendOutTime : 0;
        this.startTime = info.startTime != null ? info.startTime : 0;
        this.endTime = info.endTime != null ? info.endTime : 0;
        this.pauseAtEnd = info.pauseAtEnd != null ? info.pauseAtEnd : false;
        this.priority = info.priority != null ? info.priority : 0;
        this.stopByMove = info.stopByMove != null ? info.stopByMove : false;
    }
}

/** 动画数据 */
export class AnimEx {
    animInfo: AnimExInfo;
    animation: Animation;
}

/** 动画控制器 */
export class AnimExController {
    /** 缓存动画 */
    cacheAnimMap: Map<string, AnimEx> = new Map();
    boundCheckMoveState: any;

    constructor(private char: Character) {
        this.boundCheckMoveState = this.checkMoveState.bind(this);
    }

    get curAnimEx() { return this.cacheAnimMap.get(this.curAnim?.assetId) }
    get curAnim() { return this.char?.currentAnimation }

    /** 客户端动画播放 */
    clientPlayAnim(animInfo: AnimExInfo) {
        if (this.curAnimEx) {
            const higherPriority = this.curAnimEx.animInfo.priority <= animInfo.priority;
            const isPlaying = this.curAnimEx.animation.isPlaying || this.curAnimEx.animInfo.pausing;
            // console.log("clientPlayAnim curAnim", this.curAnimEx.animInfo.assetId, isPlaying, higherPriority);
            if (isPlaying && !higherPriority) {
                return;
            }
        }
        // console.log("clientPlayAnim play", animInfo.assetId);
        const animEx = this.getAnimEx(animInfo);
        animEx.animation.play();
        // console.log("clientPlayAnim play", animInfo.assetId, animEx.animation.length);
        if (animEx.animInfo.endTime > 0 && animEx.animInfo.pauseAtEnd) {
            setTimeout(() => {
                if (this.curAnimEx && this.curAnimEx.animInfo.assetId == animInfo.assetId) {
                    animEx.animation.pause();
                    animEx.animInfo.pausing = true;
                    // console.log("clientPlayAnim pause", animInfo.assetId);
                }
            }, animEx.animInfo.endTime * 1000);
        }
        if (animEx.animInfo.stopByMove) {
            // console.log("clientPlayAnim stopByMove", animInfo.assetId);
            TimeUtil.onEnterFrame.add(this.boundCheckMoveState)
        }
    }

    /** 检查移动状态 */
    checkMoveState() {
        // console.log("checkMoveState", this.char.gameObjectId, this.curAnimEx?.animInfo?.stopByMove, this.char.isMoving, Date.now());
        if (this.curAnimEx?.animInfo?.stopByMove) {
            if (this.char.isMoving) {
                this.curAnimEx.animation.stop();
                this.curAnimEx.animInfo.pausing = false;
                // console.log("checkMoveState moving", this.char.gameObjectId, this.curAnimEx.animation.isPlaying);
                // Tips.show("stopAnim")
                TimeUtil.onEnterFrame.remove(this.boundCheckMoveState);
            }
        }
        else {
            TimeUtil.onEnterFrame.remove(this.boundCheckMoveState);
        }
    }

    /** 客户端停止动画 */
    clientStopAnim(assetId?: string) {
        assetId == assetId ? assetId : this.curAnim?.assetId;
        const animEx = this.cacheAnimMap.get(assetId);
        if (animEx) {
            console.log("clientStopAnim stop", assetId, this.char.ragdollEnabled);
            animEx.animation.stop();
            animEx.animInfo.pausing = false;
        }
    }

    /**  获取动画数据 */
    getAnimEx(animInfo: AnimExInfo) {
        let animEx = this.cacheAnimMap.get(animInfo.assetId);
        if (!animEx) {
            animEx = new AnimEx();
            let anim = this.char.loadAnimation(animInfo.assetId);
            animEx.animation = anim;
            this.cacheAnimMap.set(animInfo.assetId, animEx);
        }
        animEx.animInfo = animInfo;
        animEx.animation.loop = animInfo.loop;
        animEx.animation.speed = animInfo.speed;
        animEx.animation.slot = animInfo.slot;
        animEx.animation.blendInTime = animInfo.blendInTime;
        animEx.animation.blendOutTime = animInfo.blendOutTime;
        animEx.animation.startTime = animInfo.startTime;
        return animEx;
    }

}