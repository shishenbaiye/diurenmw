import { GameConfig } from "../../configs/GameConfig";
import { TaskClass, TaskGuideStep } from "../taskModule/TaskBase/TaskEnum";
import { TaskHelper } from "../taskModule/TaskHelper";
import TaskModuleData from "../taskModule/TaskModuleData";
import { ETutorialProgress, ETutorialStep, EUnLockModule, GuideStep, TutorialWorldType } from "./TutorialBase/TutorialEnum";
import { TutorialHelper } from "./TutorialHelper";
import { TutorialManager } from "./TutorialManager";
import { TutorialModuleC } from "./TutorialModuleC";
import { TutorialModuleData } from "./TutorialModuleData";

export class TutorialModuleS extends ModuleS<TutorialModuleC, TutorialModuleData> {

    protected onAwake(): void {
        TutorialHelper.module = this;
    }
    private oldGuideStep: number[] = [1, 2, 3, 4, 5, 6, 8, 12, 10, 11];
    /**玩家进入事件 */
    protected onPlayerEnterGame(player: mw.Player): void {
        // this.getClient(player.playerId).net_checkConflateTutor();
        if (!this.getPlayerData(player).isCompleteGuide) {
            if (this.getPlayerData(player).guideStep == GuideStep.STEP6) {
                if (TutorialManager.getInstance().getTutorialIsComplete(ETutorialStep.PetGuide1, player.playerId) == ETutorialProgress.NotStart) {
                    this.StartTutorial(player.playerId, GuideStep.STEP5);
                } else {
                    this.StartTutorial(player.playerId, this.getPlayerData(player).guideStep);
                }
            } else {
                this.StartTutorial(player.playerId, this.getPlayerData(player).guideStep);
            }
            this.initNewGuide(player.playerId);
        } else {
            if (this.getPlayerData(player).isOpenDailyTask) {
                this.getClient(player.playerId).net_unlockModule(EUnLockModule.All);
                this.StartTutorial(player.playerId, GuideStep.Completed);
            } else {
                this.getClient(player.playerId).net_unlockModule(EUnLockModule.Pet);
                this.StartTutorial(player.playerId, GuideStep.STEP5);
            }

            if (this.getPlayerData(player).newGuide.length == 0) {
                let arr = [];
                GameConfig.TutorialList.getAllElement().forEach((value, key) => {
                    if (this.oldGuideStep.indexOf(value.id) == -1) {
                        arr.push([value.id, 0]);
                    } else {
                        arr.push([value.id, 1]);
                    }
                });
                this.getPlayerData(player).newGuide = arr;
            }
        }
        this.getClient(player).net_initNewGuide();
    }

    /**玩家离开事件 */
    protected onPlayerLeft(player: mw.Player): void {
        this.getPlayerData(player).saveNewGuide();
    }

    private StartTutorial(playerid: number, guideStep: GuideStep): void {
        this.getClient(playerid).net_StartTutorial(guideStep);
    }

    /**玩家完成引导步骤 */
    public net_completeStep(step: GuideStep) {
        let playerid = this.currentPlayerId;
        this.getPlayerData(playerid).guideStep = step;
        return true;
    }

    /**玩家创建完角色正式进入游戏 */
    public net_playerEnterGame() {
        let playerid = this.currentPlayerId;
        // EventBus.emit(EventEnum.PLAYER_ENTER_GAME,playerid);
    }

    /**玩家可以接收随机任务了 */
    public net_canSendRandomTask() {
        let playerid = this.currentPlayerId;
        this.getPlayerData(playerid).isSendRandomTask = true;
    }

    /**玩家已经到过哪里 */
    public net_EnterWorld(where: TutorialWorldType) {
        switch (where) {
            case TutorialWorldType.PetShop:
                // this.getPlayerData(this.currentPlayerId).isFirstEnterPetShop = false;
                break;
        }
    }

    /**改变data值 */
    public net_changeDataValue(key: string, value: any) {
        let player = this.currentPlayer;
        this.getPlayerData(player)[key] = value;
    }

    /**完成新手引导 */
    public net_completeTutorial() {
        let playerid = this.currentPlayerId;
        this.getPlayerData(playerid).guideStep = GuideStep.Completed;
        this.getPlayerData(playerid).isCompleteGuide = true;
        return true;
    }
    public net_createDayOneTask() {
        let playerid = this.currentPlayerId;
        let dailyTaskCount = 0;
        GameConfig.Task.getAllElement().filter((value) => {
            if (value.TaskClass == TaskClass.Daily) {
                dailyTaskCount++;
            }
        });
        for (let i = 1; i <= dailyTaskCount; i++) {
            TaskHelper.addTask(i, playerid);
            if (i == 1) {
                TaskHelper.completeTask(i, playerid);
            }
        }
        this.getPlayerData(playerid).isOpenDailyTask = true;
        TaskHelper.saveTask(playerid);
    }

    /**完成新手指南任务 */
    public net_completeTutorialTask(taskid: number) {
        let playerid = this.currentPlayerId;
        let tasklist = this.getPlayerData(playerid).guideTaskList;
        let index = tasklist.indexOf(taskid);
        if (index != -1) {
            tasklist.splice(index, 1);
        }
        this.getPlayerData(playerid).guideTaskList = tasklist;
        return tasklist;
    }

    /**获取未完成的初学者手册任务列表 */
    public net_getUnCompleteTaskList() {
        return this.getPlayerData(this.currentPlayerId).guideTaskList;
    }

    /**设置能看到其他人 */
    public net_setCanSeeAllPlayer(canSee: boolean) {
        this.getPlayerData(this.currentPlayerId).isCanSeeOtherPlayer = canSee;
    }

    /**获取鱼竿 */
    public net_GetFishingRod() {
        this.getPlayerData(this.currentPlayerId).isGetFishingRod = true;
    }

    protected onStart(): void { }

    private isShowUI: boolean = true;
    /**根据状态初始化新引导数据 */
    initNewGuide(playerid: number) {
        if (this.getPlayerData(playerid).newGuide.length == 0) {
            if (this.getPlayerData(playerid).isSendRandomTask) {
                let arr = [];
                GameConfig.TutorialList.getAllElement().forEach((value, key) => {
                    if (value.id == 1) {
                        arr.push([value.id, 1]);
                    } else {
                        arr.push([value.id, 0]);
                    }
                });
                let taskData = DataCenterS.getData(playerid, TaskModuleData);
                let index = taskData.taskList.indexOf(TaskGuideStep.Guide2);
                if (index != -1) {
                    let state = taskData.countTaskList[index];
                    if (state == 1) {
                        arr.forEach((value) => {
                            if ([2, 3, 4, 5, 6].includes(value[0])) {
                                value[1] = 1;
                                if (this.isShowUI) {
                                    this.isShowUI = false;
                                    this.getClient(playerid).net_unlockModule(EUnLockModule.Pet);
                                }
                            }
                        });
                    }
                }
                let index2 = taskData.taskList.indexOf(TaskGuideStep.Guide3);
                if (index2 != -1) {
                    let state = taskData.countTaskList[index2];
                    if (state == 1) {
                        arr.forEach((value) => {
                            if ([7, 8].includes(value[0])) {
                                value[1] = 1;
                            }
                        });
                    }
                }

                this.getPlayerData(playerid).newGuide = arr;
                setTimeout(() => {
                    TaskHelper.addTask(TaskGuideStep.Guide4, playerid);
                    TaskHelper.addTask(TaskGuideStep.Guide5, playerid);
                }, 0);
                let arrc = this.getPlayerData(playerid).guideTaskList;
                arrc.push(TaskGuideStep.Guide4);
                arrc.push(TaskGuideStep.Guide5);
                this.getPlayerData(playerid).guideTaskList = arrc;

            } else {
                let arr = [];
                GameConfig.TutorialList.getAllElement().forEach((value, key) => {
                    arr.push([value.id, 0]);
                });
                this.getPlayerData(playerid).newGuide = arr;
            }
        }
    }

    /**保存新手引导数据 */
    net_saveTutorial(id: number, value: number) {
        let playerid = this.currentPlayerId;
        let arr = this.getPlayerData(playerid).newGuide;
        let index = arr.findIndex((value1) => {
            return value1[0] == id;
        });
        if (index != -1) {
            arr[index][1] = value;
        }
        this.getPlayerData(playerid).newGuide = arr;
    }

    /**第一次进入采矿引导 */
    net_firstMining() {
        this.currentData.isFirstEnterMining = false;
    }

    /**第一次进入钓鱼引导 */
    net_firstFishing() {
        this.currentData.isFirstEnterFishing = false;
    }

    /**第一次进入宠物引导 */
    net_firstPet() {
        this.currentData.isFirstEnterPet = false;
    }

}