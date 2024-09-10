export enum EventEnum {
    /**主UI关闭引导线事件
     * @param 无
    */
    MAIN_UI_CLOSEDIRECT = "MAIN_UI_CLOSEDIRECT",

    /**主UI打开每日任务事件
     * @param 无
    */
    MAIN_UI_OPENDAILYTASK = "MAIN_UI_OPENDAILYTASK",

    /**主UI打开个人信息
     * @param 无
     */
    MAIN_UI_OPENPERSONALINFO = "MAIN_UI_OPENPERSONALINFO",
    /**
 * 显示隐藏商店
 */
    MAIN_UI_SHOWHIDE_SHOP = "MAIN_UI_SHOWHIDE_SHOP",

    /**
     * 打开服装商城界面
     */
    MAIN_UI_OPEN_CLOTHSHOP = "MAIN_UI_OPEN_CLOTHSHOP",

    /**
     * 打开装扮界面
     */
    MAIN_UI_OPEN_DRESS = "MAIN_UI_OPEN_DRESS",



    /**客户端玩家数据初始化完成
     * @param 无
     */
    PLAYER_INITDATACOMPLETE = "PLAYER_INITDATACOMPLETE",

    /**客户端玩家数据改变
     * @param data:IPlayerData
     * @example
     * EventBus.on(EventEnum.PLAYER_DATA_CHANGE, this.onPlayerDataChange, this);
     */
    PLAYER_DATA_CHANGE = "PLAYER_DATA_CHANGE",

    /**打开引导线按钮 */
    TASK_SHOWGUIDELINE = "TASK_SHOWGUIDELINE",
    /**关闭引导线按钮 */
    TASK_HIDEGUIDELINE = "TASK_HIDEGUIDELINE",

    /**服务端玩家正式进入游戏
     * @ playerid
     */
    PLAYER_ENTER_GAME = "PLAYER_ENTER_GAME",
    /**
     * 客户端玩家签名改变
     * @param data:string
     */
    PLAYER_CHANGE_SIGNATURE = "PLAYER_CHANGE_SIGNATURE",

    /**打开背包 */
    OPEN_BAG = "OPEN_BAG",
    /**关闭背包 */
    CLOSE_BAG = "CLOSE_BAG",
    /**监听关闭背包 */
    ON_BAG_CLOSE = "ON_BAG_CLOSE",
    /**监听打开背包 */
    ON_BAG_OPEN = "ON_BAG_OPEN",
    /**创建角色完成 */
    EVENT_CREATE_ROLE_COMPLETE = "EVENT_CREATE_ROLE_COMPLETE",
    /**打开宠物详情 */
    OPEN_PET_DETAILS = "OPEN_PET_DETAILS",

    /** 道具使用事件 */
    PROP_USE = `PROP_USE`,
    /** 道具卸载事件 */
    PROP_UNLOAD = `PROP_UNLOAD`,

    /**打开换装 */
    OPEN_CHANGE_CLOTHES = "OPEN_CHANGE_CLOTHES",

    /**打开图鉴 */
    OPEN_COLLECTION = `OPEN_COLLECTION`,

    /**新手引导监听钓鱼事件 */
    GET_FISH_ONCE = "GET_FISH_ONCE",

    FISH_STATE = `FISH_STATE`,
    /**装备宠物 */
    SETOWN_PET = "SETOWN_PET",

    /**钓鱼成功事件（一次，新手引导用） */
    TUTORIAL_FISHING_SUCCESS = "TUTORIAL_FISHING_SUCCESS",
    /**卸载宠物 */
    CANCEL_PET = "CANCEL_PET",
    /** 鱼漂入水 */
    BOBBER_IN_WATER = "BOBBER_IN_WATER",

    /**隐藏事件气泡 */
    HIDE_EVENT_BUBBLE = "HIDE_EVENT_BUBBLE",
    /**显示事件气泡 */
    SHOW_EVENT_BUBBLE = "SHOW_EVENT_BUBBLE",


    /**
     * 显示隐藏主界面
     */
    SHOW_HIDE_HUDPANEL = "SHOW_HIDE_HUDPANEL",

    /**
     * 按钮点击事件触发
     */
    EVENT_BUTTON_CLICK = "EVENT_BUTTON_CLICK",
    /**打开动作 */
    OPEN_ACTION = "OPEN_ACTION",
    /**打开派对 */
    OPEN_PARTY = "OPEN_PARTY",
    /**结束双人动作 */
    ACTION_CANCEL = "ACTION_CANCEL",
    /**打开签到界面 */
    OPEN_SIGN = "OPEN_SIGN",
}

// 任务专属完成事件
export enum EventTaskEnum {
    /**使用某个道具
     * @param id:number
     * 需要道具的id
     */
    TASKEXCLUSIVE_USE_PROP = "TASKEXCLUSIVE_USE_PROP",

    /**获得某个物品
     * @param id：number
     * 需要道具的id
     */
    TASKEXCLUSIVE_GET_ITEM = "TASKEXCLUSIVE_GET_ITEM",

    /**进入场景触发器
     * @description ( playerid:number, _config: ISceneboxElement )
     */
    TASKEXCLUSIVE_ENTER_TRIGGER = "TASKEXCLUSIVE_ENTER_TRIGGER",

    /**出场景触发器
     * @description ( playerid:number, _config: ISceneboxElement )
     */
    TASKEXCLUSIVE_EXIT_TRIGGER = "TASKEXCLUSIVE_EXIT_TRIGGER",

    /**NPC进入场景触发器
     * @description ( obj: mw.GameObject, _config: ISceneboxElement )
     */
    TASKEXCLUSIVE_NPC_ENTER_TRIGGER = "TASKEXCLUSIVE_NPC_ENTER_TRIGGER",

    /**NPC出场景触发器
     * @description ( obj: mw.GameObject, _config: ISceneboxElement )
     */
    TASKEXCLUSIVE_NPC_EXIT_TRIGGER = "TASKEXCLUSIVE_NPC_EXIT_TRIGGER",
}

/**
 * 按钮 类型 ，例如hud按钮，主界面按钮，注意不能重复
 */
export enum ButtonTypeEnum {
    /**
     * 背包
     */
    BUTTON_BAGPACK = "BUTTON_BAGPACK",


    /**
     * 手机按钮
     */
    BUTTON_PHONE = "BUTTON_PHONE",

    /**
     * 宠物骑乘按钮
     */
    BUTTON_PETDRIVE = "BUTTON_PETDRIVE",

    /**
     * 宠物指令按钮
     */
    BUTTON_PETCOMMAND = "BUTTON_PETCOMMAND",

    /**
     * 宠物指令按钮
     */
    BUTTON_PETCOMMAND_UNHOLD = "BUTTON_PETCOMMAND_UNHOLD",

    /**
     * 宠物田径竞赛 按钮
     */
    BUTTON_PETRUN_ACTIVE = "BUTTON_PETRUN_ACTIVE",

    /**
     * 陨石
     */
    BUTTON_METEORITE = "BUTTON_METEORITE",
    /**
     * 抓宠物
     */
    BUTTON_CATCHPET = "BUTTON_CATCHPET",
    /**
     * 宠物详情界面
     */
    BUTTON_PETDES = "BUTTON_PETDES",
    /**
    * 打造界面
    */
    BUTTON_Conflate = "BUTTON_Conflate",
    /**
     * 无尽之塔入口
     * */
    BUTTON_TOWER = "BUTTON_TOWER",

}