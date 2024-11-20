import { MPlugin } from "../../../framework/DI/MContainer";
import { MObject } from "../../../framework/Object/MObject";
import { AbilitySystemComponent } from "../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { GA_Trigger_Monster_OnBlood } from "../robot_GA_Triigger/GA_Trigger_Monster_OnBlood";
import { GA_Trigger_Monster_OnDefDown } from "../robot_GA_Triigger/GA_Trigger_Monster_OnDefDown";
import { GA_Trigger_Monster_OnHurt } from "../robot_GA_Triigger/GA_Trigger_Monster_OnHurt";
import { GA_Trigger_Monster_OnHurtAnim } from "../robot_GA_Triigger/GA_Trigger_Monster_OnHurtAnim";
import { RobotData } from "./RobotData";
import RobotScript from "./RobotScript";
@MPlugin()
export abstract class RobotObject extends MObject {

    /** 数据 */
    public data: RobotData;
    /** 脚本 */
    public info: RobotScript;
    /** 能力系统 */
    public abs: AbilitySystemComponent;
    /** 归属对象 */
    public owner: Character;

    /** 初始化 */
    public isInit: boolean = false;

    public init(data: RobotData, abs: AbilitySystemComponent, info: RobotScript, owner: Character): void {
        this.isInit = true;
        this.owner = owner;
        this.info = info;
        this.data = data;
        this.abs = abs
    }

    public init_GA_Trigger(): void {
        if (SystemUtil.isClient()) return;
        // 添加初始技能
        this.abs.giveAbility(GA_Trigger_Monster_OnHurt);
        this.abs.giveAbility(GA_Trigger_Monster_OnHurtAnim);
        this.abs.giveAbility(GA_Trigger_Monster_OnBlood);
        this.abs.giveAbility(GA_Trigger_Monster_OnDefDown);
    }

}