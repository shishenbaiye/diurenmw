import { GameConfig } from "../../../configs/GameConfig";
import { MPlugin } from "../../../framework/DI/MContainer";
import { WeaponBase } from "../WeaponBase";

@MPlugin()
export class Normal_Weapon extends WeaponBase{
    wid: number;
    refesh(): void {
        // throw new Error("Method not implemented.");
    }
    async onModelLoad(): Promise<void> {
        let weaponConfig = GameConfig.WeaponObj.getElement(this.wid);
        let model = await GameObject.asyncSpawn(weaponConfig.model);
        this.model = model as Model;
        this.owner.character.attachToSlot(model, HumanoidSlotType.RightHand);
        this.model.setCollision(PropertyStatus.Off, true);
        model.worldTransform.scale = new Vector(1.2);
    }
    useEffet1: boolean = false
    effect1Desc: string;
    excuteEffet1(): void {
        // throw new Error("Method not implemented.");
    }
    unExcuteEffet1(): void {
        // throw new Error("Method not implemented.");
    }
    useEffet2: boolean = false
    effect2Desc: string;
    excuteEffet2(): void {
        // throw new Error("Method not implemented.");
    }
    unExcuteEffet2(): void {
        // throw new Error("Method not implemented.");
    }
    useEffet3: boolean = false
    effect3Desc: string;
    excuteEffet3(): void {
        // throw new Error("Method not implemented.");
    }
    unExcuteEffet3(): void {
        // throw new Error("Method not implemented.");
    }
    useEffet4: boolean = false
    effect4Desc: string;
    excuteEffet4(): void {
        // throw new Error("Method not implemented.");
    }
    unExcuteEffet4(): void {
        // throw new Error("Method not implemented.");
    }
    
}