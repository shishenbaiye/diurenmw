import { MPlugin } from "../../../framework/DI/MContainer";
import { MObject } from "../../../framework/Object/MObject";
import { AbilitySystemComponent } from "../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { MoveController } from "../behavior.ts/MoveController";
import { GA_Trigger_Monster_OnBlood } from "../robot_GA_Triigger/GA_Trigger_Monster_OnBlood";
import { GA_Trigger_Monster_OnDefDown } from "../robot_GA_Triigger/GA_Trigger_Monster_OnDefDown";
import { GA_Trigger_Monster_OnHurt } from "../robot_GA_Triigger/GA_Trigger_Monster_OnHurt";
import { GA_Trigger_Monster_OnHurtAnim } from "../robot_GA_Triigger/GA_Trigger_Monster_OnHurtAnim";
import { GA_Trigger_Monster_OnPoison } from "../robot_GA_Triigger/GA_Trigger_Monster_OnPoison";
import { RobotData } from "./RobotData";
import RobotScript from "./RobotScript";
@MPlugin()
export abstract class RobotObject extends MObject {

    /** 数据 */
    public data: RobotData;
    /** 同步脚本 */
    public info_sync: RobotScript;
    /** 能力脚本 */
    public info_abs: AbilitySystemComponent;
    /** 控制器 */
    public controller_move: MoveController;
    /** 归属对象 */
    public owner: Character;

    /** 初始化 */
    public isInit: boolean = false;

    public init(data: RobotData, abs: AbilitySystemComponent, base: RobotScript, owner: Character): void {
        this.isInit = true;
        this.owner = owner;
        this.info_sync = base;
        this.info_abs = abs;
        this.data = data;
    }

    public init_GA_Trigger(): void {
        if (SystemUtil.isClient()) return;
        // 添加能力-状态触发
        this.info_abs.giveAbility(GA_Trigger_Monster_OnHurt);
        this.info_abs.giveAbility(GA_Trigger_Monster_OnHurtAnim);
        this.info_abs.giveAbility(GA_Trigger_Monster_OnBlood);
        this.info_abs.giveAbility(GA_Trigger_Monster_OnPoison);
        this.info_abs.giveAbility(GA_Trigger_Monster_OnDefDown);
    }

    public init_behavior(): void {
        this.controller_move = new MoveController(this.owner);
        this.controller_move.pathInit(this.data)
        this.controller_move.pathMoveStart();
    }

}