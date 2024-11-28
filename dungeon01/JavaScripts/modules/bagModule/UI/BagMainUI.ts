
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Bag/BagUI.ui
*/

import { GameEventBus } from "../../../common/eventBus/EventBus";
import BagUI_Generate from "../../../ui-generate/Bag/BagUI_generate";
import { BagItemBase, EquipmentType } from "../BagManagerModuleData";
import BagMainShowSelect from "./BagMainShowSelect";
import MenuPropContent from "./MenuPropContent";




@UIBind('UI/Bag/BagUI.ui')
export default class BagMainUI extends BagUI_Generate {
	mainShowSelectUI : BagMainShowSelect;
	menuPropContentUIObj : MenuPropContent;

	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		this.canUpdate = false;
		this.layer = UILayerMiddle;

		this.exit.onClicked.add(this.onExitClicked.bind(this));

		GameEventBus.on("BagModule_EquipmentClick", this.onEquipmentClick.bind(this));
		GameEventBus.on("BagModule_ItemClick", this.onItemClick.bind(this));

		this.updateMenuPropContent();
	}

	init() {
		this.menuPropContentUIObj.init();
	}

	updateMenuPropContent() {
		if(!this.menuPropContentUIObj)
		{
			this.menuPropContentUIObj = UIService.create(MenuPropContent);
			this.menuContent.addChild(this.menuPropContentUIObj.uiObject);
			this.menuPropContentUIObj.uiObject.position = new mw.Vector2(0, 0);
			this.menuPropContentUIObj.uiObject.size = this.menuContent.size;
			this.menuPropContentUIObj.uiObject.visibility = mw.SlateVisibility.Visible;
		}
	}

	protected onExitClicked() {
		console.log("BagUI onExitClicked");
		this.destroy();
	}

	protected onItemClick(inItem : BagItemBase) {
		this.mainShowSelectUI = UIService.create(BagMainShowSelect);
		this.mainShowSelectUI.init(false, inItem);
		if(this.uiWidgetBase)
		{
			this.uiWidgetBase.rootContent.addChild(this.mainShowSelectUI.uiObject);
			this.mainShowSelectUI.uiObject.position = new mw.Vector2(0, 0);
			this.mainShowSelectUI.uiObject.size = this.uiWidgetBase.rootContent.size;
			this.mainShowSelectUI.uiObject.visibility = mw.SlateVisibility.Visible;
		}
		else
		{
			this.mainShowSelectUI.uiObject.visibility = mw.SlateVisibility.Collapsed;
		}
	}

	protected onEquipmentClick(inItem : BagItemBase, inEquipmentType : EquipmentType) {
		this.mainShowSelectUI = UIService.create(BagMainShowSelect);
		this.mainShowSelectUI.init(true, inItem, inEquipmentType);
		if(this.uiWidgetBase)
		{
			this.uiWidgetBase.rootContent.addChild(this.mainShowSelectUI.uiObject);
			this.mainShowSelectUI.uiObject.position = new mw.Vector2(0, 0);
			this.mainShowSelectUI.uiObject.size = this.uiWidgetBase.rootContent.size;
			this.mainShowSelectUI.uiObject.visibility = mw.SlateVisibility.Visible;
		}
		else
		{
			this.mainShowSelectUI.uiObject.visibility = mw.SlateVisibility.Collapsed;
		}
	}
}
 