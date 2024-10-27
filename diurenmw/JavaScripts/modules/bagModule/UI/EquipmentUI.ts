
import { GameConfig } from "../../../configs/GameConfig";
import EquipmentUI_Generate from "../../../ui-generate/Bag/EquipmentUI_generate";
import ArmorScript from "../../armorModule/ArmorScript";
import { ArmorPart } from "../../armorModule/ArmorType";
import JewelryScript from "../../jewelryModule/JewelryScript";
import { JewelryPart } from "../../jewelryModule/JewelryType";
import WeaponScript from "../../weaponModule/WeaponScript";
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
		let excelData = null;
		switch (this.mEquipmentType) {
			case EquipmentType.Weapon:
				let equipWeapon = mw.Player.localPlayer.character.getComponent(WeaponScript).getEquipWeapon();
				if(!equipWeapon)
				{
					this.itemName.text = "武器";
					return;
				}
				excelData = GameConfig.WeaponObj.getElement(equipWeapon.wid);
				break;
			case EquipmentType.Ring:
				let equepRing = mw.Player.localPlayer.character.getComponent(JewelryScript).getEquepJewelry(JewelryPart.Ring);
				if(!equepRing)
				{
					this.itemName.text = "戒指";
					return;
				}
				excelData = GameConfig.JewelryObj.getElement(equepRing.aid);
				break;
			case EquipmentType.Necklace:
				let equepNecklace = mw.Player.localPlayer.character.getComponent(JewelryScript).getEquepJewelry(JewelryPart.Necklace);
				if(!equepNecklace)
				{
					this.itemName.text = "项链";
					return;
				}
				excelData = GameConfig.JewelryObj.getElement(equepNecklace.aid);
				break;
			case EquipmentType.Bracelet:
				let equepBracelet = mw.Player.localPlayer.character.getComponent(JewelryScript).getEquepJewelry(JewelryPart.Bracelet);
				if(!equepBracelet)
				{
					this.itemName.text = "手镯";
					return;
				}
				excelData = GameConfig.JewelryObj.getElement(equepBracelet.aid);
				break;
			case EquipmentType.Head:
				let equepHead = mw.Player.localPlayer.character.getComponent(ArmorScript).getEquepArmor(ArmorPart.Head);
				if(!equepHead)
				{
					this.itemName.text = "头部";
					return;
				}
				excelData = GameConfig.JewelryObj.getElement(equepHead.aid);
				break;
			case EquipmentType.Body:
				let equepBody = mw.Player.localPlayer.character.getComponent(ArmorScript).getEquepArmor(ArmorPart.Body);
				if(!equepBody)
				{
					this.itemName.text = "身体";
					return;
				}
				excelData = GameConfig.JewelryObj.getElement(equepBody.aid);
				break;
			case EquipmentType.Leg:
				let equepLeg = mw.Player.localPlayer.character.getComponent(ArmorScript).getEquepArmor(ArmorPart.Leg);
				if(!equepLeg)
				{
					this.itemName.text = "腿部";
					return;
				}
				excelData = GameConfig.JewelryObj.getElement(equepLeg.aid);
				break;
			case EquipmentType.Foot:
				let equepFoot = mw.Player.localPlayer.character.getComponent(ArmorScript).getEquepArmor(ArmorPart.Foot);
				if(!equepFoot)
				{
					this.itemName.text = "脚部";
					return;
				}
				excelData = GameConfig.JewelryObj.getElement(equepFoot.aid);
				break;
		}
		this.setButtonImage(excelData.icon);
		this.itemName.text = excelData.name;
	}

	setButtonImage(image: string) { 
		this.button.normalImageGuid = image;
		this.button.disableImageGuid = image;
		this.button.pressedImageGuid = image;
		this.button.normalImageColor = new mw.LinearColor(1, 1, 1, 1);
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
 