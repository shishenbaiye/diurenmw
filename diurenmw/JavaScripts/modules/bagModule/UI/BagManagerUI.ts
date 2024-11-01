
import BagUI_Generate from "../../../ui-generate/Bag/BagUI_generate"
import BagItemUI from "./BagItemUI"
import { BagItemBase, BagManagerModuleData, EquipmentType, ItemType, eventType } from "../BagManagerModuleData";
import ItemTypeUI from "./ItemTypeUI";
import { PlayerAttributeSet } from "../../AttributeModule/PlayerAttributeSet";
import BagAttributeUI from "./BagAttributeUI";
import PlayerDataUI from "./PlayerDataUI";
import BagShowSelect from "./BagShowSelect";
import BagMainShowSelect from "./BagMainShowSelect";
import { GameEventBus } from "../../../common/eventBus/EventBus";

@UIBind('UI/Bag/BagUI.ui')
export default class BagManagerUI extends BagUI_Generate {

	BagItemObjs : Array<BagItemUI>;
	ItemTypeUIs : Array<ItemTypeUI>;

	bagAttributeUIObj : BagAttributeUI;
	playerDataUIObj : PlayerDataUI;
	mainShowSelectUI : BagMainShowSelect;

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

		GameEventBus.on("BagModule_EquipmentClick", this.onEquipmentClick.bind(this));
		GameEventBus.on("BagModule_ItemClick", this.onItemClick.bind(this));
	}

	/** 仅在游戏时间对非模板实例调用一次 */
	protected onStart() {
		this.itemNumPerLine = Math.floor(this.content.size.x / BagItemUI.defaultX);
		console.log("BagUI itemNumPerLine is " + this.itemNumPerLine);
	}

	public init(inBagData : BagManagerModuleData) { 
		this.bagData = inBagData;
		
		this.updateItemTypeUI();
		this.updateCurrentTypePage();
		this.updateAttributeUI();
		this.updatePlayerDataUI();
	}
	updatePlayerDataUI() {
		if(!this.playerDataUIObj)
		{
			this.playerDataUIObj = UIService.create(PlayerDataUI);
			this.uiWidgetBase.rootContent.addChild(this.playerDataUIObj.uiObject);
			this.playerDataUIObj.uiObject.position = new mw.Vector2(450, 140);
			this.playerDataUIObj.uiObject.size = new mw.Vector2(700, 700);
			this.playerDataUIObj.uiObject.visibility = mw.SlateVisibility.Visible;
		}
	}

	updateAttributeUI() {
		if(!this.bagAttributeUIObj)
		{
			this.bagAttributeUIObj = UIService.create(BagAttributeUI);
			this.uiWidgetBase.rootContent.addChild(this.bagAttributeUIObj.uiObject);
			this.bagAttributeUIObj.uiObject.position = new mw.Vector2(0, 140);
			this.bagAttributeUIObj.uiObject.size = new mw.Vector2(450, 600);
			this.bagAttributeUIObj.uiObject.visibility = mw.SlateVisibility.Visible;
		}
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
		bagItemUIObject.init(index, this.currentTypePage, this.bagData);
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
		}
		for(let i = num; i < this.BagItemObjs.length; ++i)
		{
			this.BagItemObjs[i].uiObject.visibility = mw.SlateVisibility.Collapsed;
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

	protected onItemClick(inItem : BagItemBase) {
		this.mainShowSelectUI = UIService.create(BagMainShowSelect);
		this.mainShowSelectUI.init(false, inItem);
		this.uiWidgetBase.rootContent.addChild(this.mainShowSelectUI.uiObject);
		this.mainShowSelectUI.uiObject.position = new mw.Vector2(0, 0);
		this.mainShowSelectUI.uiObject.size = new mw.Vector2(1920, 1080);
		this.mainShowSelectUI.uiObject.visibility = mw.SlateVisibility.Visible;
	}

	protected onEquipmentClick(inItem : BagItemBase, inEquipmentType : EquipmentType) {
		this.mainShowSelectUI = UIService.create(BagMainShowSelect);
		this.mainShowSelectUI.init(true, inItem, inEquipmentType);
		this.uiWidgetBase.rootContent.addChild(this.mainShowSelectUI.uiObject);
		this.mainShowSelectUI.uiObject.position = new mw.Vector2(0, 0);
		this.mainShowSelectUI.uiObject.size = new mw.Vector2(1920, 1080);
		this.mainShowSelectUI.uiObject.visibility = mw.SlateVisibility.Visible;
	}
}
 