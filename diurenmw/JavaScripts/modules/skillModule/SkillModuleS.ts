import { GameEventBus } from "../../common/eventBus/EventBus";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import WeaponScript from "../weaponModule/WeaponScript";
import PlayerSkillScrpit from "./PlayerSkillScrpit";
import { SkillManager } from "./SkillManager";
import { SkillModuleC } from "./SkillModuleC";
import { SkillModuleData } from "./SkillModuleData";

export class SkillModuleS extends ModuleS<SkillModuleC, SkillModuleData> {
    protected onAwake(): void {
        GameEventBus.on(`AttributeModule_Ready`, this.onAttributeAllReady.bind(this))
        GameEventBus.on(`WeaponModule_EquipWeapon`, this.onEquipWeapon.bind(this));
        GameEventBus.on(`WeaponModule_UnEquipWeapon`, this.onUnEquipWeapon.bind(this));
    }

    onAttributeAllReady(player: mw.Player) {
        let skillScript = player.character.addComponent(PlayerSkillScrpit);
        if (skillScript) {
            console.log(`添加技能脚本成功`);
            let asc = player.character.getComponent(AbilitySystemComponent);
            if (!asc) {
                console.error(`玩家${player.userId}asc组件没准备好，添加技能脚本失败`);
                return;
            }
            skillScript.ownerAsc = asc;
            let skillData = this.getPlayerData(player);
            console.log(`技能数据：`, skillData);
            skillData.haveSkills.forEach((skill) => {
                let res = SkillManager.instance.getSkillById(skill);
                if (res) {
                    asc.giveAbility(res);
                }
            })

            if (skillData.normalSkillList.length > 0) {
                skillScript.normalAttack = skillData.normalSkillList;
            }
            if (skillData.skill1) {
                skillScript.skill1 = skillData.skill1;
            }

            if (skillData.skill2) {
                skillScript.skill2 = skillData.skill2;
            }

            if (skillData.skill3) {
                skillScript.skill3 = skillData.skill3;
            }

            if (skillData.skill4) {
                skillScript.skill4 = skillData.skill4;
            }

        }
    }

    addSkill(player: mw.Player, skillId: number) {
        let skillData = this.getPlayerData(player);
        let res = SkillManager.instance.getSkillById(skillId);
        let have = skillData.haveSkills.indexOf(skillId);
        if (res && have == -1) {
            let asc = player.character.getComponent(AbilitySystemComponent);
            asc.giveAbility(res);
            skillData.haveSkills.push(skillId);
            skillData.save(true);
        }
    }

    setNormalSkill(player: mw.Player, skillList: number[]) {
        let skillData = this.getPlayerData(player);
        let weapon = player.character.getComponent(WeaponScript).getEquipWeapon();
        if(!weapon) return;

        skillData.normalSkillList = skillList;
        skillData.weaponNormalSkillList.set(weapon.wid,skillList);
        skillData.save(true);
    }

    setSkill(player: mw.Player, skillId: number, index: number): boolean {
        let skillData = this.getPlayerData(player);
        let res = SkillManager.instance.getSkillById(skillId);
        let weapon = player.character.getComponent(WeaponScript).getEquipWeapon();
        if (res && weapon) {
            switch (index) {
                case 0:
                    skillData.skill1 = skillId;
                    if(skillData.weaponSkillList.get(weapon.wid)){
                        skillData.weaponSkillList.get(weapon.wid)[0] = skillId;
                    }else{
                        skillData.weaponSkillList.set(weapon.wid,[skillId,null,null,null]);
                    }
                    break;
                case 1:
                    skillData.skill2 = skillId;
                    if(skillData.weaponSkillList.get(weapon.wid)){
                        skillData.weaponSkillList.get(weapon.wid)[1] = skillId;
                    }else{
                        skillData.weaponSkillList.set(weapon.wid,[null,skillId,null,null]);
                    }
                    break;
                case 2:
                    skillData.skill3 = skillId;
                    if(skillData.weaponSkillList.get(weapon.wid)){
                        skillData.weaponSkillList.get(weapon.wid)[2] = skillId;
                    }else{
                        skillData.weaponSkillList.set(weapon.wid,[null,null,skillId,null]);
                    }
                    break;
                case 3:
                    skillData.skill4 = skillId;
                    if(skillData.weaponSkillList.get(weapon.wid)){
                        skillData.weaponSkillList.get(weapon.wid)[3] = skillId;
                    }else{
                        skillData.weaponSkillList.set(weapon.wid,[null,null,null,skillId]);
                    }
                    break;
            }
            skillData.save(true);
            return true;
        }else{
            return false;
        }
    }

    onEquipWeapon(player: mw.Player, weaponId: number) {
        console.log(`装备武器`, weaponId);
        let skillData = this.getPlayerData(player);
        let weaponSkillList = skillData.weaponSkillList.get(weaponId);
        if(!weaponSkillList) weaponSkillList = [];
        let weaponNormalSkillList = skillData.weaponNormalSkillList.get(weaponId);
        if(!weaponNormalSkillList) weaponNormalSkillList = [];
        let skillScript = player.character.getComponent(PlayerSkillScrpit);
        if (skillScript) {
            if (weaponSkillList) {
                if (weaponSkillList[0]) {
                    skillScript.setSkill(weaponSkillList[0], 0);
                }

                if (weaponSkillList[1]) {
                    skillScript.setSkill(weaponSkillList[1], 1);
                }

                if (weaponSkillList[2]) {
                    skillScript.setSkill(weaponSkillList[2], 2);
                }

                if (weaponSkillList[3]) {
                    skillScript.setSkill(weaponSkillList[3], 3);
                }
            }
            if (weaponNormalSkillList) {
                skillScript.setNormalAttack(weaponNormalSkillList);
            }
        }
    }

    onUnEquipWeapon(player: mw.Player) {
        let skillScript = player.character.getComponent(PlayerSkillScrpit);
        if (skillScript) {
            skillScript.setNormalAttack([]);
            skillScript.setSkill(null, 0);
            skillScript.setSkill(null, 1);
            skillScript.setSkill(null, 2);
            skillScript.setSkill(null, 3);
        }
    }



    net_activeSkill(index: number) {
        let player = this.currentPlayer;
        let skillScript = player.character.getComponent(PlayerSkillScrpit);
        if (skillScript) {
            skillScript.activeSkill(index);
        }
    }

    net_activeNormalSkill() {
        let player = this.currentPlayer;
        let skillScript = player.character.getComponent(PlayerSkillScrpit);
        if (skillScript) {
            skillScript.activeNormalAttack();
        }
    }
}