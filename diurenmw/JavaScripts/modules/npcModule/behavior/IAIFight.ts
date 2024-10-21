import { AIExitType } from "./AIExitType";

/** AI行为 */
export interface IAIEle {
    skillProb: number;
    atkCd: number;
    targetHp: number;
    unhurt: number;
    hateRange: number;
    outRangeCd: number;
    stopFind: number;
    pathAtk: number;
    pathFind: number;
    type: number
}

/** AI战斗 */
export interface IAIFight {

    npcId: number;

    get aiCfg(): IAIEle;

    exitMap: Map<AIExitType, number>;

    playerState: number;

    getSpawnPos(): Vector[];
    resetTarget(exitType: AIExitType);
    startFollow(stopDistance: number);
    stopFollow();

}