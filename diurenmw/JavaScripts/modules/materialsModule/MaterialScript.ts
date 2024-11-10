import { GameEventBus } from "../../common/eventBus/EventBus";
import { AttributeModuleS } from "../AttributeModule/AttributeModuleS";
import { MaterialBase } from "./MaterialBase";
import { MaterialModuleS } from "./MaterialModuleS";

@Component
export default class MaterialScript extends Script {

    /** 仅在游戏时间对非模板实例调用一次 */
    protected onStart() {
        if(SystemUtil.isClient()) return;
    }
    /**使用材料
     * @param uuid 材料uuid
     */
    async useMaterial(uuid: string, inNum : number): Promise<boolean> {
        let Material = ModuleService.getModule(MaterialModuleS).useMaterial((this.gameObject as Character).player, uuid, inNum);
        if (Material) {
            await Material.use(inNum);
            GameEventBus.emit(`MaterialModule_UseMaterial`,(this.gameObject as Character).player,Material.getData().id);
            return true;
        }
        return false;
    }

    /**添加新材料
     * @param id 材料id
     */
    addMaterial(id: number, inNum : number) {
        return ModuleService.getModule(MaterialModuleS).addMaterial((this.gameObject as Character).player, id, inNum);
    }

    /**获取所有材料 */
    getAllMaterial() {
        return ModuleService.getModule(MaterialModuleS).getAllMaterial((this.gameObject as Character).player);
    }

    /**删除材料
     * @param uuid 材料uuid
     */
    removeMaterial(uuid: string) {
        return ModuleService.getModule(MaterialModuleS).removeMaterial((this.gameObject as Character).player, uuid);
    }
}