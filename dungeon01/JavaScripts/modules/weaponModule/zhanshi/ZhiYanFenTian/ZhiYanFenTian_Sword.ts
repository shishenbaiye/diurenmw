import { GameConfig } from "../../../../configs/GameConfig";
import { MPlugin } from "../../../../framework/DI/MContainer";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { WeaponBase } from "../../WeaponBase";
import { registerWeapon } from "../../WeaponManager";
import { GA_Trigger_Weapon_ZhiYanFenTian } from "./GA_Trigger_Weapon_ZhiYanFenTian";

@MPlugin()
@registerWeapon(1065)
export class ZhiYanFenTian_Sword extends WeaponBase{
    wid: number = 1065
    refesh(): void {
        
    }
    async onModelLoad(): Promise<void> {
        let weaponConfig = GameConfig.WeaponObj.getElement(this.wid);
        let model = await GameObject.asyncSpawn(weaponConfig.model);
        this.model = model as Model;
        // this.model["actor"].RootComponent.SetCollisionResponseToChannel(UE.ECollisionChannel.ECC_Pawn, UE.ECollisionResponse.ECR_Ignore);
        this.owner.character.attachToSlot(model,HumanoidSlotType.RightHand);
        this.model.setCollision(PropertyStatus.Off,true);
        model.worldTransform.scale = new Vector(1.2);
    }
    useEffet1: boolean = true;
    effect1Desc: string = "攻击时，5%概率附加1200%技能伤害"
    excuteEffet1(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if(asc){
            asc.giveAbility(GA_Trigger_Weapon_ZhiYanFenTian);
        }
    }
    unExcuteEffet1(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if(asc){
            asc.removeAbility(GA_Trigger_Weapon_ZhiYanFenTian);
        }
    }
    useEffet2: boolean = true;
    effect2Desc: string = "伤害增加5%"
    excuteEffet2(): void {
        this.ownerAttribute.addDamage(0.05);
    }
    unExcuteEffet2(): void {
        this.ownerAttribute.reduceDamage(0.05);
    }
    useEffet3: boolean =false;
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