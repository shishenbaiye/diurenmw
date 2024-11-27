
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Skill/SkillDetailUI.ui
*/



@UIBind('UI/Skill/SkillDetailUI.ui')
export default class SkillDetailUI_Generate extends UIScript {
		private mButton_close_Internal: mw.Button
	public get mButton_close(): mw.Button {
		if(!this.mButton_close_Internal&&this.uiWidgetBase) {
			this.mButton_close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton_close') as mw.Button
		}
		return this.mButton_close_Internal
	}
	private mCanvas_Top_Internal: mw.Canvas
	public get mCanvas_Top(): mw.Canvas {
		if(!this.mCanvas_Top_Internal&&this.uiWidgetBase) {
			this.mCanvas_Top_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_Top') as mw.Canvas
		}
		return this.mCanvas_Top_Internal
	}
	private mImage_Icon_Internal: mw.Image
	public get mImage_Icon(): mw.Image {
		if(!this.mImage_Icon_Internal&&this.uiWidgetBase) {
			this.mImage_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_Top/mImage_Icon') as mw.Image
		}
		return this.mImage_Icon_Internal
	}
	private mTextBlock_name_Internal: mw.TextBlock
	public get mTextBlock_name(): mw.TextBlock {
		if(!this.mTextBlock_name_Internal&&this.uiWidgetBase) {
			this.mTextBlock_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_Top/mTextBlock_name') as mw.TextBlock
		}
		return this.mTextBlock_name_Internal
	}
	private mTextBlock_Type_Internal: mw.TextBlock
	public get mTextBlock_Type(): mw.TextBlock {
		if(!this.mTextBlock_Type_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Type_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_Top/mTextBlock_Type') as mw.TextBlock
		}
		return this.mTextBlock_Type_Internal
	}
	private mTextBlock_CD_Internal: mw.TextBlock
	public get mTextBlock_CD(): mw.TextBlock {
		if(!this.mTextBlock_CD_Internal&&this.uiWidgetBase) {
			this.mTextBlock_CD_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_Top/mTextBlock_CD') as mw.TextBlock
		}
		return this.mTextBlock_CD_Internal
	}
	private mTextBlock_Cost_Internal: mw.TextBlock
	public get mTextBlock_Cost(): mw.TextBlock {
		if(!this.mTextBlock_Cost_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Cost_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_Top/mTextBlock_Cost') as mw.TextBlock
		}
		return this.mTextBlock_Cost_Internal
	}
	private mButton_e_Internal: mw.Button
	public get mButton_e(): mw.Button {
		if(!this.mButton_e_Internal&&this.uiWidgetBase) {
			this.mButton_e_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_Top/mButton_e') as mw.Button
		}
		return this.mButton_e_Internal
	}
	private mTextBlock_button_Internal: mw.TextBlock
	public get mTextBlock_button(): mw.TextBlock {
		if(!this.mTextBlock_button_Internal&&this.uiWidgetBase) {
			this.mTextBlock_button_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_Top/mButton_e/mTextBlock_button') as mw.TextBlock
		}
		return this.mTextBlock_button_Internal
	}
	private mTextBlock_Des_Internal: mw.TextBlock
	public get mTextBlock_Des(): mw.TextBlock {
		if(!this.mTextBlock_Des_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Des_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/ScrollBox/Canvas_1/mTextBlock_Des') as mw.TextBlock
		}
		return this.mTextBlock_Des_Internal
	}
	private mTextBlock_skill_Internal: mw.TextBlock
	public get mTextBlock_skill(): mw.TextBlock {
		if(!this.mTextBlock_skill_Internal&&this.uiWidgetBase) {
			this.mTextBlock_skill_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/ScrollBox/Canvas_1/mTextBlock_skill') as mw.TextBlock
		}
		return this.mTextBlock_skill_Internal
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
		
		this.mButton_close.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_e.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextBlock_name)
		
	
		this.initLanguage(this.mTextBlock_Type)
		
	
		this.initLanguage(this.mTextBlock_CD)
		
	
		this.initLanguage(this.mTextBlock_Cost)
		
	
		this.initLanguage(this.mTextBlock_button)
		
	
		this.initLanguage(this.mTextBlock_Des)
		
	
		this.initLanguage(this.mTextBlock_skill)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mCanvas_Top/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mCanvas_Top/TextBlock_1_2") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mCanvas_Top/TextBlock_1_2_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/ScrollBox/Canvas_1/TextBlock_2") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/ScrollBox/Canvas_1/TextBlock_2_1") as any);
		
	

	}

	private initLanguage(ui: StaleButton | TextBlock) {
        let call = UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 