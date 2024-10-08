
import { GameConfig } from "../../../configs/GameConfig";
import BagItemUI_Generate from "../../../ui-generate/Bag/BagItemUI_generate"
import { BagManagerModuleData, ItemType, eventType } from "../BagManagerModuleData";

import WeaponScript from "../../weaponModule/WeaponScript";

@UIBind('UI/Bag/BagItemUI.ui')
export default class BagItemUI extends BagItemUI_Generate {
	index : number;
	itemType : ItemType;
	bagData : BagManagerModuleData;

	onButtonClickEvents: mw.MulticastDelegate<eventType>;

	private image_Internal: mw.Image
	public get image(): mw.Image {
		if(!this.image_Internal&&this.uiWidgetBase) {
			this.image_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image') as mw.Image;
		}
		return this.image_Internal
	}

	private button_Internal: mw.Button
	public get button(): mw.Button {
		if(!this.button_Internal&&this.uiWidgetBase) {
			this.button_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Button') as mw.Button;
		}
		return this.button_Internal
	}

	private itemNameObj_Internal: mw.TextBlock
	public get itemNameObj(): mw.TextBlock {
		if(!this.itemNameObj_Internal&&this.uiWidgetBase) {
			this.itemNameObj_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Button/itemName') as mw.TextBlock;
		}
		return this.itemNameObj_Internal
	}

	private itemNumObj_Internal: mw.TextBlock
	public get itemNumObj(): mw.TextBlock {
		if(!this.itemNumObj_Internal&&this.uiWidgetBase) {
			this.itemNumObj_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Button/itemNum') as mw.TextBlock;
		}
		return this.itemNumObj_Internal
	}

	static defaultX = 100;
	static defaultY = 100;
	
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		this.index = -1;
		this.button.onClicked.add(this.buttonClick.bind(this));
	}

	/** 仅在游戏时间对非模板实例调用一次 */
	protected onStart() { 
	}

	protected OnDestory() {
		console.log("BagItemUI OnDestory, index is " + this.index);
	}

	public init(inIndex : number, inItemType : ItemType, inBagData : BagManagerModuleData, inOnButtonClickEvents : mw.MulticastDelegate<eventType>) {
		this.bagData = inBagData;
		this.updateItemUI(inIndex, inItemType);
		this.onButtonClickEvents = inOnButtonClickEvents;
	}

	public updateItemUI(inIndex : number, inItemType : ItemType) {
		this.index = inIndex;
		this.itemType = inItemType;

		if(!this.bagData)
		{
			this.setVisibility(mw.SlateVisibility.Hidden);
			return;
		}
		let bagItemObj = this.bagData.findItemByIndex(inItemType, inIndex)
		if(!bagItemObj || !(inItemType == ItemType.Weapon))
		{
			this.setVisibility(mw.SlateVisibility.Hidden);
			return;
		}

		let weaponConfig = GameConfig.WeaponObj.getElement(bagItemObj.wid);
		if(!weaponConfig)
		{
			this.setVisibility(mw.SlateVisibility.Hidden);
			return;
		}
		
		this.setVisibility(mw.SlateVisibility.Visible);

		this.itemNameObj.text = weaponConfig.name;
		this.itemNum.text = bagItemObj.count.toString();
		if(weaponConfig.stackMax == 1)
		{
			this.itemNum.visibility = mw.SlateVisibility.Hidden;
		}
		this.button.normalImageGuid = weaponConfig.icon;
		this.button.disableImageGuid = weaponConfig.icon;
		this.button.pressedImageGuid = weaponConfig.icon;
	}

	protected setVisibility(inVisibility : mw.SlateVisibility)
	{
		this.button.visibility = inVisibility;
		if(inVisibility == mw.SlateVisibility.Visible)
		{
			this.itemNameObj.visibility = mw.SlateVisibility.SelfHitTestInvisible;
			this.itemNumObj.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		}
		else
		{
			this.itemNameObj.visibility = inVisibility;
			this.itemNumObj.visibility = inVisibility;
		}
	}

	protected buttonClick() {
		let bagItemObj = this.bagData.findItemByIndex(this.itemType, this.index)
		this.onButtonClickEvents.broadcast(bagItemObj.wid);
	}
}
 