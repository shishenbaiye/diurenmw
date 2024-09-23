import { GameConfig } from "../../../configs/GameConfig";
import { WeaponBase } from "../WeaponBase";
import { registerWeapon } from "../WeaponManager";
import { MPlugin } from "../../../framework/DI/MContainer";

@MPlugin()
@registerWeapon(1002)
export class WarriorSuperWeapon extends WeaponBase {
    wid: number = 1002;
    wtid: number = 1;

    init(){
        super.init();
        this.effect1Desc = GameConfig.WeaponObj.getElement(this.wid).effect1;
        this.effect2Desc = GameConfig.WeaponObj.getElement(this.wid).effect2;
        this.effect3Desc = GameConfig.WeaponObj.getElement(this.wid).effect3;
        this.effect4Desc = GameConfig.WeaponObj.getElement(this.wid).effect4;
    }


    useEffet1: boolean = true;
    effect1Desc: string = "";
    excuteEffet1(): void {
        
    }
    unExcuteEffet1(): void {
        
    }


    useEffet2: boolean = true;
    effect2Desc: string = "";
    excuteEffet2(): void {
       
    }
    unExcuteEffet2(): void {
        
    }


    useEffet3: boolean = true;
    effect3Desc: string = "";
    excuteEffet3(): void {
       
    }
    unExcuteEffet3(): void {
        
    }
    useEffet4: boolean = true;
    effect4Desc: string = "";
    excuteEffet4(): void {
        
    }
    unExcuteEffet4(): void {
        
    }
}