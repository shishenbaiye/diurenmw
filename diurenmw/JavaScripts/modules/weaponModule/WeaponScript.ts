import { GameEventBus } from "../../common/eventBus/EventBus";
import { AttributeModuleS } from "../AttributeModule/AttributeModuleS";
import { WeaponBase } from "./WeaponBase";
import { WeaponModuleS } from "./WeaponModuleS";

@Component
export default class WeaponScript extends Script {

    private equipeWeapon: WeaponBase;

    /** 仅在游戏时间对非模板实例调用一次 */
    protected onStart() {
        if(SystemUtil.isClient()) return;
        GameEventBus.on("AttributeModule_refeshAttr", this.refeshWeaponAttr.bind(this));
    }
    /**装备武器
     * @param uuid 武器uuid
     */
    async equepWeapon(uuid: string): Promise<boolean> {
        let weapon = ModuleService.getModule(WeaponModuleS).equepWeapon((this.gameObject as Character).player, uuid);
        if (weapon) {
            this.unEquipWeapon();
            await weapon.equip();
            this.equipeWeapon = weapon;
            ModuleService.getModule(AttributeModuleS).refeshAttr((this.gameObject as Character).player);
            return true;
        }
        return false;
    }

    /**刷新装备的武器属性 */
    private refeshWeaponAttr(player: Player) {
        if(player.userId != (this.gameObject as Character).player.userId) return;
        if (this.equipeWeapon) {
            this.equipeWeapon.refesh();
        }
    }


    /**卸下武器
     * @param uuid 武器uuid
     */
    unEquipWeapon() {
        if (this.equipeWeapon) {
            this.equipeWeapon.unEquip();
            this.equipeWeapon = null;
            ModuleService.getModule(WeaponModuleS).unEquipWeapon((this.gameObject as Character).player);
        }
    }

    /**获取当前装备武器
     * @returns
    */
    getEquipWeapon(): WeaponBase {
        return this.equipeWeapon;
    }

    /**添加一把新武器
     * @param wid 武器id
     */
    addWeapon(wid: number) {
        return ModuleService.getModule(WeaponModuleS).addWeapon((this.gameObject as Character).player, wid);
    }

    /**获取所有武器 */
    getAllWeapon() {
        return ModuleService.getModule(WeaponModuleS).getAllWeapon((this.gameObject as Character).player);
    }

    /**删除一把武器
     * @param uuid 武器uuid
     */
    removeWeapon(uuid: string) {
        return ModuleService.getModule(WeaponModuleS).removeWeapon((this.gameObject as Character).player, uuid);
    }
}