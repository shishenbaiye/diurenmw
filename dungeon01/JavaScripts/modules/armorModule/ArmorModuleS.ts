import { GameEventBus } from "../../common/eventBus/EventBus";
import { ArmorBase } from "./ArmorBase";
import { ArmorData } from "./ArmorData";
import { ArmorManager } from "./ArmorManager";
import { ArmorModuleC } from "./ArmorModuleC";
import { ArmorModuleData } from "./ArmorModuleData";
import ArmorScript from "./ArmorScript";
import { ArmorPart } from "./ArmorType";

export class ArmorModuleS extends ModuleS<ArmorModuleC, ArmorModuleData> {
    protected onAwake(): void {
        GameEventBus.on(`AttributeModule_Ready`, this.onAttributeAllReady.bind(this))
    }

    onAttributeAllReady(player: mw.Player) {
        let armorScript = player.character.addComponent(ArmorScript);
        if (armorScript) {
            let armorData = this.getPlayerData(player);
            // 获取玩家装备的防具
            if (armorData.equipedHead) {
                let headData = armorData.getArmorData(armorData.equipedHead);
                if(headData){
                    armorScript.equepArmor(ArmorPart.Head, headData.uuid);
                };
            }

            if (armorData.equipedBody) {
                let bodyData = armorData.getArmorData(armorData.equipedBody);
                if(bodyData){
                    armorScript.equepArmor(ArmorPart.Body, bodyData.uuid);
                };
            }

            if (armorData.equipedLeg) {
                let legData = armorData.getArmorData(armorData.equipedLeg);
                if(legData){
                    armorScript.equepArmor(ArmorPart.Leg, legData.uuid);
                };
            }

            if (armorData.equipedFoot) {
                let footData = armorData.getArmorData(armorData.equipedFoot);
                if(footData){
                    armorScript.equepArmor(ArmorPart.Foot, footData.uuid);
                };
            }

            this.getClient(player).net_stopLoading();
        } else {
            console.error(`玩家${player.userId}添加防具脚本失败`);
        }
    }

    addArmor(player: mw.Player, aid: number): ArmorBase {
        let armor = ArmorManager.instance.createNew(player, aid);
        let data = this.getPlayerData(player);
        data.addArmor(armor.getData());
        console.log(`玩家${player.userId}获得防具${armor.getData().uuid}`);
        return armor;
    }

    getAllArmor(player: mw.Player): Array<ArmorData> {
        let data = this.getPlayerData(player);
        let armorList = data.haveArmorList
        return armorList;
    }

    removeArmor(player: mw.Player, uuId: string): boolean {
        let data = this.getPlayerData(player);
        return data.removeArmor(uuId);
    }

    equepArmor(player: mw.Player, uuId: string): ArmorBase {
        let data = this.getPlayerData(player);
        let armorData = data.getArmorData(uuId);
        if (armorData == null) {
            console.error(`玩家${player.userId}没有这个防具`);
            return null;
        }

        let armor = ArmorManager.instance.createByData(player, armorData);
        data.equipArmor(uuId);
        return armor;
    }

    unEquipArmor(player: mw.Player, part: ArmorPart) {
        let data = this.getPlayerData(player);
        data.unEquipArmor(part);
    }
}