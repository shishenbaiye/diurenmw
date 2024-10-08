import { BagManagerModuleData, BagItemBase, ItemType, eventType } from "./BagManagerModuleData";
import { BagManagerModuleS } from "./BagManagerModuleS";
import BagManagerUI from "./UI/BagManagerUI";
import BagItemUI from "./UI/BagItemUI";

export class BagManagerModuleC extends ModuleC<BagManagerModuleS,BagManagerModuleData> {
    bagManagerUIObj : BagManagerUI;
    onButtonClickEvents: mw.MulticastDelegate<eventType>;

    /**
     * @groups 基类/C&S拓展
     * @description 生命周期方法-创建模块时调用
     * @effect 只在客户端调用生效
     */
    protected onAwake(): void {
        this.onButtonClickEvents = new mw.MulticastDelegate<eventType>;
        this.onButtonClickEvents.add(this.onButtonClickEvent.bind(this));
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
        mw.InputUtil.onKeyDown(Keys.B, this.onBagOpen.bind(this));

        mw.InputUtil.onKeyDown(Keys.One, () => {
            console.log("BagModuleC onKeyOne");
            this.server.net_TestAddItem(mw.Player.localPlayer);
        });
    }

    // 打开背包
    protected onBagOpen(): void {
        this.bagManagerUIObj = UIService.show(BagManagerUI);
        new mw.MulticastDelegate<eventType>
        this.bagManagerUIObj.init(this.data, this.onButtonClickEvents);
    }

    onButtonClickEvent(wid : number)
    {
        this.server.net_OnButtonClick(mw.Player.localPlayer, wid);
    }

    // 更新客户端背包数据
    net_updateBagData(bagItemBase : BagItemBase): void {
        this.data.addItem(bagItemBase);
        if(this.bagManagerUIObj && bagItemBase.itemtype == this.bagManagerUIObj.currentTypePage)
        {
            this.bagManagerUIObj.BagItemObjs.forEach((value: BagItemUI, index: number, array: BagItemUI[])=>{
                value.updateItemUI(index, bagItemBase.itemtype);
            }); 
        }
    }
}