import { GameEventBus } from "../../common/eventBus/EventBus";
import { AttributeModuleS } from "../AttributeModule/AttributeModuleS";
import { ArmorBase } from "./ArmorBase";
import { ArmorModuleS } from "./ArmorModuleS";
import { ArmorPart } from "./ArmorType";


@Component
export default class ArmorScript extends Script {

    protected onStart(): void {
        if(SystemUtil.isClient()) return;
        GameEventBus.on("AttributeModule_refeshAttr", this.refeshArmorAttr.bind(this));
    }

    /**当前装备的头盔 */
    private equipeHead: ArmorBase;

    /**当前装备的上衣 */
    private equipeBody: ArmorBase;

    /**当前装备的裤子 */
    private equipeLeg: ArmorBase;

    /**当前装备的鞋子 */
    private equipeFoot: ArmorBase;

    /**
     * 装备防具 
     * @param part 1.头盔 2.上衣 3.下装 4.鞋子
     * @param armor 
     */
    equepArmor(part: ArmorPart, uuid:string) :boolean{
        let armor = ModuleService.getModule(ArmorModuleS).equepArmor((this.gameObject as Character).player, uuid);
        if(armor){
            this.unEquipArmor(part);
            armor.equip();
            switch (part) {
                case 1:
                    this.equipeHead = armor;
                    break;
                case 2:
                    this.equipeBody = armor;
                    break;
                case 3:
                    this.equipeLeg = armor;
                    break;
                case 4:
                    this.equipeFoot = armor;
                    break;
            }
            ModuleService.getModule(AttributeModuleS).refeshAttr((this.gameObject as Character).player);
            return true;
        }
        return false;
    }

    /**
     * 获取防具
     * @param part 1.头盔 2.上衣 3.下装 4.鞋子
     * @returns 
     */
    getEquepArmor(part: ArmorPart): ArmorBase {
        switch (part) {
            case 1:
                return this.equipeHead;
            case 2:
                return this.equipeBody;
            case 3:
                return this.equipeLeg;
            case 4:
                return this.equipeFoot;
        }
    }
    /**
     * 卸下防具
     * @param part 1.头盔 2.上衣 3.下装 4.鞋子
     */
    unEquipArmor(part:ArmorPart) {
        switch (part) {
            case 1:
                if(this.equipeHead){
                    this.equipeHead.unEquip();
                }
                this.equipeHead = null;
                break;
            case 2:
                if(this.equipeBody){
                    this.equipeBody.unEquip();
                }
                this.equipeBody = null;
                break;
            case 3:
                if(this.equipeLeg){
                    this.equipeLeg.unEquip();
                }
                this.equipeLeg = null;
                break;
            case 4:
                if(this.equipeFoot){
                    this.equipeFoot.unEquip();
                }
                this.equipeFoot = null;
                break;
        }
        ModuleService.getModule(ArmorModuleS).unEquipArmor((this.gameObject as Character).player, part);
    }

    /**添加防具 */
    addArmor(aid: number) {
        return ModuleService.getModule(ArmorModuleS).addArmor((this.gameObject as Character).player, aid);
    }

    /**获取所有防具 */
    getAllArmor() {
        return ModuleService.getModule(ArmorModuleS).getAllArmor((this.gameObject as Character).player);
    }

    /**删除防具 */
    romoveArmor(uuid: string) {
        return ModuleService.getModule(ArmorModuleS).removeArmor((this.gameObject as Character).player, uuid);
    }

    private refeshArmorAttr(player:mw.Player){
        if(player.userId != (this.gameObject as Character).player.userId) return;
        if(this.equipeHead){
            this.equipeHead.refesh();
        }
        if(this.equipeBody){
            this.equipeBody.refesh();
        }
        if(this.equipeLeg){
            this.equipeLeg.refesh();
        }
        if(this.equipeFoot){
            this.equipeFoot.refesh();
        }
    }
}