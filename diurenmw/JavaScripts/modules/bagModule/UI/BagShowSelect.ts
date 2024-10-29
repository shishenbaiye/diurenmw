import BagShowSelect_Generate from "../../../ui-generate/Bag/BagShowSelect_generate";
import ArmorScript from "../../armorModule/ArmorScript";
import JewelryScript from "../../jewelryModule/JewelryScript";
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

		// 临时代码
		// if(!inEquipment)
		// {
		// 	switch(inItem.itemtype)
		// 	{
		// 		case ItemType.Weapon:
		// 			let weaponData = mw.Player.localPlayer.character.getComponent(WeaponScript).getWeaponByUuid(inItem.uuid);
		// 			this.setData(inItem.itemtype, weaponData.wid);
		// 			break;
		// 		case ItemType.Jewelry:
		// 			let jewelryData = mw.Player.localPlayer.character.getComponent(JewelryScript).getJewelryByUuid(inItem.uuid);
		// 			this.setData(inItem.itemtype, jewelryData.aid);
		// 			break;
		// 		case ItemType.Armor:
		// 			let armorData = mw.Player.localPlayer.character.getComponent(ArmorScript).getArmorByUuid(inItem.uuid);
		// 			this.setData(inItem.itemtype, armorData.aid);
		// 			break;
		// 	}
		// }

		
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

	setData(itemtype : ItemType, typeId : number) {
		this.name.text = BagManagerModuleData.getItemName(itemtype, typeId);
		this.icon.imageGuid = BagManagerModuleData.getItemName(itemtype, typeId);
	}

	onUnEdquipment() {
		// 卸下装备

	}

	onEdquipment() {
		// 装上装备

	}

	onRemove() {
		// 丢弃物品

	}
}
 