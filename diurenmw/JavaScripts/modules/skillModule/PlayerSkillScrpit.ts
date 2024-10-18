import { Constructor } from "../../framework/DI/MContainer";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { GameAbility } from "../gasModule/gameAbilitys/GA/GameAbility";

@Component
export default class PlayerSkillScrpit extends Script{

    normalAttack: string[] = []
    skill1: string = ""
    skill2: string = ""
    skill3: string = ""
    skill4: string = ""
    ownerAsc: AbilitySystemComponent;
    setSkill(skill: string, index: number){
        switch(index){
            case 0:
                this.skill1 = skill;
                break;
            case 1:
                this.skill2 = skill;
                break;
            case 2:
                this.skill3 = skill;
                break;
            case 3:
                this.skill4 = skill;
                break;
        }
    }

    setNormalAttack(skill: string[]){
        this.normalAttack = skill;
    }

    activeNormalAttack(){
        
    }

    activeSkill(index: number){
        switch(index){
            case 0:
                this.ownerAsc.tryActiveGameAbilityByTag(this.skill1);
                break;
            case 1:
                this.ownerAsc.tryActiveGameAbilityByTag(this.skill2);
                break;
            case 2:
                this.ownerAsc.tryActiveGameAbilityByTag(this.skill3);
                break;
            case 3:
                this.ownerAsc.tryActiveGameAbilityByTag(this.skill4);
                break;
        }
    }
}