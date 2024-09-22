import { BagItemBase, ItemType } from "./ItemBase";

export class BagModuleData extends Subdata {
    owner:Player;

    // 背包数据。物品类型->物品ID->物品
    @Decorator.persistence()
    ItemList : Map<ItemType, Map<string, BagItemBase>>;

    initData(): void {
        if(this.ItemList == undefined)
        {
            this.ItemList = new Map<ItemType, Map<string, BagItemBase>>();
        }
        this.save(true);
    }

    addItem(items : BagItemBase) : void {
        let BagTypeList = this.ItemList.get(items.type);
        if(BagTypeList != undefined)
        {
           let BagItem = BagTypeList.get(items.id);
           if(BagItem != undefined)
           {
               BagItem.num += items.num;
           }
           else
           {
               BagTypeList.set(items.id, items);
           }
        }
        else
        {
            let BagTypeListNew = new Map<string, BagItemBase>();
            BagTypeListNew.set(items.id, items);
            this.ItemList.set(ItemType.Weapon, BagTypeListNew);
        }
    }
}