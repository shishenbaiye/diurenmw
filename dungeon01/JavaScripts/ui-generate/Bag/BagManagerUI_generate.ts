
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Bag/BagManagerUI.ui
*/



@UIBind('UI/Bag/BagManagerUI.ui')
export default class BagManagerUI_Generate extends UIScript {
		private itemType_Internal: mw.ScrollBox
	public get itemType(): mw.ScrollBox {
		if(!this.itemType_Internal&&this.uiWidgetBase) {
			this.itemType_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/itemType') as mw.ScrollBox
		}
		return this.itemType_Internal
	}
	private typeContent_Internal: mw.Canvas
	public get typeContent(): mw.Canvas {
		if(!this.typeContent_Internal&&this.uiWidgetBase) {
			this.typeContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/itemType/typeContent') as mw.Canvas
		}
		return this.typeContent_Internal
	}
	private itemScrollBox_Internal: mw.ScrollBox
	public get itemScrollBox(): mw.ScrollBox {
		if(!this.itemScrollBox_Internal&&this.uiWidgetBase) {
			this.itemScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/itemScrollBox') as mw.ScrollBox
		}
		return this.itemScrollBox_Internal
	}
	private itemContent_Internal: mw.Canvas
	public get itemContent(): mw.Canvas {
		if(!this.itemContent_Internal&&this.uiWidgetBase) {
			this.itemContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/itemScrollBox/itemContent') as mw.Canvas
		}
		return this.itemContent_Internal
	}
	private operatorShow_Internal: mw.Canvas
	public get operatorShow(): mw.Canvas {
		if(!this.operatorShow_Internal&&this.uiWidgetBase) {
			this.operatorShow_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/operatorShow') as mw.Canvas
		}
		return this.operatorShow_Internal
	}
	private bagMaxNum_Internal: mw.TextBlock
	public get bagMaxNum(): mw.TextBlock {
		if(!this.bagMaxNum_Internal&&this.uiWidgetBase) {
			this.bagMaxNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/operatorShow/bagMaxNum') as mw.TextBlock
		}
		return this.bagMaxNum_Internal
	}
	private buttonSall_Internal: mw.Button
	public get buttonSall(): mw.Button {
		if(!this.buttonSall_Internal&&this.uiWidgetBase) {
			this.buttonSall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/operatorShow/buttonSall') as mw.Button
		}
		return this.buttonSall_Internal
	}
	private buttonDecompose_Internal: mw.Button
	public get buttonDecompose(): mw.Button {
		if(!this.buttonDecompose_Internal&&this.uiWidgetBase) {
			this.buttonDecompose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/operatorShow/buttonDecompose') as mw.Button
		}
		return this.buttonDecompose_Internal
	}
	private sortList_Internal: mw.Dropdown
	public get sortList(): mw.Dropdown {
		if(!this.sortList_Internal&&this.uiWidgetBase) {
			this.sortList_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/operatorShow/sortList') as mw.Dropdown
		}
		return this.sortList_Internal
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
		
		this.buttonSall.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	
		this.buttonDecompose.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.bagMaxNum)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/operatorShow/buttonSall/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/operatorShow/buttonDecompose/TextBlock_1") as any);
		
	

	}

	private initLanguage(ui: StaleButton | TextBlock) {
        let call = UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 