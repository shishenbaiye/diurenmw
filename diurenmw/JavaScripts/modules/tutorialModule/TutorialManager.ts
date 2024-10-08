import { oTraceError } from "odin";
import { GameConfig } from "../../configs/GameConfig";
import { Constructor, Singleton } from "../../tools/Singleton";
import { ETutorialProgress, ETutorialType } from "./TutorialBase/TutorialEnum";
import { TutorialList } from "./TutorialBase/TutorialList";
import { ITutorialBase } from "./TutorialBase/TutorialObject";
import { TutorialModuleC } from "./TutorialModuleC";
import { TutorialModuleData } from "./TutorialModuleData";

export class TutorialManager extends Singleton {
    private tutorialMap: Map<number, TutorialList> = new Map<number, TutorialList>();
    private tutorialTypeMap: Map<ETutorialType, Constructor<ITutorialBase>> = new Map<ETutorialType, Constructor<ITutorialBase>>();
    /**监听新手引导流程完成 */
    public onTutorialComplete: Action1<number> = new Action1();

    /**新手引导预启动Map */
    private noviceBootPrebootMap: Map<number, () => void> = new Map();

    public init() {
        // 初始化表里新手引导的数据
        let tutorialConfig = GameConfig.TutorialList.getAllElement();
        for (let i = 0; i < tutorialConfig.length; i++) {
            let config = tutorialConfig[i];
            if (!this.tutorialMap.has(config.id)) {
                let newTutorial = new TutorialList(config.id);
                config.step.forEach((element) => {
                    // console.log("新手引导", element);
                    let type = GameConfig.TutorialType.getElement(element)?.type;
                    if (this.tutorialTypeMap.has(type)) {
                        let classType = this.tutorialTypeMap.get(type);
                        let instance = new classType();
                        let typeConfig = GameConfig.TutorialType.getElement(element);
                        instance.init(typeConfig.var1, typeConfig.var2, typeConfig.var3, typeConfig.var4, typeConfig.var5);
                        newTutorial.add(instance);
                    }
                });
                this.tutorialMap.set(config.id, newTutorial);
            }
        }
    }

    public initState() {
        let data = DataCenterC.getData(TutorialModuleData);
        if (data.newGuide) {
            data.newGuide.forEach((value) => {
                if (this.tutorialMap.has(value[0])) {
                    if (value[1] == 1) {
                        this.tutorialMap.get(value[0]).isComplete = true;
                    } else if (value[1] == 0) {
                        this.tutorialMap.get(value[0]).isComplete = false;
                    }
                }
            });
        }
    }

    public registerTutorial(type: ETutorialType, tutorial: Constructor<ITutorialBase>) {
        this.tutorialTypeMap.set(type, tutorial);
        console.warn(`注册新手引导类型${type}成功`);
    }
    /**获取是否完成某个新手引导 */
    public getTutorialIsComplete(id: number, playerid?: number): ETutorialProgress {
        let newGuide = playerid ? DataCenterS.getData(playerid, TutorialModuleData).newGuide : DataCenterC.getData(TutorialModuleData).newGuide;
        for (let i = 0; i < newGuide.length; i++) {
            const element = newGuide[i];
            if (id != element[0]) {
                continue;
            }
            return element[1];
        }
        oTraceError(`新手引导${id}不存在`);
        return ETutorialProgress.NotStart;
    }

    /**完成某个新手引导 */
    public completeTutorial(id: number) {
        if (this.tutorialMap.has(id)) {
            this.tutorialMap.get(id).isComplete = true;
            this.onTutorialComplete.call(id);
            ModuleService.getModule(TutorialModuleC).saveTutorial(id, 1);
        }
    }

    /**开始某个新手引导 */
    public startTutorial(id: number, endCallback: () => void, unCheck = true) {
        console.log("开始新手引导", id);
        if (this.tutorialMap.has(id)) {
            if (this.tutorialMap.get(id).isComplete && unCheck) {
                console.warn(`新手引导${id}已经完成`);
                return;
            }
            this.tutorialMap.get(id).start(endCallback);
        } else {
            console.warn(`新手引导${id}不存在`, this.tutorialMap);
        }
    }

    /**
     * 初始化引导预启动方法
     * @param id 引导id
     * @param callback 预启动方法
     */
    public initNoviceBootPreboot(id: number, callback: () => void) {
        this.noviceBootPrebootMap.set(id, callback);
    }
}
