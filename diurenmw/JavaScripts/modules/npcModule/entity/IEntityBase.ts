import { IAIFight } from "../behavior/IAIFight";

export interface IEntityBase {

    self(): Character;

    target(): Character;


    fightBase: IAIFight;

}