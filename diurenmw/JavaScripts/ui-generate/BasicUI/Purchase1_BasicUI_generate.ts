﻿
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/Purchase1_BasicUI.ui
*/



@UIBind('UI/BasicUI/Purchase1_BasicUI.ui')
export default class Purchase1_BasicUI_Generate extends UIScript {
		private mBtn_Mask_Internal: mw.Button
	public get mBtn_Mask(): mw.Button {
		if(!this.mBtn_Mask_Internal&&this.uiWidgetBase) {
			this.mBtn_Mask_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Mask') as mw.Button
		}
		return this.mBtn_Mask_Internal
	}
	private mCanvas_UI_Purchase_Internal: mw.Canvas
	public get mCanvas_UI_Purchase(): mw.Canvas {
		if(!this.mCanvas_UI_Purchase_Internal&&this.uiWidgetBase) {
			this.mCanvas_UI_Purchase_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase') as mw.Canvas
		}
		return this.mCanvas_UI_Purchase_Internal
	}
	private mImg_Purchase_BG_Internal: mw.Image
	public get mImg_Purchase_BG(): mw.Image {
		if(!this.mImg_Purchase_BG_Internal&&this.uiWidgetBase) {
			this.mImg_Purchase_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mImg_Purchase_BG') as mw.Image
		}
		return this.mImg_Purchase_BG_Internal
	}
	private mTxt_Purchase_Internal: mw.TextBlock
	public get mTxt_Purchase(): mw.TextBlock {
		if(!this.mTxt_Purchase_Internal&&this.uiWidgetBase) {
			this.mTxt_Purchase_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mTxt_Purchase') as mw.TextBlock
		}
		return this.mTxt_Purchase_Internal
	}
	private mCanvas_Btn_Close_Internal: mw.Canvas
	public get mCanvas_Btn_Close(): mw.Canvas {
		if(!this.mCanvas_Btn_Close_Internal&&this.uiWidgetBase) {
			this.mCanvas_Btn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_Btn_Close') as mw.Canvas
		}
		return this.mCanvas_Btn_Close_Internal
	}
	private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_Btn_Close/mBtn_Close') as mw.Button
		}
		return this.mBtn_Close_Internal
	}
	private mCanvas_ItemDetails_Internal: mw.Canvas
	public get mCanvas_ItemDetails(): mw.Canvas {
		if(!this.mCanvas_ItemDetails_Internal&&this.uiWidgetBase) {
			this.mCanvas_ItemDetails_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails') as mw.Canvas
		}
		return this.mCanvas_ItemDetails_Internal
	}
	private mCanvas_ItemImg_Internal: mw.Canvas
	public get mCanvas_ItemImg(): mw.Canvas {
		if(!this.mCanvas_ItemImg_Internal&&this.uiWidgetBase) {
			this.mCanvas_ItemImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mCanvas_ItemImg') as mw.Canvas
		}
		return this.mCanvas_ItemImg_Internal
	}
	private mImg_ItemImg_BG_Internal: mw.Image
	public get mImg_ItemImg_BG(): mw.Image {
		if(!this.mImg_ItemImg_BG_Internal&&this.uiWidgetBase) {
			this.mImg_ItemImg_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mCanvas_ItemImg/mImg_ItemImg_BG') as mw.Image
		}
		return this.mImg_ItemImg_BG_Internal
	}
	private mImg_ItemImg_Img_Internal: mw.Image
	public get mImg_ItemImg_Img(): mw.Image {
		if(!this.mImg_ItemImg_Img_Internal&&this.uiWidgetBase) {
			this.mImg_ItemImg_Img_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mCanvas_ItemImg/mImg_ItemImg_Img') as mw.Image
		}
		return this.mImg_ItemImg_Img_Internal
	}
	private mTxt_ItemName_Internal: mw.TextBlock
	public get mTxt_ItemName(): mw.TextBlock {
		if(!this.mTxt_ItemName_Internal&&this.uiWidgetBase) {
			this.mTxt_ItemName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mTxt_ItemName') as mw.TextBlock
		}
		return this.mTxt_ItemName_Internal
	}
	private mTxt_ItemDetails_Internal: mw.TextBlock
	public get mTxt_ItemDetails(): mw.TextBlock {
		if(!this.mTxt_ItemDetails_Internal&&this.uiWidgetBase) {
			this.mTxt_ItemDetails_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_ItemDetails/mTxt_ItemDetails') as mw.TextBlock
		}
		return this.mTxt_ItemDetails_Internal
	}
	private mCanvas_BtnBottom_Internal: mw.Canvas
	public get mCanvas_BtnBottom(): mw.Canvas {
		if(!this.mCanvas_BtnBottom_Internal&&this.uiWidgetBase) {
			this.mCanvas_BtnBottom_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom') as mw.Canvas
		}
		return this.mCanvas_BtnBottom_Internal
	}
	private mCanvas_Btn_Grey_Internal: mw.Canvas
	public get mCanvas_Btn_Grey(): mw.Canvas {
		if(!this.mCanvas_Btn_Grey_Internal&&this.uiWidgetBase) {
			this.mCanvas_Btn_Grey_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Grey') as mw.Canvas
		}
		return this.mCanvas_Btn_Grey_Internal
	}
	private mBtn_Grey_Internal: mw.Button
	public get mBtn_Grey(): mw.Button {
		if(!this.mBtn_Grey_Internal&&this.uiWidgetBase) {
			this.mBtn_Grey_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Grey/mBtn_Grey') as mw.Button
		}
		return this.mBtn_Grey_Internal
	}
	private mTxt_Btn_Grey_Internal: mw.TextBlock
	public get mTxt_Btn_Grey(): mw.TextBlock {
		if(!this.mTxt_Btn_Grey_Internal&&this.uiWidgetBase) {
			this.mTxt_Btn_Grey_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Grey/mBtn_Grey/mTxt_Btn_Grey') as mw.TextBlock
		}
		return this.mTxt_Btn_Grey_Internal
	}
	private mCanvas_Btn_Mint_Internal: mw.Canvas
	public get mCanvas_Btn_Mint(): mw.Canvas {
		if(!this.mCanvas_Btn_Mint_Internal&&this.uiWidgetBase) {
			this.mCanvas_Btn_Mint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Mint') as mw.Canvas
		}
		return this.mCanvas_Btn_Mint_Internal
	}
	private mCanvas_Price_Internal: mw.Canvas
	public get mCanvas_Price(): mw.Canvas {
		if(!this.mCanvas_Price_Internal&&this.uiWidgetBase) {
			this.mCanvas_Price_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Mint/mCanvas_Price') as mw.Canvas
		}
		return this.mCanvas_Price_Internal
	}
	private mImg_Price_BG_Internal: mw.Image
	public get mImg_Price_BG(): mw.Image {
		if(!this.mImg_Price_BG_Internal&&this.uiWidgetBase) {
			this.mImg_Price_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Mint/mCanvas_Price/mImg_Price_BG') as mw.Image
		}
		return this.mImg_Price_BG_Internal
	}
	private mImg_Price_Icon_Internal: mw.Image
	public get mImg_Price_Icon(): mw.Image {
		if(!this.mImg_Price_Icon_Internal&&this.uiWidgetBase) {
			this.mImg_Price_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Mint/mCanvas_Price/mImg_Price_Icon') as mw.Image
		}
		return this.mImg_Price_Icon_Internal
	}
	private mTxt_Price_Internal: mw.TextBlock
	public get mTxt_Price(): mw.TextBlock {
		if(!this.mTxt_Price_Internal&&this.uiWidgetBase) {
			this.mTxt_Price_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Mint/mCanvas_Price/mTxt_Price') as mw.TextBlock
		}
		return this.mTxt_Price_Internal
	}
	private mBtn_Mint_Internal: mw.Button
	public get mBtn_Mint(): mw.Button {
		if(!this.mBtn_Mint_Internal&&this.uiWidgetBase) {
			this.mBtn_Mint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Mint/mBtn_Mint') as mw.Button
		}
		return this.mBtn_Mint_Internal
	}
	private mTxt_Btn_Mint_Internal: mw.TextBlock
	public get mTxt_Btn_Mint(): mw.TextBlock {
		if(!this.mTxt_Btn_Mint_Internal&&this.uiWidgetBase) {
			this.mTxt_Btn_Mint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Purchase/mCanvas_BtnBottom/mCanvas_Btn_Mint/mBtn_Mint/mTxt_Btn_Mint') as mw.TextBlock
		}
		return this.mTxt_Btn_Mint_Internal
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
		
		this.mBtn_Mask.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Close.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Grey.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Mint.touchMethod = (ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTxt_Purchase)
		
	
		this.initLanguage(this.mTxt_ItemName)
		
	
		this.initLanguage(this.mTxt_ItemDetails)
		
	
		this.initLanguage(this.mTxt_Btn_Grey)
		
	
		this.initLanguage(this.mTxt_Price)
		
	
		this.initLanguage(this.mTxt_Btn_Mint)
		
	
		//文本多语言
		

	}

	private initLanguage(ui: StaleButton | TextBlock) {
        let call = UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 