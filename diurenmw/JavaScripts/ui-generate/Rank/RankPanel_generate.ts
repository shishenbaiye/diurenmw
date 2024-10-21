
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Rank/RankPanel.ui
*/



@UIBind('UI/Rank/RankPanel.ui')
export default class RankPanel_Generate extends UIScript {
		private text_Title_Internal: mw.TextBlock
	public get text_Title(): mw.TextBlock {
		if(!this.text_Title_Internal&&this.uiWidgetBase) {
			this.text_Title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text_Title') as mw.TextBlock
		}
		return this.text_Title_Internal
	}
	private canvas_Player_Internal: mw.Canvas
	public get canvas_Player(): mw.Canvas {
		if(!this.canvas_Player_Internal&&this.uiWidgetBase) {
			this.canvas_Player_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ScrollBox/canvas_Player') as mw.Canvas
		}
		return this.canvas_Player_Internal
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
		
		this.initLanguage(this.text_Title)
		
	
		//文本多语言
		

	}

	private initLanguage(ui: StaleButton | TextBlock) {
        let call = UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 