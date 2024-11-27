import { LoadingManager } from "../../common/LoadingManager";
import { MPropertiesInject } from "../../framework/DI/MContainer";
import { ConsumableModuleData } from "./ConsumableModuleData";
import { ConsumableModuleS } from "./ConsumableModuleS";

export class ConsumableModuleC extends ModuleC<ConsumableModuleS,ConsumableModuleData> {

    @MPropertiesInject(LoadingManager)
    private load:LoadingManager;

    protected onStart(): void {
        this.load.showMaskLoading();
    }

    net_stopLoading(){
        this.load.hideMaskLoading();
    }
}