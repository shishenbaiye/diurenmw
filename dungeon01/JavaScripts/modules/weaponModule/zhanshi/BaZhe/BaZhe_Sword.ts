import { GameConfig } from "../../../../configs/GameConfig";
import { MPlugin } from "../../../../framework/DI/MContainer";
import { EPlayerAttributeSetType } from "../../../AttributeModule/PlayerAttributeSetType";
import { WeaponBase } from "../../WeaponBase";
import { registerWeapon } from "../../WeaponManager";

@MPlugin()
@registerWeapon(1066)
export class BaZhe_Sword extends WeaponBase {
    wid: number = 1066;
    refesh(): void {
        // 刷新属性攻击力增加量
        this.unExcuteEffet1();
        this.excuteEffet1();
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
    effect1Desc: string = "增加当前最大生命值百分之8的物理攻击"
    private addAtk: number = 0;
    excuteEffet1(): void {
        let maxHp = this.ownerAttribute.getAttr(EPlayerAttributeSetType.maxHp).getCurrent();
        this.addAtk = maxHp * 0.08;
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.atk).add(this.addAtk);
    }
    unExcuteEffet1(): void {
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.atk).sub(this.addAtk);
    }
    useEffet2: boolean = true;
    effect2Desc: string = "技能伤害增加5%"
    excuteEffet2(): void {
        this.ownerAttribute.addSkillDamage(0.05);
    }
    unExcuteEffet2(): void {
        this.ownerAttribute.reduceSkillDamage(0.05);
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