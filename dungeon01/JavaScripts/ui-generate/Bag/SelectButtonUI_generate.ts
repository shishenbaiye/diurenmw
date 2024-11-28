
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Bag/SelectButtonUI.ui
*/



@UIBind('UI/Bag/SelectButtonUI.ui')
export default class SelectButtonUI_Generate extends UIScript {
		private buttonSelect_Internal: mw.Button
	public get buttonSelect(): mw.Button {
		if(!this.buttonSelect_Internal&&this.uiWidgetBase) {
			this.buttonSelect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/buttonSelect') as mw.Button
		}
		return this.buttonSelect_Internal
	}
	private buttonInfo_Internal: mw.TextBlock
	public get buttonInfo(): mw.TextBlock {
		if(!this.buttonInfo_Internal&&this.uiWidgetBase) {
			this.buttonInfo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/buttonSelect/buttonInfo') as mw.TextBlock
		}
		return this.buttonInfo_Internal
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
		
		this.buttonSelect.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.buttonInfo)
		
	
		//文本多语言
		

	}

	private initLanguage(ui: StaleButton | TextBlock) {
        let call = UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 