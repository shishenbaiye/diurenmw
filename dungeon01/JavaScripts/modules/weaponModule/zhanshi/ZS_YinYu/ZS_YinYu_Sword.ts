import { GameConfig } from "../../../../configs/GameConfig";
import { MPlugin } from "../../../../framework/DI/MContainer";
import { EPlayerAttributeSetType } from "../../../AttributeModule/PlayerAttributeSetType";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { WeaponBase } from "../../WeaponBase";
import { registerWeapon } from "../../WeaponManager";
import { GA_Trigger_Weapon_YinYu_Damage } from "./GA_Trigger_Weapon_YinYu_Damage";

@MPlugin()
@registerWeapon(1050)
export class ZS_YinYu_Sword extends WeaponBase{
    wid: number = 1050;
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
    effect1Desc: string = "剑气伤害增加5%"
    excuteEffet1(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if(asc){
            asc.gameTag.addTag("Weapon.SpecialEffect.AddSwordWaveDamage5")
        }
    }
    unExcuteEffet1(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if(asc){
            asc.gameTag.removeTag("Weapon.SpecialEffect.AddSwordWaveDamage5");
        }
    }
    useEffet2: boolean = true;
    effect2Desc: string = "攻击时，有2%概率附加1000伤害"
    excuteEffet2(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if(asc){
            asc.giveAbility(GA_Trigger_Weapon_YinYu_Damage);
        }
    }
    unExcuteEffet2(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if(asc){
            asc.removeAbility(GA_Trigger_Weapon_YinYu_Damage);
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