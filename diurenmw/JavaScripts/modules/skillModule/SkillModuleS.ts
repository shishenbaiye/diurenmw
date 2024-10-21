import { GameEventBus } from "../../common/eventBus/EventBus";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import PlayerSkillScrpit from "./PlayerSkillScrpit";
import { SkillManager } from "./SkillManager";
import { SkillModuleC } from "./SkillModuleC";
import { SkillModuleData } from "./SkillModuleData";

export class SkillModuleS extends ModuleS<SkillModuleC, SkillModuleData> {
    protected onAwake(): void {
        GameEventBus.on(`AttributeModule_Ready`, this.onAttributeAllReady.bind(this))
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
            console.log(`开始设置技能1：${skillData.skill1}`);
            if (skillData.skill1) {
                console.log(`设置技能1：${skillData.skill1}`);
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
        if (res) {
            let asc = player.character.getComponent(AbilitySystemComponent);
            asc.giveAbility(res);
            skillData.haveSkills.push(skillId);
            skillData.save(true);
        }
    }

    setNormalSkill(player: mw.Player, skillList: number[]) {
        let skillData = this.getPlayerData(player);
        skillData.normalSkillList = skillList;
        let skillScript = player.character.getComponent(PlayerSkillScrpit);
        if (skillScript) {
            skillScript.setNormalAttack(skillList);
        }
    }

    setSkill(player: mw.Player, skillId: number, index: number) {
        let skillData = this.getPlayerData(player);
        let res = SkillManager.instance.getSkillById(skillId);
        if (res) {
            switch (index) {
                case 0:
                    skillData.skill1 = skillId;
                    break;
                case 1:
                    skillData.skill2 = skillId;
                    break;
                case 2:
                    skillData.skill3 = skillId;
                    break;
                case 3:
                    skillData.skill4 = skillId;
                    break;
            }
            skillData.save(true);
        }
    }



    net_activeSkill(index: number) {
        let player = this.currentPlayer;
        let skillScript = player.character.getComponent(PlayerSkillScrpit);
        if (skillScript) {
            skillScript.activeSkill(index);
        }
    }
}