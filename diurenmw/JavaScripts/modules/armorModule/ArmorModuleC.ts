import { LoadingManager } from "../../common/LoadingManager";
import { MPropertiesInject } from "../../framework/DI/MContainer";
import { ArmorModuleData } from "./ArmorModuleData";
import { ArmorModuleS } from "./ArmorModuleS";

export class ArmorModuleC extends ModuleC<ArmorModuleS,ArmorModuleData>{
    @MPropertiesInject(LoadingManager)
    private load:LoadingManager;

    protected onStart(): void {
        this.load.showMaskLoading();
    }

    net_stopLoading(){
        this.load.hideMaskLoading();
    }
}