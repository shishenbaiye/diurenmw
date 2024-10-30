import { GameEventBus } from "../../common/eventBus/EventBus";
import { PlayerBase } from "./PlayerBase";
import { PlayerData } from "./PlayerData";
import { PlayerManager } from "./PlayerManager";
import { PlayerModuleC } from "./PlayerModuleC";
import { PlayerModuleData } from "./PlayerModuleData";
import PlayerScript from "./PlayerScript";

export class PlayerModuleS extends ModuleS<PlayerModuleC, PlayerModuleData> {
    protected onAwake(): void {
        GameEventBus.on(`AttributeModule_Ready`, this.onAttributeAllReady.bind(this))
    }

    net_initPlayer(name: string): void {
        this.getPlayerData(this.currentPlayer).refreshName(name);
        let playerInfo = this.currentPlayer.character.getComponent(PlayerScript);
        if (playerInfo) {
            playerInfo.headInfo = this.getPlayerBase(this.currentPlayer).ownerData;
        }
    }

    onAttributeAllReady(player: mw.Player) {
        let playerInfo = player.character.addComponent(PlayerScript);
        if (playerInfo) {
            playerInfo.headInfo = this.getPlayerBase(player).ownerData;
        }
    }

    getPlayerBase(player: Player): PlayerBase {
        let playerInfo = PlayerManager.instance.createNew(player);
        let data = this.getPlayerData(player);
        if (!playerInfo.ownerData) playerInfo.initData(new PlayerData());
        playerInfo.ownerData.name = data.playerName;
        playerInfo.ownerData.vip = false;
        return playerInfo;
    }
}