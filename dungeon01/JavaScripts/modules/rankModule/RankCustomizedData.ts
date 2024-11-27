export interface RankCustomizedData {
    userID: string
    userName: string
    //存放数据
    userData: number
}
//排行榜名称
export const RankCustomizedDataTitle: string = 'RankCustomizedDataTitle';
//排行榜数据
export const RankCustomizedDataCount: number = 30;
//排行榜刷新
export const RankCustomizedDataSyncTime = 8;