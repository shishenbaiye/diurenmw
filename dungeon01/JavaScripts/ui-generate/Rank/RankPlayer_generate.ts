
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Rank/RankPlayer.ui
*/



@UIBind('UI/Rank/RankPlayer.ui')
export default class RankPlayer_Generate extends UIScript {
		private img_Bg_Internal: mw.Image
	public get img_Bg(): mw.Image {
		if(!this.img_Bg_Internal&&this.uiWidgetBase) {
			this.img_Bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_Bg') as mw.Image
		}
		return this.img_Bg_Internal
	}
	private text_Position_Internal: mw.TextBlock
	public get text_Position(): mw.TextBlock {
		if(!this.text_Position_Internal&&this.uiWidgetBase) {
			this.text_Position_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text_Position') as mw.TextBlock
		}
		return this.text_Position_Internal
	}
	private text_Number_Internal: mw.TextBlock
	public get text_Number(): mw.TextBlock {
		if(!this.text_Number_Internal&&this.uiWidgetBase) {
			this.text_Number_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text_Number') as mw.TextBlock
		}
		return this.text_Number_Internal
	}
	private canvas_Name_Internal: mw.Canvas
	public get canvas_Name(): mw.Canvas {
		if(!this.canvas_Name_Internal&&this.uiWidgetBase) {
			this.canvas_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Name') as mw.Canvas
		}
		return this.canvas_Name_Internal
	}
	private txt_name_Internal: mw.TextBlock
	public get txt_name(): mw.TextBlock {
		if(!this.txt_name_Internal&&this.uiWidgetBase) {
			this.txt_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Name/txt_name') as mw.TextBlock
		}
		return this.txt_name_Internal
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
		
		this.initLanguage(this.text_Position)
		
	
		this.initLanguage(this.text_Number)
		
	
		this.initLanguage(this.txt_name)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Text_1") as any);
		
	

	}

	private initLanguage(ui: StaleButton | TextBlock) {
        let call = UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 