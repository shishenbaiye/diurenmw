import { MSingletonPlugin } from "../../framework/DI/MContainer";
import { MFramework } from "../../framework/MFramework";
import { MObject } from "../../framework/Object/MObject";
import { Constructor } from "../../tools/Singleton";
import { PlayerAttributeSet } from "../AttributeModule/PlayerAttributeSet";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { PlayerBase } from "./PlayerBase";
import { PlayerData } from "./PlayerData";

@MSingletonPlugin()
export class PlayerManager extends MObject {
    static _playerManager: PlayerManager;
    static get instance(): PlayerManager {
        if (!this._playerManager) {
            this._playerManager = MFramework.createObject(PlayerManager);
        }
        return this._playerManager;
    }

    playerMap: Map<number, Constructor<PlayerBase>> = new Map<number, Constructor<PlayerBase>>();


    createNew<T extends PlayerBase>(owner: Player): T {
        let as = owner.character.getComponent(AbilitySystemComponent).attributeSet as PlayerAttributeSet;
        if (!as) return null;
        if (PlayerManager.instance.playerMap.has(owner.playerId)) {
            let playerInfo = MFramework.createObject(PlayerManager.instance.playerMap.get(owner.playerId)) as T;
            playerInfo.ownerAttribute = as;
            playerInfo.init();
            return playerInfo;
        }
        let playerInfo = MFramework.createObject(PlayerBase) as T;
        playerInfo.ownerAttribute = as;
        playerInfo.init();
        return playerInfo;
    }

    createByData<T extends PlayerBase>(owner: Player, data: PlayerData): T {
        let as = owner.character.getComponent(AbilitySystemComponent).attributeSet as PlayerAttributeSet;
        if (!as) return null;
        if (PlayerManager.instance.playerMap.has(owner.playerId)) {
            let playerInfo = MFramework.createObject(PlayerManager.instance.playerMap.get(owner.playerId)) as T;
            playerInfo.ownerAttribute = as;
            playerInfo.initData(data);
            return playerInfo;
        }
        let playerInfo = MFramework.createObject(PlayerBase) as T;
        playerInfo.ownerAttribute = as;
        playerInfo.initData(data);
        return playerInfo;
    }
}


// export function registerPlayer(wid: number) {
//     return function (target: any) {
//         PlayerManager.instance.playerMap.set(wid, target);
//     }
// }