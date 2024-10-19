
import ItemTypeUI_Generate from "../../../ui-generate/Bag/ItemTypeUI_generate"
import { BagManagerModuleData } from "../BagManagerModuleData";
import { ItemType } from "../BagManagerModuleData";

@UIBind('UI/Bag/ItemTypeUI.ui')
export default class ItemTypeUI extends ItemTypeUI_Generate {
	private typeButton_Internal: mw.Checkbox
	public get typeButton(): mw.Checkbox {
		if(!this.typeButton_Internal&&this.uiWidgetBase) {
			this.typeButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/TypeButton') as mw.Checkbox;
		}
		return this.typeButton_Internal
	}

	private typeText_Internal: mw.TextBlock
	public get typeText(): mw.TextBlock {
		if(!this.typeText_Internal&&this.uiWidgetBase) {
			this.typeText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/TypeButton/TypeText') as mw.TextBlock;
		}
		return this.typeText_Internal
	}

	itemType : ItemType;
	parent : BagUI;

	onTypeSelect: mw.MulticastDelegate<(inItemType : ItemType) => void>;

	static defaultX = 140;
	static defaultY = 70;
	
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		console.log("BagItemUI onAwake");
	}

	/** 仅在游戏时间对非模板实例调用一次 */
	protected onStart() { 
		console.log("BagItemUI onStart");
	}

	public init(inItemType : ItemType, inTypeText : string, inOnTypeSelect : mw.MulticastDelegate<(inItemType : ItemType) => void>) {
		this.typeText.text = inTypeText;
		this.itemType = inItemType;
		this.onTypeSelect = inOnTypeSelect;
		this.typeButton.onClicked.add(this.typeSelectClick.bind(this));
		this.typeButton.checkState = mw.CheckBoxState.Unchecked;
	}

	public setSelectType(inType : mw.CheckBoxState) {
		this.typeButton.checkState = inType;
	}

	protected typeSelectClick() {
		console.log("ItemTypeUI typeSelectClick : " + this.itemType);
		this.onTypeSelect.broadcast(this.itemType);
	}

}
 