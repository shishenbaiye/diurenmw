import { GameConfig } from "../../configs/GameConfig";
import { TaskClass } from "./TaskBase/TaskEnum";
import { TaskHelper } from "./TaskHelper";
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

    protected onAwake(): void {
        TaskHelper.module = this;
        //TODO 任务事件监听
        // GameEventBus.on(``, (playerId: number) => {

        // })
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        this.getPlayerData(player).setPlayerId(player.playerId);
        this.getPlayerData(player).createTaskObject();
    }

    protected onPlayerLeft(player: mw.Player): void {
        this.getPlayerData(player).saveAndUpdateTime();
    }

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
        //FIXME 可能需要删除
        let taskTable = GameConfig.Task.getElement(taskId);
        if (taskTable.TaskClass == TaskClass.Pet) {
            if (this.getPlayerData(playerid).getOneTask(taskId).complete) {
                this.deleteTask(playerid, taskId);
            }
        }
        return true;
    }

    /**接收领取任务奖励 */
    net_ClickReceiveTask(taskId: number) {
        return this.getPlayerData(this.currentPlayerId).receiveTaskReward(taskId);
    }

    /**接收任务超时 */
    net_taskTimeOut(taskId: number) {
        this.getPlayerData(this.currentPlayerId).removeTask(taskId);
        return true;
    }

    /** 添加任务 */
    public addTask(playerid: number, taskId: number): void {
        this.getPlayerData(playerid).addTask(taskId);
    }

    /** 删除任务 */
    public deleteTask(playerid: number, taskId: number): void {
        this.getPlayerData(playerid).removeTask(taskId);
    }

    /**增加任务完成计数 */
    public addTaskCount(playerid: number, taskId: number, count: number) {
        this.getPlayerData(playerid).addTaskCount(taskId, count);
    }

    /**接收任务完成通知 */
    public completeTask(playerId: number, taskId: number): boolean {
        let needCount = GameConfig.Task.getElement(taskId).NeedCount;
        this.getPlayerData(playerId).addTaskCount(taskId, needCount);
        //FIXME 可能需要删除
        if (GameConfig.Task.getElement(taskId).TaskClass == TaskClass.Pet) {
            if (this.getPlayerData(playerId).getOneTask(taskId) && this.getPlayerData(playerId).getOneTask(taskId).complete) {
                this.deleteTask(playerId, taskId);
            }
        }
        return true;
    }

    /** 保存任务和刷新时间 */
    public saveTask(playerid: number) {
        this.getPlayerData(playerid).saveAndUpdateTime();
    }

}