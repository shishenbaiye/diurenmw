import { LoggerManager, Logger } from "../tools/LoggerTool";
import { Constructor, IPlugs, MContainer, MInjectable } from "./DI/MContainer";
import { MGameInstance } from "./GameInstance/MGameInstance";
import { MFramework } from "./MFramework";

/**框架入口 */
export class FEnter {
    private static _instance: FEnter;
    public static get instance(): FEnter {
        if (!this._instance) {
            this._instance = new FEnter();
        }
        return this._instance;
    }

    public gameInstance: MGameInstance = null;

    private initial(gameInstance: Constructor<MGameInstance>) {
        if (MFramework.isLS) {
            if (SystemUtil.isClient()) {
                // 注册DI内部组件
                MContainer.instance.initial();
                // 启动游戏实例
                this.createGameInstance(gameInstance);
            }
        } else {
            // 注册DI内部组件
            MContainer.instance.initial();
            // 启动游戏实例
            this.createGameInstance(gameInstance);
        }
    }

    private createGameInstance(gameInstance: Constructor<MGameInstance>) {
        this.gameInstance = MFramework.createActor(gameInstance);
    }

    private startGameInstance() {
        // 注册一个结束的模块
        if (MFramework.isLS) {
            if (SystemUtil.isClient()) {
                // MFramework.registerModule(MEnterModuleS, MEnterModuleC);
                FEnter.instance.gameInstance.onClientStart();
            }
        } else {

            if(SystemUtil.isClient()){
                FEnter.instance.gameInstance.onClientStart();
            }else{
                FEnter.instance.gameInstance.onServerStart();
            }

            // MFramework.registerModule(MEnterModuleS, MEnterModuleC);
        }
       
    }
}


@MInjectable([
    LoggerManager
])
class MEnterModuleS extends ModuleS<MEnterModuleC, null> implements IPlugs {
    private log: Logger
    importPlugs(_log: LoggerManager): void {
        this.log = _log.getLogger(MEnterModuleS, `MF`);
    }
    protected onStart(): void {
        if (FEnter.instance.gameInstance && !MFramework.isLS) {
            this.log.warn(`onStart`);
            FEnter.instance.gameInstance.onServerStart();
        }
    }
}

@MInjectable([
    LoggerManager
])
class MEnterModuleC extends ModuleC<MEnterModuleS, null> implements IPlugs {
    private log: Logger
    importPlugs(_log: LoggerManager): void {
        this.log = _log.getLogger(MEnterModuleC, `MF`);
    }
    protected onStart(): void {
        this.log.warn("onEnterScene");
        if (FEnter.instance.gameInstance) {
            FEnter.instance.gameInstance.onClientStart();
        }
    }
}

