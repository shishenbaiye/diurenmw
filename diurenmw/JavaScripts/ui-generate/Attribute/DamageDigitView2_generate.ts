
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Attribute/DamageDigitView2.ui
*/



@UIBind('UI/Attribute/DamageDigitView2.ui')
export default class DamageDigitView2_Generate extends UIScript {
		private mFontText_Internal: mw.TextBlock
	public get mFontText(): mw.TextBlock {
		if(!this.mFontText_Internal&&this.uiWidgetBase) {
			this.mFontText_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mFontText') as mw.TextBlock
		}
		return this.mFontText_Internal
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
		
		this.initLanguage(this.mFontText)
		
	
		//文本多语言
		

	}

	private initLanguage(ui: StaleButton | TextBlock) {
        let call = UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 