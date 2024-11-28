import { PlayerMatchInfo } from "./PlayerMatchInfo";

/** 组队配置 */
export class MatchQueueConfig {
    public queueType: string = "";
    public minStartCount: number = 0;
    public maxStartCount: number = 0;
    public minWaitDur: number = 0;
    public teleportSceneName: string = "";
    public isLockRoom: boolean = false;
    public getAttachDataCall: (users: PlayerMatchInfo[], config: MatchQueueConfig) => string;
    public matchListSort: (list: PlayerMatchInfo[]) => {
        matchGroup: PlayerMatchInfo[][], waitMatch: PlayerMatchInfo[]
    } = null;

    public curDur: number = 0;
}