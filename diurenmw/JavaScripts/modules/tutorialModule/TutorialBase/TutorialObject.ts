import { CameraTool } from "../../../camera/CameraTool";
import { Constructor } from "../../../tools/Singleton";
import { TaskHelper } from "../../taskModule/TaskHelper";
import { TutorialManager } from "../TutorialManager";
import { ETutorialType } from "./TutorialEnum";
import { TutorialList } from "./TutorialList";


export interface ITutorialBase {
    type: ETutorialType;
    init(...param: string[]): void;
    start(father: TutorialList): void;
    stop(): void;
    destroy(): void;
}

export function TutorialTypeRegister(type: ETutorialType) {
    return function (constructor: Constructor<ITutorialBase>) {
        TutorialManager.getInstance().registerTutorial(type, constructor);
    };
}

// 新手引导到达某地类型(finish,checked)
@TutorialTypeRegister(ETutorialType.Arrive)
export class TutorialArriveType implements ITutorialBase {
    private _father: TutorialList;
    private _completeid: number;
    init(...param: string[]): void {
        this._completeid = Number(param[0]);
    }
    type: ETutorialType = ETutorialType.Arrive;
    start(father: TutorialList): void {
        this._father = father;
        //TODO 区域管理
    }
    onEnterArea(_playerID: number, _triggerConfig: any) {
        if (_playerID != Player.localPlayer.playerId) return;
        let tutorialInstance = TutorialManager.getInstance();
        //TODO 引导完成判断
    }
    stop(): void {
        this.destroy();
    }
    destroy(): void {
        //TODO 区域监听退出
        this._father?.next();
    }
}

// 新手引导点击某地类型(first,checked)
@TutorialTypeRegister(ETutorialType.Click)
export class TutorialClickType implements ITutorialBase {
    private _father: TutorialList;
    private _clickType: number;
    private _uiName: string;
    private _clickName: string;
    private _handAngle: number;
    // private _clickUI: TutorialClick;

    type: ETutorialType = ETutorialType.Click;

    init(...param: string[]): void {
        this._clickType = Number(param[0]);
        this._uiName = param[1];
        this._clickName = param[2];
        this._handAngle = Number(param[3]);
    }

    start(father: TutorialList): void {
        this._father = father;
    }
    stop(): void {
        this.destroy();
    }
    destroy(): void {
        this._father?.next();
        this._father = null;
    }
}

// 打开任务完成提示框类型
@TutorialTypeRegister(ETutorialType.OpenTaskComplete)
export class TutorialOpenTaskCompleteType implements ITutorialBase {
    init(...param: string[]): void { }
    type: ETutorialType = ETutorialType.OpenTaskComplete;
    start(): void { }
    stop(): void { }
    destroy(): void { }
}

// NPC对话类型(finish,checked)
@TutorialTypeRegister(ETutorialType.NpcTalk)
export class TutorialNpcTalkType implements ITutorialBase {
    private _father: TutorialList;
    private _npcTalkId: number;
    private canClick: number;
    next: number;
    init(...param: string[]): void {
        this._npcTalkId = Number(param[0]);
        this.next = Number(param[1]);
        this.canClick = Number(param[2]);
    }
    type: ETutorialType = ETutorialType.NpcTalk;
    start(father: TutorialList): void {
        this._father = father;
        if (this.next) {
            this._father?.next();
        }
    }
    stop(): void {
        this.destroy();
    }
    destroy(): void {
        if (!this.next) this._father?.next();
    }
}

// 打开新手指南类型(finish)
@TutorialTypeRegister(ETutorialType.OpenTutorial)
export class TutorialOpenTutorialType implements ITutorialBase {
    private _father: TutorialList;
    private _guideid: number;
    // private _ui: ImageGuide;
    init(...param: string[]): void {
        this._guideid = Number(param[0]);
    }

    type: ETutorialType = ETutorialType.OpenTutorial;
    start(father: TutorialList): void {
        this._father = father;
        // this._ui = ImageGuide.create();
        // this._ui.onClose.add(() => {
        //     this.stop();
        // });
        // this._ui.setImageGuideList(this._guideid);
        // this._ui.show();
    }
    stop(): void {
        // this._ui.hide();
        this.destroy();
    }
    destroy(): void {
        // this._ui.destroy();
        this._father?.next();
    }
}

// 添加任务类型(finish)
@TutorialTypeRegister(ETutorialType.AddTask)
export class TutorialAddTaskType implements ITutorialBase {
    private _father: TutorialList;
    private _taskid: number;
    init(...param: string[]): void {
        this._taskid = Number(param[0]);
    }
    type: ETutorialType = ETutorialType.AddTask;
    start(father: TutorialList): void {
        this._father = father;
        TaskHelper.addTask(this._taskid);
        this.stop();
    }
    stop(): void {
        this.destroy();
    }
    destroy(): void {
        this._father?.next();
    }
}

// 全屏奖励类型(finish)
@TutorialTypeRegister(ETutorialType.FullScreenReward)
export class TutorialFullScreenRewardType implements ITutorialBase {
    private _father: TutorialList;
    // private _rewardid: number;
    // private _rewardnum: number;
    // private _resetObj: mw.GameObject;
    init(...param: string[]): void {
        // this._rewardid = Number(param[0]);
        // this._rewardnum = Number(param[1]);
        // if (param[2]) {
        //     this._resetObj = GameObject.findGameObjectById(param[2]);
        // } else {
        //     this._resetObj = Player.localPlayer.character;
        // }
    }
    type: ETutorialType = ETutorialType.FullScreenReward;
    start(father: TutorialList): void {
        this._father = father;
        // RewardMenuPanel.showFullscreenRewardUI(
        //     [{ rewardNameOrID: this._rewardid, rewardNumber: this._rewardnum }],
        //     () => {
        //         this.stop();
        //     },
        //     null,
        //     false,
        //     0,
        //     this._resetObj
        // );
    }
    stop(): void {
        this.destroy();
    }
    destroy(): void {
        this._father?.next();
    }
}

// 通用奖励类型(finish)
@TutorialTypeRegister(ETutorialType.CommonReward)
export class TutorialCommonRewardType implements ITutorialBase {
    private _father: TutorialList;
    // private _rewardid: number;
    // private _rewardnum: number;
    // private _rewardTitle: string;
    // private _rewardContent: string;
    init(...param: string[]): void {
        // this._rewardid = Number(param[0]);
        // this._rewardnum = Number(param[1]);
        // this._rewardTitle = param[2];
        // this._rewardContent = param[3];
    }
    type: ETutorialType = ETutorialType.CommonReward;
    start(father: TutorialList): void {
        this._father = father;
        // PopUpPanel.showPopUpUI([{ rewardNameOrID: this._rewardid, rewardNumber: this._rewardnum }], this._rewardTitle, this._rewardContent, () => {
        //     this.stop();
        // });
    }
    stop(): void {
        this.destroy();
    }
    destroy(): void {
        this._father?.next();
    }
}

// 添加道具类型(finish)
@TutorialTypeRegister(ETutorialType.AddItem)
export class TutorialAddItemType implements ITutorialBase {
    private _father: TutorialList;
    private _itemid: number;
    private _itemnum: number;
    init(...param: string[]): void {
        this._itemid = Number(param[0]);
        this._itemnum = Number(param[1]);
    }
    type: ETutorialType = ETutorialType.AddItem;
    start(father: TutorialList): void {
        this._father = father;
        // BagHelper.addItem(this._itemid, this._itemnum);
        this.stop();
    }
    stop(): void {
        this.destroy();
    }
    destroy(): void {
        this._father?.next();
    }
}

// 解锁HUD功能类型
@TutorialTypeRegister(ETutorialType.UnlockHUD)
export class TutorialUnlockHUDType implements ITutorialBase {
    private _father: TutorialList;
    private _funcid: number;
    init(...param: string[]): void {
        this._funcid = Number(param[0]);
    }
    type: ETutorialType = ETutorialType.UnlockHUD;
    start(father: TutorialList): void {
        this._father = father;
        // FunctionEntryHelper.unlockEntry(this._funcid, () => {
        //     this.stop();
        // });
    }
    stop(): void {
        this.destroy();
    }
    destroy(): void {
        this._father?.next();
        this._father = null;
    }
}

// 关闭HUD功能类型
@TutorialTypeRegister(ETutorialType.CloseHUD)
export class TutorialCloseHUDType implements ITutorialBase {
    private _father: TutorialList;
    private _funcid: number;
    init(...param: string[]): void {
        this._funcid = Number(param[0]);
    }
    type: ETutorialType = ETutorialType.CloseHUD;
    start(father: TutorialList): void {
        this._father = father;
        // FunctionEntryHelper.lockEntry(this._funcid, () => {
        //     this.stop();
        // });
    }
    stop(): void {
        this.destroy();
    }
    destroy(): void {
        this._father?.next();
        this._father = null;
    }
}

// CG类型(finish？)
@TutorialTypeRegister(ETutorialType.CG)
export class TutorialCGType implements ITutorialBase {
    private _father: TutorialList;
    private _cgJson: string;
    init(...param: string[]): void {
        this._cgJson = param[0];
    }
    type: ETutorialType = ETutorialType.CG;
    start(father: TutorialList): void {
        this._father = father;
        // let str = GameConfig.cg.getElement(Number(this._cgJson)).CG;
        // CameraCG.instance.play(str, () => {
        //     this.stop();
        // });
    }
    stop(): void {
        this.destroy();
    }
    destroy(): void {
        this._father?.next();
        this._father = null;
    }
}

// 镜头看向某个物体或者NPC类型
@TutorialTypeRegister(ETutorialType.CameraLookAt)
export class TutorialCameraLookAtType implements ITutorialBase {
    private _father: TutorialList;
    private isOwner: boolean = false;
    private obj: mw.GameObject;
    private _offsetZ: number;
    private _length: number;
    init(...param: string[]): void {
        if (param[0] == "owner") {
            this.isOwner = true;
        } else {
            this.obj = GameObject.findGameObjectById(param[0]);
            this._offsetZ = Number(param[1]) ? Number(param[1]) : -10;
            this._length = Number(param[2]) ? Number(param[2]) : 40;
        }
    }
    type: ETutorialType = ETutorialType.CameraLookAt;
    start(father: TutorialList): void {
        this._father = father;
        if (this.isOwner) {
            CameraTool.setObjCloseUp(false, Player.localPlayer.character);
        } else {
            CameraTool.setObjCloseUp(true, this.obj, 0, this._offsetZ, this._length);
        }
        this.stop();
    }
    stop(): void {
        this.destroy();
    }
    destroy(): void {
        if (!this.obj) {

            CameraTool.setObjCloseUp(false, Player.localPlayer.character);
        }
        this._father?.next();
        this._father = null;
    }
}

// 打开UI类型
@TutorialTypeRegister(ETutorialType.OpenUI)
export class TutorialOpenUIType implements ITutorialBase {
    private _father: TutorialList;
    private _uiName: string;
    init(...param: string[]): void {
        this._uiName = param[0];
    }
    type: ETutorialType = ETutorialType.OpenUI;
    start(father: TutorialList): void {
        this._father = father;
        // let ui = GlobalM.UIMgr.getUI(this._uiName);
        // if (ui) {
        //     ui.tutorialOpen();
        // }
        this.stop();
    }
    stop(): void {
        this.destroy();
    }
    destroy(): void {
        this._father?.next();
        this._father = null;
    }
}

// 关闭UI类型(finish,checked)
@TutorialTypeRegister(ETutorialType.CloseUI)
export class TutorialCloseUIType implements ITutorialBase {
    private _father: TutorialList;
    private _uiName: string;
    init(...param: string[]): void {
        this._uiName = param[0];
    }
    type: ETutorialType = ETutorialType.CloseUI;
    start(father: TutorialList): void {
        this._father = father;
        // let ui = GlobalM.UIMgr.getUI(this._uiName);
        // if (ui) {
        //     ui.tutorialClose();
        // }
        this.stop();
    }
    stop(): void {
        this.destroy();
    }
    destroy(): void {
        this._father?.next();
        this._father = null;
    }
}

// 引导或者传送到某个地方类型(finish,checked)
@TutorialTypeRegister(ETutorialType.GuideOrTeleport)
export class TutorialGuideOrTeleportType implements ITutorialBase {
    private _father: TutorialList;
    private _guideid: number;
    init(...param: string[]): void {
        this._guideid = Number(param[0]);
    }
    type: ETutorialType = ETutorialType.GuideOrTeleport;
    start(father: TutorialList): void {
        this._father = father;
        // GuideArrowPlus.getInstance().GuideArea(this._guideid);
        this.stop();
    }
    stop(): void {
        this.destroy();
    }
    destroy(): void {
        this._father?.next();
        this._father = null;
    }
}

// 等待一定时间类型
@TutorialTypeRegister(ETutorialType.WaitTime)
export class TutorialWaitTimeType implements ITutorialBase {
    private _father: TutorialList;
    private _time: number;
    init(...param: string[]): void {
        this._time = Number(param[0]);
    }
    type: ETutorialType = ETutorialType.WaitTime;
    start(father: TutorialList): void {
        this._father = father;
        setTimeout(() => {
            this.stop();
        }, this._time * 1000);
    }
    stop(): void {
        this.destroy();
    }
    destroy(): void {
        this._father?.next();
        this._father = null;
    }
}

// 引导埋点(finish,checked)
@TutorialTypeRegister(ETutorialType.MGS)
export class MGSType implements ITutorialBase {
    private _father: TutorialList;
    private eventName: string;
    private paramArr: string[];
    init(...param: string[]): void {
        this.eventName = param[0];
        this.paramArr = param;
    }
    type: ETutorialType = ETutorialType.MGS;
    start(father: TutorialList): void {
        console.log("发送埋点" + this.paramArr);
        this._father = father;
        this.stop();
    }
    stop(): void {
        this.destroy();
    }
    destroy(): void {
        this._father?.next();
        this._father = null;
    }
}
