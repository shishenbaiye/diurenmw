
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Attribute/DamageDigitView.ui
*/



@UIBind('UI/Attribute/DamageDigitView.ui')
export default class DamageDigitView_Generate extends UIScript {
		private txt_context_Internal: mw.TextBlock
	public get txt_context(): mw.TextBlock {
		if(!this.txt_context_Internal&&this.uiWidgetBase) {
			this.txt_context_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txt_context') as mw.TextBlock
		}
		return this.txt_context_Internal
	}
	private txt_context2_Internal: mw.TextBlock
	public get txt_context2(): mw.TextBlock {
		if(!this.txt_context2_Internal&&this.uiWidgetBase) {
			this.txt_context2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txt_context2') as mw.TextBlock
		}
		return this.txt_context2_Internal
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
		
		this.initLanguage(this.txt_context)
		
	
		this.initLanguage(this.txt_context2)
		
	
		//文本多语言
		

	}

	private initLanguage(ui: StaleButton | TextBlock) {
        let call = UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 