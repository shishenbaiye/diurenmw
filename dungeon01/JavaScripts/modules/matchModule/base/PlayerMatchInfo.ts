export class PlayerMatchInfo {
    /** 唯一标识 */
    public onlyId: number;
    /** 用户id */
    public userId: string;
    /** 传输数据 */
    public attachData: string = "";
    /** 匹配等待时间 */
    public waitSec: number = 0;
}