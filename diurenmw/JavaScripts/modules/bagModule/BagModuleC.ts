import { BagModuleData } from "./BagModuleData";
import { BagModuleS } from "./BagModuleS";
import BagUI from "./UI/BagUI";
import { BagItemBase, ItemType } from "./ItemBase";

export class BagModuleC extends ModuleC<BagModuleS,BagModuleData> {
    /**
     * @groups 基类/C&S拓展
     * @description 生命周期方法-创建模块时调用
     * @effect 只在客户端调用生效
     */
    protected onAwake(): void {
        
    }

    onAttributeAllReady(player:mw.Player){
        
    }

    /**
     * @groups 基类/C&S拓展
     * @description 生命周期方法-启动模块时调用
     * @effect 只在客户端调用生效
     */
    protected onStart(): void {
        
    }

    /**
     * @groups 基类/C&S拓展
     * @description 生命周期方法-进入场景调用
     * @effect 只在客户端调用生效
     * @param sceneType usage: 场景类型(预留)  range: type:
     */
    protected onEnterScene(sceneType: number): void {
        this.Init();
    }
    /**
     * @groups 基类/C&S拓展
     * @description 生命周期方法-刷新模块调用
     * @effect 只在客户端调用生效
     * @param dt usage: 两帧之间的时间差(单位：秒) range: type:浮点数
     */
    protected onUpdate(dt: number): void {
        
    }
    /**
     * @groups 基类/C&S拓展
     * @description 生命周期方法-销毁模块调用
     * @effect 只在客户端调用生效
     */
    protected onDestroy(): void {
        
    }

    // 初始化背包
    protected Init(): void {
        mw.InputUtil.onKeyDown(Keys.B, this.onBagOpen);

        mw.InputUtil.onKeyDown(Keys.One, () => {
            console.log("BagModuleC onKeyOne");
            this.server.net_TestAddItem(mw.Player.localPlayer);
        });
    }

    // 打开背包
    protected onBagOpen(): void {
        UIService.show(BagUI);
    }

    // 更新客户端背包数据
    net_updateBagData(BagItemBase : BagItemBase): void {
        this.data.addItem(BagItemBase);
    }
}