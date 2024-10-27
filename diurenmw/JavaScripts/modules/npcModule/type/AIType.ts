
export enum AIType {
    None = 0,
    /** 攻击者 */
    Attacker = 1,
    /** 防御者 */
    Defender = 2,
    /** boss */
    Boss = 3,
    /** 助手 */
    Helper = 4,
    /**主动攻击NPC类型 */
    NPCAttack = 9
}

export enum NpcExitType {
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

export enum GamePlayerState {
    /**死亡状态 */
    Die = 1,
    /**无敌状态 */
    Invincible = 2,
    /**僵直状态 */
    Stiff = 4,
    /**眩晕状态 */
    Dizziness = 8,
    /**安全状态 */
    Safe = 16,
    /** 变身状态 */
    Henshin = 32,
    /** 免疫击退 */
    ImmuneImpulse = 64
}



/** 不能控制状态 */
export const CanNotAIControlState = GamePlayerState.Die | GamePlayerState.Stiff | GamePlayerState.Dizziness;