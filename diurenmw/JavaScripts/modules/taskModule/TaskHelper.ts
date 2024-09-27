
import { TaskModuleC } from "./TaskModuleC";
import { TaskModuleS } from "./TaskModuleS";

export class TaskHelper {

    static module: TaskModuleS | TaskModuleC;

    /**添加一个任务（双端）
     * @param taskId 任务id
     * @param playerId 玩家id（服务器端使用）
     */
    public static addTask(taskId: number, playerId?: number): void {
        if (SystemUtil.isClient()) {
            (this.module as TaskModuleC).addTask(taskId);
        }
        if (SystemUtil.isServer()) {
            if (playerId) (this.module as TaskModuleS).addTask(playerId, taskId);
        }
    }

    /**给任务增加完成计数 */
    public static addTaskCount(taskId: number, count: number, playerid?: number) {
        if (SystemUtil.isClient()) {
            (this.module as TaskModuleC).addTaskCount(taskId, count);
        }
        if (SystemUtil.isServer()) {
            if (playerid) {
                (this.module as TaskModuleS).addTaskCount(playerid, taskId, count);
            }
        }
    }

    /**领取一个任务的奖励 */
    public static reciveTaskReward(taskId: number, playerid?: number) {
        if (SystemUtil.isClient()) {
            return (this.module as TaskModuleC).reciveReward(taskId);
        }
    }

    /**设置当前任务 */
    public static setCurTask(taskId: number) {
        if (SystemUtil.isClient()) {
            (this.module as TaskModuleC).curDirectTaskId = taskId;
        }
    }

    /**获取当前任务id */
    public static getCurTask() {
        if (SystemUtil.isClient()) {
            return (this.module as TaskModuleC).curDirectTaskId;
        }
    }

    /**完成一个任务 */
    public static completeTask(taskId: number, playerid?: number) {
        if (SystemUtil.isClient()) {
            (this.module as TaskModuleC).completeTask(taskId);
        }
        if (SystemUtil.isServer()) {
            if (playerid) (this.module as TaskModuleS).completeTask(playerid, taskId);
        }
    }


    /**保存任务 */
    public static saveTask(playerid?: number) {
        if (SystemUtil.isClient()) {
            (this.module as TaskModuleC).saveTask();
        }
        if (SystemUtil.isServer()) {
            if (playerid) {
                (this.module as TaskModuleS).saveTask(playerid);
            }
        }
    }

}