
import BagUI_Generate from "../../../ui-generate/Bag/BagUI_generate"

export default class BagUI extends BagUI_Generate {
	
	/** 仅在游戏时间对非模板实例调用一次 */
	protected onStart() { 
		console.log("BagUI onStart");
	}
	
	
}
 