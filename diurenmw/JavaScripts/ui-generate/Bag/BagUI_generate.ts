﻿
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Bag/BagUI.ui
*/



@UIBind('UI/Bag/BagUI.ui')
export default class BagUI_Generate extends UIScript {
		private exit_Internal: mw.Button
	public get exit(): mw.Button {
		if(!this.exit_Internal&&this.uiWidgetBase) {
			this.exit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/BagBackground/exit') as mw.Button
		}
		return this.exit_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 