import { TaskHelper } from "./TaskHelper";
import TaskModuleData from "./TaskModuleData";
import { TaskModuleS } from "./TaskModuleS";

export class TaskModuleC extends ModuleC<TaskModuleS, TaskModuleData> {

    private _curDirectTaskId: number = 0;
    /**设置当前引导任务id */
    set curDirectTaskId(value: number) {
        this._curDirectTaskId = value;
    }

    protected onAwake(): void {
        TaskHelper.module = this;
    }

    public addTask(taskId: number) {
        this.server.net_addTask(taskId);
    }

    /**领取奖励 */
    public async reciveReward(taskId: number) {
        return await this.server.net_ClickReceiveTask(taskId);
    }

    /**保存任务 */
    public saveTask() {
        this.server.net_saveTask();
    }

    public completeTask(taskId: number) {
        this.server.net_taskComplete(taskId);
    }

    /**给任务增加完成次数 */
    public addTaskCount(taskId: number, count: number) {
        this.server.net_taskAddCount(taskId, count);
    }


}