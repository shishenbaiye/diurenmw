import { MPlugin } from "../../../framework/DI/MContainer";
import { EPlayerAttributeSetType } from "../../AttributeModule/PlayerAttributeSetType";
import { ArmorBase } from "../ArmorBase";
import { registerArmor } from "../ArmorManager";

@registerArmor(40001)
@MPlugin()
export class Normal_Mail_FoorArmor extends ArmorBase{
    aid: number = 40001;
    refesh(): void {
        // throw new Error("Method not implemented.");
    }
    useEffet1: boolean = true
    effect1Desc: string = "生命值增加15"
    excuteEffet1(): void {
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.maxHp).add(15);
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.hp).add(15);
    }
    unExcuteEffet1(): void {
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.maxHp).sub(15);
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.hp).sub(15);
    }
    useEffet2: boolean;
    effect2Desc: string;
    excuteEffet2(): void {
        // throw new Error("Method not implemented.");
    }
    unExcuteEffet2(): void {
        // throw new Error("Method not implemented.");
    }
    useEffet3: boolean;
    effect3Desc: string;
    excuteEffet3(): void {
        // throw new Error("Method not implemented.");
    }
    unExcuteEffet3(): void {
        // throw new Error("Method not implemented.");
    }
    useEffet4: boolean;
    effect4Desc: string;
    excuteEffet4(): void {
        // throw new Error("Method not implemented.");
    }
    unExcuteEffet4(): void {
        // throw new Error("Method not implemented.");
    }
    
}