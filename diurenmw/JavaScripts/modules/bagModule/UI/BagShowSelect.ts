import BagShowSelect_Generate from "../../../ui-generate/Bag/BagShowSelect_generate";
import { BagItemBase } from "../BagManagerModuleData";

@UIBind('UI/Bag/BagShowSelect.ui')
export default class BagShowSelect extends BagShowSelect_Generate {
	
	isEquipment: boolean = false;
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}

	/** 仅在游戏时间对非模板实例调用一次 */
	protected onStart() {
	}

	protected setDefault() {
		
	}

	init(inEquipment : boolean, inItem : BagItemBase = null) {
		this.isEquipment = inEquipment;
		
	}

}
 