import { MSingletonPlugin } from "../../framework/DI/MContainer";
import { MFramework } from "../../framework/MFramework";
import { MObject } from "../../framework/Object/MObject";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { MonsterAttributeSet } from "./MonsterAttributeSet";
import { NpcBase } from "./NpcBase";
import NpcScript from "./NpcScript";




@MSingletonPlugin()
export class RobotManager extends MObject {

    static _playerManager: RobotManager;
    static get instance(): RobotManager {
        if (!this._playerManager) {
            this._playerManager = MFramework.createObject(RobotManager);
        }
        return this._playerManager;
    }

    playerMap: Map<Character, NpcBase> = new Map<Character, NpcBase>();


    /**
     * 获取机器人
     * @returns 
     */
    public async getRobot(char?: Character): Promise<Character> {
        if (char && this.playerMap.has(char)) {
            return char;
        }
        if (!char) {
            char = await GameObject.asyncSpawn(`Character`) as Character;
        }
        await char.asyncReady();
        this.initRobot(char);
        return char;
    }

    /**
     * 初始化机器人
     * @param char 
     */
    private initRobot(char: Character): void {
        //base
        if (!this.playerMap.has(char)) {
            this.playerMap.set(char, MFramework.createObject(NpcBase));
        }
        //添加能力系统
        let abs = char.getComponent(AbilitySystemComponent);
        if (!abs) {
            abs = char.addComponent(AbilitySystemComponent);
        }
        //添加对应属性
        if (!abs.attributeSet) {
            abs.addAttributeSet(MonsterAttributeSet);
        }
        //同步脚本
        let npcInfo = char.getComponent(NpcScript);
        if (!npcInfo) {
            npcInfo = char.addComponent(NpcScript);
            npcInfo.addBase(this.playerMap.get(char));
        }
    }

}