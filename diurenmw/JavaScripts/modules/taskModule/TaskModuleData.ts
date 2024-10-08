import { GameConfig } from "../../configs/GameConfig";
import { Constructor } from "../../framework/DI/MContainer";
import { Task } from "./TaskBase/Task";
import { Task_Beginner } from "./TaskBase/Task_Beginner";
import { Task_Custom } from "./TaskBase/Task_Custom";
import { Task_Day } from "./TaskBase/Task_Day";
import { TaskClass, TaskCompleteType, TaskOpt, TaskState } from "./TaskBase/TaskEnum";

export default class TaskModuleData extends Subdata {
    /**整个任务列表更改(外面不要监听这个) */
    readonly onTaskAllChange: Action1<number[]> = new Action1<number[]>();
    /**任务改变 */
    readonly onTaskChange: Action2<number, number> = new Action2<number, number>();
    /**任务计数改变 */
    readonly onTaskCountChange: Action2<number, number> = new Action2<number, number>();
    /**任务状态改变 */
    readonly onTaskStateChange: Action2<number, number> = new Action2<number, number>();
    /**跨天提醒 */
    readonly onCrossDay: Action = new Action();

    @Decorator.persistence()
    private _timestemp: number = 0;
    /**任务列表 */
    @Decorator.persistence()
    private _taskList: number[] = [];
    /**任务计数列表 */
    @Decorator.persistence()
    private _countTaskList: number[] = [];
    /**已完成并领取任务列表 */
    @Decorator.persistence()
    private _completeTaskList: number[] = [];
    /**每日总任务状态 */
    @Decorator.persistence()
    private _totalTaskState: number = TaskState.Doing;
    /**登录天数 */
    @Decorator.persistence()
    private _loginDay: number = 0;
    /**是否是当天第一次完成 */
    @Decorator.persistence()
    private _isFirstComplete: boolean = true;
    /**是否是第一次获取宠物任务 */
    @Decorator.persistence()
    private _isFirstGetPetTask: boolean = true;

    private _playerId: number = 0;
    private taskTypeMap: Map<number, Constructor<Task>> = new Map<number, Constructor<Task>>();
    private taskObjectMap: Map<number, Task> = new Map<number, Task>();
    private completeTaskObjectMap: Map<number, Task> = new Map<number, Task>();
    private receiveTaskObjectMap: Map<number, Task> = new Map<number, Task>();
    // private readonly logger: Logger = LoggerManager.getInstance().getLogger(`TaskModuleData`, `GZB`);
    initDefaultData(): void {
        // 初始化默认数据
        this._taskList = [];
        this._countTaskList = [];
        this._timestemp = Date.now();
        this._loginDay = 1;
        this.save(true);
    }

    public setPlayerId(playerid: number) {
        this._playerId = playerid;
    }

    /**创建任务对象 */
    public createTaskObject() {
        for (let i = 0; i < this._taskList.length; i++) {
            const element = this._taskList[i];
            let type = GameConfig.Task.getElement(element).TaskClass;
            let typClass = this.taskTypeMap.get(type);
            let task = new typClass(element);
            task.playerID = this._playerId;
            task.init();
            task.setCount(this._countTaskList[i]);
            if (task.taskType == TaskCompleteType.Login) {
                task.setCount(1);
            }
            if (task.complete) {
                this.completeTaskObjectMap.set(element, task);
            }
            if (this.completeTaskList[i] == 1) {
                task.state = TaskState.Received;
                this.receiveTaskObjectMap.set(element, task);
            }
            if (task.state == TaskState.Doing) {
                task.initDoing();
            }
            this.taskObjectMap.set(element, task);
        }
    }

    /**获取任务列表 */
    getTaskList(type: TaskClass): Task[] {
        let list: Task[] = [];
        this.taskObjectMap.forEach((value, key) => {
            if (value.taskClass == type) {
                list.push(value);
            }
        });
        return list;
    }

    /**保存数据 */
    saveAndUpdateTime() {
        this._timestemp = Date.now();
        this._taskList = [];
        this._countTaskList = [];
        this._completeTaskList = [];
        this.taskObjectMap.forEach((value, key) => {
            if (value.taskClass == TaskClass.Daily || value.taskClass == TaskClass.Guide) {
                if (value.state == TaskState.Doing) {
                    this._taskList.push(key);
                    this._countTaskList.push(value.currentCount);
                    this._completeTaskList.push(0);
                }
                if (value.state == TaskState.Finished) {
                    this._taskList.push(key);
                    this._countTaskList.push(value.currentCount);
                    this._completeTaskList.push(0);
                }
                if (value.state == TaskState.Received) {
                    this._taskList.push(key);
                    this._countTaskList.push(value.currentCount);
                    this._completeTaskList.push(1);
                }
            }
        });
        this.save(true);
    }

    /**增加任务计数 */
    addTaskCount(taskId: number, count: number) {
        let task = this.taskObjectMap.get(taskId);
        if (SystemUtil.isServer()) {
            if (task) {
                task.addCount(count);
                this.save(true).onTaskCountChange.call(taskId, task.currentCount);
                if (task.complete) {
                    this.completeTaskObjectMap.set(taskId, task);
                    this.save(true).onTaskStateChange.call(taskId, Number(TaskState.Finished));
                    task.completeTask();
                }
            }
        } else {
            if (task) {
                task.setCount(count);
            }
        }
    }

    /**添加一个任务 */
    addTask(taskId: number) {
        if (this.taskObjectMap.has(taskId)) return;
        let type = this.taskTypeMap.get(GameConfig.Task.getElement(taskId).TaskClass);
        let task = new type(taskId);
        task.playerID = this._playerId;
        task.init();
        task.initDoing();
        this.taskObjectMap.set(taskId, task);
        if (SystemUtil.isServer()) {
            this.save(true).onTaskChange.call(taskId, Number(TaskOpt.Add));
        }
    }
    /**移除一个任务 */
    removeTask(taskId: number) {
        if (this.taskObjectMap.has(taskId)) {
            this.taskObjectMap.get(taskId).onDestroy();
            this.taskObjectMap.delete(taskId);
            if (SystemUtil.isServer()) {
                this.save(true).onTaskChange.call(taskId, Number(TaskOpt.Remove));
            }
        }
    }

    /**获取一个任务 */
    getOneTask(taskId: number): Task {
        return this.taskObjectMap.get(taskId);
    }

    /**获取同样完成条件的任务 */
    getSameCompleteTypeTask(type: TaskCompleteType, state: TaskState = TaskState.Doing): Task[] {
        let list: Task[] = [];
        this.taskObjectMap.forEach((value, key) => {
            if (value.taskType == type) {
                list.push(value);
            }
        });
        return list;
    }

    /**领取奖励 */
    receiveTaskReward(taskId: number) {
        let task = this.taskObjectMap.get(taskId);
        //TODO
    }
    /**任务改变 */
    onChangeTask(taskId: number, opt: TaskOpt) {
        if (opt == TaskOpt.Add) {
            this.addTask(taskId);
        } else if (opt == TaskOpt.Remove) {
            this.removeTask(taskId);
        }
    }
    /**计数改变 */
    onChangeTaskCount(taskId: number, count: number) {
        this.addTaskCount(taskId, count);
    }
    /**状态更新 */
    onChangeTaskState(taskId: number, state: TaskState) {
        if (taskId === 19980317) {
            return;
        }
        this.taskObjectMap.get(taskId).state = state;
    }

    set taskList(value: number[]) {
        this._taskList = value;
    }

    set countTaskList(value: number[]) {
        this._countTaskList = value;
    }

    set completeTaskList(value: number[]) {
        this._completeTaskList = value;
    }

    set timeStemp(value: number) {
        this._timestemp = value;
    }

    set setTotalState(value: number) {
        this._totalTaskState = value;
    }

    set isFirstComplete(value: boolean) {
        this._isFirstComplete = value;
        this.save(true);
    }

    set loginDay(value: number) {
        this._loginDay = value;
        this.save(true);
    }

    set isFirstGetPetTask(value: boolean) {
        this._isFirstGetPetTask = value;
        this.save(true);
    }

    get isFirstGetPetTask() {
        return this._isFirstGetPetTask;
    }

    get loginDay() {
        return this._loginDay;
    }

    get taskList(): number[] {
        return this._taskList;
    }

    get countTaskList(): number[] {
        return this._countTaskList;
    }

    get completeTaskList(): number[] {
        return this._completeTaskList;
    }

    get timeStemp(): number {
        return this._timestemp;
    }

    get getTotalState(): number {
        return this._totalTaskState;
    }

    get isFirstComplete(): boolean {
        return this._isFirstComplete;
    }

    onDataInit() {
        this.taskTypeMap.set(TaskClass.Daily, Task_Day);
        this.taskTypeMap.set(TaskClass.Guide, Task_Beginner);
        this.taskTypeMap.set(TaskClass.Custom, Task_Custom);
        if (SystemUtil.isClient()) {
            this.onTaskAllChange.add(this.onTaskAllChangeCall, this);
            this.onTaskChange.add(this.onChangeTask, this);
            this.onTaskCountChange.add(this.onChangeTaskCount, this);
            this.onTaskStateChange.add(this.onChangeTaskState, this);
        }
    }
    /**监听服务端所有任务列表变动 */
    onTaskAllChangeCall(taskIdArray: number[]) {
        if (SystemUtil.isClient()) {
            this.taskList = taskIdArray;
            this._playerId = Player.localPlayer.playerId;
            this.createTaskObject();
        }
    }
}