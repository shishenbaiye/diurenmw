import { MPlugin } from "../../../framework/DI/MContainer";
import { EPlayerAttributeSetType } from "../../AttributeModule/PlayerAttributeSetType";
import { ArmorBase } from "../ArmorBase";
import { registerArmor } from "../ArmorManager";

@registerArmor(20001)
@MPlugin()
export class Normal_Mail_BodyArmor extends ArmorBase{
    aid: number = 20001;
    refesh(): void {
        
    }
    useEffet1: boolean = true;
    effect1Desc: string = "生命值增加58"
    excuteEffet1(): void {
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.maxHp).add(58);
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.hp).add(58);
    }
    unExcuteEffet1(): void {
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.maxHp).sub(58);
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.hp).sub(58);
    }
    useEffet2: boolean = false;
    effect2Desc: string;
    excuteEffet2(): void {
        // throw new Error("Method not implemented.");
    }
    unExcuteEffet2(): void {
        // throw new Error("Method not implemented.");
    }
    useEffet3: boolean =false;
    effect3Desc: string;
    excuteEffet3(): void {
        // throw new Error("Method not implemented.");
    }
    unExcuteEffet3(): void {
        // throw new Error("Method not implemented.");
    }
    useEffet4: boolean = false;
    effect4Desc: string;
    excuteEffet4(): void {
        // throw new Error("Method not implemented.");
    }
    unExcuteEffet4(): void {
        // throw new Error("Method not implemented.");
    }
    
}