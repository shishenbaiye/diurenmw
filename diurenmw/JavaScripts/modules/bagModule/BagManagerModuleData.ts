export enum ItemType
{
    // 武器
    Weapon = "Weapon",
    // 防具
    Armor = 11,
    // 首饰
    Jewelry = 12,
    // 消耗品
    Consumables = 13,
    // 材料
    Materials = 14,
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
            console.error("is null, bagTypeCapacity" + this.bagTypeCapacity.size);
            this.bagTypeCapacity = new Map<ItemType, number>();
        }
        else
        {
            console.error("bagTypeCapacity" + this.bagTypeCapacity.size);
            this.bagTypeCapacity.forEach((value, key) => {
                console.error("key is " + key + ", value is " + value);
            });
        }
        if(!this.bagTypeCapacity.get(ItemType.Weapon))
        {
            this.bagTypeCapacity.set(ItemType.Weapon, 100);
            console.error("is null, bagTypeCapacity.get(ItemType.Weapon):" + this.bagTypeCapacity.get(ItemType.Weapon));
        }
        else
        {
            console.error("bagTypeCapacity.get(ItemType.Weapon):" + this.bagTypeCapacity.get(ItemType.Weapon));
        }
        if(!this.bagTypeCapacity.get(ItemType.Armor))
        {
            this.bagTypeCapacity.set(ItemType.Armor, 20);
            console.error("is null, bagTypeCapacity.get(ItemType.Armor):" + this.bagTypeCapacity.get(ItemType.Armor));
        }
        else
        {
            console.error("bagTypeCapacity.get(ItemType.Armor):" + this.bagTypeCapacity.get(ItemType.Armor));
        }
        if(!this.bagTypeCapacity.get(ItemType.Jewelry))
        {
            this.bagTypeCapacity.set(ItemType.Jewelry, 200);
            console.error("is null, bagTypeCapacity.get(ItemType.Jewelry):" + this.bagTypeCapacity.get(ItemType.Jewelry));
        }
        else
        {
            console.error("bagTypeCapacity.get(ItemType.Jewelry):" + this.bagTypeCapacity.get(ItemType.Jewelry));
        }
        if(!this.bagTypeCapacity.get(ItemType.Consumables))
        {
            this.bagTypeCapacity.set(ItemType.Consumables, 100);
            console.error("is null, bagTypeCapacity.get(ItemType.Consumables):" + this.bagTypeCapacity.get(ItemType.Consumables));
        }
        else
        {
            console.error("bagTypeCapacity.get(ItemType.Consumables):" + this.bagTypeCapacity.get(ItemType.Consumables));
        }
        if(!this.bagTypeCapacity.get(ItemType.Materials))
        {
            this.bagTypeCapacity.set(ItemType.Materials, 100);
            console.error("is null, bagTypeCapacity.get(ItemType.Materials):" + this.bagTypeCapacity.get(ItemType.Materials));
        }
        else
        {
            console.error("bagTypeCapacity.get(ItemType.Materials):" + this.bagTypeCapacity.get(ItemType.Materials));
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