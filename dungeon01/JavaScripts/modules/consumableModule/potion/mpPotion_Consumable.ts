import { GameConfig } from "../../../configs/GameConfig";
import { ConsumableBase } from "../ConsumableBase";
import { registerConsumable } from "../ConsumableManager";
import { MPlugin } from "../../../framework/DI/MContainer";
import { AbilitySystemComponent } from "../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";

@MPlugin()
@registerConsumable(10002)
export class MpPotionConsumable extends ConsumableBase {
    
    id: number = 10002;

    init() {
        super.init();
        this.effect1Desc = GameConfig.ConsumablesObj.getElement(this.id).effect1;
        this.effect2Desc = GameConfig.ConsumablesObj.getElement(this.id).effect2;
        this.effect3Desc = GameConfig.ConsumablesObj.getElement(this.id).effect3;
        this.effect4Desc = GameConfig.ConsumablesObj.getElement(this.id).effect4;
    }

    useEffet1: boolean = true;
    effect1Desc: string = "魔法值恢复10%";
    recoverMpValue = 0.1;
    excuteEffet1(): void {
        let addValue = Math.max(this.ownerAttribute.maxMp.getCurrent() * this.recoverMpValue, this.ownerAttribute.maxMp.getCurrent() - this.ownerAttribute.mp.getCurrent());
        this.ownerAttribute.mp.add(addValue);
    }
    unExcuteEffet1(): void {
    }


    useEffet2: boolean = false;
    effect2Desc: string = "";
    excuteEffet2(): void {
    }
    unExcuteEffet2(): void {
    }


    useEffet3: boolean = false;
    effect3Desc: string = "";
    excuteEffet3(): void {
    }
    unExcuteEffet3(): void {
    }


    useEffet4: boolean = false;
    effect4Desc: string = "";
    excuteEffet4(): void {
    }
    unExcuteEffet4(): void {
    }
}