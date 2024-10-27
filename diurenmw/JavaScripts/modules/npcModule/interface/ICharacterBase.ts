import { AnimationExInfo } from "../anim/AnimationExInfo";
import { NpcExitType } from "../type/AIType";
import { DamageResultType } from "../type/DamageTyp";

/** 基本 */
export interface ICharacterBase {
    /** 角色对象 */
    character: Character;
    /** 玩家名称 */
    playerName: string;
    /** 玩家状态 */
    playerState: number;
    /** 伤害来源列表 */
    damagerSet: Set<number>;

    addBuffs(buffIds: number[], sourceId: number);

    clearBuffs();

    handleDamage(damage: number, buffIds: number[], skillId?: number, attackIndex?: number, centerPos?: Vector, sourceId?: number): DamageResultType;

    handleAttack(damage: number, vampireHp: number);

    client_playAnim(info: AnimationExInfo);

    client_stopAnim(assetId?: string);

    die(sourceId?: number, skillId?: number, direct?: Vector);

}
/** 战斗 */
export interface ICharacterFightBase {
    /** 玩家状态 */
    playerState: number;
    /** 出生点 */
    getSpawnPos(): Vector[];
    /** 开始跟随 */
    startFollow(stopDistance: number);
    /** 停止跟随 */
    stopFollow();
    /** 重置目标 */
    resetTarget(exitType: NpcExitType);
}