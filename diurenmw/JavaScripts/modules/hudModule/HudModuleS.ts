import { GameEventBus } from "../../common/eventBus/EventBus";
import { HudModuleC } from "./HudModuleC";

export class HudModuleS extends ModuleS<HudModuleC,null>{
    protected onAwake(): void {
        GameEventBus.on(`AttributeModule_Ready`, this.onAttributeAllReady.bind(this))
    }

    onAttributeAllReady(player: mw.Player) {
        this.getClient(player).net_initHud();
    }
}