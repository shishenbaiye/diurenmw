
import EquipmentUI_Generate from "../../../ui-generate/Bag/EquipmentUI_generate";


@UIBind('UI/Bag/EquipmentUI.ui')
export default class EquipmentUI extends EquipmentUI_Generate {
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}

	/** 仅在游戏时间对非模板实例调用一次 */
	protected onStart() { 
	}

	protected OnDestory() {
	}
}
 