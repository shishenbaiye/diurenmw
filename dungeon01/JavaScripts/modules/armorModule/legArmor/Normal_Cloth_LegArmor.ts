import { MPlugin } from "../../../framework/DI/MContainer";
import { EPlayerAttributeSetType } from "../../AttributeModule/PlayerAttributeSetType";
import { ArmorBase } from "../ArmorBase";
import { registerArmor } from "../ArmorManager";

@registerArmor(30001)
@MPlugin()
export class Normal_Cloth_LegArmor extends ArmorBase{
    aid: number = 30001;
    refesh(): void {
        
    }
    useEffet1: boolean = true;
    effect1Desc: string = "生命值增加43"
    excuteEffet1(): void {
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.maxHp).add(43);
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.hp).add(43);
    }
    unExcuteEffet1(): void {
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.maxHp).sub(43);
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.hp).sub(43);
    }
    useEffet2: boolean;
    effect2Desc: string;
    excuteEffet2(): void {
        throw new Error("Method not implemented.");
    }
    unExcuteEffet2(): void {
        throw new Error("Method not implemented.");
    }
    useEffet3: boolean;
    effect3Desc: string;
    excuteEffet3(): void {
        throw new Error("Method not implemented.");
    }
    unExcuteEffet3(): void {
        throw new Error("Method not implemented.");
    }
    useEffet4: boolean;
    effect4Desc: string;
    excuteEffet4(): void {
        throw new Error("Method not implemented.");
    }
    unExcuteEffet4(): void {
        throw new Error("Method not implemented.");
    }

}