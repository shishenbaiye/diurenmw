import { GameEventBus } from "../../common/eventBus/EventBus";
import { UuidCreater } from "../../tools/UuidCreater";
import { PlayerAttributeSet } from "../AttributeModule/PlayerAttributeSet";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { BagManagerModuleC } from "./BagManagerModuleC";
import { BagManagerModuleData, BagItemBase, ItemType} from "./BagManagerModuleData";

export class BagManagerModuleS extends ModuleS<BagManagerModuleC,BagManagerModuleData> {
    /**
     * @groups 基类/C&S拓展
     * @description 生命周期方法-启动模块时调用
     * @effect 只在服务端调用生效
     */
    protected onStart(): void {
        console.log("BagModuleS onStart");
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

    net_TestAddItem(player: mw.Player): void {
        console.log("BagModuleS net_TestAddItem");
        this.addItem(player, {uuid: "uuid", count: 1, itemtype: ItemType.Weapon});
    }
}