import { MSingletonPlugin } from "../../framework/DI/MContainer";
import { MFramework } from "../../framework/MFramework";
import { MObject } from "../../framework/Object/MObject";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { GA_Trigger_Monster_OnHurt } from "./GA_Trigger_Monster_OnHurt";
import { GA_Trigger_Monster_OnHurtAnim } from "./GA_Trigger_Monster_OnHurtAnim";
import { MonsterAttributeSet } from "./MonsterAttributeSet";
import { NpcBase } from "./NpcBase";
import { NpcData } from "./NpcData";
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
            //刷新数据
            // this.playerMap.get(char).refreshData();
            return char;
        }
        if (!char) {
            char = await GameObject.asyncSpawn(`Character`) as Character;
        }
        await char.asyncReady();
        this.initRobot(char);
        //刷新数据
        // this.playerMap.get(char).refreshData();
        return char;
    }

    /**
     * 初始化机器人
     * @param char 
     */
    private initRobot(char: Character): void {
        //base
        if (!this.playerMap.has(char)) {
            let base = MFramework.createObject(NpcBase) as NpcBase;
            base.initData(new NpcData());
            this.playerMap.set(char, base);
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
        // 添加初始技能
        abs.giveAbility(GA_Trigger_Monster_OnHurt);
        abs.giveAbility(GA_Trigger_Monster_OnHurtAnim);
        //同步脚本
        let npcInfo = char.getComponent(NpcScript);
        if (!npcInfo) {
            npcInfo = char.addComponent(NpcScript);
            npcInfo.addBase(this.playerMap.get(char));
        }
    }

}