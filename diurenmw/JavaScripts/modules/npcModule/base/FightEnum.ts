
/**造成伤害的类型 */
export enum EmDamageType {
    Skill,
    Weapon,
    Default,
}

/** 伤害类型 */
export enum DamageResultType {
    NoDamage = 0,
    Damage = 1,
    Kill = 2,
}

export enum EmCharacterState {
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

/** 状态定义 */
export const CanNotHandleHarmState = EmCharacterState.Die | EmCharacterState.Invincible | EmCharacterState.Safe;
export const CanNotAttackState = EmCharacterState.Die | EmCharacterState.Safe;
export const CanNotControlMoveState = EmCharacterState.Stiff | EmCharacterState.Dizziness;
export const CanNotAIControlState = EmCharacterState.Die | EmCharacterState.Stiff | EmCharacterState.Dizziness;
export const CanNotCtrlState = EmCharacterState.Die | EmCharacterState.Dizziness;
export const InterruptSkillState = EmCharacterState.Die | EmCharacterState.Dizziness;

export enum EmHurtResultType {
    /** 未造成伤害 */
    NoDamage = 0,
    /** 正常伤害 */
    Damage = 1,
    /** 造成死亡 */
    Die = 2,
    /** 没找到玩家 */
    NotFindPlayer = 3,
    /** 目标已死亡 */
    TargetAlreadyDie = 4,
    /** 目标无敌 */
    TargetInvincible = 5,
    /** 目标在家 */
    TargetAtHome = 6,
    /** 么找到npc */
    NotFindNpc = 7,
    /** npc流血死亡 */
    NpcDie = 8,
}
