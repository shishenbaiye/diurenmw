import BagSelectDataItem_Generate from "../../../ui-generate/Bag/BagSelectDataItem_generate";

@UIBind('UI/Bag/BagSelectDataItem.ui')
export default class BagSelectDataItem extends BagSelectDataItem_Generate {
	static DefaultHigh = 40;
	static DefaultWidth = 400;

	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}

	/** 仅在游戏时间对非模板实例调用一次 */
	protected onStart() {
	}

	init(inEffect : string, inValue : string, inEffectInfo : string) {
		this.effect.text = inEffect;
		this.value.text = inValue;
		this.effectInfo.text = inEffectInfo;

		this.onlyEffect.visibility = mw.SlateVisibility.Collapsed;
		this.effect.visibility = mw.SlateVisibility.Visible;
		this.value.visibility = mw.SlateVisibility.Visible;
		this.effectInfo.visibility = mw.SlateVisibility.Visible;
	}

	initOnlyEffect(inOnlyEffect : string) {
		this.onlyEffect.text = inOnlyEffect;
		
		this.onlyEffect.visibility = mw.SlateVisibility.Visible;
		this.effect.visibility = mw.SlateVisibility.Collapsed;
		this.value.visibility = mw.SlateVisibility.Collapsed;
		this.effectInfo.visibility = mw.SlateVisibility.Collapsed;
	}
}
 