import GameStart, { SceneType } from "../../GameStart";
import { SceneModuleData } from "./SceneModuleData";
import { SceneModuleS } from "./SceneModuleS";

export class SceneModuleC extends ModuleC<SceneModuleS, SceneModuleData> {

    public onChangeScene: Action = new Action();

    protected onStart(): void {
        switch (GameStart.instance.selectedSceneType) {
            case SceneType.MainCity:
                break;
            case SceneType.Dungeon01:
                break;
        }
    }

    /** 场景切换 */
    public sceneChange(type: SceneType,): void {
        this.server.net_changeScene(type, [this.localPlayer.userId]);
        this.onChangeScene.call(type);
    }

    // 返回主场景
    public backMain(): void {
        this.sceneChange(SceneType.MainCity);
    }
}
