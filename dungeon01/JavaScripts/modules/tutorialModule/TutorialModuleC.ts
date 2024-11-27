import { oTraceError } from "odin";
import { GameConfig } from "../../configs/GameConfig";
import { TaskGuideStep } from "../taskModule/TaskBase/TaskEnum";
import { TaskHelper } from "../taskModule/TaskHelper";
import { ETutorialProgress, ETutorialStep, EUnLockModule, GuideStep } from "./TutorialBase/TutorialEnum";
import { TutorialHelper } from "./TutorialHelper";
import { TutorialManager } from "./TutorialManager";
import { TutorialModuleData } from "./TutorialModuleData";
import { TutorialModuleS } from "./TutorialModuleS";

export class TutorialModuleC extends ModuleC<TutorialModuleS, TutorialModuleData> {

    private _oldCameraData;
    private _cameraActionStart: boolean = false;
    private _nextFunc: Function = null;


    private _touch: mw.TouchInput;

    protected onAwake(): void {
        TutorialHelper.module = this;
        this._touch = new mw.TouchInput();
    }
    protected onEnterScene(sceneType: number): void {
    }

    protected onStart(): void {
    }

    /**解锁宠物模块的界面 */
    public net_unlockModule(type: EUnLockModule): void {
        switch (type) {
            case EUnLockModule.Pet:
                break;
            case EUnLockModule.All:
                break;
        }

        // FunctionEntryHelper.unlockEntry(4001);
    }

    /**开始新手引导 */
    public net_StartTutorial(guideStep: GuideStep): void {
        let guide = (guideStep: GuideStep) => {
            switch (guideStep) {
                case GuideStep.STEP1:
                    this.guideStep1();
                    break;
                case GuideStep.STEP2:
                    this.guideStep2();
                    break;
                case GuideStep.STEP3:
                    this.startGuideStep3();
                    break;
                case GuideStep.STEP4:
                    this.startGuideStep4();
                    break;
                case GuideStep.STEP5:
                    this.startGuideStep5();
                    break;
                case GuideStep.STEP6:
                    this.completeGuide();
                    break;
                case GuideStep.Completed:
                    this.completeGuide();

                    break;
                default:
                    this.completeGuide();
                    break;
            }
        };
        //TODO loading
        // LoadingManager.getInstance().showStartLoading(() => {
        //     //判断是否创建过角色，选择过性别
        //     guide(guideStep);
        // });
    }

    public async completeStep(step: GuideStep) {
        if (step == GuideStep.STEP1) {
            let res = await this.server.net_completeStep(GuideStep.STEP2);
            if (res) {
                this.guideStep2();
            }
        }
        if (step == GuideStep.STEP2) {
            let res = await this.server.net_completeStep(GuideStep.STEP3);
            if (res) {
                this.startGuideStep3();
            }
        }
        if (step == GuideStep.STEP3) {
            let res = await this.server.net_completeStep(GuideStep.STEP4);
            if (res) {
                this.startGuideStep4();
            }
        }
        if (step == GuideStep.STEP4) {
            let res = await this.server.net_completeStep(GuideStep.STEP5);
            if (res) {
                this.startGuideStep5();
            }
        }
        if (step == GuideStep.STEP5) {
            let res = await this.server.net_completeStep(GuideStep.STEP6);
            if (res) {
                // this.startGuideStep7();
            }
        }
    }

    /**开始引导阶段1 */
    private guideStep1(): void {
    }

    /**开始引导阶段2 */
    private guideStep2(): void {
    }

    private startGuideStep3() { }
    private startGuideStep4() { }
    private startGuideStep5() { }

    public async activePetTask(): Promise<void> {
    }

    /**激活完成任务 */
    public activeCompleteTutorial(): void { }

    private completeGuide(): void {
    }

    /**激活第一个引导任务 */
    public activeFirstGuideTask(): void {
        this.activePetTask();
    }
    public async completeTutorialTask(guideTask: TaskGuideStep): Promise<void> {
    }

    public async net_checkConflateTutor() {
        let tutorialInstance = TutorialManager.getInstance();

        if (tutorialInstance.getTutorialIsComplete(ETutorialStep.PetGuide1) == ETutorialProgress.InProgress) {
            return;
        }
        if (tutorialInstance.getTutorialIsComplete(ETutorialStep.PetGuide3) == ETutorialProgress.NotStart && tutorialInstance.getTutorialIsComplete(1) == ETutorialProgress.Completed) {
            return;
        }
        if (tutorialInstance.getTutorialIsComplete(ETutorialStep.PetGuide3) == ETutorialProgress.InProgress) {
            tutorialInstance.startTutorial(ETutorialStep.PetGuide3, () => { });
            return;
        }
        if (tutorialInstance.getTutorialIsComplete(ETutorialStep.PetGuide3) == ETutorialProgress.Completed && tutorialInstance.getTutorialIsComplete(ETutorialStep.PetGuide4) == ETutorialProgress.NotStart) {
            return;
        }
        if (tutorialInstance.getTutorialIsComplete(ETutorialStep.PetGuide4) == ETutorialProgress.InProgress) {
            return;
        }
        if (tutorialInstance.getTutorialIsComplete(14) == ETutorialProgress.InProgress) {
            return;
        }
        if (tutorialInstance.getTutorialIsComplete(14) == ETutorialProgress.Completed && tutorialInstance.getTutorialIsComplete(15) == ETutorialProgress.NotStart) {
            return;
        }
        if (tutorialInstance.getTutorialIsComplete(15) == ETutorialProgress.Completed && tutorialInstance.getTutorialIsComplete(17) == ETutorialProgress.NotStart) {
            return;
        }
        if (tutorialInstance.getTutorialIsComplete(17) == ETutorialProgress.InProgress) {
            return;
        }
    }



    /******************************************************************************************************************************************* */
    net_initNewGuide() {
        TutorialManager.getInstance().init();
        TutorialManager.getInstance().initState();
    }

    saveTutorial(id: number, value: number) {
        this.server.net_saveTutorial(id, value);
        this.data.newGuide.forEach((element) => {
            if (element[0] == id) {
                element[1] = value;
            }
        });
    }

    /**第一次进入采矿引导 */
    firstMining() {
        this.server.net_firstMining();
        this.data.isFirstEnterMining = false;
    }

    /*第一次进入钓鱼引导 */
    firstFishing() {
        this.server.net_firstFishing();
        this.data.isFirstEnterFishing = false;
    }

    /**第一次进入宠物引导 */
    firstPet() {
        this.server.net_firstPet();
        this.data.isFirstEnterPet = false;
    }


}