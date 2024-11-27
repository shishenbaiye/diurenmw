import { GameConfig } from "../../../../configs/GameConfig";
import { MPlugin } from "../../../../framework/DI/MContainer";
import { EPlayerAttributeSetType } from "../../../AttributeModule/PlayerAttributeSetType";
import { WeaponBase } from "../../WeaponBase";
import { registerWeapon } from "../../WeaponManager";

@MPlugin()
@registerWeapon(1068)
export class XieLong_Sword extends WeaponBase{
    wid: number = 1068;
    refesh(): void {
        
    }
    async onModelLoad(): Promise<void> {
        let weaponConfig = GameConfig.WeaponObj.getElement(this.wid);
        let model = await GameObject.asyncSpawn(weaponConfig.model);
        this.model = model as Model;
        // this.model["actor"].RootComponent.SetCollisionResponseToChannel(UE.ECollisionChannel.ECC_Pawn, UE.ECollisionResponse.ECR_Ignore);
        this.owner.character.attachToSlot(model, HumanoidSlotType.RightHand);
        this.model.setCollision(PropertyStatus.Off, true);
        model.worldTransform.scale = new Vector(1.2);
    }
    useEffet1: boolean = true;
    effect1Desc: string = "暴击率增加30%"
    excuteEffet1(): void {
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.crit).add(0.3);
    }
    unExcuteEffet1(): void {
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.crit).sub(0.3);
    }
    useEffet2: boolean = true
    effect2Desc: string = "暴击伤害增加50%"
    excuteEffet2(): void {
        this.ownerAttribute.addCritDamage(0.5);
    }
    unExcuteEffet2(): void {
        this.ownerAttribute.reduceCritDamage(0.5);
    }
    useEffet3: boolean = false;
    effect3Desc: string;
    excuteEffet3(): void {
        throw new Error("Method not implemented.");
    }
    unExcuteEffet3(): void {
        throw new Error("Method not implemented.");
    }
    useEffet4: boolean = false;
    effect4Desc: string;
    excuteEffet4(): void {
        throw new Error("Method not implemented.");
    }
    unExcuteEffet4(): void {
        throw new Error("Method not implemented.");
    }
    
}