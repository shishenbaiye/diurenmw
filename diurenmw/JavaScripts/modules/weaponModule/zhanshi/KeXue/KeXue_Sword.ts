import { GameConfig } from "../../../../configs/GameConfig";
import { MPlugin } from "../../../../framework/DI/MContainer";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { WeaponBase } from "../../WeaponBase";
import { registerWeapon } from "../../WeaponManager";
import { GA_Trigger_Weapon_KeXue_Blood } from "./GA_Trigger_Weapon_KeXue_Blood";

@MPlugin()
@registerWeapon(1069)
export class KeXue_Sword extends WeaponBase{
    wid: number = 1069
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
    effect1Desc: string = "攻击时，有10%的概率进入出血状态"
    excuteEffet1(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if(asc){
            asc.giveAbility(GA_Trigger_Weapon_KeXue_Blood);
        }
    }
    unExcuteEffet1(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if(asc){
            asc.removeAbility(GA_Trigger_Weapon_KeXue_Blood);
        }
    }
    useEffet2: boolean = false;
    effect2Desc: string = "出血伤害增加50%"
    excuteEffet2(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if(asc){
            asc.gameTag.addTag("Weapon.SpecialEffect.KeXue.AddBloodDamage50")
        }
    }
    unExcuteEffet2(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if(asc){
            asc.gameTag.removeTag("Weapon.SpecialEffect.KeXue.AddBloodDamage50")
        }
    }
    useEffet3: boolean;
    effect3Desc: string;
    excuteEffet3(): void {
        throw new Error("Method not implemented.");
    }
    unExcuteEffet3(): void {
        throw new Error("Method not implemented.");
    }
    useEffet4: boolean;
    effect4Desc: string;
    excuteEffet4(): void {
        throw new Error("Method not implemented.");
    }
    unExcuteEffet4(): void {
        throw new Error("Method not implemented.");
    }
    
}