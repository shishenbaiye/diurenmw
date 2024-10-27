
import PlayerDataUI_Generate from "../../../ui-generate/Bag/PlayerDataUI_generate";
import { ArmorPart } from "../../armorModule/ArmorType";
import { JewelryPart } from "../../jewelryModule/JewelryType";
import { ItemType } from "../BagManagerModuleData";
import EquipmentUI from "./EquipmentUI";


@UIBind('UI/Bag/PlayerDataUI.ui')
export default class PlayerDataUI extends PlayerDataUI_Generate {
	Padding = 50;
	size = 100;

	Weapon : EquipmentUI;
	Ring : EquipmentUI;
	Necklace : EquipmentUI;
	Bracelet : EquipmentUI;
	Head : EquipmentUI;
	Body : EquipmentUI;
	Leg : EquipmentUI;
	Foot : EquipmentUI;
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		const leftPadding = this.Padding;
		const rightPadding = this.uiObject.size.x - this.Padding - this.size;

		// 武器
		this.Weapon = this.createEquipment(ItemType.Weapon, 0, new mw.Vector2(leftPadding, this.Padding));
		// 戒指
		this.Ring = this.createEquipment(ItemType.Jewelry, JewelryPart.Ring, new mw.Vector2(leftPadding, this.Padding + (this.Padding + this.size) * 1));
		// 项链
		this.Necklace = this.createEquipment(ItemType.Jewelry, JewelryPart.Necklace, new mw.Vector2(leftPadding, this.Padding + (this.Padding + this.size) * 2));
		// 手镯
		this.Bracelet = this.createEquipment(ItemType.Jewelry, JewelryPart.Bracelet, new mw.Vector2(leftPadding, this.Padding + (this.Padding + this.size) * 3));
		// 头部
		this.Head = this.createEquipment(ItemType.Armor, ArmorPart.Head, new mw.Vector2(rightPadding, this.Padding));
		// 身体
		this.Body = this.createEquipment(ItemType.Armor, ArmorPart.Body, new mw.Vector2(rightPadding, this.Padding + (this.Padding + this.size) * 1));
		// 腿部
		this.Leg = this.createEquipment(ItemType.Armor, ArmorPart.Leg, new mw.Vector2(rightPadding, this.Padding + (this.Padding + this.size) * 2));
		// 脚部
		this.Foot = this.createEquipment(ItemType.Armor, ArmorPart.Foot, new mw.Vector2(rightPadding, this.Padding + (this.Padding + this.size) * 3));
	}

	/** 仅在游戏时间对非模板实例调用一次 */
	protected onStart() { 

	}

	protected OnDestory() {

	}

	createEquipment(inType : ItemType, inPart : number, position : Vector2): EquipmentUI {
		let inEquipmentUI = UIService.create(EquipmentUI);
		this.uiWidgetBase.rootContent.addChild(inEquipmentUI.uiObject);
		inEquipmentUI.uiObject.position = position;
		inEquipmentUI.uiObject.size = new mw.Vector2(this.size, this.size);
		inEquipmentUI.uiObject.visibility = mw.SlateVisibility.Visible;
		return inEquipmentUI;
	}
}
 