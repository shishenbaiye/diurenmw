import { GameConfig } from "../../../../configs/GameConfig";
import { MPlugin } from "../../../../framework/DI/MContainer";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { WeaponBase } from "../../WeaponBase";
import { registerWeapon } from "../../WeaponManager";
import { GA_Trigger_Weapon_ZiWuQiXing_AddAtk } from "./GA_Trigger_Weapon_ZiWuQiXing_AddAtk";
import { GA_Trigger_Weapon_ZiWuQiXing_DefDown } from "./GA_Trigger_Weapon_ZiWuQiXing_DefDown";

@MPlugin()
@registerWeapon(1067)
export class ZiWuQiXing_Sword extends WeaponBase {
    wid: number = 1067;
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
    effect1Desc: string = "攻击时，10%使怪物进入破甲状态，防御力下降25%，持续20秒"
    excuteEffet1(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if(asc){
            asc.giveAbility(GA_Trigger_Weapon_ZiWuQiXing_DefDown);
        }
    }
    unExcuteEffet1(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if(asc){
            asc.removeAbility(GA_Trigger_Weapon_ZiWuQiXing_DefDown);
        }
    }
    useEffet2: boolean = true;
    effect2Desc: string = "攻击时有5%概率增加30%物理攻击力，效果持续30秒"
    excuteEffet2(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if(asc){
            asc.giveAbility(GA_Trigger_Weapon_ZiWuQiXing_AddAtk);
        }
    }
    unExcuteEffet2(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if(asc){
            asc.removeAbility(GA_Trigger_Weapon_ZiWuQiXing_AddAtk);
        }
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