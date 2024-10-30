import { MPlugin } from "../../framework/DI/MContainer";
import { MObject } from "../../framework/Object/MObject";
import { MonsterAttributeSet } from "./MonsterAttributeSet";
import { NpcData } from "./NpcData";

@MPlugin()
export abstract class NpcBase extends MObject {
    /**持有者 */
    owner: Character;
    /**持有者属性 */
    ownerAttribute: MonsterAttributeSet;
    /**持有者数据 */
    ownerData: NpcData;

    init() { }

    /** 初始数据 */
    initData(data: NpcData) {
        this.ownerData = data;
    }

    /** 刷新数据 */
    refreshData(data: NpcData): void {

    }

    /** 获取克隆数据 */
    getData(): NpcData {
        return this.ownerData.copy();
    }

    abstract refresh(): void;

}