import { AnimExController, AnimExInfo } from "./CharacterAnim";
import { CharacterHit } from "./CharacterHit";
import { DamageResultType, EmCharacterState } from "./FightEnum";

export interface ICharacterInfo {

    /** 角色对象 */
    character: Character;
    /** 玩家名称 */
    charName: string;

    /** 玩家状态 */
    playerState: number;

    /** 上一个造成伤害的来源 */
    lastDamageSourceId: number;
    /** 伤害来源列表 */
    damagerSet: Set<number>;

    animExController: AnimExController;

    hitInfo: CharacterHit;

    teamId: number;

    get playerId();

    /**
     * 是否是客户端Only
     */
    get isClientOnly(): boolean;

    addBuffs(buffIds: number[], sourceId: number);
    clearBuffs();

    changeState(state: EmCharacterState, add: boolean);

    clientShowDamageTips(player: Player, damage: number);

    clientPlayAnim(info: AnimExInfo);

    clientStopAnim(assetId?: string);

    die(sourceId?: number, skillId?: number);

    handleDamage(damage: number, buffIds: number[], skillId?: number, attackIndex?: number, centerPos?: Vector, sourceId?: number): DamageResultType;

    handleAttack(damage: number, vampireHp: number);

}