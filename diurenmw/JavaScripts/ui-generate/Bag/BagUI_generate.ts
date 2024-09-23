
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Bag/BagUI.ui
*/



@UIBind('UI/Bag/BagUI.ui')
export default class BagUI_Generate extends UIScript {
		private exit_Internal: mw.Button
	public get exit(): mw.Button {
		if(!this.exit_Internal&&this.uiWidgetBase) {
			this.exit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BagBackground/exit') as mw.Button
		}
		return this.exit_Internal
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
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/BagBackground/Weapon/WeaponText") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/BagBackground/Button_1/TextBlock") as any);
		
	

	}

	private initLanguage(ui: StaleButton | TextBlock) {
        let call = UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 