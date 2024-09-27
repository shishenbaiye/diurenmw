import { GameEventBus } from "../../common/eventBus/EventBus";
import { JewelryBase } from "./JewelryBase";
import { JewelryData } from "./JewelryData";
import { JewelryManager } from "./JewelryManager";
import { JewelryModuleC } from "./JewelryModuleC";
import { JewelryModuleData } from "./JewelryModuleData";
import JewelryScript from "./JewelryScript";
import { JewelryPart } from "./JewelryType";

export class JewelryModuleS extends ModuleS<JewelryModuleC,JewelryModuleData>{
    protected onAwake(): void {
        GameEventBus.on(`AttributeModule_Ready`, this.onAttributeAllReady.bind(this))
    }

    onAttributeAllReady(player: mw.Player) {
        let jewelryScript = player.character.addComponent(JewelryScript);
        if (jewelryScript) {
            let jewelryData = this.getPlayerData(player);
            // 获取玩家装备的防具
            if (jewelryData.equipedRing) {
                let ringData = jewelryData.getJewelryData(jewelryData.equipedRing);
                if(ringData){
                    jewelryScript.equepJewelry(JewelryPart.Ring, ringData.uuid);
                };
            }

            if (jewelryData.equipedNecklace) {
                let necklaceData = jewelryData.getJewelryData(jewelryData.equipedNecklace);
                if(necklaceData){
                    jewelryScript.equepJewelry(JewelryPart.Necklace, necklaceData.uuid);
                };
            }

            if (jewelryData.equipedBracelet) {
                let braceletData = jewelryData.getJewelryData(jewelryData.equipedBracelet);
                if(braceletData){
                    jewelryScript.equepJewelry(JewelryPart.Bracelet, braceletData.uuid);
                };
            }

            this.getClient(player).net_stopLoading();
        } else {
            console.error(`玩家${player.userId}添加首饰脚本失败`);
        }
    }

    addJewelry(player: mw.Player, aid: number): JewelryBase {
        let jewelry = JewelryManager.instance.createNew(player, aid);
        let data = this.getPlayerData(player);
        data.addJewelry(jewelry.getData());
        console.log(`玩家${player.userId}获得首饰${jewelry.getData().uuid}`);
        return jewelry;
    }

    getAllJewelry(player: mw.Player): Array<JewelryData> {
        let data = this.getPlayerData(player);
        return data.haveJewelryList;
    }

    removeJewelry(player: mw.Player, uuId: string): boolean {
        let data = this.getPlayerData(player);
        return data.removeJewelry(uuId);
    }

    equepJewelry(player: mw.Player, uuid: string): JewelryBase {
        let data = this.getPlayerData(player);
        let jewelryData = data.getJewelryData(uuid);
        if(jewelryData = null){
            console.error(`玩家${player.userId}没有这个首饰`);
            return null;
        }

        let jewelry = JewelryManager.instance.createByData(player, jewelryData);
        data.equipJewelry(uuid);
        return jewelry;
    }

    unEquipJewelry(player: mw.Player, part: JewelryPart) {
        let data = this.getPlayerData(player);
        data.unEquipJewelry(part);
    }
}