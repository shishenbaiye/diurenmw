import { AnimExController, AnimExInfo } from "./CharacterAnim";
import { CharacterFightInfo } from "./CharacterFightInfo";
import { CharacterHit } from "./CharacterHit";
import { DamageResultType, EmCharacterState } from "./FightEnum";
import { ICharacterInfo } from "./ICharacterInfo";

/** 角色数据 */
export class CharacterInfo extends CharacterFightInfo implements ICharacterInfo {

    character: mw.Character;
    charName: string;
    playerState: number;
    lastDamageSourceId: number;
    damagerSet: Set<number>;
    animExController: AnimExController;
    hitInfo: CharacterHit;
    teamId: number;
    get playerId(): any {
        throw new Error("Method not implemented.");
    }
    get isClientOnly(): boolean {
        throw new Error("Method not implemented.");
    }
    addBuffs(buffIds: number[], sourceId: number) {
        throw new Error("Method not implemented.");
    }
    clearBuffs() {
        throw new Error("Method not implemented.");
    }
    changeState(state: EmCharacterState, add: boolean) {
        throw new Error("Method not implemented.");
    }
    clientShowDamageTips(player: Player, damage: number) {
        throw new Error("Method not implemented.");
    }
    clientPlayAnim(info: AnimExInfo) {
        throw new Error("Method not implemented.");
    }
    clientStopAnim(assetId?: string) {
        throw new Error("Method not implemented.");
    }
    die(sourceId?: number, skillId?: number) {
        throw new Error("Method not implemented.");
    }
    handleDamage(damage: number, buffIds: number[], skillId?: number, attackIndex?: number, centerPos?: Vector, sourceId?: number): DamageResultType {
        throw new Error("Method not implemented.");
    }
    handleAttack(damage: number, vampireHp: number) {
        throw new Error("Method not implemented.");
    }

}