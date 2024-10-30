import { MPlugin } from "../../framework/DI/MContainer";
import { MObject } from "../../framework/Object/MObject";
import { PlayerAttributeSet } from "../AttributeModule/PlayerAttributeSet";
import { PlayerData } from "./PlayerData";

@MPlugin()
export abstract class PlayerBase extends MObject {
    /**持有者 */
    owner: Player;
    /**持有者属性 */
    ownerAttribute: PlayerAttributeSet;
    /**持有者数据 */
    ownerData: PlayerData;

    init() { }

    /** 初始数据 */
    initData(data: PlayerData) {
        this.ownerData = data;
    }

    /** 刷新数据 */
    refreshData(data: PlayerData): void {
        this.ownerData.name = data.name;
        this.ownerData.vip = data.vip;
    }

    /** 获取克隆数据 */
    getData(): PlayerData {
        return this.ownerData.copy();
    }

    abstract refresh(): void;

}