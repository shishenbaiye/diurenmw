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

    initByData(data: PlayerData): void { }

    private name: string

    private isVip: boolean

    init() { }

    initData(data: PlayerData) {
        this.name = data.name;
        this.isVip = data.vip;
    }

    abstract refresh(): void;


    //生成持久化数据体
    getData(): PlayerData {
        let data = new PlayerData();
        data.name = this.name;
        data.vip = this.isVip;
        return data;
    }
}