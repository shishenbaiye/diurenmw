export enum EGameEffectDurationType{
    /** 瞬发*/
	Instant, 
	/** 永久存在 */
	Infinite,
	/** 持续一定时间 */
	HasDuration
}

export enum EGameEffectCalculationType{
	/**固定值 */
	FixedValue,

	/**自定义公式*/
	CustomFormula,
}

export enum EGameEffectPeriodicInhibitionPolicy{
	/** */
	NeverReset,
	ResetPeriod,
	ExecuteAndResetPeriod,
}

export enum EGameModOp{
	/** 加 */
	Add = 1,
	/** 减 */
	Subtract = 2,
	/** 乘 */
	Multiply = 3,
	/** 除 */
	Divide = 4,
	/** 设置 */
	Set = 5,
	/** 自定义 */
	Custom = 6,
}

export enum EGameCustomModOp{
	/** 加 */
	Add = 1,
	/** 减 */
	Subtract = 2,
	/** 乘 */
	Multiply = 3,
	/** 除 */
	Divide = 4,
	/** 设置 */
	Set	= 5,
}