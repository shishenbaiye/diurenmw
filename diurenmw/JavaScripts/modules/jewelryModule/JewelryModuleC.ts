import { LoadingManager } from "../../common/LoadingManager";
import { MPropertiesInject } from "../../framework/DI/MContainer";
import { JewelryModuleData } from "./JewelryModuleData";
import { JewelryModuleS } from "./JewelryModuleS";

export class JewelryModuleC extends ModuleC<JewelryModuleS,JewelryModuleData>{
    @MPropertiesInject(LoadingManager)
    private load:LoadingManager;

    protected onStart(): void {
        this.load.showMaskLoading();
    }

    net_stopLoading(){
        this.load.hideMaskLoading();
    }
}