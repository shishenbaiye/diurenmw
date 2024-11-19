import { GameEventBus } from "../../../common/eventBus/EventBus";
import { GameConfig } from "../../../configs/GameConfig";
import BagShowSelect_Generate from "../../../ui-generate/Bag/BagShowSelect_generate";
import { ArmorModuleData } from "../../armorModule/ArmorModuleData";
import ArmorScript from "../../armorModule/ArmorScript";
import { ConsumableModuleData } from "../../consumableModule/ConsumableModuleData";
import { JewelryModuleData } from "../../jewelryModule/JewelryModuleData";
import JewelryScript from "../../jewelryModule/JewelryScript";
import { MaterialModuleData } from "../../materialsModule/MaterialModuleData";
import { WeaponModuleData } from "../../weaponModule/WeaponModuleData";
import WeaponScript from "../../weaponModule/WeaponScript";
import { BagItemBase, BagManagerModuleData, EquipmentType, ItemType, QuantityColor } from "../BagManagerModuleData";
import BagSelectDataItem from "./BagSelectDataItem";

@UIBind('UI/Bag/BagShowSelect.ui')
export default class BagShowSelect extends BagShowSelect_Generate {
	isEquipment: boolean = false;
	item : BagItemBase;
	equipmentType : EquipmentType;
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
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

		switch(this.item.itemtype)
		{
			case ItemType.Weapon:
				let weaponData = DataCenterC.getData(WeaponModuleData).getWeaponData(this.item.uuid);
				let weaponConfig = GameConfig.WeaponObj.getElement(this.item.typeId);
				this.addDataItem(weaponData.atk.toString(), "物理攻击");
				this.addDataItem(weaponData.matk.toString(), "魔法攻击");
				this.addDataItem(weaponData.str.toString(), "力量");
				this.addDataItem(weaponData.int.toString(), "智力");
				if(weaponData.useEffet1) {
					this.addOnlyEffecItem(weaponConfig.effect1);
				}
				if(weaponData.useEffet2) {
					this.addOnlyEffecItem(weaponConfig.effect2);
				}
				if(weaponData.useEffet3) {
					this.addOnlyEffecItem(weaponConfig.effect3);
				}
				if(weaponData.useEffet4) {
					this.addOnlyEffecItem(weaponConfig.effect4);
				}
				this.setData(weaponData.wid, this.item);
				break;
			case ItemType.Jewelry:
				let jewelryData = DataCenterC.getData(JewelryModuleData).getJewelryData(this.item.uuid);
				let jewelryConfig = GameConfig.JewelryObj.getElement(this.item.typeId);
				this.addDataItem(jewelryData.def.toString(), "防御力");
				this.addDataItem(jewelryData.str.toString(), "力量");
				this.addDataItem(jewelryData.int.toString(), "智力");
				if(jewelryData.useEffet1) {
					this.addOnlyEffecItem(jewelryConfig.effect1);
				}
				if(jewelryData.useEffet2) {
					this.addOnlyEffecItem(jewelryConfig.effect2);
				}
				if(jewelryData.useEffet3) {
					this.addOnlyEffecItem(jewelryConfig.effect3);
				}
				if(jewelryData.useEffet4) {
					this.addOnlyEffecItem(jewelryConfig.effect4);
				}
				this.setData(jewelryData.jid, this.item);
				break;
			case ItemType.Armor:
				let armorData = DataCenterC.getData(ArmorModuleData).getArmorData(this.item.uuid);
				let armorConfig = GameConfig.ArmorObj.getElement(this.item.typeId);
				this.addDataItem(armorData.def.toString(), "防御力");
				this.addDataItem(armorData.vit.toString(), "体力");
				this.addDataItem(armorData.str.toString(), "力量");
				this.addDataItem(armorData.int.toString(), "智力");
				if(armorData.useEffet1) {
					this.addOnlyEffecItem(armorConfig.effect1);
				}
				if(armorData.useEffet2) {
					this.addOnlyEffecItem(armorConfig.effect2);
				}
				if(armorData.useEffet3) {
					this.addOnlyEffecItem(armorConfig.effect3);
				}
				if(armorData.useEffet4) {
					this.addOnlyEffecItem(armorConfig.effect4);
				}
				this.setData(armorData.aid, this.item);
				break;
			case ItemType.Consumables:
				let consumablesData = DataCenterC.getData(ConsumableModuleData).getConsumableData(this.item.uuid);
				let consumableConfig = GameConfig.ConsumablesObj.getElement(this.item.typeId);
				if(consumablesData.useEffet1) {
					this.addOnlyEffecItem(consumableConfig.effect1);
				}
				if(consumablesData.useEffet2) {
					this.addOnlyEffecItem(consumableConfig.effect2);
				}
				if(consumablesData.useEffet3) {
					this.addOnlyEffecItem(consumableConfig.effect3);
				}
				if(consumablesData.useEffet4) {
					this.addOnlyEffecItem(consumableConfig.effect4);
				}
				this.setData(consumablesData.id, this.item);
				break;
			case ItemType.Materials:
				let materialData = DataCenterC.getData(MaterialModuleData).getMaterialData(this.item.uuid);
				let materialConfig = GameConfig.MaterialsObj.getElement(this.item.typeId);
				if(materialData.useEffet1) {
					this.addOnlyEffecItem(materialConfig.effect1);
				}
				if(materialData.useEffet2) {
					this.addOnlyEffecItem(materialConfig.effect2);
				}
				if(materialData.useEffet3) {
					this.addOnlyEffecItem(materialConfig.effect3);
				}
				if(materialData.useEffet4) {
					this.addOnlyEffecItem(materialConfig.effect4);
				}
				this.setData(materialData.id, this.item);
				break;
		}
	}

	setData(typeId : number, inItem : BagItemBase) {
		if(typeId)
		{
			this.name.text = BagManagerModuleData.getItemName(inItem.itemtype, typeId);
			this.icon.imageGuid = BagManagerModuleData.getItemIcon(inItem.itemtype, typeId);
			BagManagerModuleData.setImageQuality(this.grade, inItem);
		}
	}

	addDataItem(inValue: string, inInfo : string) {
		let inDataItem = UIService.create(BagSelectDataItem);
		this.baseInfoContent.addChild(inDataItem.uiObject);
		inDataItem.init(inInfo + " +" + inValue);
		inDataItem.uiObject.size = inDataItem.value.size;
		inDataItem.uiObject.visibility = mw.SlateVisibility.Visible;
	}

	addOnlyEffecItem(inInfo : string) {
		let inDataItem = UIService.create(BagSelectDataItem);
		this.effectInfoContent.addChild(inDataItem.uiObject);
		inDataItem.init(inInfo);
		inDataItem.uiObject.size = inDataItem.value.size;
		inDataItem.uiObject.visibility = mw.SlateVisibility.Visible;
	}
}
 