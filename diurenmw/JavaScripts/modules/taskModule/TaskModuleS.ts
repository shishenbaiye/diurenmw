import { GameConfig } from "../../configs/GameConfig";
import { TaskClass } from "./TaskBase/TaskEnum";
import { TaskModuleC } from "./TaskModuleC";
import TaskModuleData from "./TaskModuleData";

export interface ITask {
    /**添加任务
     * @param playerid 玩家id
     * @param taskId 任务id
     */
    addTask(playerid: number, taskId: number): void;
    /**删除任务
     * @param playerid 玩家id
     * @param taskId 任务id   
     */
    deleteTask(playerid: number, taskId: number): void;
}
export class TaskModuleS extends ModuleS<TaskModuleC, TaskModuleData> implements ITask {

    /**接收客户端增加任务请求 */
    net_addTask(taskId: number) {
        this.addTask(this.currentPlayerId, taskId);
    }
    /**接收保存任务事件*/
    net_saveTask() {
        this.getPlayerData(this.currentPlayerId).saveAndUpdateTime();
    }

    /**接收任务完成通知 */
    net_taskComplete(taskId: number) {
        return this.completeTask(this.currentPlayerId, taskId);
    }

    /**接收任务完成计数 */
    net_taskAddCount(taskId: number, count: number) {
        let playerid = this.currentPlayerId;
        this.getPlayerData(playerid).addTaskCount(taskId, count);
        let taskTable = GameConfig.Task.getElement(taskId);
        if (taskTable.TaskClass == TaskClass.Pet) {
            if (this.getPlayerData(playerid).getOneTask(taskId).complete) {
                this.deleteTask(playerid, taskId);
            }
        }
        return true;
    }


    public addTask(playerid: number, taskId: number): void {
        throw new Error("Method not implemented.");
    }
    public deleteTask(playerid: number, taskId: number): void {
        throw new Error("Method not implemented.");
    }

    public completeTask(playerId: number, taskId: number): boolean {
        let needCount = GameConfig.Task.getElement(taskId).NeedCount;
        this.getPlayerData(playerId).addTaskCount(taskId, needCount);
        if (GameConfig.Task.getElement(taskId).TaskClass == TaskClass.Pet) {
            if (this.getPlayerData(playerId).getOneTask(taskId) && this.getPlayerData(playerId).getOneTask(taskId).complete) {
                this.deleteTask(playerId, taskId);
            }
        }
        return true;
    }

    /**增加任务完成计数 */
    public addTaskCount(playerid: number, taskId: number, count: number) {
        this.getPlayerData(playerid).addTaskCount(taskId, count);
    }

    /**保存任务 */
    public saveTask(playerid: number) {
        this.getPlayerData(playerid).saveAndUpdateTime();
    }

    /**接收领取任务奖励 */
    public net_ClickReceiveTask(taskId: number) {
        let playerid = this.currentPlayerId;
        return this.getPlayerData(playerid).receiveTaskReward(taskId);
    }

}