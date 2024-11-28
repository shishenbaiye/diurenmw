import { PlayerMatchInfo } from "./base/PlayerMatchInfo";
import { MatchModuleS } from "./MatchModuleS";

export class MatchModuleC extends ModuleC<MatchModuleS, null> {

    public async joinQueue(queueType: string, userIds?: PlayerMatchInfo[]) {
        await this.server.net_JoinQueue(queueType, userIds);
    }

    public async leftQueue() {
        await this.server.net_LeftQueue(mw.Player.localPlayer.userId);
    }

}