import { AnalyticsUtil } from "odin";

/**
 * 基础埋点加上了日志
 */
abstract class BasePoint extends AnalyticsUtil {
    send(player?: Player) {
        super.send(player);
        console.warn(`埋点>desc:${this.desc},data:${JSON.stringify(this.data)}`);
    }
}

export class ts_gc_action extends BasePoint {
    desc: string = "广场行为";
    data: {
        button: string,
        resource1?: number,
        resource2?: number,
        resource3?: number,
        resource4?: number,
    };
}

export class MGSTool {
    /**玩家进入游戏 */
    public static report_Player_EnterGame(player: Player): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Playing_EnterGame"
        msg.send(player);
    }

    //#region 去玩耍
    /**点击去玩耍UI */
    public static report_GoPlay_Click(): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Entering_pages_gamejump"
        msg.send();
    }

    /**点击去玩耍tab */
    public static report_GoPlay_TabClick(tabId: number): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Entering_pages_gamejump"
        msg.data.resource1 = tabId;
        msg.send();
    }

    /**点击跳转游戏 */
    public static report_GoPlay_JumpGame(tabId: number, gameId: number): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Entering_pages_gamejump"
        msg.data.resource1 = tabId;
        msg.data.resource2 = gameId;
        msg.send();
    }

    //#endregion

    //#region 地图
    /**点击地图按钮 */
    public static report_Map_Click(): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Entering_pages_map"
        msg.send();
    }

    /**点击传送区域 */
    public static report_Map_TransferArea(areaId: number): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Entering_pages_map"
        msg.data.resource1 = areaId;
        msg.send();
    }

    /**玩家出生点位置 */
    public static report_Map_BornPoint(player:Player,pos:Vector): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Playing_BornPoint"
        msg.data.resource1 = pos.x;
        msg.data.resource2 = pos.y;
        msg.data.resource3 = pos.z;
        msg.send(player);
    }

    //#endregion

    //#region 动作轮盘
    /**点击动作轮盘 */
    public static report_ActionWheel_Click(): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Entering_pages_actionwheel"
        msg.send();
    }

    /**选择轮盘内动作 */
    public static report_ActionWheel_Action(actionId: number): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Entering_pages_actionwheel"
        msg.data.resource1 = actionId;
        msg.send();
    }

    //#endregion

    //#region 道具
    /**拾取道具 */
    public static report_PickupItem(player: Player, itemId: number): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Playing_props_pick"
        msg.data.resource1 = itemId;
        msg.send(player);
    }

    /**使用道具 */
    public static report_UseItem(itemId: number): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Playing_props_use"
        msg.data.resource1 = itemId;
        msg.send();
    }

    //#endregion

    //#region 音乐节
    /**进入音乐节区域 */
    public static report_EnterMusicFestival(player: Player): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Playing_musicfes_into"
        msg.send(player);
    }

    /**进入下一首曲目 */
    public static report_NextMusic(player, musicId: number): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Playing_musicfes_wait"
        msg.data.resource1 = musicId;
        msg.send(player);
    }

    /**玩家在音乐节切换服装 */
    public static report_ChangeCloth(clothId:number): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Playing_musicfes_clothes"
        msg.data.resource1 = clothId;
        msg.send();
    }

    //#endregion

    //#region 拳击馆
    /**进入拳击馆 */
    public static report_EnterBoxingGym(player: Player): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Playing_boxing_into"
        msg.send(player);
    }

    /**击败其他玩家 */
    public static report_BeatPlayer(player: Player): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Playing_boxing_defeat"
        msg.send(player);
    }

    /**在拳击馆点击拳击 */
    public static report_ClickBoxing(): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Playing_boxing_use"
        msg.data.resource1 = 0;
        msg.send();
    }

    /**在拳击馆点击飞踢 */
    public static report_ClickKick(): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Playing_boxing_use"
        msg.data.resource1 = 1;
        msg.send();
    }

    /**在拳击馆点击抱摔 */
    public static report_ClickThrow(): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Playing_boxing_use"
        msg.data.resource1 = 2;
        msg.send();
    }

    //#endregion

    //#region 打卡秀场
    /**进入打卡秀场 */
    public static report_EnterShow(player: Player): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Playing_superstar_into"
        msg.send(player);
    }

    /**点击拍照 */
    public static report_ClickPhoto(tagId: number): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Entering_superstar_photo"
        msg.data.resource1 = tagId;
        msg.send();
    }

    /**点击分享 */
    public static report_ClickShare(tagId: number, shareType: number): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Entering_superstar_save"
        msg.data.resource1 = tagId;
        msg.data.resource2 = shareType;
        msg.send();
    }

    //#endregion

    //#region 游乐园
    /**进入游乐园 */
    public static report_EnterPlayground(player: Player): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Playing_amusepark_into"
        msg.send(player);
    }

    //#endregion

    //#region 中央广场
    /**进入中央广场 */
    public static report_EnterSquare(player: Player): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Playing_centrepark_into"
        msg.send(player);
    }

    //#endregion

    //#region 代言人
    /**点击打开报名界面 */
    public static report_SSSignPanel_Open_Click(): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Playing_agent_into"
        msg.send();
    }

    /**点击打开代言人界面 */
    public static report_SSPanel_Open(): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Entering_pages_vote"
        msg.send();
    }

    /**点击报名 */
    public static report_SSSignPanel_Sign_Click(actionId: number): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Playing_agent_signup";
        msg.data.resource1 = actionId;
        msg.send();
    }

    /**报名二次确认 */
    public static report_SSSignPanel_Sign_Confirm(): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Playing_agent_signup";
        msg.send();
    }

    /**玩家投票 */
    public static report_SSVote_Click(result: boolean): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Playing_agent_vote";
        msg.data.resource1 = result ? 1 : 0;
        msg.send();
    }

    /**玩家点击添加好友 */
    public static report_SSAddFriend_Click(): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Playing_agent_addfriends";
        msg.send();
    }

    /**玩家点击复制代言人id */
    public static report_SSCopyId_Click(enterType: number): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Playing_agent_copyid";
        msg.data.resource1 = enterType;
        msg.send();
    }

    //#endregion

    //#region 脚本交互物
    /**开始交互 */
    public static report_ActiveInter(tagId: number): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Entering_common_inter"
        msg.data.resource1 = tagId;
        msg.send();
    }
    //#endregion

    //#region 音乐喷泉
    /**进入音乐喷泉区域 */
    public static report_EnterMusicFountain(): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Playing_fountain_trigger"
        msg.send();
    }

    /**踩钢琴 */
    public static report_PianoStep(player:Player): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Playing_piano_trigger"
        msg.send(player);
    }

    /**玩家被喷泉击飞 */
    public static report_MusicFountain_PlayerFly(): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Playing_fountain_plus"
        msg.send();
    }

    //#endregion

    //#region 小火车
    /**进入小火车 */
    public static report_EnterTrain(): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Entering_action_train"
        msg.send();
    }

    /**退出小火车 */
    public static report_ExitTrain(): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Exiting_action_train"
        msg.send();
    }

    //#endregion

    //#region 加好友

    /**点击添加好友 */
    public static report_AddFriend_Click(): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Entering_pages_friends"
        msg.send();
    }

    //#endregion

    //#region 新手引导
    /**新手引导 */
    public static report_Enter_Guide(): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Entering_pages_guide"
        msg.send();
    }

    /**点击新手引导传送区域 */
    public static report_Guide_TransferArea(areaId: number): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Entering_pages_map"
        msg.data.resource1 = areaId;
        msg.send();
    }

    //#endregion

    //#region 动作ui
    /**点击动作ui */
    public static report_ActionUI_Click(): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Entering_pages_action"
        msg.send();
    }

    /**选择动作的埋点 */
    public static report_ActionUI_Action(actionId: number): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Entering_pages_action"
        msg.data.resource1 = actionId;
        msg.send();
    }

    /**接收多人动作时上报埋点 */
    public static report_ActionUI_MultiAction(player:Player,actionId: number): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Entering_pages_action"
        msg.data.resource1 = actionId;
        msg.send(player);
    }

    //#endregion

    //#region 背包ui
    /**点击背包ui */
    public static report_BagUI_Click(): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Entering_pages_bag"
        msg.send();
    }

    /**使用道具 */
    public static report_BagUI_UseItem(itemId: number): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Entering_pages_bag"
        msg.data.resource1 = itemId;
        msg.send();
    }

    //#endregion

    //#region 设置UI
    /**点击设置ui */
    public static report_SettingUI_Click(): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Entering_pages_setting"
        msg.send();
    }

    /**修改设置 */
    public static report_SettingUI_Setting(settingType: number,setValue:number): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Entering_pages_setting"
        msg.data.resource1 = settingType;
        msg.data.resource2 = setValue;
        msg.send();
    }
 
    //#endregion

    //#region 载具
    /**点击载具 */
    public static report_Vehicle_Click(): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Entering_pages_vehicle"
        msg.send();
    }

    /**载具使用 */
    public static report_Vehicle_Use(vehicleId: number): void {
        let msg = AnalyticsUtil.get(ts_gc_action);
        msg.data.button = "Entering_pages_vehicle"
        msg.data.resource1 = vehicleId;
        msg.send();
    }
}