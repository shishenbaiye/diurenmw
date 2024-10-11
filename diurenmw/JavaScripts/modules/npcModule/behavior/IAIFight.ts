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
    get aiCfg(): IAIEle;
    exitMap: Map<AIExitType, number>;
    getSpawnPos(): Vector[];
    resetTarget(exitType: AIExitType);
    hp: number;
    playerState: number;
    stopFollow();
    startFollow(stopDistance: number);
    npcId: number;

}