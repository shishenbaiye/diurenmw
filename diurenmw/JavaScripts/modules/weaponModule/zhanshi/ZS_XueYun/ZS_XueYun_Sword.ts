import { GameConfig } from "../../../../configs/GameConfig";
import { MPlugin } from "../../../../framework/DI/MContainer";
import { EPlayerAttributeSetType } from "../../../AttributeModule/PlayerAttributeSetType";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { WeaponBase } from "../../WeaponBase";
import { registerWeapon } from "../../WeaponManager";

@MPlugin()
@registerWeapon(1047)
export class ZS_XueYun_Sword extends WeaponBase{
    wid: number = 1047;
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
    effect1Desc: string = "HP上限增加120"
    excuteEffet1(): void {
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.maxHp).add(120);
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.hp).add(120);
    }
    unExcuteEffet1(): void {
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.hp).sub(120);
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.maxHp).sub(120);
    }
    useEffet2: boolean = true;
    effect2Desc: string = "剑气伤害增加10%"
    excuteEffet2(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if(asc){
            asc.gameTag.addTag("Weapon.SpecialEffect.AddSwordWaveDamage10")
        }
    }
    unExcuteEffet2(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if(asc){
            asc.gameTag.removeTag("Weapon.SpecialEffect.AddSwordWaveDamage10");
        }
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