import { RankCustomizedData, RankCustomizedDataCount, RankCustomizedDataSyncTime, RankCustomizedDataTitle } from "./RankCustomizedData";
import { RankModuleC } from "./RankModuleC";

export class RankModuleS extends ModuleS<RankModuleC, null> {

    private lastRankData: RankCustomizedData[]

    private syncIndex: number = 0;

    protected onStart(): void {
        this.pullRankData()
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        if (this.lastRankData) {
            this.getClient(player).net_refresh_rank(this.lastRankData)
        }
    }

    protected onUpdate(dt: number): void {
        //相隔一段时间同步数据
        if (this.syncIndex <= 0) {
            this.pullRankData()
            this.syncIndex = RankCustomizedDataSyncTime;
        }
        this.syncIndex -= dt;
    }


    // 拉取玩家排行, 排序, 同步
    private async pullRankData(): Promise<void> {
        let pullResult = await DataStorage.asyncGetData(RankCustomizedDataTitle)
        // 拉取失败
        if (pullResult.code != DataStorageResultCode.Success) return
        // 无数据上传数据
        if (!pullResult.data) await DataStorage.asyncSetData(RankCustomizedDataTitle, [])
        // 赋值数据
        this.lastRankData = <RankCustomizedData[]>pullResult.data || []
        // 同步给所有玩家
        this.getAllClient().net_refresh_rank(this.lastRankData)
    }


    // 推送玩家排行榜数据
    private async pushPlayerRankData(playerId: number, data: number): Promise<void> {
        let player = Player.getPlayer(playerId);
        //玩家名称
        let playerName = `test_name`;
        //数据错误
        if (!player || !this.lastRankData || !playerName || playerName == "") {
            console.error(`排行榜数据错误 ：${player} :${this.lastRankData} :${playerName}`)
            return;
        }
        //TODO 当前数据 可以通过模块去找 
        let count = data || 0;
        //索引
        let oldDataIndex = this.lastRankData.findIndex(datum => datum.userID == player.userId);
        //旧数据
        let oldData = this.lastRankData[oldDataIndex];
        //新数据
        let newData: RankCustomizedData = { userID: player.userId, userName: playerName, userData: count };
        if (oldDataIndex == -1) {
            // 没有, 添加
            this.lastRankData.push(newData);
        } else {
            //   在, 替换
            if (newData.userData <= oldData.userData) return;
            this.lastRankData[oldDataIndex] = newData;
        }
        // 排序
        this.lastRankData.sort((a, b) => { return b.userData - a.userData })
        // 部分获取
        this.lastRankData.splice(RankCustomizedDataCount, this.lastRankData.length)
        // 上传
        await DataStorage.asyncSetData(RankCustomizedDataTitle, this.lastRankData)
    }

    //击杀数刷新
    public async refreshData(playerId: number, data: number): Promise<void> {
        //排行榜数据
        await this.pushPlayerRankData(playerId, data);
    }

}