import { GameEventBus } from "../../common/eventBus/EventBus";
import { UuidCreater } from "../../tools/UuidCreater";
import { PlayerAttributeSet } from "../AttributeModule/PlayerAttributeSet";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { BagManagerModuleC } from "./BagManagerModuleC";
import { BagManagerModuleData, BagItemBase, ItemType} from "./BagManagerModuleData";

import { GameConfig } from "../../configs/GameConfig";
import WeaponScript from "../weaponModule/WeaponScript";

// 事件类型
type eventType = (wid : number)=>{};

export class BagManagerModuleS extends ModuleS<BagManagerModuleC,BagManagerModuleData> {
    
    // 按键监听
    listenButtonEvents : Map<string, Array<eventType>>;

    /**
     * @groups 基类/C&S拓展
     * @description 生命周期方法-启动模块时调用
     * @effect 只在服务端调用生效
     */
    protected onStart(): void {
        console.log("BagModuleS onStart");
        this.listenButtonEvents = new Map<string, Array<eventType>>;
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

    addItem(player: mw.Player, items : BagItemBase): void {
        console.log("BagModuleS addItem");
        let data = this.getPlayerData(player);
        data.addItem(items);
        // 更新客户端数据
        this.getClient(player).net_updateBagData(items);
    }

    // 监听按钮事件，根据物品类型来分类
    addButtonListen(wid : number, inEvent : eventType)
    {
        if(this.listenButtonEvents.has(wid.toString()))
        {
            this.listenButtonEvents.get(wid.toString()).push(inEvent);
        }
        else
        {
            let tempEvents = new Array<eventType>;
            this.listenButtonEvents.set(wid.toString(), tempEvents);
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

        
        this.addItem(player, {uuid: res[0].uuid, wid: res[0].wid, count: 1, itemtype: ItemType.Weapon});
    }
}