import { LoadingManager } from "../../common/LoadingManager";
import { MPropertiesInject } from "../../framework/DI/MContainer";
import { MaterialModuleData } from "./MaterialModuleData";
import { MaterialModuleS } from "./MaterialModuleS";

export class MaterialModuleC extends ModuleC<MaterialModuleS, MaterialModuleData> {

    @MPropertiesInject(LoadingManager)
    private load:LoadingManager;

    protected onStart(): void {
        this.load.showMaskLoading();
    }

    net_stopLoading(){
        this.load.hideMaskLoading();
    }
}