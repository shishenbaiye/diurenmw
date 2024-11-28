import { RobotHeadUI } from "../base_ui/RobotHeadUI";
import RobotManager from "../RobotManager";
import { RobotObject } from "./RobotObject";

@Component
export default class RobotScript extends Script {

    public robot_head_c: RobotHeadUI;
    public robot_base: RobotObject;

    protected onStart(): void {
        this.ready();
    }

    protected onDestroy(): void {
        this.robot_head_c?.destroy();
        this.robot_base = null;
    }

    private async ready(): Promise<void> {
        await this.gameObject.asyncReady();
        //客户端组件
        if (SystemUtil.isClient()) {
            if (!this.robot_head_c) this.robot_head_c = new RobotHeadUI();
            this.robot_head_c.initHead(this.gameObject as Character);
            this.robot_head_c.refreshHp();
            this.robot_head_c.refreshInfo();
        }
        //实例对象
        if (!this.robot_base) this.robot_base = await RobotManager.instance.getRobot(this.gameObject as Character);
    }

}