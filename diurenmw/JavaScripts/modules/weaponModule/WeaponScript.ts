import { WeaponBase } from "./WeaponBase";

@Component
export default class WeaponScript extends Script {
    
    private equipeWeapon: WeaponBase;

    /** 仅在游戏时间对非模板实例调用一次 */
    protected onStart() { 
        
    }
    
    setWeapon(weapon: WeaponBase) {
        this.equipeWeapon = weapon;
    }
    
    getWeapon(): WeaponBase {
        return this.equipeWeapon;
    }

    removeWeapon() {
        this.equipeWeapon = null;
    }
}