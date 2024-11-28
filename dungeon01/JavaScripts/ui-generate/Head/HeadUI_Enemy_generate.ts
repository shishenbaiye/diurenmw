
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Head/HeadUI_Enemy.ui
*/



@UIBind('UI/Head/HeadUI_Enemy.ui')
export default class HeadUI_Enemy_Generate extends UIScript {
		private progressBar_blood_Internal: mw.ProgressBar
	public get progressBar_blood(): mw.ProgressBar {
		if(!this.progressBar_blood_Internal&&this.uiWidgetBase) {
			this.progressBar_blood_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/progressBar_blood') as mw.ProgressBar
		}
		return this.progressBar_blood_Internal
	}
	private txt_name_Internal: mw.TextBlock
	public get txt_name(): mw.TextBlock {
		if(!this.txt_name_Internal&&this.uiWidgetBase) {
			this.txt_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txt_name') as mw.TextBlock
		}
		return this.txt_name_Internal
	}
	private image_head_Internal: mw.Image
	public get image_head(): mw.Image {
		if(!this.image_head_Internal&&this.uiWidgetBase) {
			this.image_head_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/txt_name/image_head') as mw.Image
		}
		return this.image_head_Internal
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
		
		this.initLanguage(this.txt_name)
		
	
		//文本多语言
		

	}

	private initLanguage(ui: StaleButton | TextBlock) {
        let call = UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 