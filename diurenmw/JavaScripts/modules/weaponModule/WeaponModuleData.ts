import { WeaponData } from "./WeaponData";

export class WeaponModuleData extends Subdata{
    @Decorator.persistence()
    equipedWeapon: string;

    @Decorator.persistence()
    haveWeaponList: Array<WeaponData>;

    protected initDefaultData(): void {
        this.equipedWeapon = null;
        this.haveWeaponList = new Array<WeaponData>();
        this.save(true);
    }

    addWeapon(weapon: WeaponData): void {
        if(!weapon) return;
        this.haveWeaponList.push(weapon);
        this.save(true);
    }

    removeWeapon(uuId: string): boolean {
        for (let i = 0; i < this.haveWeaponList.length; i++) {
            if (this.haveWeaponList[i].uuid === uuId) {
                this.haveWeaponList.splice(i, 1);
                this.save(true);
                return;
            }
        }
    }

    equipWeapon(uuId: string): void {
        this.equipedWeapon = uuId;
        this.save(true);
    }

    unEquipWeapon(): void {
        this.equipedWeapon = null;
        this.save(true);
    }

    getEquipedWeapon(): WeaponData {
        for (let i = 0; i < this.haveWeaponList.length; i++) {
            if (this.haveWeaponList[i].uuid === this.equipedWeapon) {
                return this.haveWeaponList[i];
            }
        }
        return null;
    }

    getWeaponData(uuId: string): WeaponData {
        for (let i = 0; i < this.haveWeaponList.length; i++) {
            if (this.haveWeaponList[i].uuid === uuId) {
                return this.haveWeaponList[i];
            }
        }
        return null;
    }
}