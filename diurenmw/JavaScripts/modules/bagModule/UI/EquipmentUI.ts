
import EquipmentUI_Generate from "../../../ui-generate/Bag/EquipmentUI_generate";
import { ArmorPart } from "../../armorModule/ArmorType";
import { JewelryPart } from "../../jewelryModule/JewelryType";
import { ItemType } from "../BagManagerModuleData";

export enum EquipmentType
{
    // 武器
    Weapon,
    // 戒指
	Ring,
	// 项链
	Necklace,
	// 手镯
	Bracelet,
	// 头部
	Head,
	// 身体
	Body,
	// 腿部
	Leg,
	// 脚部
	Foot,
}

@UIBind('UI/Bag/EquipmentUI.ui')
export default class EquipmentUI extends EquipmentUI_Generate {
	type : ItemType;
	part : number;
	mEquipmentType : EquipmentType;

	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}

	/** 仅在游戏时间对非模板实例调用一次 */
	protected onStart() { 
	}

	protected OnDestory() {
	}

	init(inType : ItemType, inPart : number) {
		this.type = inType;
		this.part = inPart;
		this.mEquipmentType = this.getEquipmentType(inType, inPart);
		this.updateIcon();
	}

	updateIcon() {
		switch (this.mEquipmentType) {
			case EquipmentType.Weapon:
				this.setMaskButtonImage("153939");
				break;
			case EquipmentType.Ring:
				this.setMaskButtonImage("142702");
				break;
			case EquipmentType.Necklace:
				this.setMaskButtonImage("153939");
				break;
			case EquipmentType.Bracelet:
				this.setMaskButtonImage("153939");
				break;
			case EquipmentType.Head:
				this.setMaskButtonImage("153939");
				break;
			case EquipmentType.Body:
				this.setMaskButtonImage("153939");
				break;
			case EquipmentType.Leg:
				this.setMaskButtonImage("153939");
				break;
			case EquipmentType.Foot:
				this.setMaskButtonImage("153939");
				break;
		}
	}

	setMaskButtonImage(image: string) { 
		this.button.normalImageGuid = image;
		this.button.disableImageGuid = image;
		this.button.pressedImageGuid = image;
		this.button.normalImageColor = new mw.LinearColor(1, 1, 1, 1);
	}

	setDefaultButtonImage(image: string) {
		this.button.normalImageGuid = image;
		this.button.disableImageGuid = image;
		this.button.pressedImageGuid = image;
		this.button.normalImageColor = new mw.LinearColor(1, 1, 1, 0.5);
	}

	getEquipmentType(inType: ItemType, inPart: number): EquipmentType {
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
}
 