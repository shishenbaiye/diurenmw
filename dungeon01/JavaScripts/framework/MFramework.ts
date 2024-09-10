import { ActorManager } from "./Actor/ActorManager";
import { MActor } from "./Actor/MActor";
import { ComponentManager } from "./Component/ComponentManager";
import { MBaseComponent } from "./Component/MBaseComponent";
import { Constructor, MContainer } from "./DI/MContainer";
import { FEnter } from "./FEnter";
import { MObject } from "./Object/MObject";

/**对外调用的类 */
export class MFramework {
    public static isLS: boolean = false;

    /**注册游戏实例 */
    public static initial(gameInstance: any) {
        if (!gameInstance) {
            throw new Error("gameInstance is null, please enter a gameInstance!");
        }
        FEnter.instance[`initial`](gameInstance);
    }

    public static enterGame() {
        FEnter.instance[`startGameInstance`]();
    }

    /**注册模块并扩展加入依赖注入 */
    public static registerModule(ServerModuleType: mw.TypeName<mwext.ModuleS<any, any>>, ClientModuleType: mw.TypeName<mwext.ModuleC<any, any>>, ModuleDataType?: mw.TypeName<mwext.Subdata>) {
        ModuleService.registerModule(ServerModuleType, ClientModuleType, ModuleDataType);
        if (SystemUtil.isClient()) {
            let module = ModuleService.getModule(ClientModuleType);
            MContainer.instance.varInjection(module);
            MContainer.instance.setterInjection(module);
        } else {
            let module = ModuleService.getModule(ServerModuleType);
            MContainer.instance.varInjection(module);
            MContainer.instance.setterInjection(module);
        }
        return this;
    }

    /**创建一个MObject */
    public static createObject<T extends MObject>(mobject: any): T {
        if (mobject._isMOject_) {
            return MContainer.instance.constructorInjection(mobject);
        } else {
            console.error("createObject error, mobject is not a MObject");
        }
    }

    /**创建一个MActor */
    public static createActor<T extends MActor>(mActor: any): T {
        return ActorManager.instance.createActor(mActor);
    }

    /**创建一个MComponent */
    public static createComponent<T extends MBaseComponent>(mComponent: any): T {
        return ComponentManager.instance.createComponent(mComponent);
    }
}