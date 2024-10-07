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

    addItem(items : BagItemBase) : void {
        let BagItem = this.findItem(items.itemtype, items.uuid);
        if(BagItem)
        {
            BagItem.count += items.count;
        }
        else
        {
            this.itemList.get(items.itemtype).push(items);
        }
    }
}