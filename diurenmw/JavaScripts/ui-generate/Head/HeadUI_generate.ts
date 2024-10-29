
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Head/HeadUI.ui
*/



@UIBind('UI/Head/HeadUI.ui')
export default class HeadUI_Generate extends UIScript {
		private img_vip_Internal: mw.Image
	public get img_vip(): mw.Image {
		if(!this.img_vip_Internal&&this.uiWidgetBase) {
			this.img_vip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_vip') as mw.Image
		}
		return this.img_vip_Internal
	}
	private text_Name_Internal: mw.TextBlock
	public get text_Name(): mw.TextBlock {
		if(!this.text_Name_Internal&&this.uiWidgetBase) {
			this.text_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text_Name') as mw.TextBlock
		}
		return this.text_Name_Internal
	}
	private con_rank_Internal: mw.Canvas
	public get con_rank(): mw.Canvas {
		if(!this.con_rank_Internal&&this.uiWidgetBase) {
			this.con_rank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/con_rank') as mw.Canvas
		}
		return this.con_rank_Internal
	}
	private img_rank_icon_Internal: mw.Image
	public get img_rank_icon(): mw.Image {
		if(!this.img_rank_icon_Internal&&this.uiWidgetBase) {
			this.img_rank_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/con_rank/img_rank_icon') as mw.Image
		}
		return this.img_rank_icon_Internal
	}
	private txt_rank_exp_Internal: mw.TextBlock
	public get txt_rank_exp(): mw.TextBlock {
		if(!this.txt_rank_exp_Internal&&this.uiWidgetBase) {
			this.txt_rank_exp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/con_rank/txt_rank_exp') as mw.TextBlock
		}
		return this.txt_rank_exp_Internal
	}
	private con_hp_Internal: mw.Canvas
	public get con_hp(): mw.Canvas {
		if(!this.con_hp_Internal&&this.uiWidgetBase) {
			this.con_hp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/con_hp') as mw.Canvas
		}
		return this.con_hp_Internal
	}
	private progressBar_blood_Internal: mw.ProgressBar
	public get progressBar_blood(): mw.ProgressBar {
		if(!this.progressBar_blood_Internal&&this.uiWidgetBase) {
			this.progressBar_blood_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/con_hp/progressBar_blood') as mw.ProgressBar
		}
		return this.progressBar_blood_Internal
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
		
		this.initLanguage(this.text_Name)
		
	
		this.initLanguage(this.txt_rank_exp)
		
	
		//文本多语言
		

	}

	private initLanguage(ui: StaleButton | TextBlock) {
        let call = UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 