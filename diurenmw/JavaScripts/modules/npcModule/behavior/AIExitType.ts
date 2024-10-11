export enum AIExitType {
    /** 这是一些不会统计Cd的状态 ,玩家死亡、目标离开寻路范围*/
    Other,
    /** 未受伤导致的退出 */
    UnHurt,
    /** 血量低于一定比例导致的退出 */
    DamageHp,
    /** 脱出范围导致的退出 */
    OutRange,
    /** BossCd脱出 */
    BossCd
}