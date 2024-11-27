import { CameraManager } from "../camera/CameraManager";
import { MComponent } from "../framework/Component/ComponentManager";
import { MSingletonPlugin, MConstructorInject, RpcPlugin, MPropertiesInject } from "../framework/DI/MContainer";
import { MGameInstance } from "../framework/GameInstance/MGameInstance";
import { MFramework } from "../framework/MFramework";
import { LoggerManager, Logger } from "../tools/LoggerTool";
import { ParabolaTool } from "../tools/ParabolaTool";
import { SoundTool } from "../tools/SoundTool";
import { TestModuleC } from "./scenceModules/TestModule/TestModuleC";
import { TestModuleS } from "./scenceModules/TestModule/TestModuleS";


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
        // ParabolaTool.init(10);
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
        MFramework.registerModule(TestModuleS, TestModuleC, null);
    }
}