import { MComponent } from "../framework/Component/ComponentManager";
import { MConstructorInject, MPropertiesInject, MSingletonPlugin, RpcPlugin } from "../framework/DI/MContainer";
import { MGameInstance } from "../framework/GameInstance/MGameInstance";
import { CameraManager } from "../camera/CameraManager";
import { MFramework } from "../framework/MFramework";
import { GAModuleC } from "../modules/gasModule/GAModuleC";
import { GAModuleS } from "../modules/gasModule/GAModuleS";
import { LoggerManager, Logger } from "../tools/LoggerTool";
import { MGSTool } from "../tools/MGSToos";
import { ParabolaTool } from "../tools/ParabolaTool";
import { SoundTool } from "../tools/SoundTool";

// import { PlayerNewModuleData } from "../modules/playerNewModule/PlayerNewModuleData";
// import { PlayerNewModuleC } from "../modules/playerNewModule/PlayerNewModuleC";
// import { PlayerNewModuleS } from "../modules/playerNewModule/PlayerNewModuleS";


// 受击1  284759 285100 285427

// 游戏实例类
@MComponent([])
@MSingletonPlugin()
export class GameInstance extends MGameInstance {

    constructor(@MConstructorInject(LoggerManager) logger: LoggerManager, @MConstructorInject(RpcPlugin) private rpc: RpcPlugin) {
        super();
        this.log = logger.getLogger(GameInstance);
    }

    @MPropertiesInject(CameraManager)
    camera: CameraManager;
    // 音乐管理器
    @MPropertiesInject(SoundTool)
    sound: SoundTool;

    private log: Logger;

    onServerStart(): void {
        this.log.warn("GameInstance onServerStart main");
        // 加载资源
        this.downloadAssets();
        // 注册模块
        this.onRegisterModuleModule();
    }
    async onClientStart() {
        this.log.warn("GameInstance onClientStart main");
        // 初始化抛物线工具
        ParabolaTool.init(10);
        // 初始化相机
        this.camera.init();
        // 加载资源
        this.downloadAssets();
        // 注册模块
        this.onRegisterModuleModule();
    }

    private downloadAssets() {
        // for(let config of GameConfig.AssetDownload.getAllElement()){
        //     AssetUtil.asyncDownloadAsset(config.AssetGuid);
        // }
    }



    onRegisterModuleModule() {
        MFramework.registerModule(GAModuleS, GAModuleC, null);
        // MFramework.registerModule(PlayerNewModuleS, PlayerNewModuleC, PlayerNewModuleData);
    }
}