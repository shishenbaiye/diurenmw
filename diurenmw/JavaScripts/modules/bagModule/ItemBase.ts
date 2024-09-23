export enum ItemType
{
    // 武器
    Weapon = "Weapon",
}

// 背包物品基类
export abstract class BagItemBase {
    // 物品自身ID，物品确保服务器能通过id拿到物品的对象
    abstract id : string;
    // 物品名称
    abstract  name : string;
    // 物品类型
    abstract type : ItemType;
    // 物品数量
    abstract num : number;

}

// 背包物品基类
export class BagItem extends BagItemBase {

    constructor(inId : string, inName : string, inType : ItemType, inNum : number) {
        super();
        this.id = inId;
        this.name = inName;
        this.num = inNum;
        this.type = inType;
    }

    // 物品自身ID，物品确保服务器能通过id拿到物品的对象
    id : string;
    // 物品名称
    name : string;
    // 物品类型
    type : ItemType;
    // 物品数量
    num : number;

}