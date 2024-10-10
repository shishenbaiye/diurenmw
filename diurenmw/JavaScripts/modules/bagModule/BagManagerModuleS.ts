import { GameEventBus } from "../../common/eventBus/EventBus";
import { UuidCreater } from "../../tools/UuidCreater";
import { PlayerAttributeSet } from "../AttributeModule/PlayerAttributeSet";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { BagManagerModuleC } from "./BagManagerModuleC";
import { BagManagerModuleData, BagItemBase, ItemType, eventType} from "./BagManagerModuleData";

import { GameConfig } from "../../configs/GameConfig";
import WeaponScript from "../weaponModule/WeaponScript";

export class BagManagerModuleS extends ModuleS<BagManagerModuleC,BagManagerModuleData> {
    
    // 按键监听
    listenButtonClick : Map<number, mw.MulticastDelegate<eventType>>;

    /**
     * @groups 基类/C&S拓展
     * @description 生命周期方法-启动模块时调用
     * @effect 只在服务端调用生效
     */
    protected onStart(): void {
        console.log("BagModuleS onStart");
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
        console.log("BagModuleS onPlayerJoined");
    }
    /**
     * @groups 基类/C&S拓展
     * @description 生命周期方法-玩家离开房间
     * @effect 只在服务端调用生效
     * @param player usage: 玩家
     */
    protected onPlayerLeft(player: mw.Player): void {
        console.log("BagModuleS onPlayerLeft");
    }
    /**
     * @groups 基类/C&S拓展
     * @description 生命周期方法-玩家进入游戏(客户端已就绪，数据就绪，前后端可正常通信)
     * @effect 只在服务端调用生效
     * @param player usage: 玩家
     */
    protected onPlayerEnterGame(player: mw.Player): void {
        console.log("BagModuleS onPlayerEnterGame");
        let data = this.getPlayerData(player);
        data.initData();
    }

    addItem(player: mw.Player, inUuid : string, inItemType : ItemType, inTypeId : number, inCount : number): boolean {

        let items : BagItemBase = {uuid: inUuid, typeId: inTypeId, count: inCount, itemtype: inItemType};

        console.log("BagModuleS addItem");
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

    net_OnButtonClick(player: mw.Player, typeId : number)
    {
        if(this.listenButtonClick.has(typeId))
        {
            this.listenButtonClick.get(typeId).broadcast(typeId);
        }
    }

    // 测试代码
    net_TestAddItem(player: mw.Player): void {
        console.log("BagModuleS net_TestAddItem");
        
        player.character.getComponent(WeaponScript).addWeapon(1001);
        let res = player.character.getComponent(WeaponScript).getAllWeapon();
        console.log("all weapon number : " + res.length);

        let excelData = GameConfig.WeaponObj.getElement(res[0].wid);
        
        console.log("weapon 0, uuid : " + res[0].uuid);
        console.log("weapon 0, name : " + excelData.name);

        
        this.addItem(player, res[0].uuid, ItemType.Weapon, res[0].wid, 1);

        this.addButtonClickListen(res[0].wid, (inWid : number) => {
            console.warn("!!!!!!!!!!!!!!!!!!!! wid : " + inWid + ", buttonClick");
        });
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

        this.addButtonClickListen(res[0].wid, (inWid : number) => {
            console.warn("!!!!!!!!!!!!!!!!!!!! wid : " + inWid + ", buttonClick");
        });
    }
}