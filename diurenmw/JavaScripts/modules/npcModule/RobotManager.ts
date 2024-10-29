import { Singleton } from "../../tools/Singleton";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { MonsterAttributeSet } from "./MonsterAttributeSet";

export class RobotManager extends Singleton {

    private _robotPool: Character[] = [];

    /**
     * 获取机器人
     * @returns 
     */
    public async getRobot(): Promise<Character> {
        let char: Character;
        if (this._robotPool.length < 0) {
            char = await GameObject.asyncSpawn(`Character`) as Character;
        } else {
            char = this._robotPool.pop();
        }
        await char.asyncReady();
        this.initRobot(char);
        return char;
    }

    /**
     * 归还机器人
     * @param char 
     */
    public returnRobt(char: Character): void {
        if (!this._robotPool) this._robotPool = [];
        this._robotPool.push(char);
    }

    /**
     * 初始化机器人
     * @param char 
     */
    private initRobot(char: Character): void {
        let system = char.getComponent(AbilitySystemComponent);
        //添加能力系统
        if (!system) {
            system = char.addComponent(AbilitySystemComponent);
        }
        //添加对应属性
        if (!system.attributeSet) {
            system.addAttributeSet(MonsterAttributeSet);
        }
    }

}