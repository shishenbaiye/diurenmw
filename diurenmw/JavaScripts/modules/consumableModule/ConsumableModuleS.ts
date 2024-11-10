import { GameEventBus } from "../../common/eventBus/EventBus";
import { ItemType } from "../bagModule/BagManagerModuleData";
import { BagManagerModuleS } from "../bagModule/BagManagerModuleS";
import { ConsumableBase } from "./ConsumableBase";
import { ConsumableData } from "./ConsumableData";
import { ConsumableManager } from "./ConsumableManager";
import { ConsumableModuleC } from "./ConsumableModuleC";
import { ConsumableModuleData } from "./ConsumableModuleData";
import ConsumableScript from "./ConsumableScript";

export class ConsumableModuleS extends ModuleS<ConsumableModuleC, ConsumableModuleData> {
    protected onAwake(): void {
        GameEventBus.on(`AttributeModule_Ready`, this.onAttributeAllReady.bind(this))
    }

    onAttributeAllReady(player: mw.Player) {
        let inConsumableScript = player.character.addComponent(ConsumableScript);
        this.getClient(player).net_stopLoading();
    }

    /**增加消耗品
     * @param player 玩家
     * @param id 消耗品id
     */
    addConsumable(player: mw.Player, id: number, inNum : number): ConsumableBase {
        let data = this.getPlayerData(player);
        let ConsumableData : ConsumableData = data.updateConsumable(id, inNum);

        let Consumable : ConsumableBase;
        if(ConsumableData)
        {
            Consumable = ConsumableManager.instance.createByData(player, ConsumableData);
        }
        else
        {
            Consumable = ConsumableManager.instance.createNew(player, id);
            Consumable.num = inNum;
            data.addConsumable(Consumable.getData());
        }
        
        
        if(Consumable){
            let res = ModuleService.getModule(BagManagerModuleS).addItem(player,Consumable.uuid,ItemType.Consumables,Consumable.id,1);
            if(!res){
                console.error(`玩家背包${player.userId}添加消耗品失败`);
                // 如果添加失败，回滚
                if(ConsumableData)
                {
                    data.updateConsumable(id, -inNum);
                }
                return null;
            }
        }
        console.log(`玩家${player.userId}获得消耗品${Consumable.uuid}`);
        return Consumable;
    }

    getAllConsumable(player: mw.Player): ConsumableData[] {
        let data = this.getPlayerData(player);
        return data.haveConsumableList;
    }

    removeConsumable(player: mw.Player, uuId: string): boolean {
        let data = this.getPlayerData(player);
        let resBag = ModuleService.getModule(BagManagerModuleS).removeItem(player,uuId,ItemType.Consumables,1);
        if(!resBag){
            console.error(`玩家背包${player.userId}删除消耗品失败`);
            return false;
        }
        let res = data.removeConsumable(uuId);
        if(!res){
            console.error(`玩家${player.userId}删除消耗品失败`);
        }
    }

    useConsumable(player: mw.Player, uuId: string, inNum : number): ConsumableBase {
        let data = this.getPlayerData(player);
        let ConsumableData = data.getConsumableData(uuId);
        if (ConsumableData == null) {
            console.error(`玩家${player.userId}没有这个消耗品`);
            return null;
        } else if (ConsumableData.num < inNum) {
            console.error(`玩家${player.userId}消耗品数量不足`);
            return null;
        }

        let resBag = ModuleService.getModule(BagManagerModuleS).removeItem(player,uuId,ItemType.Consumables,inNum);
        if(!resBag){
            console.error(`玩家背包${player.userId}删除消耗品失败`);
            return null;
        }

        ConsumableData.num -= inNum;
        let Consumable = ConsumableManager.instance.createByData(player, ConsumableData);
        data.updateConsumable(ConsumableData.id, -inNum);
        return Consumable;
    }

}