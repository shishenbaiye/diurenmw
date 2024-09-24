import { GameEventBus } from "../../common/eventBus/EventBus";
import { WeaponBase } from "./WeaponBase";
import { WeaponData } from "./WeaponData";
import { WeaponManager } from "./WeaponManager";
import { WeaponModuleC } from "./WeaponModuleC";
import { WeaponModuleData } from "./WeaponModuleData";
import WeaponScript from "./WeaponScript";

export class WeaponModuleS extends ModuleS<WeaponModuleC, WeaponModuleData> {
    protected onAwake(): void {
        GameEventBus.on(`AttributeModule_Ready`, this.onAttributeAllReady.bind(this))
    }

    onAttributeAllReady(player: mw.Player) {
        let weaponScript = player.character.addComponent(WeaponScript);
        if (weaponScript) {
            let weaponData = this.getPlayerData(player);
            // 获取玩家装备的武器
            if (weaponData.equipedWeapon) {
                let data = weaponData.getEquipedWeapon();
                let weapon = WeaponManager.instance.createByData(player, data);
                weaponScript.setWeapon(weapon);
                weapon.equip().then(()=>{
                    this.getClient(player).net_stopLoading();
                })
            }
        } else {
            console.error(`玩家${player.userId}添加武器脚本失败`);
        }
    }

    addWeapon(player: mw.Player, wid: number): WeaponBase {
        let weapon = WeaponManager.instance.createNew(player, wid);
        let data = this.getPlayerData(player);
        data.addWeapon(weapon.getData());
        console.log(`玩家${player.userId}获得武器${weapon.getData().uuid}`);
        return weapon;
    }

    removeWeapon(player: mw.Player, uuId: string): boolean {
        let data = this.getPlayerData(player);
        return data.removeWeapon(uuId);
    }

    async equepWeapon(player: mw.Player, uuId: string): Promise<boolean> {
        let data = this.getPlayerData(player);
        let weaponData = data.getWeaponData(uuId);
        if (weaponData == null) {
            console.error(`玩家${player.userId}没有这个武器`);
            return false;
        }

        let weapon = WeaponManager.instance.createByData(player, weaponData);
        let weaponScript = player.character.getComponent(WeaponScript);
        if (weaponScript) {
            if(weaponScript.getWeapon()){
                weaponScript.getWeapon().unEquip();
            }
            weaponScript.setWeapon(weapon);
            await weapon.equip();
            data.equipWeapon(uuId);
            return true;
        }
    }

}