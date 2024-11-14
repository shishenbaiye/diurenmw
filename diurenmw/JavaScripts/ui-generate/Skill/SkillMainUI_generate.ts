
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Skill/SkillMainUI.ui
*/



@UIBind('UI/Skill/SkillMainUI.ui')
export default class SkillMainUI_Generate extends UIScript {
		private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private mCanvas_SkillList_Internal: mw.Canvas
	public get mCanvas_SkillList(): mw.Canvas {
		if(!this.mCanvas_SkillList_Internal&&this.uiWidgetBase) {
			this.mCanvas_SkillList_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1/mScrollBox/mCanvas_SkillList') as mw.Canvas
		}
		return this.mCanvas_SkillList_Internal
	}
	private mButton_Close_Internal: mw.Button
	public get mButton_Close(): mw.Button {
		if(!this.mButton_Close_Internal&&this.uiWidgetBase) {
			this.mButton_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton_Close') as mw.Button
		}
		return this.mButton_Close_Internal
	}
	private mImage_change_Internal: mw.Image
	public get mImage_change(): mw.Image {
		if(!this.mImage_change_Internal&&this.uiWidgetBase) {
			this.mImage_change_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImage_change') as mw.Image
		}
		return this.mImage_change_Internal
	}
	private mCanvas_Skill1_Internal: mw.Canvas
	public get mCanvas_Skill1(): mw.Canvas {
		if(!this.mCanvas_Skill1_Internal&&this.uiWidgetBase) {
			this.mCanvas_Skill1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Skill1') as mw.Canvas
		}
		return this.mCanvas_Skill1_Internal
	}
	private mButton_Skill1_Internal: mw.Button
	public get mButton_Skill1(): mw.Button {
		if(!this.mButton_Skill1_Internal&&this.uiWidgetBase) {
			this.mButton_Skill1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Skill1/mButton_Skill1') as mw.Button
		}
		return this.mButton_Skill1_Internal
	}
	private mCanvas_Skill2_Internal: mw.Canvas
	public get mCanvas_Skill2(): mw.Canvas {
		if(!this.mCanvas_Skill2_Internal&&this.uiWidgetBase) {
			this.mCanvas_Skill2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Skill2') as mw.Canvas
		}
		return this.mCanvas_Skill2_Internal
	}
	private mButton_Skill2_Internal: mw.Button
	public get mButton_Skill2(): mw.Button {
		if(!this.mButton_Skill2_Internal&&this.uiWidgetBase) {
			this.mButton_Skill2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Skill2/mButton_Skill2') as mw.Button
		}
		return this.mButton_Skill2_Internal
	}
	private mCanvas_Skill3_Internal: mw.Canvas
	public get mCanvas_Skill3(): mw.Canvas {
		if(!this.mCanvas_Skill3_Internal&&this.uiWidgetBase) {
			this.mCanvas_Skill3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Skill3') as mw.Canvas
		}
		return this.mCanvas_Skill3_Internal
	}
	private mButton_Skill3_Internal: mw.Button
	public get mButton_Skill3(): mw.Button {
		if(!this.mButton_Skill3_Internal&&this.uiWidgetBase) {
			this.mButton_Skill3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Skill3/mButton_Skill3') as mw.Button
		}
		return this.mButton_Skill3_Internal
	}
	private mCanvas_Skill4_Internal: mw.Canvas
	public get mCanvas_Skill4(): mw.Canvas {
		if(!this.mCanvas_Skill4_Internal&&this.uiWidgetBase) {
			this.mCanvas_Skill4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Skill4') as mw.Canvas
		}
		return this.mCanvas_Skill4_Internal
	}
	private mButton_Skill4_Internal: mw.Button
	public get mButton_Skill4(): mw.Button {
		if(!this.mButton_Skill4_Internal&&this.uiWidgetBase) {
			this.mButton_Skill4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Skill4/mButton_Skill4') as mw.Button
		}
		return this.mButton_Skill4_Internal
	}
	private mCanvas_Skill5_Internal: mw.Canvas
	public get mCanvas_Skill5(): mw.Canvas {
		if(!this.mCanvas_Skill5_Internal&&this.uiWidgetBase) {
			this.mCanvas_Skill5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Skill5') as mw.Canvas
		}
		return this.mCanvas_Skill5_Internal
	}
	private mButton_Skill5_Internal: mw.Button
	public get mButton_Skill5(): mw.Button {
		if(!this.mButton_Skill5_Internal&&this.uiWidgetBase) {
			this.mButton_Skill5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Skill5/mButton_Skill5') as mw.Button
		}
		return this.mButton_Skill5_Internal
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
		
		this.mButton_Close.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_Skill1.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_Skill2.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_Skill3.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_Skill4.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_Skill5.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	

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
 