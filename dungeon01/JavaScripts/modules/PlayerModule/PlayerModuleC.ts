import { PlayerModuleData } from "./PlayerModuleData";
import { PlayerModuleS } from "./PlayerModuleS";

export class PlayerModuleC extends ModuleC<PlayerModuleS, PlayerModuleData> {

    protected onStart(): void {
        let name = AccountService.getNickName();
        if (SystemUtil.isPIE) name = `player:${this.localPlayer.playerId}`;
        this.server.net_initPlayer(name)
    }

}