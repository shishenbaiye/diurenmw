import { LoadingManager } from "../../common/LoadingManager";
import { MPropertiesInject } from "../../framework/DI/MContainer";
import { WeaponModuleData } from "./WeaponModuleData";
import { WeaponModuleS } from "./WeaponModuleS";

export class WeaponModuleC extends ModuleC<WeaponModuleS,WeaponModuleData> {

    @MPropertiesInject(LoadingManager)
    private load:LoadingManager;

    protected onStart(): void {
        this.load.showMaskLoading();
    }

    net_stopLoading(){
        this.load.hideMaskLoading();
    }
}