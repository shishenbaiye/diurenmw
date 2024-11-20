import { MSingletonPlugin } from "../../framework/DI/MContainer";
import { MFramework } from "../../framework/MFramework";
import { MObject } from "../../framework/Object/MObject";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { MonsterAttributeSet } from "./base/MonsterAttributeSet";
import { RobotData } from "./base/RobotData";
import { RobotObject } from "./base/RobotObject";
import RobotScript from "./base/RobotScript";

@MSingletonPlugin()
export default class RobotManager extends MObject {

    public static _playerManager: RobotManager;
    public static get instance(): RobotManager {
        if (!this._playerManager) {
            this._playerManager = MFramework.createObject(RobotManager);
        }
        return this._playerManager;
    }

    /** 机器人对象池 */
    public robotPool: Map<Character, RobotObject> = new Map<Character, RobotObject>();

    /** 获取机器人 */
    public async getRobot(char?: Character): Promise<RobotObject> {
        if (!char) {
            char = await GameObjPool.asyncSpawn(`Character`) as Character;
            await char.asyncReady();
        }
        //初始化所有组件
        this.initRobot(char);
        //返回实例对象
        return this.robotPool.get(char);
    }

    /** 初始机器人 */
    private initRobot(char: Character): void {
        //实例对象
        let base = this.robotPool.get(char);
        if (!base) base = MFramework.createObject(RobotObject) as RobotObject;
        if (base.isInit) return;
        //添加能力系统
        let abs = char.getComponent(AbilitySystemComponent);
        if (!abs) abs = char.addComponent(AbilitySystemComponent);
        //添加对应属性
        let atr = char.getComponent(MonsterAttributeSet);
        if (!abs.attributeSet) atr ? abs.attributeSet = atr : abs.addAttributeSet(MonsterAttributeSet);
        //同步脚本
        let info = char.getComponent(RobotScript);
        if (!info) info = char.addComponent(RobotScript);
        //初始对象
        base.init(new RobotData(), abs, info, char);
        base.init_GA_Trigger();
        this.robotPool.set(char, base);

    }

}