import { Constructor } from "./framework/DI/MContainer";
import { GameInstance } from "./game/GameInstance";

// 当前场景启动的实例类
export class CurrentScence{
    static currentScenceName:string = "diurenmw";
    static currentScence:Constructor = GameInstance;
}