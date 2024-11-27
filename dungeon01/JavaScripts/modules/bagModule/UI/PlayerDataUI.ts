
import { GameEventBus } from "../../../common/eventBus/EventBus";
import PlayerDataUI_Generate from "../../../ui-generate/Bag/PlayerDataUI_generate";
import { ArmorPart } from "../../armorModule/ArmorType";
import { JewelryPart } from "../../jewelryModule/JewelryType";
import { EquipmentType, ItemType } from "../BagManagerModuleData";
import EquipmentUI from "./EquipmentUI";


@UIBind('UI/Bag/PlayerDataUI.ui')
export default class PlayerDataUI extends PlayerDataUI_Generate {
	Padding = 10;
	size = 140;

	equipmentUI : Array<EquipmentUI>;
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		const leftPadding = this.Padding;
		const rightPadding = this.uiObject.size.x - this.Padding - this.size;
		this.equipmentUI = new Array<EquipmentUI>();

		GameEventBus.on("BagModule_UnEquipmentItemUpdate", this.updateEquipmentUI.bind(this));
		GameEventBus.on("BagModule_EquipmentItemUpdate", this.updateEquipmentUI.bind(this));

		// 武器
		this.equipmentUI.push(this.createEquipment(ItemType.Weapon, 0, new mw.Vector2(leftPadding, this.Padding)));
		// 戒指
		this.equipmentUI.push(this.createEquipment(ItemType.Jewelry, JewelryPart.Ring, new mw.Vector2(leftPadding, this.Padding + (this.Padding + this.size) * 1)));
		// 项链
		this.equipmentUI.push(this.createEquipment(ItemType.Jewelry, JewelryPart.Necklace, new mw.Vector2(leftPadding, this.Padding + (this.Padding + this.size) * 2)));
		// 手镯
		this.equipmentUI.push(this.createEquipment(ItemType.Jewelry, JewelryPart.Bracelet, new mw.Vector2(leftPadding, this.Padding + (this.Padding + this.size) * 3)));
		// 头部
		this.equipmentUI.push(this.createEquipment(ItemType.Armor, ArmorPart.Head, new mw.Vector2(rightPadding, this.Padding)));
		// 身体
		this.equipmentUI.push(this.createEquipment(ItemType.Armor, ArmorPart.Body, new mw.Vector2(rightPadding, this.Padding + (this.Padding + this.size) * 1)));
		// 腿部
		this.equipmentUI.push(this.createEquipment(ItemType.Armor, ArmorPart.Leg, new mw.Vector2(rightPadding, this.Padding + (this.Padding + this.size) * 2)));
		// 脚部
		this.equipmentUI.push(this.createEquipment(ItemType.Armor, ArmorPart.Foot, new mw.Vector2(rightPadding, this.Padding + (this.Padding + this.size) * 3)));
	}

	/** 仅在游戏时间对非模板实例调用一次 */
	protected onStart() { 

	}

	protected OnDestory() {

	}

	createEquipment(inType : ItemType, inPart : number, position : Vector2): EquipmentUI {
		let inEquipmentUI = UIService.create(EquipmentUI);
		inEquipmentUI.init(inType, inPart);
		this.uiWidgetBase.rootContent.addChild(inEquipmentUI.uiObject);
		inEquipmentUI.uiObject.position = position;
		inEquipmentUI.uiObject.size = new mw.Vector2(this.size, this.size);
		inEquipmentUI.uiObject.visibility = mw.SlateVisibility.Visible;
		return inEquipmentUI;
	}

	updateEquipmentUI(inEquipmentType : EquipmentType) {
		this.equipmentUI[inEquipmentType].updateIcon();
	}
}
 