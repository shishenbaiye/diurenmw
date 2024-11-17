
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Bag/BagMainShowSelect.ui
*/



@UIBind('UI/Bag/BagMainShowSelect.ui')
export default class BagMainShowSelect_Generate extends UIScript {
		private exit_Internal: mw.Button
	public get exit(): mw.Button {
		if(!this.exit_Internal&&this.uiWidgetBase) {
			this.exit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/exit') as mw.Button
		}
		return this.exit_Internal
	}
	private leftCanvas_Internal: mw.Canvas
	public get leftCanvas(): mw.Canvas {
		if(!this.leftCanvas_Internal&&this.uiWidgetBase) {
			this.leftCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/leftCanvas') as mw.Canvas
		}
		return this.leftCanvas_Internal
	}
	private rightCanvas_Internal: mw.Canvas
	public get rightCanvas(): mw.Canvas {
		if(!this.rightCanvas_Internal&&this.uiWidgetBase) {
			this.rightCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/rightCanvas') as mw.Canvas
		}
		return this.rightCanvas_Internal
	}
	private selectButtonCanvas_Internal: mw.Canvas
	public get selectButtonCanvas(): mw.Canvas {
		if(!this.selectButtonCanvas_Internal&&this.uiWidgetBase) {
			this.selectButtonCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/selectButtonCanvas') as mw.Canvas
		}
		return this.selectButtonCanvas_Internal
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
		
		this.exit.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		

	}

	private initLanguage(ui: StaleButton | TextBlock) {
        let call = UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 