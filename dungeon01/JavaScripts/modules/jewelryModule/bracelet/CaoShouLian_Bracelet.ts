import { MPlugin } from "../../../framework/DI/MContainer";
import { JewelryBase } from "../JewelryBase";
import { registerJewelry } from "../JewelryManager";

@registerJewelry(30001)
@MPlugin()
export class CaoShouLian_Bracelet extends JewelryBase{
    jid: number = 30001
    refesh(): void {
        
    }
    useEffet1: boolean = true;
    effect1Desc: string = "移速增加5%"
    private addSpeed: number = 0;
    excuteEffet1(): void {
        this.addSpeed = this.owner.character.maxWalkSpeed * 0.5;
        this.owner.character.maxWalkSpeed += this.addSpeed;
    }
    unExcuteEffet1(): void {
        this.owner.character.maxWalkSpeed -= this.addSpeed;
    }
    useEffet2: boolean = false;
    effect2Desc: string;
    excuteEffet2(): void {
        
    }
    unExcuteEffet2(): void {
        
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