
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Bag/BagItem.ui
*/



export default class BagItemUI_Generate extends UIScript {
	private itemName_Internal: mw.TextBlock
	public get itemName(): mw.TextBlock {
		if(!this.itemName_Internal&&this.uiWidgetBase) {
			this.itemName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BagItemButton/itemName') as mw.TextBlock
		}
		return this.itemName_Internal
	}
	private itemNum_Internal: mw.TextBlock
	public get itemNum(): mw.TextBlock {
		if(!this.itemNum_Internal&&this.uiWidgetBase) {
			this.itemNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BagItemButton/itemNum') as mw.TextBlock
		}
		return this.itemNum_Internal
	}
	private bagItemButton_Internal: mw.Button
	public get bagItemButton(): mw.Button {
		if(!this.bagItemButton_Internal&&this.uiWidgetBase) {
			this.bagItemButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BagItemButton') as mw.Button
		}
		return this.bagItemButton_Internal
	}
	private bagItemIcon_Internal: mw.Image
	public get bagItemIcon(): mw.Image {
		if(!this.bagItemIcon_Internal&&this.uiWidgetBase) {
			this.bagItemIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BagItemIcon') as mw.Image
		}
		return this.bagItemIcon_Internal
	}
}
 