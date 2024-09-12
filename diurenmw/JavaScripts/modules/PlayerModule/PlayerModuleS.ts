import { PlayerModuleC } from "./PlayerModuleC";
import { PlayerModuleData } from "./PlayerModuleData";

export class PlayerModuleS extends ModuleS<PlayerModuleC,PlayerModuleData>{
    protected onPlayerEnterGame(player: mw.Player): void {
        
    }
}