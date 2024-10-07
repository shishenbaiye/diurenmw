
import BagItemUI_Generate from "../../../ui-generate/Bag/BagItemUI_generate"
import { BagManagerModuleData } from "../BagManagerModuleData";

@UIBind('UI/Bag/BagItemUI.ui')
export default class BagItemUI extends BagItemUI_Generate {
	index : number;
	bagData : BagManagerModuleData;

	static defaultX = 100;
	static defaultY = 100;
	
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		this.index = -1;
	}

	/** 仅在游戏时间对非模板实例调用一次 */
	protected onStart() { 
	}

	protected OnDestory() {
		console.log("BagItemUI OnDestory, index is " + this.index);
	}

	public init(inIndex : number, inBagData : BagManagerModuleData) {
		this.index = inIndex;
		this.bagData = inBagData;
		this.updateItemUI();
	}

	protected updateItemUI() {
		// this.bagData.

		
	}
}
 