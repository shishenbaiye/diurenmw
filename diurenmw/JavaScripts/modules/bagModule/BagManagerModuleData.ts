import { ConfigBase } from "../../configs/ConfigBase";
import { GameConfig } from "../../configs/GameConfig";
import ArmorScript from "../armorModule/ArmorScript";
import { ArmorPart } from "../armorModule/ArmorType";
import JewelryScript from "../jewelryModule/JewelryScript";
import { JewelryPart } from "../jewelryModule/JewelryType";
import WeaponScript from "../weaponModule/WeaponScript";

// 事件类型
export type eventType = (inItem : BagItemBase)=>void;

export enum EquipmentType
{
    // 武器
    Weapon = 0,
    // 戒指
	Ring = 1,
	// 项链
	Necklace = 2,
	// 手镯
	Bracelet = 3,
	// 头部
	Head = 4,
	// 身体
	Body = 5,
	// 腿部
	Leg = 6,
	// 脚部
	Foot = 7,
}

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

    // 正在装备的物品
    @Decorator.persistence()
    equipmentItems : Array<BagItemBase>;

    initData(inPlayer : Player): void {
        this.owner = inPlayer;
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

        if (!this.equipmentItems)
        {
            this.equipmentItems = new Array<BagItemBase>();
        }
        if(this.equipmentItems.length < EquipmentType.Foot)
        {
            this.equipmentItems.push({uuid: "", typeId: 0, count: 1, itemtype: ItemType.Weapon});
            this.equipmentItems.push({uuid: "", typeId: 0, count: 1, itemtype: ItemType.Jewelry});
            this.equipmentItems.push({uuid: "", typeId: 0, count: 1, itemtype: ItemType.Jewelry});
            this.equipmentItems.push({uuid: "", typeId: 0, count: 1, itemtype: ItemType.Jewelry});
            this.equipmentItems.push({uuid: "", typeId: 0, count: 1, itemtype: ItemType.Armor});
            this.equipmentItems.push({uuid: "", typeId: 0, count: 1, itemtype: ItemType.Armor});
            this.equipmentItems.push({uuid: "", typeId: 0, count: 1, itemtype: ItemType.Armor});
            this.equipmentItems.push({uuid: "", typeId: 0, count: 1, itemtype: ItemType.Armor});
        }
        if(SystemUtil.isServer())
        {
            this.save(true);
        }
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
                    removedIndexs.push(itemIndexs[i]);
                }
                else
                {
                    BagItem.count -= inCount;
                    if(BagItem.count == 0)
                    {
                        removedIndexs.push(itemIndexs[i]);
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

    equipmentItem(inItem : BagItemBase, inEquipmentType : EquipmentType) : boolean {
        // 装备物品
        switch(inItem.itemtype)
        {
            case ItemType.Weapon:
                this.owner.character.getComponent(WeaponScript).equepWeapon(inItem.uuid);
                break;
            case ItemType.Jewelry:
                this.owner.character.getComponent(JewelryScript).equepJewelry(BagManagerModuleData.getTypeId(inEquipmentType), inItem.uuid);
                break;
            case ItemType.Armor:
                this.owner.character.getComponent(ArmorScript).equepArmor(BagManagerModuleData.getTypeId(inEquipmentType), inItem.uuid);
                break;
        }
        this.equipmentItems[inEquipmentType] = inItem;
        
        if(SystemUtil.isServer())
        {
            this.save(false);
        }
        return true;
    }

    unEquipmentItem(inItem : BagItemBase, inEquipmentType : EquipmentType) : boolean {
        // 卸载装备
        switch(inItem.itemtype)
        {
            case ItemType.Weapon:
                this.owner.character.getComponent(WeaponScript).unEquipWeapon();
                break;
            case ItemType.Jewelry:
                this.owner.character.getComponent(JewelryScript).unEquipJewelry(BagManagerModuleData.getTypeId(inEquipmentType));
                break;
            case ItemType.Armor:
                this.owner.character.getComponent(ArmorScript).unEquipArmor(BagManagerModuleData.getTypeId(inEquipmentType));
                break;
        }
        this.equipmentItems[inEquipmentType] = {uuid: "", typeId: 0, count: 1, itemtype: inItem.itemtype};

        if(SystemUtil.isServer())
        {
            this.save(false);
        }
        return true;
    }

    static getItemStackMax(itemtype: ItemType, typeId: number) : number {
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

    static getItemName(itemtype: ItemType, typeId: number) : string {
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

    static getItemIcon(itemtype: ItemType, typeId: number) : string {
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

    static getTypeId(inEquipmentType : EquipmentType) : number {
        switch(inEquipmentType)
        {
            case EquipmentType.Weapon:
                return 0;
            case EquipmentType.Ring:
                return JewelryPart.Ring;
            case EquipmentType.Necklace:
                return JewelryPart.Necklace;
            case EquipmentType.Bracelet:
                return JewelryPart.Bracelet;
            case EquipmentType.Head:
                return ArmorPart.Head;
            case EquipmentType.Body:
                return ArmorPart.Body;
            case EquipmentType.Leg:
                return ArmorPart.Leg;
            case EquipmentType.Foot:
                return ArmorPart.Foot;
        }
    }

    static getEquipmentType(inType: ItemType, inPart: number): EquipmentType {
        switch(inType) {
            case ItemType.Weapon:
                return EquipmentType.Weapon;
            case ItemType.Jewelry:
                switch(inPart) {
                    case JewelryPart.Ring:
                        return EquipmentType.Ring;
                    case JewelryPart.Necklace:
                        return EquipmentType.Necklace;
                    case JewelryPart.Bracelet:
                        return EquipmentType.Bracelet;
                }
            case ItemType.Armor:
                switch(inPart) {
                    case ArmorPart.Head:
                        return EquipmentType.Head;
                    case ArmorPart.Body:
                        return EquipmentType.Body;
                    case ArmorPart.Leg:
                        return EquipmentType.Leg;
                    case ArmorPart.Foot:
                        return EquipmentType.Foot;
                }
        }
    }

    static getEquipmentTypeByTypeId(inType: ItemType, inTypeId: number): EquipmentType {
        switch(inType)
        {
            case ItemType.Weapon:
                return  BagManagerModuleData.getEquipmentType(inType, GameConfig.WeaponObj.getElement(inTypeId).type);
                break;
            case ItemType.Armor:
                return BagManagerModuleData.getEquipmentType(inType, GameConfig.ArmorObj.getElement(inTypeId).body);
                break;
            case ItemType.Jewelry:
                return BagManagerModuleData.getEquipmentType(inType, GameConfig.JewelryObj.getElement(inTypeId).part);
                break;
        }
    }

    addItem(items : BagItemBase) : boolean {
        let stackMax = BagManagerModuleData.getItemStackMax(items.itemtype, items.typeId);
        let stackNum = 0;
        let NotStackNum = 0;
        
        let BagItem = this.findItem(items.itemtype, items.uuid);
        if(BagItem)
        {
            // 暂时不允许叠加物品，得把uuid和typeid敲定用什么为维度再考虑。用uuid的话，需要删除原本叠加的物品
            return false;
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
                return false;
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
            console.warn("addItemNotStack bagTypeCapacity is over : " + JSON.stringify(items));
            return false;
        }

        this.itemList.get(items.itemtype).push(items);
        return true;
    }
}