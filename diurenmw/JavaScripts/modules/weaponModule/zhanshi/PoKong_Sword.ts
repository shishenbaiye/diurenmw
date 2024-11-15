import { GameConfig } from "../../../configs/GameConfig";
import { MPlugin } from "../../../framework/DI/MContainer";
import { EPlayerAttributeSetType } from "../../AttributeModule/PlayerAttributeSetType";
import { AbilitySystemComponent } from "../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { WeaponBase } from "../WeaponBase";
import { registerWeapon } from "../WeaponManager";


@MPlugin()
@registerWeapon(1003)
export class PoKong_Sword extends WeaponBase {
    wid: number = 1003

    init() {
        super.init();
        this.effect1Desc = GameConfig.WeaponObj.getElement(this.wid).effect1;
        this.effect2Desc = GameConfig.WeaponObj.getElement(this.wid).effect2;
        this.effect3Desc = GameConfig.WeaponObj.getElement(this.wid).effect3;
        this.effect4Desc = GameConfig.WeaponObj.getElement(this.wid).effect4;
    }

    refesh(): void {
        // throw new Error("Method not implemented.");
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
    effect1Desc: string = "暴击率增加百分之10%";
    excuteEffet1(): void {
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.crit).add(0.1);
    }
    unExcuteEffet1(): void {
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.crit).sub(0.1);
    }
    useEffet2: boolean = true;
    effect2Desc: string = "暴击伤害增加20%"
    excuteEffet2(): void {
        this.ownerAttribute.addCritDamage(0.2);
    }
    unExcuteEffet2(): void {
        this.ownerAttribute.reduceCritDamage(0.2);
    }
    useEffet3: boolean = true;
    effect3Desc: string = "剑气波数量+1"
    excuteEffet3(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if (asc) {
            asc.gameTag.addTag("Weapon.SpecialEffect.SwordWave.AddOneAttack")
        }
    }
    unExcuteEffet3(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if (asc) {
            asc.gameTag.removeTag("Weapon.SpecialEffect.SwordWave.AddOneAttack")
        }
    }
    useEffet4: boolean = true;
    effect4Desc: string = "怒气爆发CD -2秒";
    excuteEffet4(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if (asc) {
            asc.gameTag.addTag("Weapon.SpecialEffect.SwordWave.SubRagingFuryCD")
        }
    }
    unExcuteEffet4(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if (asc) {
            asc.gameTag.removeTag("Weapon.SpecialEffect.SwordWave.SubRagingFuryCD")
        }
    }

}