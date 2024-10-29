import { PlayerModuleData } from "./PlayerModuleData";
import { PlayerModuleS } from "./PlayerModuleS";

export class PlayerModuleC extends ModuleC<PlayerModuleS, PlayerModuleData> {

    protected onStart(): void {
        this.server.net_initPlayer(AccountService.getNickName())
    }

}