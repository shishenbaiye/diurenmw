import { PlayerBase } from "./PlayerBase";
import { PlayerData } from "./PlayerData";
import { PlayerModuleS } from "./PlayerModuleS";
import { PlayerHeadUI } from "./ui/PlayerHeadUI,";

@Component
export default class PlayerScript extends Script {

    @Property({ replicated: true, onChanged: "onChangeInfo" })
    public headInfo: PlayerData;

    @Property({ replicated: true, onChanged: "onChangeHp" })
    public hpInfo: [number, number];

    private owner: Character;
    private player_head: PlayerHeadUI;
    private player_base: PlayerBase;

    protected onStart(): void {
        this.owner = this.gameObject as Character;
        if (SystemUtil.isServer()) {
            this.player_base = ModuleService.getModule(PlayerModuleS).addPlayerBase(this.owner.player);
        }
        if (SystemUtil.isClient()) {
            this.initInfo();
        }
    }

    protected onDestroy(): void {
        if (SystemUtil.isServer()) {
            if (this.player_base) {
                this.player_base = null;
            }
        }
        if (SystemUtil.isClient()) {
            if (this.player_head) {
                this.player_head.destroy();
                this.player_head = null;
            }
        }
    }

    private async initInfo(): Promise<void> {
        await this.gameObject.asyncReady();
        if (!this.player_head) {
            this.player_head = new PlayerHeadUI();
            this.player_head.initInfo(this.owner);
        }
    }

    private async onChangeInfo(): Promise<void> {
        if (!this.player_head) await this.initInfo();
        this.player_head.refreshInfo(this.headInfo);
    }

    private async onChangeHp(): Promise<void> {
        if (!this.player_head) await this.initInfo();
        this.player_head.refreshHp(this.hpInfo[0], this.hpInfo[1]);
    }

    public refreshAttr(player: Player): void {
        if (player.userId != (this.gameObject as Character).player.userId) return;
        if (this.player_base) {
            this.player_base.refresh();
            let hp1 = this.player_base.ownerAttribute.hp;
            let hp2 = this.player_base.ownerAttribute.maxHp;
            this.hpInfo = [hp1.getBase(), hp2.getBase()]
        }
    }

    public refreshInfo(player: Player): void {
        if (player.userId != (this.gameObject as Character).player.userId) return;
        if (this.player_base) {
            this.player_base.refresh();
            this.headInfo = this.player_base.getData();
        }
    }


}