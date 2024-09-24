
import BagUI_Generate from "../../../ui-generate/Bag/BagUI_generate"
import BagItemUI from "./BagItemUI"
import { BagManagerModuleData } from "../BagManagerModuleData";
import { ItemType } from "../ItemBase";

@UIBind('UI/Bag/BagUI.ui')
export default class BagUI extends BagUI_Generate {
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
        this.initButtons();
	}

	/** 仅在游戏时间对非模板实例调用一次 */
	protected onStart() {
		this.itemNumPerLine = Math.floor(this.itemScrollBox.size.x / BagItemUI.defaultX);
		console.log("BagUI itemNumPerLine is " + this.itemNumPerLine);
	}

	public init(inBagData : BagManagerModuleData) { 
		this.bagData = inBagData;
		
		this.updateCurrentTypePage();
	}

	protected AddItemUI() : boolean {

		let index = this.itemScrollBox.getChildrenCount();
		if(index + 1 >= this.bagData.bagTypeCapacity.get(this.currentTypePage))
		{
			console.warn("BagUI AddItemUI failed, is full. currentTypePage is " + this.currentTypePage + ", max capacity is " + this.bagData.bagTypeCapacity.get(this.currentTypePage));
			return false;
		}

		const bagItemUIObject = UIService.create(BagItemUI);
		bagItemUIObject.init(index, this.bagData);
		this.itemScrollBox.addChild(bagItemUIObject.uiObject)

		bagItemUIObject.uiObject.position = new mw.Vector2((index % this.itemNumPerLine) * BagItemUI.defaultX, Math.floor(index / this.itemNumPerLine) * BagItemUI.defaultY);
		bagItemUIObject.uiObject.size = new mw.Vector2(BagItemUI.defaultX, BagItemUI.defaultY);
		bagItemUIObject.uiObject.visibility = mw.SlateVisibility.Visible;

		return true;
	}

	protected updateCurrentTypePage() {
		for(let i = 0; i <= this.bagData.bagTypeCapacity.get(this.currentTypePage); ++i) {
			this.AddItemUI();
		}
	}

	protected initButtons() {
		//按钮添加点击
		this.exit.onClicked.add(this.onExitClicked.bind(this));
		this.weapon.onClicked.add(this.OnWeaponClicked.bind(this));
		this.other.onClicked.add(this.OnOtherClicked.bind(this));

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/BagBackground/Weapon/WeaponText") as any);
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/BagBackground/Button_1/TextBlock") as any);
		
	

	}

	private initLanguage(ui: StaleButton | TextBlock) {
        let call = UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }

	protected onExitClicked() {
		console.log("BagUI onExitClicked");
		this.destroy();
	}

	protected OnWeaponClicked() {
		console.log("BagUI OnWeaponClicked");

	}

	protected OnOtherClicked() {
		console.log("BagUI OnOtherClicked");

	}
}
 