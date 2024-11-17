
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Bag/BagShowSelect.ui
*/



@UIBind('UI/Bag/BagShowSelect.ui')
export default class BagShowSelect_Generate extends UIScript {
		private name_Internal: mw.TextBlock
	public get name(): mw.TextBlock {
		if(!this.name_Internal&&this.uiWidgetBase) {
			this.name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/TitleCanvas/name') as mw.TextBlock
		}
		return this.name_Internal
	}
	private icon_Internal: mw.Image
	public get icon(): mw.Image {
		if(!this.icon_Internal&&this.uiWidgetBase) {
			this.icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/TitleCanvas/icon') as mw.Image
		}
		return this.icon_Internal
	}
	private grade_Internal: mw.Image
	public get grade(): mw.Image {
		if(!this.grade_Internal&&this.uiWidgetBase) {
			this.grade_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/TitleCanvas/grade') as mw.Image
		}
		return this.grade_Internal
	}
	private data_Internal: mw.Canvas
	public get data(): mw.Canvas {
		if(!this.data_Internal&&this.uiWidgetBase) {
			this.data_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/data') as mw.Canvas
		}
		return this.data_Internal
	}
	private baseInfoContent_Internal: mw.Canvas
	public get baseInfoContent(): mw.Canvas {
		if(!this.baseInfoContent_Internal&&this.uiWidgetBase) {
			this.baseInfoContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/data/ScrollBox/DataCanvas/BaseInfo/baseInfoContent') as mw.Canvas
		}
		return this.baseInfoContent_Internal
	}
	private effectInfoContent_Internal: mw.Canvas
	public get effectInfoContent(): mw.Canvas {
		if(!this.effectInfoContent_Internal&&this.uiWidgetBase) {
			this.effectInfoContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/data/ScrollBox/DataCanvas/EffectInfo/effectInfoContent') as mw.Canvas
		}
		return this.effectInfoContent_Internal
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
		
		this.initLanguage(this.name)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/data/ScrollBox/DataCanvas/BaseInfo/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/data/ScrollBox/DataCanvas/EffectInfo/TextBlock") as any);
		
	

	}

	private initLanguage(ui: StaleButton | TextBlock) {
        let call = UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 