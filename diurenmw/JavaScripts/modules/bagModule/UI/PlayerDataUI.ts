
import PlayerDataUI_Generate from "../../../ui-generate/Bag/PlayerDataUI_generate";


@UIBind('UI/Bag/PlayerDataUI.ui')
export default class PlayerDataUI extends PlayerDataUI_Generate {
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
 