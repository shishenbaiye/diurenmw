
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Bag/BagSelectDataItem.ui
*/



@UIBind('UI/Bag/BagSelectDataItem.ui')
export default class BagSelectDataItem_Generate extends UIScript {
		private effect_Internal: mw.TextBlock
	public get effect(): mw.TextBlock {
		if(!this.effect_Internal&&this.uiWidgetBase) {
			this.effect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/effect') as mw.TextBlock
		}
		return this.effect_Internal
	}
	private value_Internal: mw.TextBlock
	public get value(): mw.TextBlock {
		if(!this.value_Internal&&this.uiWidgetBase) {
			this.value_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/value') as mw.TextBlock
		}
		return this.value_Internal
	}
	private effectInfo_Internal: mw.TextBlock
	public get effectInfo(): mw.TextBlock {
		if(!this.effectInfo_Internal&&this.uiWidgetBase) {
			this.effectInfo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/effectInfo') as mw.TextBlock
		}
		return this.effectInfo_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		this.canUpdate = false;
		this.layer = UILayerMiddle;
        this.initButtons();
	}

	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.effect)
		
	
		this.initLanguage(this.value)
		
	
		this.initLanguage(this.effectInfo)
		
	
		//文本多语言
		

	}

	private initLanguage(ui: StaleButton | TextBlock) {
        let call = UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 