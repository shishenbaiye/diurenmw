import { GameConfig } from "../../configs/GameConfig";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { HudModuleC } from "../hudModule/HudModuleC";
import { HudModuleS } from "../hudModule/HudModuleS";
import { SkillManager } from "./SkillManager";
import { SkillModuleC } from "./SkillModuleC";
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
    @Property({displayName: "技能5",replicated:true,onChanged:"onSetSkill5"})
    skill5: number = null
    @Property({displayName: "技能大招",replicated:true,onChanged:"onSetSkillFinal"})
    skillFinal: number = null
    @Property({displayName: "技能后跳",replicated:true,onChanged:"onSetSkillBack"})
    skillBack: number = null




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
                case 4:
                    this.skill5 = skillId;
                    break;
            }
        }    
    }

    setNormalAttack(skill: number[]) {
        this.normalAttack = skill;
        ModuleService.getModule(SkillModuleS).setNormalSkill((this.gameObject as Character).player, skill);
    }

    setBackSkill(skill: number) {
        this.skillBack = skill;
        ModuleService.getModule(SkillModuleS).setBackSkill((this.gameObject as Character).player, skill);
    }   

    setFinalSkill(skill: number) {
        this.skillFinal = skill;
        ModuleService.getModule(SkillModuleS).setFinalSkill((this.gameObject as Character).player, skill);
    }

    removeCurrentSkill(){
        this.normalAttack = [];
        this.skill1 = -1;
        this.skill2 = -1;
        this.skill3 = -1;
        this.skill4 = -1;
        this.skill5 = -1;
        this.skillFinal = -1;
        this.skillBack = -1;
    }

    private currentNormalAttackIndex: number = 0;
    private timeOutId: number = null;
    activeNormalAttack() {
        if (this.normalAttack.length == 0) return;
        if (this.ownerAsc.hasMatchingGameTag(["State.Player.NormalAttack"])) return;
        let skill = SkillManager.instance.getSkillById(this.normalAttack[this.currentNormalAttackIndex]);
        if (!skill) return;
        let res = this.ownerAsc.tryActiveGameAbilityByClass(skill);
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
                this.currentNormalAttackIndex = 0;
            }, 3000);
        }
    }

    activeSkill(index: number): boolean {
        if(index == 0){
            let skill = SkillManager.instance.getSkillById(this.skill1);
            if (!skill) return false;
            let res = this.ownerAsc.tryActiveGameAbilityByClass(skill);
            if(res){
                let cd = res.getCD().time;
                ModuleService.getModule(HudModuleS).setSkillCD(this.gameObject as Character,cd,0);
                return true;
            }
        }
        if(index == 1){
            let skill = SkillManager.instance.getSkillById(this.skill2);
            if (!skill) return false;
            let res = this.ownerAsc.tryActiveGameAbilityByClass(skill);
            if(res){
                let cd = res.getCD().time;
                ModuleService.getModule(HudModuleS).setSkillCD(this.gameObject as Character,cd,1);
                return true;
            }
        }
        if(index == 2){
            let skill = SkillManager.instance.getSkillById(this.skill3);
            if (!skill) return false;
            let res = this.ownerAsc.tryActiveGameAbilityByClass(skill);
            if(res){
                let cd = res.getCD().time;
                ModuleService.getModule(HudModuleS).setSkillCD(this.gameObject as Character,cd,2);
                return true;
            }
        }
        if(index == 3){
            let skill = SkillManager.instance.getSkillById(this.skill4);
            if (!skill) return false;
            let res = this.ownerAsc.tryActiveGameAbilityByClass(skill);
            if(res){
                let cd = res.getCD().time;
                ModuleService.getModule(HudModuleS).setSkillCD(this.gameObject as Character,cd,3);
                return true;
            }
        }

        if(index == 4){
            let skill = SkillManager.instance.getSkillById(this.skill5);
            if (!skill) return false;
            let res = this.ownerAsc.tryActiveGameAbilityByClass(skill);
            if(res){
                let cd = res.getCD().time;
                ModuleService.getModule(HudModuleS).setSkillCD(this.gameObject as Character,cd,4);
                return true;
            }
        }

        if(index == 5){
            let skill = SkillManager.instance.getSkillById(this.skillBack);
            if (!skill) return false;
            let res = this.ownerAsc.tryActiveGameAbilityByClass(skill);
            if(res){
                let cd = res.getCD().time;
                ModuleService.getModule(HudModuleS).setSkillCD(this.gameObject as Character,cd,5);
                return true;
            }
        }

        if(index == 6){
            let skill = SkillManager.instance.getSkillById(this.skillFinal);
            if (!skill) return false;
            let res = this.ownerAsc.tryActiveGameAbilityByClass(skill);
            if(res){
                let cd = res.getCD().time;
                ModuleService.getModule(HudModuleS).setSkillCD(this.gameObject as Character,cd,6);
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

    onSetSkillBack(){
        if(this.gameObject.gameObjectId != Player.localPlayer.character.gameObjectId) return;
        ModuleService.getModule(HudModuleC).setBackSkill(this.skillBack);
    }

    onSetSkillFinal(){
        if(this.gameObject.gameObjectId != Player.localPlayer.character.gameObjectId) return;
        ModuleService.getModule(HudModuleC).setFinalSkill(this.skillFinal);
        ModuleService.getModule(SkillModuleC).setSkillFinalUI(this.skillFinal);
    }

    onSetSkill1(){
        if(this.gameObject.gameObjectId != Player.localPlayer.character.gameObjectId) return;
        ModuleService.getModule(SkillModuleC).setSkillUI(this.skill1,0);
        ModuleService.getModule(HudModuleC).setSkill(this.skill1,0);
    }

    onSetSkill2(){
        if(this.gameObject.gameObjectId != Player.localPlayer.character.gameObjectId) return;
        ModuleService.getModule(SkillModuleC).setSkillUI(this.skill2,1);
        ModuleService.getModule(HudModuleC).setSkill(this.skill2,1);
    }

    onSetSkill3(){
        if(this.gameObject.gameObjectId != Player.localPlayer.character.gameObjectId) return;
        ModuleService.getModule(SkillModuleC).setSkillUI(this.skill3,2);
        ModuleService.getModule(HudModuleC).setSkill(this.skill3,2);
    }

    onSetSkill4(){
        if(this.gameObject.gameObjectId != Player.localPlayer.character.gameObjectId) return;
        ModuleService.getModule(SkillModuleC).setSkillUI(this.skill4,3);
        ModuleService.getModule(HudModuleC).setSkill(this.skill4,3);
    }

    onSetSkill5(){
        if(this.gameObject.gameObjectId != Player.localPlayer.character.gameObjectId) return;
        ModuleService.getModule(SkillModuleC).setSkillUI(this.skill5,4);
        ModuleService.getModule(HudModuleC).setSkill(this.skill5,4);
    }
}