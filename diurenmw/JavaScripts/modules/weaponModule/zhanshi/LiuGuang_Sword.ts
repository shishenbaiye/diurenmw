import { GameConfig } from "../../../configs/GameConfig";
import { MPlugin } from "../../../framework/DI/MContainer";
import { AbilitySystemComponent } from "../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { WeaponBase } from "../WeaponBase";
import { registerWeapon } from "../WeaponManager";
import { GA_Trigger_Weapon_LiuGuangSword } from "./GA_Trigger_Weapon_LiuGuangSword";

@MPlugin()
@registerWeapon(1004)
export class LiuGuang_Sword extends WeaponBase{
    wid: number = 1004;

    init(): void {
        super.init();
        this.effect1Desc = GameConfig.WeaponObj.getElement(this.wid).effect1;
        this.effect2Desc = GameConfig.WeaponObj.getElement(this.wid).effect2;
        this.effect3Desc = GameConfig.WeaponObj.getElement(this.wid).effect3;
        this.effect4Desc = GameConfig.WeaponObj.getElement(this.wid).effect4;
    }

    refesh(): void {
       /**刷新攻击力增加量 */
       this.unExcuteEffet2();
       this.excuteEffet2();
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
    effect1Desc: string = "攻击时有20%的概率召唤陨石"
    excuteEffet1(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if(asc){
            asc.giveAbility(GA_Trigger_Weapon_LiuGuangSword);
        }
    }
    unExcuteEffet1(): void {
        let asc = this.owner.character.getComponent(AbilitySystemComponent);
        if(asc){
            asc.removeAbility(GA_Trigger_Weapon_LiuGuangSword);
        }
    }
    useEffet2: boolean = true;
    effect2Desc: string = "攻击力增加10%"
    private atkAddValue: number = 0;
    excuteEffet2(): void {
        let currentAtk = this.ownerAttribute.atk.getCurrent();
        let addValue = Math.round(currentAtk * 0.15)
        this.atkAddValue = addValue;
        this.ownerAttribute.atk.add(addValue);
    }
    unExcuteEffet2(): void {
        this.ownerAttribute.atk.sub(this.atkAddValue);
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