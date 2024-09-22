export enum ItemType
{
    // 武器
    Weapon = "Weapon",
}

// 背包物品基类
export class BagItemBase {

    constructor(inId, inName, inNum, inType){
        this.id = inId;
        this.name = inName;
        this.num = inNum;
        this.type = inType;
    }

    // 物品自身ID，物品确保服务器能通过id拿到物品的对象
    id : string;
    // 物品名称
    name : string;
    // 物品数量
    num : number;
    // 物品类型
    type : ItemType;

}