import { GameConfig } from "../../../../configs/GameConfig";
import { MPlugin } from "../../../../framework/DI/MContainer";
import { EPlayerAttributeSetType } from "../../../AttributeModule/PlayerAttributeSetType";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { WeaponBase } from "../../WeaponBase";
import { registerWeapon } from "../../WeaponManager";


@MPlugin()
@registerWeapon(1063)
export class KuangLong_Sword extends WeaponBase {
    wid: number = 1063

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
    effect1Desc: string = "技能伤害增加15%";
    excuteEffet1(): void {
        this.ownerAttribute.addSkillDamage(0.15);
    }
    unExcuteEffet1(): void {
        this.ownerAttribute.reduceSkillDamage(0.15);
    }
    useEffet2: boolean = true;
    effect2Desc: string = "[怒气爆发]攻击次数+2"
    excuteEffet2(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if(asc){
            asc.gameTag.addTag("Weapon.SpecialEffect.KuangLong.AddRagingFuryNum2")
        }
    }
    unExcuteEffet2(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if(asc){
            asc.gameTag.removeTag("Weapon.SpecialEffect.KuangLong.AddRagingFuryNum2")
        }
    }
    useEffet3: boolean = false;
    effect3Desc: string;
    excuteEffet3(): void {

    }
    unExcuteEffet3(): void {

    }
    useEffet4: boolean = false;
    effect4Desc: string;
    excuteEffet4(): void {

    }
    unExcuteEffet4(): void {

    }

}