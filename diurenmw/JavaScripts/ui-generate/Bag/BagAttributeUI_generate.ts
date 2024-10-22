
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Bag/BagAttributeUI.ui
*/



@UIBind('UI/Bag/BagAttributeUI.ui')
export default class BagAttributeUI_Generate extends UIScript {
		private mCanvas_Internal: mw.Canvas
	public get mCanvas(): mw.Canvas {
		if(!this.mCanvas_Internal&&this.uiWidgetBase) {
			this.mCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas') as mw.Canvas
		}
		return this.mCanvas_Internal
	}
	private mLevel_Internal: mw.TextBlock
	public get mLevel(): mw.TextBlock {
		if(!this.mLevel_Internal&&this.uiWidgetBase) {
			this.mLevel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/Canvas/mLevel') as mw.TextBlock
		}
		return this.mLevel_Internal
	}
	private mEXP_Internal: mw.TextBlock
	public get mEXP(): mw.TextBlock {
		if(!this.mEXP_Internal&&this.uiWidgetBase) {
			this.mEXP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/Canvas/mEXP') as mw.TextBlock
		}
		return this.mEXP_Internal
	}
	private mAtk_Internal: mw.TextBlock
	public get mAtk(): mw.TextBlock {
		if(!this.mAtk_Internal&&this.uiWidgetBase) {
			this.mAtk_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/Canvas/mAtk') as mw.TextBlock
		}
		return this.mAtk_Internal
	}
	private mMAtk_Internal: mw.TextBlock
	public get mMAtk(): mw.TextBlock {
		if(!this.mMAtk_Internal&&this.uiWidgetBase) {
			this.mMAtk_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/Canvas/mMAtk') as mw.TextBlock
		}
		return this.mMAtk_Internal
	}
	private mStr_Internal: mw.TextBlock
	public get mStr(): mw.TextBlock {
		if(!this.mStr_Internal&&this.uiWidgetBase) {
			this.mStr_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/Canvas/mStr') as mw.TextBlock
		}
		return this.mStr_Internal
	}
	private mCrit_Internal: mw.TextBlock
	public get mCrit(): mw.TextBlock {
		if(!this.mCrit_Internal&&this.uiWidgetBase) {
			this.mCrit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/Canvas/mCrit') as mw.TextBlock
		}
		return this.mCrit_Internal
	}
	private mInt_Internal: mw.TextBlock
	public get mInt(): mw.TextBlock {
		if(!this.mInt_Internal&&this.uiWidgetBase) {
			this.mInt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/Canvas/mInt') as mw.TextBlock
		}
		return this.mInt_Internal
	}
	private mVit_Internal: mw.TextBlock
	public get mVit(): mw.TextBlock {
		if(!this.mVit_Internal&&this.uiWidgetBase) {
			this.mVit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/Canvas/mVit') as mw.TextBlock
		}
		return this.mVit_Internal
	}
	private mDef_Internal: mw.TextBlock
	public get mDef(): mw.TextBlock {
		if(!this.mDef_Internal&&this.uiWidgetBase) {
			this.mDef_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/Canvas/mDef') as mw.TextBlock
		}
		return this.mDef_Internal
	}
	private mDamage_Internal: mw.TextBlock
	public get mDamage(): mw.TextBlock {
		if(!this.mDamage_Internal&&this.uiWidgetBase) {
			this.mDamage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/Canvas/mDamage') as mw.TextBlock
		}
		return this.mDamage_Internal
	}
	private mSkillDamage_Internal: mw.TextBlock
	public get mSkillDamage(): mw.TextBlock {
		if(!this.mSkillDamage_Internal&&this.uiWidgetBase) {
			this.mSkillDamage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/Canvas/mSkillDamage') as mw.TextBlock
		}
		return this.mSkillDamage_Internal
	}
	private mCritDamage_Internal: mw.TextBlock
	public get mCritDamage(): mw.TextBlock {
		if(!this.mCritDamage_Internal&&this.uiWidgetBase) {
			this.mCritDamage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas/Canvas/mCritDamage') as mw.TextBlock
		}
		return this.mCritDamage_Internal
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
		
		this.initLanguage(this.mLevel)
		
	
		this.initLanguage(this.mEXP)
		
	
		this.initLanguage(this.mAtk)
		
	
		this.initLanguage(this.mMAtk)
		
	
		this.initLanguage(this.mStr)
		
	
		this.initLanguage(this.mCrit)
		
	
		this.initLanguage(this.mInt)
		
	
		this.initLanguage(this.mVit)
		
	
		this.initLanguage(this.mDef)
		
	
		this.initLanguage(this.mDamage)
		
	
		this.initLanguage(this.mSkillDamage)
		
	
		this.initLanguage(this.mCritDamage)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/NameCanvas/Level") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/NameCanvas/EXP") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/NameCanvas/Atk") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/NameCanvas/MAtk") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/NameCanvas/Str") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/NameCanvas/Crit") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/NameCanvas/Int") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/NameCanvas/Vit") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/NameCanvas/Def") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/NameCanvas/Damage") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/NameCanvas/SkillDamage") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/NameCanvas/CritDamage") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/UserName") as any);
		
	

	}

	private initLanguage(ui: StaleButton | TextBlock) {
        let call = UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 