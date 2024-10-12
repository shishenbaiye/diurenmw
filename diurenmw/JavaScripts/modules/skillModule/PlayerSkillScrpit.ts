import { Constructor } from "../../framework/DI/MContainer";
import { GameAbility } from "../gasModule/gameAbilitys/GA/GameAbility";

@Component
export default class PlayerSkillScrpit extends Script{

    skill1: Constructor<GameAbility>
    skill2: Constructor<GameAbility>
    skill3: Constructor<GameAbility>
    skill4: Constructor<GameAbility>
    
}