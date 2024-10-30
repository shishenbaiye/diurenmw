
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Bag/BagShowSelect.ui
*/



@UIBind('UI/Bag/BagShowSelect.ui')
export default class BagShowSelect_Generate extends UIScript {
		private selectShow_Internal: mw.Canvas
	public get selectShow(): mw.Canvas {
		if(!this.selectShow_Internal&&this.uiWidgetBase) {
			this.selectShow_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/selectShow') as mw.Canvas
		}
		return this.selectShow_Internal
	}
	private grade_Internal: mw.Image
	public get grade(): mw.Image {
		if(!this.grade_Internal&&this.uiWidgetBase) {
			this.grade_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/selectShow/Image/grade') as mw.Image
		}
		return this.grade_Internal
	}
	private name_Internal: mw.TextBlock
	public get name(): mw.TextBlock {
		if(!this.name_Internal&&this.uiWidgetBase) {
			this.name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/selectShow/Image/name') as mw.TextBlock
		}
		return this.name_Internal
	}
	private icon_Internal: mw.Image
	public get icon(): mw.Image {
		if(!this.icon_Internal&&this.uiWidgetBase) {
			this.icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/selectShow/Image/icon') as mw.Image
		}
		return this.icon_Internal
	}
	private data_Internal: mw.Canvas
	public get data(): mw.Canvas {
		if(!this.data_Internal&&this.uiWidgetBase) {
			this.data_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/selectShow/data') as mw.Canvas
		}
		return this.data_Internal
	}
	private singleSelect_Internal: mw.Canvas
	public get singleSelect(): mw.Canvas {
		if(!this.singleSelect_Internal&&this.uiWidgetBase) {
			this.singleSelect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/selectShow/singleSelect') as mw.Canvas
		}
		return this.singleSelect_Internal
	}
	private leftButton_Internal: mw.Button
	public get leftButton(): mw.Button {
		if(!this.leftButton_Internal&&this.uiWidgetBase) {
			this.leftButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/selectShow/singleSelect/leftButton') as mw.Button
		}
		return this.leftButton_Internal
	}
	private rightButton_Internal: mw.Button
	public get rightButton(): mw.Button {
		if(!this.rightButton_Internal&&this.uiWidgetBase) {
			this.rightButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/selectShow/singleSelect/rightButton') as mw.Button
		}
		return this.rightButton_Internal
	}
	private doubleSelect_Internal: mw.Canvas
	public get doubleSelect(): mw.Canvas {
		if(!this.doubleSelect_Internal&&this.uiWidgetBase) {
			this.doubleSelect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/selectShow/doubleSelect') as mw.Canvas
		}
		return this.doubleSelect_Internal
	}
	private singleButton_Internal: mw.Button
	public get singleButton(): mw.Button {
		if(!this.singleButton_Internal&&this.uiWidgetBase) {
			this.singleButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/selectShow/doubleSelect/singleButton') as mw.Button
		}
		return this.singleButton_Internal
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
		
		this.leftButton.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	
		this.rightButton.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	
		this.singleButton.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.name)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/selectShow/singleSelect/leftButton/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/selectShow/singleSelect/rightButton/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/selectShow/doubleSelect/singleButton/TextBlock_2") as any);
		
	

	}

	private initLanguage(ui: StaleButton | TextBlock) {
        let call = UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 