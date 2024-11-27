import { TaskGuideStep } from "../taskModule/TaskBase/TaskEnum";
import { GuideStep } from "./TutorialBase/TutorialEnum";
import { TutorialModuleC } from "./TutorialModuleC";

export class TutorialHelper {
    public static module: any;

    /**
     * 完成引导步骤
     * @param step
     */
    public static completeStep(step: GuideStep): void {
        if (SystemUtil.isClient()) {
            (this.module as TutorialModuleC).completeStep(step);
        }
    }


    /**激活第一个引导任务 */
    public static activeFirstGuideTask() {
        if (SystemUtil.isClient()) {
            (this.module as TutorialModuleC).activeFirstGuideTask();
        }
    }

    /**激活钓鱼新手引导 */
    public static activeFishGuideTask() {
        if (SystemUtil.isClient()) {
        }
    }

    /**完成指南任务 */
    public static completeTutorialTask(guide: TaskGuideStep) {
        if (SystemUtil.isClient()) {
            (this.module as TutorialModuleC).completeTutorialTask(guide);
        }
    }

}
