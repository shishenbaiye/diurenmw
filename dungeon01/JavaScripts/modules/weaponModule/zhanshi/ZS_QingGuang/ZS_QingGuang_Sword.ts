import { GameConfig } from "../../../../configs/GameConfig";
import { MPlugin } from "../../../../framework/DI/MContainer";
import { EPlayerAttributeSetType } from "../../../AttributeModule/PlayerAttributeSetType";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { WeaponBase } from "../../WeaponBase";
import { registerWeapon } from "../../WeaponManager";
import { GA_Trigger_Weapon_QingGuang_Str } from "./GA_Trigger_Weapon_QingGuang_Str";

@MPlugin()
@registerWeapon(1057)
export class ZS_QingGuang_Sword extends WeaponBase{
    wid: number = 1057;
    refesh(): void {
       
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
    effect1Desc: string = "攻击时有3%概率增加自身30点力量智力，效果持续30秒"
    excuteEffet1(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if(asc){
            asc.giveAbility(GA_Trigger_Weapon_QingGuang_Str)
        }
    }
    unExcuteEffet1(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if(asc){
            asc.removeAbility(GA_Trigger_Weapon_QingGuang_Str)
        }
    }
    useEffet2: boolean = true;
    effect2Desc: string = "攻击速度5%"
    excuteEffet2(): void {
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.atkSpeed).add(0.05);
    }
    unExcuteEffet2(): void {
        this.ownerAttribute.getAttr(EPlayerAttributeSetType.atkSpeed).sub(0.05);
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