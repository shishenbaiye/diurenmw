import { GameConfig } from "../../../../configs/GameConfig";
import { MPlugin } from "../../../../framework/DI/MContainer";
import { EPlayerAttributeSetType } from "../../../AttributeModule/PlayerAttributeSetType";
import { WeaponBase } from "../../WeaponBase";
import { registerWeapon } from "../../WeaponManager";

@MPlugin()
@registerWeapon(1055)
export class ZS_LanYue_Sword extends WeaponBase{
    wid: number = 1055;
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
    useEffet1: boolean = true;
    effect1Desc: string = "伤害增加8%"
    excuteEffet1(): void {
        this.ownerAttribute.addDamage(0.08);
    }
    unExcuteEffet1(): void {
        this.ownerAttribute.reduceDamage(0.08);
    }
    useEffet2: boolean = false;
    effect2Desc: string;
    excuteEffet2(): void {
        // this.ownerAttribute.getAttr(EPlayerAttributeSetType.atkSpeed).add(0.05);
    }
    unExcuteEffet2(): void {
        // this.ownerAttribute.getAttr(EPlayerAttributeSetType.atkSpeed).sub(0.05);
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