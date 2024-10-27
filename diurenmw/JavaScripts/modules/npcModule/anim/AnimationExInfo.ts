export type AnimationExData = {
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

/** 动作数据 */
export class AnimationEx {
    animInfo: AnimationExInfo;
    animation: Animation;
}

/** 动作序列化数据 */
@Serializable
export class AnimationExInfo {

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

    constructor(info: AnimationExData) {
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
