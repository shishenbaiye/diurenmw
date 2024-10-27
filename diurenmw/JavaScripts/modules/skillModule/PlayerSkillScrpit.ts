import { GameConfig } from "../../configs/GameConfig";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { HudModuleC } from "../hudModule/HudModuleC";
import { HudModuleS } from "../hudModule/HudModuleS";
import { SkillManager } from "./SkillManager";
import { SkillModuleS } from "./SkillModuleS";

@Component
export default class PlayerSkillScrpit extends Script {
    @Property({displayName: "普通攻击",replicated:true,onChanged:"onSetNormalAttack"})
    normalAttack: number[] = []

    @Property({displayName: "技能1",replicated:true,onChanged:"onSetSkill1"})
    skill1: number = null
    @Property({displayName: "技能2",replicated:true,onChanged:"onSetSkill2"})
    skill2: number = null
    @Property({displayName: "技能3",replicated:true,onChanged:"onSetSkill3"})
    skill3: number = null
    @Property({displayName: "技能4",replicated:true,onChanged:"onSetSkill4"})
    skill4: number = null



    ownerAsc: AbilitySystemComponent;
    setSkill(skillId: number, index: number) {
        let res = ModuleService.getModule(SkillModuleS).setSkill((this.gameObject as Character).player, skillId, index);
        if(res){
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
        }    
    }

    setNormalAttack(skill: number[]) {
        this.normalAttack = skill;
        ModuleService.getModule(SkillModuleS).setNormalSkill((this.gameObject as Character).player, skill);
    }

    removeCurrentSkill(){
        this.normalAttack = [];
        this.skill1 = -1;
        this.skill2 = -1;
        this.skill3 = -1;
        this.skill4 = -1;
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
            let res = this.ownerAsc.tryActiveGameAbilityByClassOrName(skill);
            if(res){
                let cd = GameConfig.SkillObj.getElement(this.skill1).cd;
                ModuleService.getModule(HudModuleS).setSkillCD(this.gameObject as Character,cd,0);
                return true;
            }
        }
        if(index == 1){
            let skill = SkillManager.instance.getSkillById(this.skill2);
            if (!skill) return false;
            let res = this.ownerAsc.tryActiveGameAbilityByClassOrName(skill);
            if(res){
                let cd = GameConfig.SkillObj.getElement(this.skill2).cd;
                ModuleService.getModule(HudModuleS).setSkillCD(this.gameObject as Character,cd,1);
                return true;
            }
        }
        if(index == 2){
            let skill = SkillManager.instance.getSkillById(this.skill3);
            if (!skill) return false;
            let res = this.ownerAsc.tryActiveGameAbilityByClassOrName(skill);
            if(res){
                let cd = GameConfig.SkillObj.getElement(this.skill3).cd;
                ModuleService.getModule(HudModuleS).setSkillCD(this.gameObject as Character,cd,2);
                return true;
            }
        }
        if(index == 3){
            let skill = SkillManager.instance.getSkillById(this.skill4);
            if (!skill) return false;
            let res = this.ownerAsc.tryActiveGameAbilityByClassOrName(skill);
            if(res){
                let cd = GameConfig.SkillObj.getElement(this.skill4).cd;
                ModuleService.getModule(HudModuleS).setSkillCD(this.gameObject as Character,cd,3);
                return true;
            }
        }
    }

    addSkill(skillid: number) {
        ModuleService.getModule(SkillModuleS).addSkill((this.gameObject as Character).player, skillid);
    }

    onSetNormalAttack(){
        if(this.gameObject.gameObjectId != Player.localPlayer.character.gameObjectId) return;
        ModuleService.getModule(HudModuleC).setNormalSkill(this.normalAttack);
    }

    onSetSkill1(){
        if(this.gameObject.gameObjectId != Player.localPlayer.character.gameObjectId) return;
        ModuleService.getModule(HudModuleC).setSkill(this.skill1,0);
    }

    onSetSkill2(){
        if(this.gameObject.gameObjectId != Player.localPlayer.character.gameObjectId) return;
        ModuleService.getModule(HudModuleC).setSkill(this.skill2,1);
    }

    onSetSkill3(){
        if(this.gameObject.gameObjectId != Player.localPlayer.character.gameObjectId) return;
        ModuleService.getModule(HudModuleC).setSkill(this.skill3,2);
    }

    onSetSkill4(){
        if(this.gameObject.gameObjectId != Player.localPlayer.character.gameObjectId) return;
        ModuleService.getModule(HudModuleC).setSkill(this.skill4,3);
    }
}