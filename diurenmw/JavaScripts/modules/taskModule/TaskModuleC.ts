import GuideArrow from "../../common/etc/GuideArrow";
import { GameConfig } from "../../configs/GameConfig";
import { TaskClass, TaskGuideStep, TaskOpt, TaskState } from "./TaskBase/TaskEnum";
import { TaskHelper } from "./TaskHelper";
import TaskModuleData from "./TaskModuleData";
import { TaskModuleS } from "./TaskModuleS";

export class TaskModuleC extends ModuleC<TaskModuleS, TaskModuleData> {

    private _curDirectTaskId: number = 0;
    /**设置当前引导任务id */
    set curDirectTaskId(value: number) { this._curDirectTaskId = value }
    /**获取当前引导任务id */
    get curDirectTaskId(): number { return this._curDirectTaskId }

    protected onAwake(): void {
        TaskHelper.module = this;
        //TODO 后续监听其他事件
    }
    protected onStart(): void {
        this.data.onTaskStateChange.add(this.onTaskStateChange, this);
        this.data.onTaskChange.add(this.onChangeTask, this);
        this.data.onCrossDay.add(this.onCrossDay, this);
    }

    /** 添加任务 */
    public addTask(taskId: number) {
        this.server.net_addTask(taskId);
    }

    /**领取奖励 */
    public async reciveReward(taskId: number) {
        return await this.server.net_ClickReceiveTask(taskId);
    }

    /** 保存任务 */
    public saveTask() {
        this.server.net_saveTask();
    }

    /** 完成任务 */
    public completeTask(taskId: number) {
        this.server.net_taskComplete(taskId);
    }

    /**给任务增加完成次数 */
    public addTaskCount(taskId: number, count: number) {
        this.server.net_taskAddCount(taskId, count);
    }

    /**任务超时 */
    public onTimeOut(taskId: number) {
        this.server.net_taskTimeOut(taskId);
    }


    /**对外根据任务类型获取任务 */
    public getTaskOut(taskType: TaskClass) {
        return this.data.getTaskList(taskType);
    }

    /** 打开引导线 */
    public openDirection(taskId: number) {
        let taskCfg = GameConfig.Task.getElement(taskId);
        this._curDirectTaskId = taskId;
        //TODO 引导任务
        GuideArrow.instance.dirToLoc(Vector.zero);
    }

    /**关闭引导线 */
    public closeDirection() {
        GuideArrow.instance.clearDirToLoc();
        this._curDirectTaskId = null;
    }


    /**监听任务状态变动 */
    private onTaskStateChange(taskId: number, state: TaskState) {
        let task = this.data.getOneTask(taskId);
        if (state == TaskState.Finished) {
            if (this.data.getOneTask(taskId).taskClass == TaskClass.Daily) { }
            if (taskId == TaskGuideStep.Guide1) { }
            if (taskId == TaskGuideStep.Guide3) { }
            task.completeTask();
        }
        if (state == TaskState.Received) {
            if (this.data.getOneTask(taskId).taskClass == TaskClass.Pet) { }
            if (this.data.getOneTask(taskId).taskClass == TaskClass.Daily) { }
            if (this.data.getOneTask(taskId).taskClass == TaskClass.Guide) { }
        }
    }

    /**监听任务变动 */
    private onChangeTask(taskId: number, opt: TaskOpt) {
        let config = GameConfig.Task.getElement(taskId);
        if (opt == TaskOpt.Add) {
            if (config.TaskClass == TaskClass.Pet) { }
        } else {
            if (config.TaskClass == TaskClass.Pet) { }
        }
        let petTask = this.data.getTaskList(TaskClass.Pet);
        if (petTask.length > 0) { }
    }

    /**监听是否跨天 */
    private onCrossDay() {
        let dailyTaskList = this.data.taskList.concat().filter((task) => {
            return GameConfig.Task.getElement(task).TaskClass == TaskClass.Daily;
        });
        for (let i = 0; i < dailyTaskList.length; i++) {
        }
    }


}