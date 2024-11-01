
import { GameEventBus } from "../../../common/eventBus/EventBus";
import { GameConfig } from "../../../configs/GameConfig";
import EquipmentUI_Generate from "../../../ui-generate/Bag/EquipmentUI_generate";
import ArmorScript from "../../armorModule/ArmorScript";
import { ArmorPart } from "../../armorModule/ArmorType";
import JewelryScript from "../../jewelryModule/JewelryScript";
import { JewelryPart } from "../../jewelryModule/JewelryType";
import WeaponScript from "../../weaponModule/WeaponScript";
import { EquipmentType, ItemType, BagItemBase, BagManagerModuleData } from "../BagManagerModuleData";

@UIBind('UI/Bag/EquipmentUI.ui')
export default class EquipmentUI extends EquipmentUI_Generate {
	type : ItemType;
	part : number;
	mEquipmentType : EquipmentType;
	isEquipped : boolean;
	defaultIconUuid = "114028";

	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		this.button.onClicked.add(this.onButtonClick.bind(this));
	}

	/** 仅在游戏时间对非模板实例调用一次 */
	protected onStart() { 
	}

	protected OnDestory() {
	}

	init(inType : ItemType, inPart : number) {
		this.type = inType;
		this.part = inPart;
		this.mEquipmentType = BagManagerModuleData.getEquipmentType(inType, inPart);
		this.updateIcon();
	}

	onButtonClick()
	{
		let items : BagItemBase = {uuid: "", typeId: this.part, count: 1, itemtype: this.type};
		GameEventBus.emit("BagModule_EquipmentClick", items, this.mEquipmentType);
	}

	updateIcon() {
		let excelData = null;
		this.isEquipped = false;

		let typeId = DataCenterC.getData(BagManagerModuleData).equipmentItems[this.mEquipmentType].typeId;

		switch (this.mEquipmentType) {
			case EquipmentType.Weapon:
				if(!typeId)
				{
					this.itemName.text = "武器";
					this.setButtonImage(this.defaultIconUuid);
					return;
				}
				excelData = GameConfig.WeaponObj.getElement(typeId);
				break;
			case EquipmentType.Ring:
				if(!typeId)
				{
					this.itemName.text = "戒指";
					this.setButtonImage(this.defaultIconUuid);
					return;
				}
				excelData = GameConfig.JewelryObj.getElement(typeId);
				break;
			case EquipmentType.Necklace:
				if(!typeId)
				{
					this.itemName.text = "项链";
					this.setButtonImage(this.defaultIconUuid);
					return;
				}
				excelData = GameConfig.JewelryObj.getElement(typeId);
				break;
			case EquipmentType.Bracelet:
				if(!typeId)
				{
					this.itemName.text = "手镯";
					this.setButtonImage(this.defaultIconUuid);
					return;
				}
				excelData = GameConfig.JewelryObj.getElement(typeId);
				break;
			case EquipmentType.Head:
				if(!typeId)
				{
					this.itemName.text = "头部";
					this.setButtonImage(this.defaultIconUuid);
					return;
				}
				excelData = GameConfig.ArmorObj.getElement(typeId);
				break;
			case EquipmentType.Body:
				if(!typeId)
				{
					this.itemName.text = "身体";
					this.setButtonImage(this.defaultIconUuid);
					return;
				}
				excelData = GameConfig.ArmorObj.getElement(typeId);
				break;
			case EquipmentType.Leg:
				if(!typeId)
				{
					this.itemName.text = "腿部";
					this.setButtonImage(this.defaultIconUuid);
					return;
				}
				excelData = GameConfig.ArmorObj.getElement(typeId);
				break;
			case EquipmentType.Foot:
				if(!typeId)
				{
					this.itemName.text = "脚部";
					this.setButtonImage(this.defaultIconUuid);
					return;
				}
				excelData = GameConfig.ArmorObj.getElement(typeId);
				break;
		}
		this.setButtonImage(excelData.icon);
		this.itemName.text = excelData.name;
		this.isEquipped = true;
	}

	setButtonImage(image: string) { 
		this.button.normalImageGuid = image;
		this.button.disableImageGuid = image;
		this.button.pressedImageGuid = image;
		this.button.normalImageColor = new mw.LinearColor(1, 1, 1, 1);
	}
}
 