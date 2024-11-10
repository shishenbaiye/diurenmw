import { GameEventBus } from "../../common/eventBus/EventBus";
import { UuidCreater } from "../../tools/UuidCreater";
import { PlayerAttributeSet } from "../AttributeModule/PlayerAttributeSet";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { BagManagerModuleC } from "./BagManagerModuleC";
import { BagManagerModuleData, BagItemBase, ItemType, eventType, EquipmentType} from "./BagManagerModuleData";

import { GameConfig } from "../../configs/GameConfig";
import WeaponScript from "../weaponModule/WeaponScript";
import JewelryScript from "../jewelryModule/JewelryScript";
import ArmorScript from "../armorModule/ArmorScript";
import ConsumableScript from "../consumableModule/ConsumableScript";
import MaterialScript from "../materialsModule/MaterialScript";

export class BagManagerModuleS extends ModuleS<BagManagerModuleC,BagManagerModuleData> {
    
    // 按键监听
    listenButtonClick : Map<number, mw.MulticastDelegate<eventType>>;

    /**
     * @groups 基类/C&S拓展
     * @description 生命周期方法-启动模块时调用
     * @effect 只在服务端调用生效
     */
    protected onStart(): void {
        this.listenButtonClick = new Map<number, mw.MulticastDelegate<eventType>>;
    }
    /**
     * @description 生命周期方法-刷新模块调用
     * @effect 只在服务端调用生效
     * @groups 基类/C&S拓展
     * @param dt usage: 两帧之间的时间差(单位：秒) range: type:浮点数
     */
    protected onUpdate(dt: number): void {
        
    }
    /**
     * @groups 基类/C&S拓展
     * @description 生命周期方法-销毁模块调用
     * @effect 只在服务端调用生效
     */
    protected onDestroy(): void {

    }
    /**
     * @groups 基类/C&S拓展
     * @description 生命周期方法-玩家进入房间(玩家刚刚连进服务器，数据和前后端通信都还没有就绪)
     * @effect 只在服务端调用生效
     * @param player usage: 玩家
     */
    protected onPlayerJoined(player: mw.Player): void {
    }
    /**
     * @groups 基类/C&S拓展
     * @description 生命周期方法-玩家离开房间
     * @effect 只在服务端调用生效
     * @param player usage: 玩家
     */
    protected onPlayerLeft(player: mw.Player): void {
    }
    /**
     * @groups 基类/C&S拓展
     * @description 生命周期方法-玩家进入游戏(客户端已就绪，数据就绪，前后端可正常通信)
     * @effect 只在服务端调用生效
     * @param player usage: 玩家
     */
    protected onPlayerEnterGame(player: mw.Player): void {
        let data = this.getPlayerData(player);
        data.initData(player);
    }

    // 点击了某个物品
    net_OnItemClick(player: mw.Player, inItem : BagItemBase) {
        this.getPlayerData(player).onItemClick(inItem);
    }

    addItem(player: mw.Player, inUuid : string, inItemType : ItemType, inTypeId : number, inCount : number): boolean {

        let items : BagItemBase = {uuid: inUuid, typeId: inTypeId, count: inCount, itemtype: inItemType, isNew: true};

        console.log("BagModuleS addItem : " + JSON.stringify(items));
        let data = this.getPlayerData(player);
        if(data.addItem(items))
        {
            // 更新客户端数据
            this.getClient(player).net_addItem(items);
            return true;
        }
        return false;
        
    }

    // 查找物品数量
    findItem(player: mw.Player, inUuid : string, inItemType : ItemType): number {
        let data = this.getPlayerData(player);
        return data.findItem(inItemType, inUuid).count;
    }

    // 删除指定数量的物品
    removeItem(player: mw.Player, inUuid : string, inItemType : ItemType, inCount : number): boolean {
        let data = this.getPlayerData(player);
        if(data.removeItem(inUuid, inItemType, inCount))
        {
            // 更新客户端数据
            this.getClient(player).net_removeItem(inUuid, inItemType, inCount);
            return true;
        }
        return false;
    }

    // 监听按钮事件，根据物品类型来分类
    addButtonClickListen(typeId : number, inEvent : eventType)
    {
        if(this.listenButtonClick.has(typeId))
        {
            this.listenButtonClick.get(typeId).add(inEvent);
        }
        else
        {
            let tempEvents = new mw.MulticastDelegate<eventType>;
            tempEvents.add(inEvent);
            this.listenButtonClick.set(typeId, tempEvents);
        }
    }

    net_OnButtonClick(player: mw.Player, typeId : BagItemBase)
    {
        if(this.listenButtonClick.has(typeId.typeId))
        {
            this.listenButtonClick.get(typeId.typeId).broadcast(typeId);
        }
    }

    net_OnUnEquipmentItem(player: mw.Player, inItem : BagItemBase, inEquipmentType : EquipmentType) {
		// 卸载装备
        console.log("net_OnUnEquipmentItem : " + JSON.stringify(inItem));
        this.getPlayerData(player).unEquipmentItem(inItem, inEquipmentType);
        this.addItem(player, inItem.uuid, inItem.itemtype, inItem.typeId, inItem.count);
        this.getClient(player).net_OnUnEquipmentItemUpdate(inItem, inEquipmentType);
	}

	net_OnEquipmentItem(player: mw.Player, inItem : BagItemBase, inEquipmentType : EquipmentType) {
		// 装备物品
        console.log("net_OnEquipmentItem : " + JSON.stringify(inItem));
        if(inItem.itemtype == ItemType.Consumables)
        {
            // 使用物品
            player.character.getComponent(ConsumableScript).useConsumable(inItem.uuid, 1);
        }
        else if(inItem.itemtype == ItemType.Materials)
        {
            // 使用材料
            player.character.getComponent(MaterialScript).useMaterial(inItem.uuid, 1);
        }
        else
        {
            this.getPlayerData(player).equipmentItem(inItem, inEquipmentType);
            this.removeItem(player, inItem.uuid, inItem.itemtype, inItem.count);
            this.getClient(player).net_OnEquipmentItemUpdate(inItem, inEquipmentType);
        }
        
	}

	net_OnRemoveItem(player: mw.Player, inItem : BagItemBase) {
		// 删除物品
        console.log("net_OnRemoveItem : " + JSON.stringify(inItem));
        this.removeItem(player, inItem.uuid, inItem.itemtype, inItem.count);
	}

    // 测试代码
    net_TestAddItem(player: mw.Player): void {
        console.log("BagModuleS net_TestAddItem");
        
        let res = null;
        player.character.getComponent(WeaponScript).addWeapon(1001);
        player.character.getComponent(WeaponScript).addWeapon(1002);
        player.character.getComponent(WeaponScript).addWeapon(2001);
        player.character.getComponent(WeaponScript).addWeapon(2002);
        player.character.getComponent(WeaponScript).addWeapon(3001);
        player.character.getComponent(WeaponScript).addWeapon(3002);
        

        player.character.getComponent(JewelryScript).addJewelry(10001);
        player.character.getComponent(JewelryScript).addJewelry(20001);
        player.character.getComponent(JewelryScript).addJewelry(20002);
        player.character.getComponent(JewelryScript).addJewelry(30001);


        player.character.getComponent(ArmorScript).addArmor(10001);
        player.character.getComponent(ArmorScript).addArmor(20001);
        player.character.getComponent(ArmorScript).addArmor(20002);
        player.character.getComponent(ArmorScript).addArmor(30001);
        player.character.getComponent(ArmorScript).addArmor(40001);

        player.character.getComponent(ConsumableScript).addConsumable(10001, 1);
        player.character.getComponent(ConsumableScript).addConsumable(10002, 1);
        player.character.getComponent(ConsumableScript).addConsumable(10003, 1);

        player.character.getComponent(MaterialScript).addMaterial(10001, 1);
    }

    // 测试代码
    net_TestRemoveItem(player: mw.Player): void {
        console.log("BagModuleS net_TestRemoveItem");

        let res = player.character.getComponent(WeaponScript).getAllWeapon();
        console.log("all weapon number : " + res.length);

        let excelData = GameConfig.WeaponObj.getElement(res[0].wid);
        
        console.log("weapon 0, uuid : " + res[0].uuid);
        console.log("weapon 0, name : " + excelData.name);

        
        this.removeItem(player, res[0].uuid, ItemType.Weapon, 1);
    }
}