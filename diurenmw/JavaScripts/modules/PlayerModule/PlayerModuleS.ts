import { GameEventBus } from "../../common/eventBus/EventBus";
import { PlayerModuleC } from "./PlayerModuleC";
import { PlayerModuleData } from "./PlayerModuleData";

export class PlayerModuleS extends ModuleS<PlayerModuleC,PlayerModuleData>{
    protected onAwake(): void {
        GameEventBus.on(`AttributeModule_Ready`,this.onAttributeAllReady.bind(this))
    }

    onAttributeAllReady(player:mw.Player){
        
    }
}