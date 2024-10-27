import BagSelectDataItem_Generate from "../../../ui-generate/Bag/BagSelectDataItem_generate";

@UIBind('UI/Bag/BagSelectDataItem.ui')
export default class BagSelectDataItem extends BagSelectDataItem_Generate {
	
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}

	/** 仅在游戏时间对非模板实例调用一次 */
	protected onStart() {
	}


}
 