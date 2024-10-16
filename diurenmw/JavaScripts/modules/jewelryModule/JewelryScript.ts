import { GameEventBus } from "../../common/eventBus/EventBus";
import { AttributeModuleS } from "../AttributeModule/AttributeModuleS";
import { JewelryBase } from "./JewelryBase";
import { JewelryModuleS } from "./JewelryModuleS";
import { JewelryPart } from "./JewelryType";

@Component
export default class JewelryScript extends Script {

    protected onStart(): void {
        if(SystemUtil.isClient()) return;
        GameEventBus.on("AttributeModule_refeshAttr", this.refeshJewelryAttr.bind(this));
    }

    /**当前装备的戒指 */
    private equipeRing: JewelryBase;

    /**当前装备的项链 */
    private equipeNecklace : JewelryBase;

    /**当前装备的手镯 */
    private equipeBracelet: JewelryBase;

    /**
     * 装备首饰 
     * @param part 1.戒指 2.项链 3.手镯
     * @param armor 
     */
    equepJewelry(part: JewelryPart, uuid:string) :boolean{
        let jewelry = ModuleService.getModule(JewelryModuleS).equepJewelry((this.gameObject as Character).player, uuid);
        if(jewelry){
            this.unEquipJewelry(part);
            jewelry.equip();
            switch (part) {
                case 1:
                    this.equipeRing = jewelry;
                    break;
                case 2:
                    this.equipeNecklace = jewelry;
                    break;
                case 3:
                    this.equipeBracelet = jewelry;
                    break;
            }
            ModuleService.getModule(AttributeModuleS).refeshAttr((this.gameObject as Character).player);
            return true;
        }
        return false;
    }

    /**
     * 获取防具
     * @param part 1.戒指 2.项链 3.手镯
     * @returns 
     */
    getEquepJewelry(part: JewelryPart): JewelryBase {
        switch (part) {
            case 1:
                return this.equipeRing;
            case 2:
                return this.equipeNecklace;
            case 3:
                return this.equipeBracelet;
        }
    }
    /**
     * 卸下防具
     * @param part 1.戒指 2.项链 3.手镯
     */
    unEquipJewelry(part:JewelryPart) {
        switch (part) {
            case 1:
                if(this.equipeRing){
                    this.equipeRing.unEquip();
                }
                this.equipeRing = null;
                break;
            case 2:
                if(this.equipeNecklace){
                    this.equipeNecklace.unEquip();
                }
                this.equipeNecklace = null;
                break;
            case 3:
                if(this.equipeBracelet){
                    this.equipeBracelet.unEquip();
                }
                this.equipeBracelet = null;
                break;
        }
        ModuleService.getModule(JewelryModuleS).unEquipJewelry((this.gameObject as Character).player, part);
    }

    /**添加防具 */
    addJewelry(aid: number) {
        return ModuleService.getModule(JewelryModuleS).addJewelry((this.gameObject as Character).player, aid);
    }

    /**获取所有防具 */
    getAllJewelry() {
        return ModuleService.getModule(JewelryModuleS).getAllJewelry((this.gameObject as Character).player);
    }

    /**删除防具 */
    romoveJewelry(uuid: string) {
        return ModuleService.getModule(JewelryModuleS).removeJewelry((this.gameObject as Character).player, uuid);
    }

    /**刷新装备的首饰属性 */
    private refeshJewelryAttr(player: Player) {
        if(player.userId != (this.gameObject as Character).player.userId) return;
        if (this.equipeRing) {
            this.equipeRing.refesh();
        }
        if (this.equipeNecklace) {
            this.equipeNecklace.refesh();
        }
        if (this.equipeBracelet) {
            this.equipeBracelet.refesh();
        }
    }
}