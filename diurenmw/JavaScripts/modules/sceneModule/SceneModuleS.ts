import GameStart, { SceneType } from "../../GameStart";
import { SceneModuleC } from "./SceneModuleC";
import { SceneModuleData } from "./SceneModuleData";

export class SceneModuleS extends ModuleS<SceneModuleC, SceneModuleData> {
    /**玩家携带数据 */
    private telData: Map<string, string> = new Map();

    protected onPlayerEnterGame(player: mw.Player): void {
        if (!this.telData.has(player.userId)) {
            this.telData.set(player.userId, TeleportService.getTeleportData(player.teleportId) as string);
        }

    }

    protected onPlayerLeft(player: mw.Player): void {
        if (this.telData.has(player.userId)) {
            this.telData.delete(player.userId);
        }
    }


    net_changeScene(sceneType: SceneType, userList: string[], isLock: boolean = false, playerData: string = null) {
        this.changeScene(sceneType, userList, isLock, playerData)
    }

    /**
    * 场景传送
    * @param sceneType  场景类型
    * @param userList   传送列表
    * @param isLock     锁房判断
    * @param playerData 携带数据
    * @returns 
    */
    public changeScene(sceneType: SceneType, userList: string[], isLock: boolean = false, playerData: string = null): void {
        if (sceneType === GameStart.instance.selectedSceneType) return;
        TeleportService.asyncTeleportToScene(sceneType, userList, {
            createNewPrivateRoom: isLock,
            teleportData: playerData,
        });
    }

}
