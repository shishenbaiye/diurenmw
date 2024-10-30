import { PlayerBase } from "./PlayerBase";
import { PlayerData } from "./PlayerData";
import { PlayerModuleS } from "./PlayerModuleS";
import { PlayerHeadUI } from "./ui/PlayerHeadUI";

@Component
export default class PlayerScript extends Script {

    @Property({ replicated: true, onChanged: "onChangeInfo" })
    public headInfo: PlayerData = null;

    private owner: Character;
    private player_head_c: PlayerHeadUI;
    private player_base_s: PlayerBase;


    protected onStart(): void {
        this.init();
    }

    protected onDestroy(): void {
        if (SystemUtil.isServer()) {
            if (this.player_base_s) {
                this.player_base_s = null;
            }
        }
        if (SystemUtil.isClient()) {
            if (this.player_head_c) {
                this.player_head_c.destroy();
                this.player_head_c = null;
            }
        }
    }

    public async initHeadInfo(): Promise<void> {
        await this.init();
        this.headInfo = this.player_base_s.getData();
    }

    private async init(): Promise<void> {
        await this.gameObject.asyncReady();
        if (!this.owner) this.owner = this.gameObject as Character;
        if (SystemUtil.isServer()) {
            this.player_base_s = ModuleService.getModule(PlayerModuleS).getPlayerBase(this.owner.player);
        }
        if (SystemUtil.isClient()) {
            if (!this.player_head_c) {
                this.player_head_c = new PlayerHeadUI();
                this.player_head_c.initInfo(this.owner);
            }
        }
    }

    private async onChangeInfo(): Promise<void> {
        await this.init();
        await this.refreshInfo();
    }


    // private async refreshAttr(attrName: string, value: number, ownerId: string): Promise<void> {
    //     //过滤无用属性
    //     if (attrName != `hp` && attrName != `maxHp`) return;
    //     await this.init();
    //     if (ownerId != (this.gameObject as Character).player.userId) return;
    //     if (!this.player_head_c) await this.init();
    //     this.player_head_c.refreshHp();
    // }

    private async refreshInfo(): Promise<void> {
        if (!this.player_head_c) await this.init();
        this.player_head_c.refreshInfo();
    }


}