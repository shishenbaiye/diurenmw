import { BagManagerModuleData, BagItemBase, ItemType, eventType, EquipmentType } from "./BagManagerModuleData";
import { BagManagerModuleS } from "./BagManagerModuleS";
import BagItemUI from "./UI/BagItemUI";
import { GameEventBus } from "../../common/eventBus/EventBus";
import BagAttributeUI from "./UI/BagAttributeUI";
import BagMainUI from "./UI/BagMainUI";

export class BagManagerModuleC extends ModuleC<BagManagerModuleS,BagManagerModuleData> {
    bagUIObj : BagMainUI;

    /**
     * @groups 基类/C&S拓展
     * @description 生命周期方法-创建模块时调用
     * @effect 只在客户端调用生效
     */
    protected onAwake(): void {
        GameEventBus.on("AttributeModule_Change", BagAttributeUI.onChangeAttribute);
        GameEventBus.on("BagModule_ItemClick", this.onButtonClickEvent.bind(this));
        
		GameEventBus.on("BagModule_UnEquipmentItem", this.onUnEquipmentItem.bind(this));
		GameEventBus.on("BagModule_EquipmentItem", this.onEquipmentItem.bind(this));
		GameEventBus.on("BagModule_RemoveItem", this.onRemoveItem.bind(this));
        GameEventBus.on("BagModule_ItemClick", this.onItemClick.bind(this));
    }

    /**
     * @groups 基类/C&S拓展
     * @description 生命周期方法-启动模块时调用
     * @effect 只在客户端调用生效
     */
    protected onStart(): void {
        Player.asyncGetLocalPlayer().then((player: Player) => { 
            this.data.owner = player;
        });
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
        mw.InputUtil.onKeyDown(Keys.Two, () => {
            console.log("BagModuleC onKeyTwo");
            this.server.net_TestRemoveItem(mw.Player.localPlayer);
        });
    }

    // 打开背包
    onBagOpen(): void {
        this.bagUIObj = UIService.show(BagMainUI);
        this.bagUIObj.init();
    }

    onButtonClickEvent(typeId : BagItemBase)
    {
        this.server.net_OnButtonClick(mw.Player.localPlayer, typeId);
    }

    net_addItem(bagItemBase : BagItemBase): void {
        console.log("BagManagerModuleC net_addItem: " + JSON.stringify(bagItemBase));
        this.data.addItem(bagItemBase);
        this.updateBagData(bagItemBase.itemtype);
    }

    net_removeItem(inUuid : string, inItemType : ItemType, inCount : number): void {
        console.log("BagManagerModuleC net_removeItem: " + inUuid + " " + inItemType + " " + inCount);
        this.data.removeItem(inUuid, inItemType, inCount);
        this.updateBagData(inItemType);
    }

    // 更新客户端背包数据
    updateBagData(inItemtype : ItemType): void {
        GameEventBus.emit("BagModule_UpdateBagData", inItemtype);
    }

    net_OnUnEquipmentItemUpdate(inItem : BagItemBase, inEquipmentType : EquipmentType) {
        console.log("BagManagerModuleC net_OnUnEquipmentItemUpdate: " + JSON.stringify(inItem));
        this.data.unEquipmentItem(inItem, inEquipmentType);
        GameEventBus.emit("BagModule_UnEquipmentItemUpdate", inEquipmentType);
        this.updateBagData(inItem.itemtype);
    }

    net_OnEquipmentItemUpdate(inItem : BagItemBase, inEquipmentType : EquipmentType) {
        console.log("BagManagerModuleC net_OnEquipmentItemUpdate: " + JSON.stringify(inItem));
        this.data.equipmentItem(inItem, inEquipmentType);
        GameEventBus.emit("BagModule_EquipmentItemUpdate", inEquipmentType);
        this.updateBagData(inItem.itemtype);
    }

	protected onUnEquipmentItem(inItem : BagItemBase, inEquipmentType : EquipmentType) {
		this.server.net_OnUnEquipmentItem(mw.Player.localPlayer, inItem, inEquipmentType);
	}

	protected onEquipmentItem(inItem : BagItemBase, inEquipmentType : EquipmentType) {
		this.server.net_OnEquipmentItem(mw.Player.localPlayer, inItem, inEquipmentType);
	}

	protected onRemoveItem(inItem : BagItemBase) {
		this.server.net_OnRemoveItem(mw.Player.localPlayer, inItem);
	}

    onItemClick(inItem : BagItemBase) {
        this.server.net_OnItemClick(mw.Player.localPlayer, inItem);
    }
}