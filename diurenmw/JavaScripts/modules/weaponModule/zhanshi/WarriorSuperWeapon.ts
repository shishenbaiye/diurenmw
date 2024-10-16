import { GameConfig } from "../../../configs/GameConfig";
import { WeaponBase } from "../WeaponBase";
import { registerWeapon } from "../WeaponManager";
import { MPlugin } from "../../../framework/DI/MContainer";

@MPlugin()
@registerWeapon(1002)
export class WarriorSuperWeapon extends WeaponBase {
    
    wid: number = 1002;

    init() {
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

        /**刷新防御力增加量 */
        this.unExcuteEffet3();
        this.excuteEffet3();

        /**刷新血量增加量 */
        this.unExcuteEffet4();
        this.excuteEffet4();
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
    effect1Desc: string = "技能伤害增加15%";
    excuteEffet1(): void {
        this.ownerAttribute.addSkillDamage(0.15);
    }
    unExcuteEffet1(): void {
        this.ownerAttribute.reduceSkillDamage(0.15);
    }


    useEffet2: boolean = true;
    effect2Desc: string = "攻击力增加15%";
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


    useEffet3: boolean = true;
    effect3Desc: string = "防御力增加15%";
    private defAddValue: number = 0;
    excuteEffet3(): void {
        let currentDef = this.ownerAttribute.def.getCurrent();
        let addValue = Math.round(currentDef * 0.15)
        this.defAddValue = addValue;
        this.ownerAttribute.def.add(addValue);
    }
    unExcuteEffet3(): void {
        this.ownerAttribute.def.sub(this.defAddValue);
    }


    useEffet4: boolean = true;
    effect4Desc: string = "血量增加15%";
    private hpAddValue: number = 0;
    excuteEffet4(): void {
        let currentHp = this.ownerAttribute.maxHp.getCurrent();
        let addValue = Math.round(currentHp * 0.15)
        this.hpAddValue = addValue;
        this.ownerAttribute.hp.add(addValue);
        this.ownerAttribute.maxHp.add(addValue);
    }
    unExcuteEffet4(): void {
        this.ownerAttribute.hp.sub(this.hpAddValue);
        this.ownerAttribute.maxHp.sub(this.hpAddValue);
    }
}