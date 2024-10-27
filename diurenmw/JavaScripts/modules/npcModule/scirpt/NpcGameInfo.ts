import { AIManager } from "../AIManager";
import { FollowBase } from "../anim/FollowData";
import { ICharacterFightBase } from "../interface/ICharacterBase";
import { GamePlayerState, NpcExitType } from "../type/AIType";
import { DamageResultType } from "../type/DamageTyp";
import { NpcBaseInfo } from "./NpcBaseInfo";
import { isInState } from "./NpcTool";

@Component
export class NpcGameInfo extends NpcBaseInfo implements ICharacterFightBase {


    /** 目前追踪的玩家的Id，0为没有目标 */
    @mw.Property({ replicated: true })
    public targetId: number = 0;

    @mw.Property({ replicated: true, onChanged: "onEnableStateChange" })
    public npcEnable: boolean = false;

    /** 寻路数据 */
    public followBase: FollowBase;
    /** 状态时间 */
    public stateCdMap: Map<NpcExitType, number> = new Map();
    /** 状态保存时间 */
    public stateTimeMap: Map<NpcExitType, number> = new Map();
    /** 巡逻点位 */
    private patrols: Vector[] = [];

    protected onStart(): void {
        super.onStart();
    }

    protected onUpdate(dt: number): void {
        if (!this.npcEnable || isInState(this.playerState, GamePlayerState.Die)) return;
        super.onUpdate(dt);
    }

    private initState(): void {
        this.stateCdMap.set(NpcExitType.Other, 0);
        this.stateCdMap.set(NpcExitType.BossCd, 0);
        this.stateCdMap.set(NpcExitType.UnHurt, 0);
        this.stateCdMap.set(NpcExitType.OutRange, 0);
        this.stateCdMap.set(NpcExitType.DamageHp, 0);
    }

    private initFollow(): void {
        if (!this.followBase) this.followBase = new FollowBase(this.character, this);
        this.followBase.stopFollow();
        this.followBase.addPath(this.patrols);
    }

    private initWeapon(): void {
        //TODO
    }

    getSpawnPos(): Vector[] {
        throw new Error("Method not implemented.");
    }

    @RemoteFunction(mw.Server)
    startFollow(stopDistance: number) {
        if (this.targetId === 0) return;
        const target = AIManager.getInstance().getScript(this.targetId);
        if (target) {
            this.followBase.followTarget(target.character, stopDistance);
        }
    }

    @RemoteFunction(mw.Server)
    stopFollow() {
        this.followBase.stopFollow();
    }

    @RemoteFunction(mw.Server)
    resetTarget(exitType: NpcExitType) {
        if (exitType != NpcExitType.Other) {
            let cd = this.stateCdMap.get(exitType);
            let time = TimeUtil.elapsedTime();
            this.stateTimeMap.set(exitType, cd + time);
        }
        //重置目标
        this.targetId = 0;
        this.followBase.nearPointMove();
    }

    /** -------------------父类方法------------------------ */
    override handleDamage(damage: number, buffIds: number[], skillId?: number, attackIndex?: number, centerPos?: Vector, sourceId?: number): DamageResultType {
        const res = super.handleDamage(damage, buffIds, skillId, attackIndex, centerPos, sourceId);
        if (res != DamageResultType.Damage) {
            return res;
        }
        //TODO 可能会有其他逻辑
        return res;
    }

}