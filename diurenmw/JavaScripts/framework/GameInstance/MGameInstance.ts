import { MActor } from "../Actor/MActor";
import { MObject } from "../Object/MObject";

export abstract class MGameInstance extends MActor{
    abstract onServerStart():void;

    abstract onClientStart():void;
}