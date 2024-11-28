import { GameConfig } from "../../../configs/GameConfig";
import { MaterialBase } from "../MaterialBase";
import { registerMaterial } from "../MaterialManager";
import { MPlugin } from "../../../framework/DI/MContainer";

@MPlugin()
@registerMaterial(10001)
export class diamondMaterial extends MaterialBase {
    
    id: number = 10001;

    init() {
        super.init();
        this.effect1Desc = GameConfig.MaterialsObj.getElement(this.id).effect1;
        this.effect2Desc = GameConfig.MaterialsObj.getElement(this.id).effect2;
        this.effect3Desc = GameConfig.MaterialsObj.getElement(this.id).effect3;
        this.effect4Desc = GameConfig.MaterialsObj.getElement(this.id).effect4;
    }

    useEffet1: boolean = true;
    effect1Desc: string = "珍贵的物品，商品出售能获得大量金币";
    excuteEffet1(): void {
        
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