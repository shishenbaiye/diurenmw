import { GameEventBus } from "../../common/eventBus/EventBus";
import { AttributeModuleS } from "../AttributeModule/AttributeModuleS";
import { ConsumableBase } from "./ConsumableBase";
import { ConsumableModuleS } from "./ConsumableModuleS";

@Component
export default class ConsumableScript extends Script {

    /** 仅在游戏时间对非模板实例调用一次 */
    protected onStart() {
        if(SystemUtil.isClient()) return;
    }
    /**使用消耗品
     * @param uuid 消耗品uuid
     */
    async useConsumable(uuid: string, inNum : number): Promise<boolean> {
        let Consumable = ModuleService.getModule(ConsumableModuleS).useConsumable((this.gameObject as Character).player, uuid, inNum);
        if (Consumable) {
            await Consumable.use(inNum);
            GameEventBus.emit(`ConsumableModule_UseConsumable`,(this.gameObject as Character).player,Consumable.getData().id);
            return true;
        }
        return false;
    }

    /**添加新消耗品
     * @param id 消耗品id
     */
    addConsumable(id: number, inNum : number) {
        return ModuleService.getModule(ConsumableModuleS).addConsumable((this.gameObject as Character).player, id, inNum);
    }

    /**获取所有消耗品 */
    getAllConsumable() {
        return ModuleService.getModule(ConsumableModuleS).getAllConsumable((this.gameObject as Character).player);
    }

    /**删除消耗品
     * @param uuid 消耗品uuid
     */
    removeConsumable(uuid: string) {
        return ModuleService.getModule(ConsumableModuleS).removeConsumable((this.gameObject as Character).player, uuid);
    }
}