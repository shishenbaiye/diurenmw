import { GameEventBus } from "../../../common/eventBus/EventBus";
import BagShowSelect_Generate from "../../../ui-generate/Bag/BagShowSelect_generate";
import { ArmorModuleData } from "../../armorModule/ArmorModuleData";
import ArmorScript from "../../armorModule/ArmorScript";
import { JewelryModuleData } from "../../jewelryModule/JewelryModuleData";
import JewelryScript from "../../jewelryModule/JewelryScript";
import { WeaponModuleData } from "../../weaponModule/WeaponModuleData";
import WeaponScript from "../../weaponModule/WeaponScript";
import { BagItemBase, BagManagerModuleData, EquipmentType, ItemType } from "../BagManagerModuleData";

@UIBind('UI/Bag/BagShowSelect.ui')
export default class BagShowSelect extends BagShowSelect_Generate {
	
	isEquipment: boolean = false;
	item : BagItemBase;
	equipmentType : EquipmentType;
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		this.singleButton.onClicked.add(this.onUnEdquipment.bind(this));
		this.leftButton.onClicked.add(this.onEdquipment.bind(this));
		this.rightButton.onClicked.add(this.onRemove.bind(this));
	}

	/** 仅在游戏时间对非模板实例调用一次 */
	protected onStart() {
	}

	protected setDefault() {
		
	}

	init(inEquipment : boolean, inItem : BagItemBase = null, inEquipmentType : EquipmentType = null) {
		this.isEquipment = inEquipment;
		this.item = inItem;
		this.equipmentType = inEquipmentType;

		if(inEquipment) {
			this.item = DataCenterC.getData(BagManagerModuleData).equipmentItems[this.equipmentType];
		}
		let inTestData = "";

		if(this.item.uuid)
		{
			switch(this.item.itemtype)
			{
				case ItemType.Weapon:
					let weaponData = DataCenterC.getData(WeaponModuleData).getWeaponData(this.item.uuid);
					inTestData += "物理攻击 : " + weaponData.atk + "\n";
					inTestData += "魔法攻击 : " + weaponData.matk + "\n";
					inTestData += "力量 : " + weaponData.str + "\n";
					inTestData += "智力 : " + weaponData.int + "\n";
					this.setData(this.item.itemtype, weaponData.wid, inTestData);
					break;
				case ItemType.Jewelry:
					let jewelryData = DataCenterC.getData(JewelryModuleData).getJewelryData(this.item.uuid);
					inTestData += "防御力 : " + jewelryData.def + "\n";
					inTestData += "力量 : " + jewelryData.str + "\n";
					inTestData += "智力 : " + jewelryData.int + "\n";
					this.setData(this.item.itemtype, jewelryData.jid, inTestData);
					break;
				case ItemType.Armor:
					let armorData = DataCenterC.getData(ArmorModuleData).getArmorData(this.item.uuid);
					inTestData += "防御力 : " + armorData.def + "\n";
					inTestData += "体力 : " + armorData.vit + "\n";
					inTestData += "力量 : " + armorData.str + "\n";
					inTestData += "智力 : " + armorData.int + "\n";
					this.setData(this.item.itemtype, armorData.aid, inTestData);
					break;
			}
		}
		
		if(this.isEquipment)
		{
			this.doubleSelect.visibility = mw.SlateVisibility.Hidden;
			this.singleButton.visibility = mw.SlateVisibility.Visible;
		}
		else
		{
			this.doubleSelect.visibility = mw.SlateVisibility.Visible;
			this.singleButton.visibility = mw.SlateVisibility.Hidden;
		}
	}

	setData(itemtype : ItemType, typeId : number, inTestData : string) {
		if(typeId)
		{
			this.name.text = BagManagerModuleData.getItemName(itemtype, typeId);
			this.icon.imageGuid = BagManagerModuleData.getItemIcon(itemtype, typeId);
			this.testData.text = inTestData;
		}
	}

	onUnEdquipment() {
		// 卸下装备
		if(!this.item.uuid)
		{
			return;
		}
		GameEventBus.emit("BagModule_UnEquipmentItem", this.item, this.equipmentType);
	}

	onEdquipment() {
		if(!this.item.uuid)
		{
			return;
		}
		// 装上装备
		GameEventBus.emit("BagModule_EquipmentItem", this.item, this.equipmentType);
	}

	onRemove() {
		if(!this.item.uuid)
		{
			return;
		}
		// 丢弃物品
		GameEventBus.emit("BagModule_RemoveItem", this.item);
	}
}
 