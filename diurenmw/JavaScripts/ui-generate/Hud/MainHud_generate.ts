
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Hud/MainHud.ui
*/



@UIBind('UI/Hud/MainHud.ui')
export default class MainHud_Generate extends UIScript {
		private mVirtualJoystickPanel_Internal: mw.VirtualJoystickPanel
	public get mVirtualJoystickPanel(): mw.VirtualJoystickPanel {
		if(!this.mVirtualJoystickPanel_Internal&&this.uiWidgetBase) {
			this.mVirtualJoystickPanel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mVirtualJoystickPanel') as mw.VirtualJoystickPanel
		}
		return this.mVirtualJoystickPanel_Internal
	}
	private mButton_normal_Internal: mw.Button
	public get mButton_normal(): mw.Button {
		if(!this.mButton_normal_Internal&&this.uiWidgetBase) {
			this.mButton_normal_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mButton_normal') as mw.Button
		}
		return this.mButton_normal_Internal
	}
	private mImage_normal_Internal: mw.Image
	public get mImage_normal(): mw.Image {
		if(!this.mImage_normal_Internal&&this.uiWidgetBase) {
			this.mImage_normal_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mButton_normal/mImage_normal') as mw.Image
		}
		return this.mImage_normal_Internal
	}
	private mMaskButton_normal_Internal: mw.MaskButton
	public get mMaskButton_normal(): mw.MaskButton {
		if(!this.mMaskButton_normal_Internal&&this.uiWidgetBase) {
			this.mMaskButton_normal_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mButton_normal/mMaskButton_normal') as mw.MaskButton
		}
		return this.mMaskButton_normal_Internal
	}
	private mButton_skill1_Internal: mw.Button
	public get mButton_skill1(): mw.Button {
		if(!this.mButton_skill1_Internal&&this.uiWidgetBase) {
			this.mButton_skill1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mButton_skill1') as mw.Button
		}
		return this.mButton_skill1_Internal
	}
	private mImage_skill1_Internal: mw.Image
	public get mImage_skill1(): mw.Image {
		if(!this.mImage_skill1_Internal&&this.uiWidgetBase) {
			this.mImage_skill1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mButton_skill1/mImage_skill1') as mw.Image
		}
		return this.mImage_skill1_Internal
	}
	private mMaskButton_skill1_Internal: mw.MaskButton
	public get mMaskButton_skill1(): mw.MaskButton {
		if(!this.mMaskButton_skill1_Internal&&this.uiWidgetBase) {
			this.mMaskButton_skill1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mButton_skill1/mMaskButton_skill1') as mw.MaskButton
		}
		return this.mMaskButton_skill1_Internal
	}
	private mButton_skill2_Internal: mw.Button
	public get mButton_skill2(): mw.Button {
		if(!this.mButton_skill2_Internal&&this.uiWidgetBase) {
			this.mButton_skill2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mButton_skill2') as mw.Button
		}
		return this.mButton_skill2_Internal
	}
	private mImage_skill2_Internal: mw.Image
	public get mImage_skill2(): mw.Image {
		if(!this.mImage_skill2_Internal&&this.uiWidgetBase) {
			this.mImage_skill2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mButton_skill2/mImage_skill2') as mw.Image
		}
		return this.mImage_skill2_Internal
	}
	private mMaskButton_skill2_Internal: mw.MaskButton
	public get mMaskButton_skill2(): mw.MaskButton {
		if(!this.mMaskButton_skill2_Internal&&this.uiWidgetBase) {
			this.mMaskButton_skill2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mButton_skill2/mMaskButton_skill2') as mw.MaskButton
		}
		return this.mMaskButton_skill2_Internal
	}
	private mButton_skill3_Internal: mw.Button
	public get mButton_skill3(): mw.Button {
		if(!this.mButton_skill3_Internal&&this.uiWidgetBase) {
			this.mButton_skill3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mButton_skill3') as mw.Button
		}
		return this.mButton_skill3_Internal
	}
	private mImage_skill3_Internal: mw.Image
	public get mImage_skill3(): mw.Image {
		if(!this.mImage_skill3_Internal&&this.uiWidgetBase) {
			this.mImage_skill3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mButton_skill3/mImage_skill3') as mw.Image
		}
		return this.mImage_skill3_Internal
	}
	private mMaskButton_skill3_Internal: mw.MaskButton
	public get mMaskButton_skill3(): mw.MaskButton {
		if(!this.mMaskButton_skill3_Internal&&this.uiWidgetBase) {
			this.mMaskButton_skill3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mButton_skill3/mMaskButton_skill3') as mw.MaskButton
		}
		return this.mMaskButton_skill3_Internal
	}
	private mButton_skill4_Internal: mw.Button
	public get mButton_skill4(): mw.Button {
		if(!this.mButton_skill4_Internal&&this.uiWidgetBase) {
			this.mButton_skill4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mButton_skill4') as mw.Button
		}
		return this.mButton_skill4_Internal
	}
	private mImage_skill4_Internal: mw.Image
	public get mImage_skill4(): mw.Image {
		if(!this.mImage_skill4_Internal&&this.uiWidgetBase) {
			this.mImage_skill4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mButton_skill4/mImage_skill4') as mw.Image
		}
		return this.mImage_skill4_Internal
	}
	private mMaskButton_skill4_Internal: mw.MaskButton
	public get mMaskButton_skill4(): mw.MaskButton {
		if(!this.mMaskButton_skill4_Internal&&this.uiWidgetBase) {
			this.mMaskButton_skill4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mButton_skill4/mMaskButton_skill4') as mw.MaskButton
		}
		return this.mMaskButton_skill4_Internal
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
		
		this.mButton_normal.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_skill1.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_skill2.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_skill3.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	
		this.mButton_skill4.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	

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
 