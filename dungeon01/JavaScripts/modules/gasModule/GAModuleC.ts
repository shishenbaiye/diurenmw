import { GAModuleData } from "./GAModuleData";
import { GAModuleS } from "./GAModuleS";

export class GAModuleC extends ModuleC<GAModuleS,GAModuleData>{
    protected onStart(): void {
        InputUtil.onKeyDown(Keys.O,()=>{
            this.server.net_OnClick();
        })
    }
}