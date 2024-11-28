
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Bag/MenuPropContent.ui
*/



@UIBind('UI/Bag/MenuPropContent.ui')
export default class MenuPropContent_Generate extends UIScript {
		private playerDataCanvas_Internal: mw.Canvas
	public get playerDataCanvas(): mw.Canvas {
		if(!this.playerDataCanvas_Internal&&this.uiWidgetBase) {
			this.playerDataCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/playerDataCanvas') as mw.Canvas
		}
		return this.playerDataCanvas_Internal
	}
	private bagCanvas_Internal: mw.Canvas
	public get bagCanvas(): mw.Canvas {
		if(!this.bagCanvas_Internal&&this.uiWidgetBase) {
			this.bagCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bagCanvas') as mw.Canvas
		}
		return this.bagCanvas_Internal
	}
	private infoCanvas_Internal: mw.Canvas
	public get infoCanvas(): mw.Canvas {
		if(!this.infoCanvas_Internal&&this.uiWidgetBase) {
			this.infoCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas') as mw.Canvas
		}
		return this.infoCanvas_Internal
	}
	private buttonPlayerInfo_Internal: mw.Button
	public get buttonPlayerInfo(): mw.Button {
		if(!this.buttonPlayerInfo_Internal&&this.uiWidgetBase) {
			this.buttonPlayerInfo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas/buttonPlayerInfo') as mw.Button
		}
		return this.buttonPlayerInfo_Internal
	}
	private playerLevel_Internal: mw.TextBlock
	public get playerLevel(): mw.TextBlock {
		if(!this.playerLevel_Internal&&this.uiWidgetBase) {
			this.playerLevel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas/buttonPlayerInfo/playerLevel') as mw.TextBlock
		}
		return this.playerLevel_Internal
	}
	private playerName_Internal: mw.TextBlock
	public get playerName(): mw.TextBlock {
		if(!this.playerName_Internal&&this.uiWidgetBase) {
			this.playerName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/infoCanvas/buttonPlayerInfo/playerName') as mw.TextBlock
		}
		return this.playerName_Internal
	}
	private attributeCanvas_Internal: mw.Canvas
	public get attributeCanvas(): mw.Canvas {
		if(!this.attributeCanvas_Internal&&this.uiWidgetBase) {
			this.attributeCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/attributeCanvas') as mw.Canvas
		}
		return this.attributeCanvas_Internal
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
		
		this.buttonPlayerInfo.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.playerLevel)
		
	
		this.initLanguage(this.playerName)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/infoCanvas/buttonPlayerInfo/PlayerLevelInfo") as any);
		
	

	}

	private initLanguage(ui: StaleButton | TextBlock) {
        let call = UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 