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
}

export enum EGameEffectPeriodicInhibitionPolicy{
	/** */
	NeverReset,
	ResetPeriod,
	ExecuteAndResetPeriod,
}