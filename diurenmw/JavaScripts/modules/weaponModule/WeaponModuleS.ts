import { GameEventBus } from "../../common/eventBus/EventBus";
import { ItemType } from "../bagModule/BagManagerModuleData";
import { BagManagerModuleS } from "../bagModule/BagManagerModuleS";
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
                if(data){
                    weaponScript.equepWeapon(data.uuid).then(()=>{
                        this.getClient(player).net_stopLoading();
                    })
                }
            }else{
                this.getClient(player).net_stopLoading();
            }
        } else {
            console.error(`玩家${player.userId}添加武器脚本失败`);
        }
    }

    /**增加武器
     * @param player 玩家
     * @param wid 武器id
     */
    addWeapon(player: mw.Player, wid: number): WeaponBase {
        let weapon = WeaponManager.instance.createNew(player, wid);
        let data = this.getPlayerData(player);
        data.addWeapon(weapon.getData());
        if(weapon){
            let res = ModuleService.getModule(BagManagerModuleS).addItem(player,weapon.uuid,ItemType.Weapon,weapon.wid,1);
            if(!res){
                console.error(`玩家背包${player.userId}添加武器失败`);
                return null;
            }
        }
        console.log(`玩家${player.userId}获得武器${weapon.getData().uuid}`);
        return weapon;
    }

    getAllWeapon(player: mw.Player): WeaponData[] {
        let data = this.getPlayerData(player);
        return data.haveWeaponList;
    }

    removeWeapon(player: mw.Player, uuId: string): boolean {
        let data = this.getPlayerData(player);
        let resBag = ModuleService.getModule(BagManagerModuleS).removeItem(player,uuId,ItemType.Weapon,1);
        if(!resBag){
            console.error(`玩家背包${player.userId}删除武器失败`);
            return false;
        }
        let res = data.removeWeapon(uuId);
        if(!res){
            console.error(`玩家${player.userId}删除武器失败`);
        }
    }

    equepWeapon(player: mw.Player, uuId: string): WeaponBase {
        let data = this.getPlayerData(player);
        let weaponData = data.getWeaponData(uuId);
        if (weaponData == null) {
            console.error(`玩家${player.userId}没有这个武器`);
            return null;
        }

        let weapon = WeaponManager.instance.createByData(player, weaponData);
        data.equipWeapon(uuId);
        return weapon;
    }

    unEquipWeapon(player: mw.Player) {
        let data = this.getPlayerData(player);
        data.unEquipWeapon();
    }

}