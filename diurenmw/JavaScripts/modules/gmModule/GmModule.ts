import { AddGMCommand } from "module_gm";
import GameStart from "../../GameStart";
import { Singleton } from "../../tools/Singleton";
import GMPanel from "./ui/GMPanel";

export class GMManager extends Singleton {


    init() {
        AddGMCommand(
            "增加道具", () => { }, (player: mw.Player, itemId: string) => { }
        );
        AddGMCommand(
            "添加段位分", () => { }, (player: mw.Player, itemId: string) => { }
        );
        AddGMCommand(
            "增加buff", () => { }, (player: mw.Player, itemId: string) => { }
        );
        AddGMCommand(
            "增加属性", () => { }, (player: mw.Player, itemId: string) => { }
        );
    }
}


export class GMModuleC extends ModuleC<GMModuleS, null> {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (GameStart.instance.openGM) {
            GMManager.getInstance().init();
            let ui = new GMPanel();
            ui.show();
        }
    }
}
export class GMModuleS extends ModuleS<GMModuleC, null> {

}