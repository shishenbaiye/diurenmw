import { NpcBase } from "./NpcBase";
import { NpcData } from "./NpcData";
import { NpcHeadUI } from "./ui/NpcHeadUI";

@Component
export default class NpcScript extends Script {

    @Property({ replicated: true, onChanged: "onChangeInfo" })
    public headInfo: NpcData = null;

    private owner: Character;
    public npc_head_c: NpcHeadUI;
    public npc_base_s: NpcBase;


    protected onStart(): void {
        this.init();
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