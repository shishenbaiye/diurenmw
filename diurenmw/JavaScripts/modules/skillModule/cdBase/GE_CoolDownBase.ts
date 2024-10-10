import { CoolDownByGameEffect } from "../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";

export abstract class GE_CoolDownBase extends CoolDownByGameEffect{
    abstract tag: string;
    abstract time: number;
    init(): void {
        super.init();
    }
}