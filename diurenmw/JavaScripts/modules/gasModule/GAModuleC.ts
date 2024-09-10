import { GAModuleS } from "./GAModuleS";

export class GAModuleC extends ModuleC<GAModuleS,null>{
    protected onStart(): void {
        InputUtil.onKeyDown(Keys.O,()=>{
            this.server.net_OnClick();
        })
    }
}