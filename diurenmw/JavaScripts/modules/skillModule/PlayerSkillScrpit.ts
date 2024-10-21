import { Constructor } from "../../framework/DI/MContainer";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { GameAbility } from "../gasModule/gameAbilitys/GA/GameAbility";
import { SkillManager } from "./SkillManager";
import { SkillModuleS } from "./SkillModuleS";

@Component
export default class PlayerSkillScrpit extends Script {

    normalAttack: number[] = []
    skill1: number = null
    skill2: number = null
    skill3: number = null
    skill4: number = null
    ownerAsc: AbilitySystemComponent;
    setSkill(skillId: number, index: number) {
        switch (index) {
            case 0:
                this.skill1 = skillId;
                break;
            case 1:
                this.skill2 = skillId;
                break;
            case 2:
                this.skill3 = skillId;
                break;
            case 3:
                this.skill4 = skillId;
                break;
        }
        ModuleService.getModule(SkillModuleS).setSkill((this.gameObject as Character).player, skillId, index);
    }

    setNormalAttack(skill: number[]) {
        this.normalAttack = skill;
    }

    private currentNormalAttackIndex: number = 0;
    private timeOutId: number = null;
    activeNormalAttack() {
        if (this.normalAttack.length == 0) return;
        if (this.ownerAsc.hasMatchingGameTag(["State.NormalAttack"])) return;
        let skill = SkillManager.instance.getSkillById(this.normalAttack[this.currentNormalAttackIndex]);
        if (!skill) return;
        let res = this.ownerAsc.tryActiveGameAbilityByClassOrName(skill);
        if (!res) return;
        this.currentNormalAttackIndex++;
        if (this.timeOutId) {
            clearTimeout(this.timeOutId);
            this.timeOutId = null;
        }
        if (this.currentNormalAttackIndex >= this.normalAttack.length) {
            this.currentNormalAttackIndex = 0;
        } else {
            this.timeOutId = setTimeout(() => {
                this.activeNormalAttack();
            }, 500);
        }
    }

    activeSkill(index: number): boolean {
        if(index == 0){
            let skill = SkillManager.instance.getSkillById(this.skill1);
            if (!skill) return false;
            return this.ownerAsc.tryActiveGameAbilityByClassOrName(skill);
        }
        if(index == 1){
            let skill = SkillManager.instance.getSkillById(this.skill2);
            if (!skill) return false;
            return this.ownerAsc.tryActiveGameAbilityByClassOrName(skill);
        }
        if(index == 2){
            let skill = SkillManager.instance.getSkillById(this.skill3);
            if (!skill) return false;
            return this.ownerAsc.tryActiveGameAbilityByClassOrName(skill);
        }
        if(index == 3){
            let skill = SkillManager.instance.getSkillById(this.skill4);
            if (!skill) return false;
            return this.ownerAsc.tryActiveGameAbilityByClassOrName(skill);
        }
    }

    addSkill(skillid: number) {
        ModuleService.getModule(SkillModuleS).addSkill((this.gameObject as Character).player, skillid);
    }
}