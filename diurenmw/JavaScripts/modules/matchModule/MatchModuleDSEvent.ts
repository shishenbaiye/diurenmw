import { DSBroadcastTypeEnum, DSEvent, DSFunc, DSIgnoreVersion, DSWhoHandleEnum } from "../dSEventModule/DSEventModuleS";
import { MatchQueueConfig } from "./base/PlayerMatchConfig";
import { PlayerMatchInfo } from "./base/PlayerMatchInfo";
import { MatchModuleS } from "./MatchModuleS";

export class MatchDSEvent extends DSEvent {
    public onCancelMaster() { }
    public onConfirmMaster() { }
    public onAwake() { }
    //注册配置
    private allConfig: Map<string, MatchQueueConfig> = new Map();
    //匹配队列
    public matchQueue: Map<string, PlayerMatchInfo[]> = new Map();
    //玩家映射队列
    public player2Queue: Map<string, string> = new Map();


    /**
     * 加入队列,执行在相同场景的所有DS节点
     * @param userId 
     * @param queueType 
     * @returns 
     */
    @DSFunc(DSBroadcastTypeEnum.Game, DSWhoHandleEnum.Master, DSIgnoreVersion.None)
    public joinQueue(userIds: PlayerMatchInfo[], queueType: string) {
        let config = this.allConfig.get(queueType);
        //没有注册
        if (!config) return;
        if (!this.matchQueue.has(queueType)) {
            this.matchQueue.set(queueType, []);
        }

        for (let i = 0; i < userIds.length; i++) {
            let userId = userIds[i];
            if (this.player2Queue.has(userId.userId)) {
                continue;
            }

            let queue = this.matchQueue.get(queueType);
            queue.push(userId);
            this.player2Queue.set(userId.userId, queueType);
        }

        ModuleService.getModule(MatchModuleS).onPlayerJoinMatchQueueAction.call(userIds, queueType);
    }
    /**
     * 离开队列,执行在相同场景的所有DS节点
     * @param userIds 
     */
    @DSFunc(DSBroadcastTypeEnum.Game, DSWhoHandleEnum.Master, DSIgnoreVersion.None)
    public leftQueue(userIds: string[]) {

        userIds.forEach(userId => {
            if (!this.player2Queue.has(userId)) {
                return;
            }

            let queueType = this.player2Queue.get(userId);
            let queue = this.matchQueue.get(queueType);
            let index = queue.findIndex((item) => item.userId == userId);
            if (index >= 0) {
                queue.splice(index, 1);
            }
            this.player2Queue.delete(userId);
        })

        ModuleService.getModule(MatchModuleS).onPlayerLeftMatchQueueAction.call(userIds);

    }

    /**
     * 注册匹配队列
     * @param queueType 队列类型 
     * @param minStartCount 最小匹配完成数量
     * @param maxStartCount 最大匹配完成数量
     * @param minWaitDur 达到最小数量后等待时间。单位秒
     */
    public registerMatchQueue(config: MatchQueueConfig) {
        this.allConfig.set(config.queueType, config);
    }
    /**
     * 获取所有队列数量
     */
    public getQueueAllCount(): number {
        return this.player2Queue.size;
    }
    /**
     * 获取队列类型数量
     * @returns 
     */
    public getQueueType(): number {
        return this.matchQueue.size;
    }

    /**
     * 处理队列,所有节点本地执行,但只有Master节点会执行匹配
     * @param dt 
     * @returns 
     */
    public handleQueue(dt: number) {
        if (!this.isMaster(DSBroadcastTypeEnum.Game, false)) return;
        this.matchQueue.forEach(async (list, queueType, maps) => {
            list.forEach(e => {
                e.waitSec += dt;
            })
            //参数校验
            let config = this.allConfig.get(queueType);
            if (!config) {
                return;
            }
            //小于最小人数
            if (list.length < config.minStartCount) {
                return;
            }
            //等待时间没到
            if (config.curDur < config.minWaitDur && list.length < config.maxStartCount) {
                config.curDur += dt;
                return;
            }
            // 自定义匹配规则
            let matchRes = null;
            if (config.matchListSort) {
                matchRes = await config.matchListSort(list);
            }
            if (!matchRes) {
                return;
            }
            // 处理匹配结果
            matchRes.matchGroup.forEach((matchList) => {
                let matchListUserId = [];
                matchList.forEach((userId) => {
                    this.player2Queue.delete(userId.userId);
                    matchListUserId.push(userId.userId);
                });

                // 回调匹配
                ModuleService.getModule(MatchModuleS).matchCompleteAction.call(matchList, config);

                // 广播退出队列
                this.leftQueue(matchListUserId)

            });

            // 队列更新
            if (!matchRes.waitMatch) {
                matchRes.waitMatch = [];
            }
            list = matchRes.waitMatch;
            this.matchQueue.set(queueType, list);
        })

    }

}
