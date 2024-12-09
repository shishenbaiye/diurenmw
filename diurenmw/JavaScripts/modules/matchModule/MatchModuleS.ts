import { SceneType } from "../../GameStart";
import { DSEventModuleS } from "../dSEventModule/DSEventModuleS";
import { SceneModuleS } from "../sceneModule/SceneModuleS";
import { MatchQueueConfig } from "./base/PlayerMatchConfig";
import { PlayerMatchInfo } from "./base/PlayerMatchInfo";
import { MatchModuleC } from "./MatchModuleC";
import { MatchDSEvent } from "./MatchModuleDSEvent";


export class MatchModuleS extends ModuleS<MatchModuleC, null> {

    /**
     * 匹配完成事件
     */
    public matchCompleteAction: Action2<PlayerMatchInfo[], MatchQueueConfig> = new Action2();

    /**
     * 玩家匹配队列进入事件
     */
    public onPlayerJoinMatchQueueAction: Action2<PlayerMatchInfo[], string> = new Action2();

    /**
     * 玩家匹配队列离开事件
     */
    public onPlayerLeftMatchQueueAction: Action1<string[]> = new Action1();

    /**
     * 匹配队列DS事件
     */
    private matchDsEvent: MatchDSEvent = null;

    /**
     * 当脚本被实例后，会在第一帧更新前调用此函数
     */
    protected onAwake(): void {
        ModuleService.getModule(DSEventModuleS).registerDSEvent(MatchDSEvent);
        this.matchDsEvent = ModuleService.getModule(DSEventModuleS).getDSEvent(MatchDSEvent);
    }

    protected async onUpdate(dt: number): Promise<void> {
        if (this.matchDsEvent) {
            await this.matchDsEvent.handleQueue(dt);
        }
    }

    protected onPlayerLeft(player: mw.Player): void {
        this.net_LeftQueue(player.userId);
    }

    public teleport(sceneName: SceneType, userIds: string[], isLockRoom: boolean, attachData: string) {
        ModuleService.getModule(SceneModuleS).changeScene(sceneName, userIds, isLockRoom, attachData)
    }

    /**
     * 注册匹配队列
     * @param queueType 队列类型 
     * @param teleportSceneName 跳转场景名称
     * @param minStartCount 最小匹配完成数量
     * @param maxStartCount 最大匹配完成数量
     * @param minWaitDur 达到最小数量后等待时间。单位秒
     * @param isLockRoom 是否锁定房间
     * @param getAttachDataCall 获取附加数据
     * @param matchListSort 匹配列表排序
     */
    public registerMatchQueue(queueType: string, teleportSceneName: string, minStartCount: number,
        maxStartCount: number, minWaitDur: number, isLockRoom: boolean,
        getAttachDataCall: (userIds: PlayerMatchInfo[], config: MatchQueueConfig) => string = null,
        matchListSort: (list: PlayerMatchInfo[]) => {
            matchGroup: PlayerMatchInfo[][], waitMatch: PlayerMatchInfo[]
        } = null) {
        let newConfig = new MatchQueueConfig();
        newConfig.queueType = queueType;
        newConfig.minStartCount = minStartCount;
        newConfig.maxStartCount = maxStartCount;
        newConfig.minWaitDur = minWaitDur;
        newConfig.isLockRoom = isLockRoom;
        newConfig.teleportSceneName = teleportSceneName;
        newConfig.getAttachDataCall = getAttachDataCall;
        newConfig.matchListSort = matchListSort;
        this.matchDsEvent.registerMatchQueue(newConfig);
    }



    /**
     * 获取队列状态
     * @returns 
     */
    net_GetState() {
        this.matchDsEvent.getQueueAllCount();
        this.matchDsEvent.getQueueType();
        return {
            queueCount: this.matchDsEvent.getQueueAllCount(),
            queueTypeCount: this.matchDsEvent.getQueueType()
        }

    }

    /**
     * 加入队列
     * @param queueType 队列类型
     * @param userIds 用户ids
     */
    net_JoinQueue(queueType: string, userIds: PlayerMatchInfo[]) {
        if (this.matchDsEvent) {
            this.matchDsEvent.joinQueue(userIds, queueType);
        }
    }

    /**
     * 离开队列
     * @param userId 用户id
     */
    net_LeftQueue(...userIds: string[]) {
        if (this.matchDsEvent) {
            this.matchDsEvent.leftQueue(userIds);
        }
    }


}