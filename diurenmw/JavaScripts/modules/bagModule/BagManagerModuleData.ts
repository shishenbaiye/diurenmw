import { ConfigBase } from "../../configs/ConfigBase";
import { GameConfig } from "../../configs/GameConfig";

// 事件类型
export type eventType = (wid : number)=>void;

export enum ItemType
{
    // 武器
    Weapon = "0",
    // 防具
    Armor = "1",
    // 首饰
    Jewelry = "2",
    // 消耗品
    Consumables = "3",
    // 材料
    Materials = "4",
}

export interface BagItemBase {
    uuid: string;
    typeId: number;
    count: number;
    itemtype: ItemType;
}

export class BagManagerModuleData extends Subdata {
    owner:Player;

    // 背包数据。物品类型->物品ID->物品
    @Decorator.persistence()
    itemList : Map<ItemType, Array<BagItemBase>>;

    // 各类型背包容量
    @Decorator.persistence()
    bagTypeCapacity : Map<ItemType, number>;

    initData(): void {
        console.log("BagManagerModuleData initData");
        if(!this.itemList)
        {
            this.itemList = new Map<ItemType, Array<BagItemBase>>();
        }
        if(!this.itemList.get(ItemType.Weapon))
        {
            this.itemList.set(ItemType.Weapon, new Array<BagItemBase>());
        }
        if(!this.itemList.get(ItemType.Armor))
        {
            this.itemList.set(ItemType.Armor, new Array<BagItemBase>());
        }
        if(!this.itemList.get(ItemType.Jewelry))
        {
            this.itemList.set(ItemType.Jewelry, new Array<BagItemBase>());
        }
        if(!this.itemList.get(ItemType.Consumables))
        {
            this.itemList.set(ItemType.Consumables, new Array<BagItemBase>());
        }
        if(!this.itemList.get(ItemType.Materials))
        {
            this.itemList.set(ItemType.Materials, new Array<BagItemBase>());
        }

        if(!this.bagTypeCapacity)
        {
            this.bagTypeCapacity = new Map<ItemType, number>();
        }
        if(!this.bagTypeCapacity.get(ItemType.Weapon))
        {
            this.bagTypeCapacity.set(ItemType.Weapon, 100);
        }
        if(!this.bagTypeCapacity.get(ItemType.Armor))
        {
            this.bagTypeCapacity.set(ItemType.Armor, 20);
        }
        if(!this.bagTypeCapacity.get(ItemType.Jewelry))
        {
            this.bagTypeCapacity.set(ItemType.Jewelry, 200);
        }
        if(!this.bagTypeCapacity.get(ItemType.Consumables))
        {
            this.bagTypeCapacity.set(ItemType.Consumables, 100);
        }
        if(!this.bagTypeCapacity.get(ItemType.Materials))
        {
            this.bagTypeCapacity.set(ItemType.Materials, 100);
        }
        this.save(true);
    }

    getTypeItemNumber(itemType: ItemType) : number {
        let bagTypeList = this.itemList.get(itemType);
        if(bagTypeList)
        {
            return bagTypeList.length;
        }
        return 0;
    }

    findAllItemIndex(inItemType : ItemType, inUuid : string) : Array<number> {
        let tempItems = new Array<number>();
        let bagTypeList = this.itemList.get(inItemType);
        if(bagTypeList)
        {
            for(let i = 0; i < bagTypeList.length; i++)
            {
                if(bagTypeList[i].uuid == inUuid)
                {
                    tempItems.push(i);
                }
            }
        }
        return tempItems;
    }

    findAllItem(inItemType : ItemType, inUuid : string) : Array<BagItemBase> {
        let tempItems = new Array<BagItemBase>();
        let bagTypeList = this.itemList.get(inItemType);
        if(bagTypeList)
        {
            for(let item of bagTypeList)
            {
                if(item.uuid == inUuid)
                {
                    tempItems.push(item);
                }
            }
        }
        return tempItems;
    }

    findItem(inItemType : ItemType, inUuid : string) : BagItemBase {
        let bagTypeList = this.itemList.get(inItemType);
        if(bagTypeList)
        {
            return bagTypeList.find((item) => {
                return item.uuid == inUuid;
            });
        }
        return null;
    }

    findItemByIndex(inItemType : ItemType, index : number) : BagItemBase {
        if(this.itemList.has(inItemType))
        {
            if(this.itemList.get(inItemType).length > index)
            {
                return this.itemList.get(inItemType)[index];
            }
        }
        return null;
    }

    removeItem(inUuid : string, inItemType : ItemType, inCount : number) : boolean {
        let itemIndexs = this.findAllItemIndex(inItemType, inUuid);
        let removedIndexs = new Array<number>;
        let itemNum = 0;
        for(let i = 0; i < itemIndexs.length; i++)
        {
            // 计算现有物品数量
            itemNum += this.findItemByIndex(inItemType, itemIndexs[i]).count;
        }
        if(itemNum < inCount)
        {
            console.log("removeItem itemNum < inCount, itemNum : " + itemNum + ", inCount : " + inCount);
            return false;
        }
        
        for(let i = 0; i < itemIndexs.length; i++)
        {
            let BagItem = this.findItemByIndex(inItemType, itemIndexs[i]);
            if(BagItem)
            {
                if(BagItem.count < inCount)
                {
                    inCount -= BagItem.count;
                    removedIndexs.push(i);
                }
                else
                {
                    BagItem.count -= inCount;
                    if(BagItem.count == 0)
                    {
                        removedIndexs.push(i);
                    }
                }
            }
        }

        let bagTypeList = this.itemList.get(inItemType);
        for(let i = 0; i < removedIndexs.length; i++)
        {
            bagTypeList.splice(removedIndexs[i], 1);
        }

        if(SystemUtil.isServer())
        {
            this.save(false);
        }
        return true;
    }

    removeItemByIndex(inUuid : string, inItemType : ItemType, inCount : number, inIndex : number) : boolean {
        let BagItem = this.findItemByIndex(inItemType, inIndex);
        let bagTypeList = this.itemList.get(inItemType);
        if(BagItem)
        {
            if(BagItem.count < inCount)
            {
                console.log("removeItem BagItem.count < inCount, BagItem.count : " + BagItem.count + ", inCount : " + inCount);
                return false;
            }
            BagItem.count -= inCount;
            if(BagItem.count == 0)
            {
                bagTypeList.splice(inIndex, 1);
            }

            if(SystemUtil.isServer())
            {
                this.save(false);
            }
            return true;
        }
        return false;
    }

    getItemStackMax(itemtype: ItemType, typeId: number) : number {
        switch(itemtype)
        {
            case ItemType.Weapon:
                return GameConfig.WeaponObj.getElement(typeId).stackMax;
                break;
            case ItemType.Armor:
                return GameConfig.ArmorObj.getElement(typeId).stackMax;
                break;
            case ItemType.Jewelry:
                return GameConfig.JewelryObj.getElement(typeId).stackMax;
                break;
            // case ItemType.Consumables:
            //     GameConfig.ConsumablesObj.getElement(typeId).stackMax;
            //     break;
            // case ItemType.Materials:
            //     GameConfig.MaterialsObj.getElement(typeId).stackMax;
            //     break;
            default:
                console.error("getItenStackMax itemtype error : " + itemtype.toString());
                return 0;
        }
    }

    getItemName(itemtype: ItemType, typeId: number) : string {
        switch(itemtype)
        {
            case ItemType.Weapon:
                return GameConfig.WeaponObj.getElement(typeId).name;
                break;
            case ItemType.Armor:
                return GameConfig.ArmorObj.getElement(typeId).name;
                break;
            case ItemType.Jewelry:
                return GameConfig.JewelryObj.getElement(typeId).name;
                break;
            // case ItemType.Consumables:
            //     GameConfig.ConsumablesObj.getElement(typeId).name;
            //     break;
            // case ItemType.Materials:
            //     GameConfig.MaterialsObj.getElement(typeId).name;
            //     break;
            default:
                console.error("getItemName itemtype error : " + itemtype.toString());
                return "";
        }
    }

    getItemIcon(itemtype: ItemType, typeId: number) : string {
        switch(itemtype)
        {
            case ItemType.Weapon:
                return  GameConfig.WeaponObj.getElement(typeId).icon;
                break;
            case ItemType.Armor:
                return GameConfig.ArmorObj.getElement(typeId).icon;
                break;
            case ItemType.Jewelry:
                return GameConfig.JewelryObj.getElement(typeId).icon;
                break;
            // case ItemType.Consumables:
            //     GameConfig.ConsumablesObj.getElement(typeId).icon;
            //     break;
            // case ItemType.Materials:
            //     GameConfig.MaterialsObj.getElement(typeId).icon;
            //     break;
            default:
                console.error("getItemIcon itemtype error : " + itemtype.toString());
                return "";
        }
    }

    addItem(items : BagItemBase) : boolean {
        let stackMax = this.getItemStackMax(items.itemtype, items.typeId);
        let stackNum = 0;
        let NotStackNum = 0;
        
        let BagItem = this.findItem(items.itemtype, items.uuid);
        if(BagItem)
        {
            // 已有相同物品，判断是否可叠加
            if(stackMax < items.count + BagItem.count)
            {
                stackNum = stackMax - BagItem.count;
                NotStackNum = items.count + BagItem.count - stackMax;
            }
            else
            {
                stackNum = items.count;
                NotStackNum = 0;
            }
        }
        else
        {
            stackNum = 0;
            NotStackNum = items.count;
        }
        if(BagItem)
        {
            BagItem.count += stackNum;
        }
        if(NotStackNum)
        {
            items.count = NotStackNum;
            if(!this.addItemNotStack(items))
            {
                // 添加失败，回滚
                if(BagItem)
                {
                    BagItem.count -= stackNum;
                }
            }
        }

        if(SystemUtil.isServer())
        {
            this.save(false);
        }
        return true;
    }

    private addItemNotStack(items : BagItemBase) : boolean {
        if(this.bagTypeCapacity.get(items.itemtype) <= this.itemList.get(items.itemtype).length)
        {
            console.log("addItemNotStack bagTypeCapacity is over : " + JSON.stringify(items));
            return false;
        }

        this.itemList.get(items.itemtype).push(items);
        return true;
    }
}