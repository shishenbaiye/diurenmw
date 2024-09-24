
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Bag/BagUI.ui
*/


export default class BagUI_Generate extends UIScript {
	private exit_Internal: mw.Button
	public get exit(): mw.Button {
		if(!this.exit_Internal&&this.uiWidgetBase) {
			this.exit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BagBackground/exit') as mw.Button
		}
		return this.exit_Internal
	}

	private weapon_Internal: mw.Button
	public get weapon(): mw.Button {
		if(!this.weapon_Internal&&this.uiWidgetBase) {
			this.weapon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BagBackground/Weapon') as mw.Button
		}
		return this.weapon_Internal
	}

	private other_Internal: mw.Button
	public get other(): mw.Button {
		if(!this.other_Internal&&this.uiWidgetBase) {
			this.other_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BagBackground/Other') as mw.Button
		}
		return this.other_Internal
	}

	private itemScrollBox_Internal: mw.ScrollBox
	public get itemScrollBox(): mw.ScrollBox {
		if(!this.itemScrollBox_Internal&&this.uiWidgetBase) {
			this.itemScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BagBackground/ItemListBackground/ItemScrollBox') as mw.ScrollBox
		}
		return this.itemScrollBox_Internal
	}

	private content_Internal: mw.ScrollBox
	public get content(): mw.ScrollBox {
		if(!this.content_Internal&&this.uiWidgetBase) {
			this.content_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BagBackground/ItemListBackground/ItemScrollBox/Content') as mw.ScrollBox
		}
		return this.content_Internal
	}
}
 