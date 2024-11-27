import { DSBroadcastTypeEnum, DSEventModuleS } from "./DSEventModuleS";

export class DSEventModuleC extends ModuleC<DSEventModuleS, null> {

    public isMaster(): boolean {
        return this.server.net_IsMaster(DSBroadcastTypeEnum.Game, false);

    }

    public getMasterId(): string {
        return this.server.net_GetMasterId(DSBroadcastTypeEnum.Game, false);
    }

}