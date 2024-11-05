import { GameEventBus } from "../../common/eventBus/EventBus";
import { AnimationExController } from "./anim/AnimationExController";
import { FollowBase } from "./anim/FollowData";
import { NpcBase } from "./NpcBase";
import { NpcData } from "./NpcData";
import { NpcExitType } from "./type/AIType";
import { NpcHeadUI } from "./ui/NpcHeadUI";

@Component
export default class NpcScript extends Script {

    @Property({ replicated: true, onChanged: "onChangeInfo" })
    public headInfo: NpcData = null;

    private owner: Character;
    public npc_head_c: NpcHeadUI;
    public npc_base_s: NpcBase;

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

    protected async onStart(): Promise<void> {
        await this.init();
        if (SystemUtil.isClient()) {
            GameEventBus.on("AttributeNpc_Change", (attrName: string, val: number, onlyId: string) => {
                if (onlyId !== this.owner.gameObjectId) return
                if (attrName !== `hp` && attrName !== `maxHp`) return;
                this.npc_head_c.refreshHp();
            });
        }
    }

    protected onDestroy(): void {
        if (SystemUtil.isServer()) {
            if (this.npc_base_s) {
                this.npc_base_s = null;
            }
        }
        if (SystemUtil.isClient()) {
            if (this.npc_head_c) {
                this.npc_head_c.destroy();
                this.npc_head_c = null;
            }
        }
    }

    public async addBase(base: NpcBase): Promise<void> {
        await this.init();
        this.npc_base_s = base;
        this.headInfo = this.npc_base_s.getData();
    }

    private async init(): Promise<void> {
        await this.gameObject.asyncReady();
        if (!this.owner) this.owner = this.gameObject as Character;
        if (SystemUtil.isClient()) {
            if (!this.npc_head_c) {
                this.npc_head_c = new NpcHeadUI();
                this.npc_head_c.initInfo(this.owner);
            }


        }
    }

    private async onChangeInfo(): Promise<void> {
        await this.init();
        await this.refreshInfo();
    }


    private async refreshAttr(attrName: string, value: number, ownerId: string): Promise<void> {
        //过滤无用属性
        if (attrName != `hp` && attrName != `maxHp`) return;
        await this.init();
        if (ownerId != (this.gameObject as Character).player.userId) return;
        if (!this.npc_head_c) await this.init();
        this.npc_head_c.refreshHp();
    }

    private async refreshInfo(): Promise<void> {
        if (!this.npc_head_c) await this.init();
        this.npc_head_c.refreshInfo();
    }


}