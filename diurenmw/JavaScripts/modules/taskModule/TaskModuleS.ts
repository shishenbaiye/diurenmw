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
    addTask(playerid: number, taskId: number): void {
        throw new Error("Method not implemented.");
    }
    deleteTask(playerid: number, taskId: number): void {
        throw new Error("Method not implemented.");
    }

}