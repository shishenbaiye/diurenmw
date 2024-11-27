import { GameConfig } from "../../../configs/GameConfig";
import { MContainer } from "../../../framework/DI/MContainer";
import { Logger, LoggerManager } from "../../../tools/LoggerTool";
import { TaskHelper } from "../TaskHelper";
import { TaskClass, TaskCompleteType, TaskGuideType, TaskState } from "./TaskEnum";

export class Task {
    private _id: number;
    // 任务持有者id
    private _playerID: number;
    // 任务名称
    private _name: string;
    // 任务描述
    private _desc: string;
    // 任务方式类型
    private _taskType: TaskCompleteType;
    // 任务分类
    private _taskClass: TaskClass;
    // 任务图片id
    private _imgID: string;
    // 奖励数量
    private _reward: number;
    // 奖励类型
    private _rewardType: number;
    // 道具id
    private _propID: number;
    // 全屏通用奖励id
    private _rewardID: number;
    // 大图展示icon
    private _bigIcon: string;
    // 需要达成的次数
    private _needCount: number;
    // 当前完成的次数
    private _currentCount: number;
    // 当前任务状态
    private _state: TaskState;
    // 是否完成
    private _complete: boolean;
    // 限制时间
    private _limitTime: number;
    // 引导位置
    private _direction: number;
    // 引导类型
    private _guideType: TaskGuideType;
    // 引导类型参数
    private _guideTypeValue: string[];
    // 配置数据
    private _configValue: string[];
    protected _func: (...param) => void;
    protected _destroyFunc: () => void = () => { };
    protected readonly logger: Logger = MContainer.instance.getPluginByName<LoggerManager>("LoggerManager").getLogger("Task");


    constructor(id: number) {
        this._id = id;
        this._complete = false;
        this._currentCount = 0;
    }

    init() {
        this.name = GameConfig.Task.getElement(this.id).Name;
        this.desc = GameConfig.Task.getElement(this.id).Desc;
        this.reward = GameConfig.Task.getElement(this.id).Reward;
        this.rewardType = GameConfig.Task.getElement(this.id).RewardType;
        this.state = TaskState.Doing;
        this.imgID = GameConfig.Task.getElement(this.id).TaskIcon;
        this.propID = Number(GameConfig.Task.getElement(this.id).ItemID);
        this.rewardID = Number(GameConfig.Task.getElement(this.id).RewardID);
        this.bigIcon = GameConfig.Task.getElement(this.id).BigIcon;
        this.needCount = GameConfig.Task.getElement(this.id).NeedCount;
        this.configValue = GameConfig.Task.getElement(this.id).TaskConditionValue;
        this.direction = GameConfig.Task.getElement(this.id).DirectLoaction;
        this.taskType = GameConfig.Task.getElement(this.id).TaskConditionType;
        this.configValue = GameConfig.Task.getElement(this.id).TaskConditionValue;
        this.initGuidType();
        this.logger.error("init task:", this.taskType);
    }
    initDoing() {
        this.logger.error("initDoing task:", this.taskType);
    }
    /**初始化引导类型 */
    protected initGuidType() {
        this.guideType = Number(GameConfig.Task.getElement(this.id).TaskGuide[0]);
        if (SystemUtil.isClient()) {
            this.playerID = Player.localPlayer.playerId;
        }
    }

    completeTask() {
        this._destroyFunc();
        this._destroyFunc = () => { };
        if (SystemUtil.isClient()) {
            TaskHelper.saveTask();
        }
    }

    onDestroy() {
        this._destroyFunc();
    }

    protected initCompleteTask() { }

    /**增加完成次数,默认是1 */
    addCount(num: number = 1) {
        this._currentCount += num;
        if (this._currentCount >= this._needCount) {
            this._currentCount = this._needCount;
            this._complete = true;
            this._state = TaskState.Finished;
        }
    }
    setCount(num: number) {
        if (!num) {
            num = 0;
        }
        this._currentCount = num;
        if (this._state == TaskState.Received) {
            return;
        }
        if (this._currentCount >= this._needCount) {
            this._currentCount = this._needCount;
            this._complete = true;
            this._state = TaskState.Finished;
        }
    }

    /** 根据长度判断完成条件*/
    private fishingByLength(state: "add" | "remove" = "add") {
        if (SystemUtil.isClient()) {
            if (state == "add") { } else { }
        }
    }
    /** 根据数量判断完成条件*/
    private fishingByCount(state: "add" | "remove" = "add") {
        if (SystemUtil.isClient()) {
            if (state == "add") { } else { }
        }
    }

    get currentCount() {
        return this._currentCount;
    }
    /**获取是否完成 */
    get complete() {
        return this._complete;
    }
    /**获取奖励类型和数值 */
    get rewardAndType() {
        if (this._complete) {
            return { Type: this._rewardType, num: this._reward };
        }
    }
    /**获取任务id */
    get id() {
        return this._id;
    }
    /**获取持有者id */
    get playerID() {
        return this._playerID;
    }
    /**获取任务名称 */
    get name() {
        return this._name;
    }
    /**获取任务描述 */
    get desc() {
        return this._desc;
    }
    /**获取任务类型 */
    get taskType() {
        return this._taskType;
    }
    /**获取任务分类 */
    get taskClass() {
        return this._taskClass;
    }
    /**获取任务图片id */
    get imgID() {
        return this._imgID;
    }
    /**获取任务状态 */
    get state() {
        return this._state;
    }
    /**获取达成条件 */
    get needCount() {
        return this._needCount;
    }
    /**获取引导位置 */
    get direction() {
        return this._direction;
    }
    /**获取配置数据 */
    get configValue() {
        return this._configValue;
    }
    /**获取限制时间 */
    get limitTime() {
        return this._limitTime;
    }
    /**获取奖励 */
    get reward() {
        return this._reward;
    }
    /**获取引导类型 */
    get guideType() {
        return this._guideType;
    }
    /**获取引导类型参数 */
    get guideTypeValue() {
        return this._guideTypeValue;
    }
    get rewardType() {
        return this._rewardType;
    }
    get propID() {
        return this._propID;
    }
    get rewardID() {
        return this._rewardID;
    }
    get bigIcon() {
        return this._bigIcon;
    }

    set name(name: string) {
        this._name = name;
    }
    set playerID(id: number) {
        this._playerID = id;
    }
    set desc(desc: string) {
        this._desc = desc;
    }
    set taskType(type: TaskCompleteType) {
        this._taskType = type;
    }
    set taskClass(type: TaskClass) {
        this._taskClass = type;
    }
    set imgID(id: string) {
        this._imgID = id;
    }
    set reward(reward: number) {
        this._reward = reward;
    }
    set rewardType(type: number) {
        this._rewardType = type;
    }
    set state(state: TaskState) {
        this._state = state;
    }
    set needCount(num: number) {
        this._needCount = num;
    }
    set direction(num: number) {
        this._direction = num;
    }
    set configValue(value: string[]) {
        this._configValue = value;
    }
    set limitTime(time: number) {
        this._limitTime = time;
    }
    set guideType(type: TaskGuideType) {
        this._guideType = type;
    }
    set propID(id: number) {
        this._propID = id;
    }
    set rewardID(id: number) {
        this._rewardID = id;
    }
    set bigIcon(id: string) {
        this._bigIcon = id;
    }
}
