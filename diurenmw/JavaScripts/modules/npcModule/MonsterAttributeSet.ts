import { AttributeDataInit } from "../gasModule/gameAbilitys/AS/AttributeHelper";
import { AttributeSet } from "../gasModule/gameAbilitys/AS/AttributeSet";
import { AttributeSetData } from "../gasModule/gameAbilitys/AS/AttributeSetData";
import { AnimationExController } from "./anim/AnimationExController";
import { FollowBase } from "./anim/FollowData";
import { NpcExitType } from "./type/AIType";

@Component
export class MonsterAttributeSet extends AttributeSet {

    @Property({ displayName: "等级", replicated: true, onChanged: "onLevelChanged" })
    public level: AttributeSetData;

    @Property({ displayName: "生命值", replicated: true, onChanged: "onHpChanged" })
    public hp: AttributeSetData;

    @Property({ displayName: "最大生命值", replicated: true, onChanged: "onMaxHpChanged" })
    public maxHp: AttributeSetData;

    @Property({ displayName: "魔法值", replicated: true, onChanged: "onMpChanged" })
    public mp: AttributeSetData;

    @Property({ displayName: "最大魔法值", replicated: true, onChanged: "onMaxMpChanged" })
    public maxMp: AttributeSetData;

    @Property({ displayName: "防御力", replicated: true, onChanged: "onDefChanged" })
    public def: AttributeSetData;

    @Property({ displayName: "攻击力", replicated: true, onChanged: "onAtkChanged" })
    public atk: AttributeSetData;


    /** 寻路数据 */
    public followBase: FollowBase;
    /** 状态时间 */
    public stateCdMap: Map<NpcExitType, number> = new Map();
    /** 状态保存时间 */
    public stateTimeMap: Map<NpcExitType, number> = new Map();
    /** 巡逻点位 */
    private patrols: Vector[] = [];
    /** 动画播放管理 */
    public animExController: AnimationExController;

    //#region  属性处理

    preAttributeChange(attribute: AttributeSetData, newValue: number): void {
        // throw new Error("Method not implemented.");
    }
    postAttributeChange(attribute: AttributeSetData, oldValue: number, newValue: number): void {
        // throw new Error("Method not implemented.");
    }

    onLevelChanged(oldValue: number, newValue: number): void {
        // throw new Error("Method not implemented.");
    }

    onHpChanged(oldValue: number, newValue: number): void {
        console.warn("怪物生命值变化", oldValue, newValue);
    }

    onMaxHpChanged(oldValue: number, newValue: number): void {
        // throw new Error("Method not implemented.");
    }

    onMpChanged(oldValue: number, newValue: number): void {
        // throw new Error("Method not implemented.");
    }

    onMaxMpChanged(oldValue: number, newValue: number): void {
        // throw new Error("Method not implemented.");
    }

    onDefChanged(oldValue: number, newValue: number): void {
        // throw new Error("Method not implemented.");
    }

    onAtkChanged(oldValue: number, newValue: number): void {
        // throw new Error("Method not implemented.");
    }

    //#endregion

    protected onStart(): void {
        // 初始化
        AttributeDataInit(this, "level", 1);
        AttributeDataInit(this, "hp", 100000);
        AttributeDataInit(this, "maxHp", 100000);
        AttributeDataInit(this, "mp", 100000);
        AttributeDataInit(this, "maxMp", 100000);
        AttributeDataInit(this, "def", 100);
        AttributeDataInit(this, "atk", 100);
    }


    private initState(): void {
        this.stateCdMap.set(NpcExitType.Other, 0);
        this.stateCdMap.set(NpcExitType.BossCd, 0);
        this.stateCdMap.set(NpcExitType.UnHurt, 0);
        this.stateCdMap.set(NpcExitType.OutRange, 0);
        this.stateCdMap.set(NpcExitType.DamageHp, 0);
    }

    private initFollow(): void {
        if (!this.followBase) this.followBase = new FollowBase(this.gameObject as Character, this);
        this.followBase.stopFollow();
        this.followBase.addPath(this.patrols);
    }

    public getSpawnPos(): Vector[] {
        return;
    }

}