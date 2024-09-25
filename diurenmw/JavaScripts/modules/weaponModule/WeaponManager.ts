import { GameConfig } from "../../configs/GameConfig";
import { Constructor, MSingletonPlugin } from "../../framework/DI/MContainer";
import { MFramework } from "../../framework/MFramework";
import { MObject } from "../../framework/Object/MObject";
import { UuidCreater } from "../../tools/UuidCreater";
import { PlayerAttributeSet } from "../AttributeModule/PlayerAttributeSet";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { WeaponBase } from "./WeaponBase";
import { WeaponData } from "./WeaponData";

@MSingletonPlugin()
export class WeaponManager extends MObject {
    static _weaponManager: WeaponManager;
    static get instance(): WeaponManager {
        if (!this._weaponManager) {
            this._weaponManager = MFramework.createObject(WeaponManager);
        }
        return this._weaponManager;
    }

    weaponMap: Map<number, Constructor<WeaponBase>> = new Map<number, Constructor<WeaponBase>>();

    /**创建一件新武器 */
    createNew<T extends WeaponBase>(owner: Player, wid: number): T {
        let as = owner.character.getComponent(AbilitySystemComponent).attributeSet as PlayerAttributeSet;
        if (!as) return null;
        let weaponConfig = GameConfig.WeaponObj.getElement(wid);
        if (!weaponConfig) return null;
        if (WeaponManager.instance.weaponMap.has(wid)) {
            let weapon = MFramework.createObject(WeaponManager.instance.weaponMap.get(wid)) as T;
            weapon.wid = wid;
            weapon.owner = owner;
            weapon.ownerAttribute = as;
            weapon.uuid = UuidCreater.create();
            weapon.init();
            return weapon;
        }
        let weapon = MFramework.createObject(WeaponBase) as T;
        weapon.wid = wid;
        weapon.owner = owner;
        weapon.ownerAttribute = as;
        weapon.uuid = UuidCreater.create();
        weapon.init();
        return weapon;
    }

    /**通过UUid创建一个武器对象 */
    createByData<T extends WeaponBase>(owner: Player, data: WeaponData): T {
        let as = owner.character.getComponent(AbilitySystemComponent).attributeSet as PlayerAttributeSet;
        if (!as) return null;
        if (WeaponManager.instance.weaponMap.has(data.wid)) {
            let weapon = MFramework.createObject(WeaponManager.instance.weaponMap.get(data.wid)) as T;
            weapon.wid = data.wid;
            weapon.owner = owner;
            weapon.ownerAttribute = as;
            weapon.initByData(data);
            return weapon;
        }
        let weapon = MFramework.createObject(WeaponBase) as T;
        weapon.wid = data.wid;
        weapon.owner = owner;
        weapon.ownerAttribute = as;
        weapon.initByData(data);
        return weapon;
    }
}


export function registerWeapon(wid: number) {
    return function (target: any) {
        WeaponManager.instance.weaponMap.set(wid, target);
    }
}