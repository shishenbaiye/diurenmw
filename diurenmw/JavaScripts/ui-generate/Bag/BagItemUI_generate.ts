﻿
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
			this.itemName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Button/itemName') as mw.TextBlock
		}
		return this.itemName_Internal
	}
	private itemNum_Internal: mw.TextBlock
	public get itemNum(): mw.TextBlock {
		if(!this.itemNum_Internal&&this.uiWidgetBase) {
			this.itemNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Button/itemNum') as mw.TextBlock
		}
		return this.itemNum_Internal
	}
}
 