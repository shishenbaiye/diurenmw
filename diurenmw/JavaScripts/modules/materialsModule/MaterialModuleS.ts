import { GameEventBus } from "../../common/eventBus/EventBus";
import { ItemType } from "../bagModule/BagManagerModuleData";
import { BagManagerModuleS } from "../bagModule/BagManagerModuleS";
import { MaterialBase } from "./MaterialBase";
import { MaterialData } from "./MaterialData";
import { MaterialManager } from "./MaterialManager";
import { MaterialModuleC } from "./MaterialModuleC";
import { MaterialModuleData } from "./MaterialModuleData";
import MaterialScript from "./MaterialScript";

export class MaterialModuleS extends ModuleS<MaterialModuleC, MaterialModuleData> {
    protected onAwake(): void {
        GameEventBus.on(`AttributeModule_Ready`, this.onAttributeAllReady.bind(this))
    }

    onAttributeAllReady(player: mw.Player) {
        let inMaterialScript = player.character.addComponent(MaterialScript);
        this.getClient(player).net_stopLoading();
    }

    /**增加材料
     * @param player 玩家
     * @param id 材料id
     */
    addMaterial(player: mw.Player, id: number, inNum : number): MaterialBase {
        let data = this.getPlayerData(player);
        let MaterialData : MaterialData = data.updateMaterial(id, inNum);

        let Material : MaterialBase;
        if(MaterialData)
        {
            Material = MaterialManager.instance.createByData(player, MaterialData);
        }
        else
        {
            Material = MaterialManager.instance.createNew(player, id);
            Material.num = inNum;
            data.addMaterial(Material.getData());
        }
        
        console.log(`玩家${player.userId}获得材料${Material.uuid}`);
        return Material;
    }

    getAllMaterial(player: mw.Player): MaterialData[] {
        let data = this.getPlayerData(player);
        return data.haveMaterialList;
    }

    removeMaterial(player: mw.Player, uuId: string, inCount : number): boolean {
        let data = this.getPlayerData(player);
        let inMaterialData = data.findMaterialByUuid(uuId)
        if(!inMaterialData) {
            console.error(`玩家${player.userId}没有这个材料`);
            return false;
        }

        let res = data.updateMaterial(inMaterialData.id, -inCount);
        if(!res){
            console.error(`玩家${player.userId}删除材料失败`);
            return false;
        }
        return true;
    }

    useMaterial(player: mw.Player, uuId: string, inNum : number): MaterialBase {
        let data = this.getPlayerData(player);
        let MaterialData = data.getMaterialData(uuId);
        if (MaterialData == null) {
            console.error(`玩家${player.userId}没有这个材料`);
            return null;
        } else if (MaterialData.num < inNum) {
            console.error(`玩家${player.userId}材料数量不足`);
            return null;
        }

        let resBag = ModuleService.getModule(BagManagerModuleS).removeItem(player,uuId,ItemType.Materials,inNum);
        if(!resBag){
            console.error(`玩家背包${player.userId}删除材料失败`);
            return null;
        }

        MaterialData.num -= inNum;
        let Material = MaterialManager.instance.createByData(player, MaterialData);
        data.updateMaterial(MaterialData.id, -inNum);
        return Material;
    }

}