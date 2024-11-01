import { MPlugin } from "../../../framework/DI/MContainer";
import { EPlayerAttributeSetType } from "../../AttributeModule/PlayerAttributeSetType";
import { JewelryBase } from "../JewelryBase";
import { registerJewelry } from "../JewelryManager";

@registerJewelry(20001)
@MPlugin()
export class CaoXiangQuan_Necklace extends JewelryBase {
    aid: number = 20001;
    refesh(): void {

    }
    useEffet1: boolean = true;
    effect1Desc: string = "生命值增加130"
    excuteEffet1(): void {
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.maxHp).add(130);
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.hp).add(130);
    }
    unExcuteEffet1(): void {
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.hp).sub(130);
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.maxHp).sub(130);
    }
    useEffet2: boolean = false;
    effect2Desc: string;
    excuteEffet2(): void {
        // throw new Error("Method not implemented.");
    }
    unExcuteEffet2(): void {
        // throw new Error("Method not implemented.");
    }
    useEffet3: boolean = false;
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