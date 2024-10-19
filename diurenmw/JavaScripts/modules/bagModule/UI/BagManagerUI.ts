
import BagUI_Generate from "../../../ui-generate/Bag/BagUI_generate"
import BagItemUI from "./BagItemUI"
import { BagManagerModuleData, ItemType, eventType } from "../BagManagerModuleData";
import ItemTypeUI from "./ItemTypeUI";

@UIBind('UI/Bag/BagUI.ui')
export default class BagManagerUI extends BagUI_Generate {

	BagItemObjs : Array<BagItemUI>;
	ItemTypeUIs : Array<ItemTypeUI>;

	onButtonClickEvents: mw.MulticastDelegate<eventType>;

	private exitButton_Internal: mw.Button
	public get exitButton(): mw.Button {
		if(!this.exitButton_Internal&&this.uiWidgetBase) {
			this.exitButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BagBackground/exit') as mw.Button;
		}
		return this.exitButton_Internal
	}

	private content_Internal: mw.Canvas
	public get content(): mw.Canvas {
		if(!this.content_Internal&&this.uiWidgetBase) {
			this.content_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BagBackground/ItemListBackground/ItemScrollBox/Content') as mw.Canvas;
		}
		return this.content_Internal
	}

	private typeContent_Internal: mw.TextBlock
	public get typeContent(): mw.TextBlock {
		if(!this.typeContent_Internal&&this.uiWidgetBase) {
			this.typeContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BagBackground/ItemType/TypeContent') as mw.TextBlock;
		}
		return this.typeContent_Internal
	}

	onTypeSelect: mw.MulticastDelegate<(inItemType : ItemType) => void>;

	bagData : BagManagerModuleData;
	// 当前显示的页面，默认武器页面
	currentTypePage : ItemType;
	// 每行多少个物品
	itemNumPerLine : number;

	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		console.log("BagUI onAwake");
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this.currentTypePage = ItemType.Weapon;
		this.onTypeSelect = new mw.MulticastDelegate<(inItemType : ItemType) => void>();
		this.onTypeSelect.add(this.onTypeSelectClick.bind(this));
        this.initButtons();
		this.BagItemObjs = new Array<BagItemUI>;
		this.ItemTypeUIs = new Array<ItemTypeUI>;
	}

	/** 仅在游戏时间对非模板实例调用一次 */
	protected onStart() {
		this.itemNumPerLine = Math.floor(this.content.size.x / BagItemUI.defaultX);
		console.log("BagUI itemNumPerLine is " + this.itemNumPerLine);
	}

	public init(inBagData : BagManagerModuleData, inOnButtonClickEvents : mw.MulticastDelegate<eventType>) { 
		this.bagData = inBagData;
		this.onButtonClickEvents = inOnButtonClickEvents;
		
		this.updateItemTypeUI();
		this.updateCurrentTypePage();
	}

	protected addItemTypeUI(inItemType : ItemType, inTypeText : string) {
		let index = this.typeContent.getChildrenCount();
		const itemTypeUIObject = UIService.create(ItemTypeUI);
		this.ItemTypeUIs.push(itemTypeUIObject);
		itemTypeUIObject.init(inItemType, inTypeText, this.onTypeSelect);
		this.typeContent.addChild(itemTypeUIObject.uiObject);

		itemTypeUIObject.uiObject.position = new mw.Vector2(ItemTypeUI.defaultX * index, 0);
		itemTypeUIObject.uiObject.size = new mw.Vector2(ItemTypeUI.defaultX, ItemTypeUI.defaultY);
		itemTypeUIObject.uiObject.visibility = mw.SlateVisibility.Visible;

		console.log("BagUI addItemTypeUI : " + inItemType + ", " + inTypeText);
		console.log("BagUI index : " + index);
		console.log("BagUI itemTypeUIObject.uiObject.position : " + itemTypeUIObject.uiObject.position);
		console.log("BagUI itemTypeUIObject.uiObject.size : " + itemTypeUIObject.uiObject.size);
		console.log("BagUI itemTypeUIObject.uiObject.visibility : " + itemTypeUIObject.uiObject.visibility);
	}

	protected addItemUI() : boolean {

		let index = this.BagItemObjs.length;
		if(index + 1 > this.bagData.bagTypeCapacity.get(this.currentTypePage))
		{
			console.warn("BagUI AddItemUI failed, is full. currentTypePage is " + this.currentTypePage + ", max capacity is " + this.bagData.bagTypeCapacity.get(this.currentTypePage));
			return false;
		}

		const bagItemUIObject = UIService.create(BagItemUI);
		bagItemUIObject.init(index, this.currentTypePage, this.bagData, this.onButtonClickEvents);
		this.content.addChild(bagItemUIObject.uiObject)
		this.BagItemObjs.push(bagItemUIObject);

		bagItemUIObject.uiObject.position = new mw.Vector2((index % this.itemNumPerLine) * BagItemUI.defaultX, Math.floor(index / this.itemNumPerLine) * BagItemUI.defaultY);
		bagItemUIObject.uiObject.size = new mw.Vector2(BagItemUI.defaultX, BagItemUI.defaultY);
		bagItemUIObject.uiObject.visibility = mw.SlateVisibility.Visible;

		return true;
	}

	protected updateItemUIPosition() {
		for(let i = 0; i < this.BagItemObjs.length; ++i) {
			this.BagItemObjs[i].uiObject.position = new mw.Vector2((i % this.itemNumPerLine) * BagItemUI.defaultX, Math.floor(i / this.itemNumPerLine) * BagItemUI.defaultY);
		}
	}

	protected updateCurrentTypePage() {
		let num = this.bagData.bagTypeCapacity.get(this.currentTypePage);

		
		let newY = (Math.floor(num / this.itemNumPerLine) + 1) * BagItemUI.defaultY;
		if(newY > this.content.size.y) {
			this.content.size = new Vector2(this.content.size.x, newY);
			this.content.position = new Vector2(0, 0);
			this.BagItemObjs = new Array<BagItemUI>;
			this.content.removeAllChildren();
		}

		let currentNum = this.BagItemObjs.length;
		console.log("BagUI updateCurrentTypePage : " + this.currentTypePage + ", num is " + num + ", currentNum is " + currentNum);
		const needAddNumbers = num - currentNum;
		for(let i = 0; i < needAddNumbers; ++i) {
			this.addItemUI();
		}

		this.showNumberItemObj(num);
		this.updateItemUIPosition();
	}

	collapseAllItemObj()
	{
		for(let i = 0; i < this.BagItemObjs.length; ++i)
		{
			this.BagItemObjs[i].uiObject.visibility = mw.SlateVisibility.Collapsed;
		}
	}

	showNumberItemObj(num : number)
	{
		for(let i = 0; i < num; ++i)
		{
			this.BagItemObjs[i].uiObject.visibility = mw.SlateVisibility.Visible;
			this.BagItemObjs[i].updateItemUI(i, this.currentTypePage);
			console.log("BagUI ShowNumberItemObj Visible : " + i);
		}
		for(let i = num; i < this.BagItemObjs.length; ++i)
		{
			this.BagItemObjs[i].uiObject.visibility = mw.SlateVisibility.Collapsed;
			console.log("BagUI ShowNumberItemObj Collapsed : " + i);
		}
	}

	protected updateItemTypeUI() {
		this.typeContent.size = new Vector2(ItemTypeUI.defaultX * 5, ItemTypeUI.defaultY);
		this.typeContent.position = new Vector2(0, 0);
		this.addItemTypeUI(ItemType.Weapon, "武器");
		this.addItemTypeUI(ItemType.Armor, "装备");
		this.addItemTypeUI(ItemType.Jewelry, "首饰");
		this.addItemTypeUI(ItemType.Consumables, "消耗品");
		this.addItemTypeUI(ItemType.Materials, "材料");
	}

	protected initButtons() {
		//按钮添加点击
		this.exitButton.onClicked.add(this.onExitClicked.bind(this));
	}

	protected onExitClicked() {
		console.log("BagUI onExitClicked");
		this.destroy();
	}

	protected onWeaponClicked() {
		console.log("BagUI OnWeaponClicked");
		this.currentTypePage = ItemType.Weapon;
		this.updateCurrentTypePage();
	}

	protected onTypeSelectClick(inItemType : ItemType) {
		console.log("BagUI onTypeSelectClick : " + inItemType);
		this.currentTypePage = inItemType;
		this.updateCurrentTypePage();
		this.ItemTypeUIs.forEach(element => {
			if(element.itemType != inItemType)
			{
				element.setSelectType(mw.CheckBoxState.Unchecked);
			}
		});
	}
}
 