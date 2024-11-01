import { MPlugin } from "../../../framework/DI/MContainer";
import { EPlayerAttributeSetType } from "../../AttributeModule/PlayerAttributeSetType";
import { JewelryBase } from "../JewelryBase";
import { registerJewelry } from "../JewelryManager";

@registerJewelry(10001)
@MPlugin()
export class CaoJieZhi_Ring extends JewelryBase {
    aid: number = 10001;
    refesh(): void {
        
    }
    useEffet1: boolean = true;
    effect1Desc: string = "力量增加2"
    excuteEffet1(): void {
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.str).add(2);
    }
    unExcuteEffet1(): void {
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.str).sub(2);
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