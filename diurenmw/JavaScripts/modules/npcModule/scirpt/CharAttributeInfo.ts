import { AnimationExController } from "../anim/AnimationExController";
import { AnimationExInfo } from "../anim/AnimationExInfo";
import { BuffInfo } from "../anim/BuffData";
import { HitInfo } from "../anim/HitData";
import { CanNotAIControlState, GamePlayerState } from "../type/AIType";
import { DamageResultType } from "../type/DamageTyp";
import { isInState } from "./NpcTool";

//角色属性 抽象类
@Component
export abstract class CharAttributeInfo extends Script {

    @Property({ replicated: true, onChanged: "onPlayerStateChanged" })
    playerState: number = 0;
    @Property({ replicated: true, onChanged: "onPlayerNameChanged" })
    playerName: string;

    @Property({ replicated: true, onChanged: "onHitInfoChanged" })
    hitInfo: HitInfo = new HitInfo();
    /** buff信息 */
    @Property({ replicated: true, onChanged: "onBuffIdsChanged" })
    buffInfo: BuffInfo = new BuffInfo();

    /** 最大血量 */
    @Property({ replicated: true, onChanged: "onHpChanged" })
    maxHp: number = 0;
    /** 当前血量 */
    @Property({ replicated: true, onChanged: "onHpChanged" })
    hp: number = 0;

    character: mw.Character;

    /**
     * 玩家默认属性值
     * @effect 仅服务端生效
     */
    public defaultProperties: number[] = [];
    /**
     * 玩家基础属性值
     * @effect 仅服务端生效
     */
    public basicProperties: number[] = [];
    /** 
     * 玩家额外百分比属性值
     * @effect 仅服务端生效
     */
    public extraPercentProperties: number[] = [];
    /**
     * 玩家额外固定属性值
     * @effect 仅服务端生效
     */
    public extraFixedProperties: number[] = [];

    /** 上一次伤害的来源 */
    public lastDamageSourceId: number = null;
    /** 伤害来源列表 */
    public damagerSet: Set<number> = new Set();
    /** 动画播放管理 */
    public animExController: AnimationExController;

    protected onUpdate(dt: number): void {
        if (SystemUtil.isServer()) {
            //buff刷新
        } else {
            // 布娃娃检查
        }
    }

    /** 伤害 */
    public handleDamage(damage: number, buffIds: number[], skillId?: number, attackIndex?: number, centerPos?: Vector, sourceId?: number): DamageResultType {
        //TODO 伤害计算
        //无伤状态
        if (damage > 0 && isInState(this.playerState, CanNotAIControlState)) {
            return DamageResultType.NoDamage;
        }
        //造成伤害
        if (this.hp > 0) {
            //伤害效果
            return DamageResultType.Damage;
        }
        //造成死亡
        if (this.hp <= 0) {
            let dieDirect: Vector;
            if (centerPos && this.character) {
                dieDirect = this.character.worldTransform.position.clone().subtract(centerPos);
                dieDirect.normalize().multiply(100);
            }
            this.die(sourceId, skillId, dieDirect)
            return DamageResultType.Kill;
        }
    }

    /** 攻击 */
    public handleAttack(damage: number, vampireHp: number) {
        if (vampireHp > 0 && !isInState(this.playerState, GamePlayerState.Die)) {
            //吸血加成
            this.hp = Math.min(this.hp + vampireHp, this.maxHp);
        }
    }

    /** 状态修改 */
    public changeState(state: GamePlayerState, add: boolean) {
        if (add) {
            this.playerState |= state;
        }
        else {
            this.playerState &= ~state;
        }
    }

    /** 重生 */
    protected rebirth() {
        this.lastDamageSourceId = 0;
        this.damagerSet.clear();
    }

    /** 攻击信息刷新 */
    protected onHitInfoChanged(): void {
        if (!this.hitInfo) return;
        const showUpper = this.character.isMoving;

        //TODO 攻击特效

        // 动作同步
        this.client_playAnim(new AnimationExInfo(
            {
                assetId: ``,
                slot: showUpper ? AnimSlot.Upper : AnimSlot.Default,
                stopByMove: showUpper ? false : true
            }))
    }

    /** buff加成刷新 */
    protected onBuffIdsChanged(): void {
        //加成刷新
    }

    /** 血量刷新 */
    protected onHpChanged(): void {
        //TODO 血量刷新
    }

    protected addBuffs(buffIds: number[], sourceId: number) {
        //TODO buff的属性加成
    }

    protected clearBuffs() {
        //TODO buff的属性清除
    }

    @RemoteFunction(Client, Multicast)
    protected client_playAnim(info: AnimationExInfo) {
        this.animExController?.clientPlayAnim(info);
    }

    @RemoteFunction(Client, Multicast)
    protected client_stopAnim(assetId?: string) {
        this.animExController?.clientStopAnim(assetId);
    }

    @RemoteFunction(Server)
    protected server_addBuffs(buffIds: number[], sourceId: number) {
        this.addBuffs(buffIds, sourceId);
    }


    /**
     * 对应属性刷新
     * @param type 
     * @param defaultChange 
     */
    public refreshProperty(type: number, defaultChange = false) {
        //重新计算属性
        const finalVal = (this.defaultProperties[type] + this.basicProperties[type]) * this.extraPercentProperties[type] + this.extraFixedProperties[type];
    }


    protected abstract playerId: number;

    protected abstract onPlayerStateChanged(path: string, val: number, oldVal: number);

    protected abstract die(sourceId?: number, skillId?: number, direct?: Vector);

}