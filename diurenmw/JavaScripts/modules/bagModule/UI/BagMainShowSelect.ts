import BagMainShowSelect_Generate from "../../../ui-generate/Bag/BagMainShowSelect_generate";
import { BagItemBase } from "../BagManagerModuleData";
import BagShowSelect from "./BagShowSelect";

@UIBind('UI/Bag/BagMainShowSelect.ui')
export default class BagMainShowSelect extends BagMainShowSelect_Generate {
	
	isEquipment: boolean = false;

	leftShowSelectUI : BagShowSelect;
	rightShowSelectUI : BagShowSelect;

	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		this.leftShowSelectUI = UIService.create(BagShowSelect);
		this.uiWidgetBase.rootContent.addChild(this.leftShowSelectUI.uiObject);
		this.leftShowSelectUI.uiObject.position = new mw.Vector2(750, 140);
		this.leftShowSelectUI.uiObject.size = new mw.Vector2(400, 800);
		this.leftShowSelectUI.uiObject.visibility = mw.SlateVisibility.Visible;

		this.rightShowSelectUI = UIService.create(BagShowSelect);
		this.uiWidgetBase.rootContent.addChild(this.rightShowSelectUI.uiObject);
		this.rightShowSelectUI.uiObject.position = new mw.Vector2(1150, 140);
		this.rightShowSelectUI.uiObject.size = new mw.Vector2(400, 800);
		this.rightShowSelectUI.uiObject.visibility = mw.SlateVisibility.Visible;

		this.exit.onClicked.add(this.onExit.bind(this));
	}

	/** 仅在游戏时间对非模板实例调用一次 */
	protected onStart() {
	}

	protected setDefault() {
		
	}

	init(inEquipment : boolean, inItem : BagItemBase = null) {
		this.isEquipment = inEquipment;
		
	}

	onExit(): void
	{
		this.destroy();
	}
}
 