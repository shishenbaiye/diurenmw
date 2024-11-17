import { GameEventBus } from "../../../common/eventBus/EventBus";
import BagMainShowSelect_Generate from "../../../ui-generate/Bag/BagMainShowSelect_generate";
import SelectButtonUI_Generate from "../../../ui-generate/Bag/SelectButtonUI_generate";
import { WeaponModuleData } from "../../weaponModule/WeaponModuleData";
import { BagItemBase, BagManagerModuleData, EquipmentType, ItemType } from "../BagManagerModuleData";
import BagShowSelect from "./BagShowSelect";

export enum SelectButtonType {
    Equipment = "装备",
	UnEquipment = "解除",
	Remove = "丢弃",
	Use = "使用",
}

@UIBind('UI/Bag/BagMainShowSelect.ui')
export default class BagMainShowSelect extends BagMainShowSelect_Generate {
	
	isEquipment: boolean = false;
	item : BagItemBase;
	equipmentType : EquipmentType;

	leftShowSelectUI : BagShowSelect;
	rightShowSelectUI : BagShowSelect;

	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		this.leftShowSelectUI = UIService.create(BagShowSelect);
		this.leftCanvas.addChild(this.leftShowSelectUI.uiObject);
		this.leftShowSelectUI.uiObject.size = this.leftCanvas.size;
		this.leftShowSelectUI.uiObject.visibility = mw.SlateVisibility.Visible;

		this.rightShowSelectUI = UIService.create(BagShowSelect);
		this.rightCanvas.addChild(this.rightShowSelectUI.uiObject);
		this.rightShowSelectUI.uiObject.size = this.rightCanvas.size;
		this.rightShowSelectUI.uiObject.visibility = mw.SlateVisibility.Visible;

		this.exit.onClicked.add(this.onExit.bind(this));
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
		this.rightCanvas.visibility = SlateVisibility.Visible;
		this.leftCanvas.visibility = SlateVisibility.Collapsed;
		if(inEquipment)
		{
			if(inEquipment) {
				inItem = DataCenterC.getData(BagManagerModuleData).equipmentItems[inEquipmentType];
			}

			this.rightShowSelectUI.init(true, inItem, inEquipmentType);

			this.registerButton(SelectButtonType.UnEquipment);
		}
		else if(inItem.itemtype == ItemType.Consumables || inItem.itemtype == ItemType.Materials)
		{
			this.leftCanvas.visibility = SlateVisibility.Collapsed;

			this.rightShowSelectUI.init(false, inItem, inEquipmentType);

			this.registerButton(SelectButtonType.Use);
			this.registerButton(SelectButtonType.Remove);
		}
		else
		{
			inEquipmentType = BagManagerModuleData.getEquipmentTypeByTypeId(inItem.itemtype, inItem.typeId);
			let inEquipmentItem = DataCenterC.getData(BagManagerModuleData).equipmentItems[inEquipmentType];
			if(inEquipmentItem.uuid != "") {
				this.leftCanvas.visibility = SlateVisibility.Visible;
				this.leftShowSelectUI.init(true, inEquipmentItem, inEquipmentType);
			}
			this.rightShowSelectUI.init(false, inItem, inEquipmentType);

			this.registerButton(SelectButtonType.Equipment);
			this.registerButton(SelectButtonType.Remove);
		}
	}

	registerButton(InSelectButtonType: SelectButtonType) {
		let newButton = UIService.create(SelectButtonUI_Generate);
		this.selectButtonCanvas.addChild(newButton.uiObject);
		this.leftShowSelectUI.uiObject.visibility = mw.SlateVisibility.Visible;
		newButton.buttonInfo.text = InSelectButtonType;

		switch(InSelectButtonType) {
			case SelectButtonType.Equipment:
				newButton.buttonSelect.onClicked.add(this.onEdquipment.bind(this));
				break;
			case SelectButtonType.UnEquipment:
				newButton.buttonSelect.onClicked.add(this.onUnEdquipment.bind(this));
				break;
			case SelectButtonType.Remove:
				newButton.buttonSelect.onClicked.add(this.onRemove.bind(this));
				break;
			case SelectButtonType.Use:
				newButton.buttonSelect.onClicked.add(this.onEdquipment.bind(this));
				break;
		}
	}

	onExit(): void
	{
		this.destroy();
	}

	onUnEdquipment() {
		// 卸下装备
		if(!this.item.uuid)
		{
			return;
		}
		GameEventBus.emit("BagModule_UnEquipmentItem", this.item, this.equipmentType);
		this.onExit();
	}

	onEdquipment() {
		if(!this.item.uuid)
		{
			return;
		}
		// 装上装备
		GameEventBus.emit("BagModule_EquipmentItem", this.item, this.equipmentType);
		this.onExit();
	}

	onRemove() {
		if(!this.item.uuid)
		{
			return;
		}
		// 丢弃物品
		GameEventBus.emit("BagModule_RemoveItem", this.item);
		this.onExit();
	}
}
 