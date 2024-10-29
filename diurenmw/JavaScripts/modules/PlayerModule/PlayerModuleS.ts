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
        this.getPlayerData(this.currentPlayer).playerName = name;
        let playerInfo = this.currentPlayer.character.addComponent(PlayerScript);
        if (playerInfo) {
            playerInfo.refreshAttr(this.currentPlayer);
        }
    }

    onAttributeAllReady(player: mw.Player) {
        let playerInfo = player.character.addComponent(PlayerScript);
        let data = this.getPlayerData(player);
        let playerData: PlayerData = new PlayerData();
        playerData.name = data.playerName;
        if (playerInfo) {
            playerInfo.refreshInfo(player)
            playerInfo.refreshAttr(player);
        }
    }

    addPlayerBase(player: Player): PlayerBase {
        let playerInfo = PlayerManager.instance.createNew(player);
        let data = this.getPlayerData(player);
        let playerData: PlayerData = new PlayerData();
        playerData.name = data.playerName;
        playerInfo.initByData(playerData);
        return playerInfo;
    }
}