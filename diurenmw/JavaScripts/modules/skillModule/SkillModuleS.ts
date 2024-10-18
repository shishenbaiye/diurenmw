import { GameEventBus } from "../../common/eventBus/EventBus";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import PlayerSkillScrpit from "./PlayerSkillScrpit";
import { SkillManager } from "./SkillManager";
import { SkillModuleC } from "./SkillModuleC";
import { SkillModuleData } from "./SkillModuleData";

export class SkillModuleS extends ModuleS<SkillModuleC,SkillModuleData>{
    protected onAwake(): void {
        GameEventBus.on(`AttributeModule_Ready`, this.onAttributeAllReady.bind(this))
    }

    onAttributeAllReady(player: mw.Player) {
        let skillScript = player.character.addComponent(PlayerSkillScrpit);
        if(skillScript){
            let asc = player.character.getComponent(AbilitySystemComponent);
            if(!asc) {
                console.error(`玩家${player.userId}asc组件没准备好，添加技能脚本失败`);
                return;
            }
            skillScript.ownerAsc = asc;
            let skillData = this.getPlayerData(player);
            skillData.haveSkills.forEach((skill)=>{
                let res = SkillManager.instance.getSkillByName(skill);
                if(res){
                    asc.giveAbility(res);
                }
            })

            if(skillData.normalSkillList.length > 0){
                skillScript.normalAttack = skillData.normalSkillList;
            }

            if(skillData.skill1){
                skillScript.skill1 = skillData.skill1;
            }

            if(skillData.skill2){
                skillScript.skill2 = skillData.skill2;
            }

            if(skillData.skill3){
                skillScript.skill3 = skillData.skill3;
            }

            if(skillData.skill4){
                skillScript.skill4 = skillData.skill4;
            }

        }
    }

    addSkill(player: mw.Player, skillName: string){
        let skillData = this.getPlayerData(player);
        let res = SkillManager.instance.getSkillByName(skillName);
        if(res){
            let asc = player.character.getComponent(AbilitySystemComponent);
            asc.giveAbility(res);
            skillData.haveSkills.push(skillName);
            skillData.save(true);
        }
    }
}