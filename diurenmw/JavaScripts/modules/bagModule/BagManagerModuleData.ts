import { BagItemBase, ItemType } from "./ItemBase";

export class BagManagerModuleData extends Subdata {
    owner:Player;

    // 背包数据。物品类型->物品ID->物品
    @Decorator.persistence()
    itemList : Map<ItemType, Map<string, BagItemBase>>;

    // 各类型背包容量
    @Decorator.persistence()
    bagTypeCapacity : Map<ItemType, number>;

    initData(): void {
        if(!this.itemList)
        {
            this.itemList = new Map<ItemType, Map<string, BagItemBase>>();
            let bagTypeListNew = new Map<string, BagItemBase>();
            this.itemList.set(ItemType.Weapon, bagTypeListNew);
        }
        if(!this.bagTypeCapacity)
        {
            this.bagTypeCapacity = new Map<ItemType, number>();
            this.bagTypeCapacity.set(ItemType.Weapon, 20);
        }
        this.save(true);
    }

    addItem(items : BagItemBase) : void {
        let bagTypeList = this.itemList.get(items.type);
        if(bagTypeList)
        {
           let BagItem = bagTypeList.get(items.id);
           if(BagItem)
           {
               BagItem.num += items.num;
           }
           else
           {
               bagTypeList.set(items.id, items);
           }
        }
        else
        {
            let bagTypeListNew = new Map<string, BagItemBase>();
            bagTypeListNew.set(items.id, items);
            this.itemList.set(ItemType.Weapon, bagTypeListNew);
        }
    }
}