/**任务分类 */
export enum TaskClass {
    /**特殊任务 */
    None = 0,
    /**每日任务 */
    Daily = 1,
    /**随机事件任务 */
    Random = 2,
    /**宠物任务 */
    Pet = 3,
    /**新手引导任务 */
    Guide = 4,
    /**自定义完成条件任务 */
    Custom = 5
}

/**任务奖励类型 */
export enum TaskRewardType {
    /**钻石 */
    Diamond = 1,
    /**钞票 */
    Gold = 2,
    /**钞票+亲密度*/
    GoldAndIntimacy,
    /**道具 */
    Props = 4
}

/**任务状态 */
export enum TaskState {
    /**进行中 */
    Doing,
    /**已完成 */
    Finished,
    /**已领取 */
    Received
}

/**操作类型 */
export enum TaskOpt {
    /**增加任务 */
    Add,
    /**删除任务 */
    Remove
}

/**任务引导类型 */
export enum TaskGuideType {
    /**没有引导 */
    None = 1,
    /**打开某个页面 */
    Open,
    /**引导目标 */
    Target
}

/**点击事件类型 */
export enum TaskClickType {
    /**啥也不做 */
    None = 1,
    /**领取奖励 */
    Receive,
    /**前往 */
    Go,
    /**导航 */
    Direction,
    /**关闭导航 */
    closeDirect
}

/**任务完成类型*/
export enum TaskCompleteType {
    /**到达指定位置 */
    Arrive = 1,
    /**打开某个功能页面 */
    Open = 2,
    /**接收其他功能触发 */
    Receive = 3,
    /**使用某个物品 */
    Use = 4,
    /**获得某个物品 */
    Get = 5,
    /**登录类型 */
    Login = 6,
    /**停留在某个地方多久 */
    Stay = 7,
    /**钓鱼 */
    Fishing = 8,
    /**自定义 */
    Custom = 9,
    /**交互物交互 */
    Interact = 10,
    /**交互物持续交互多久 */
    InteractTime = 11,
    /**换装 */
    ChangeCloth = 12,
    /**宠物动作 */
    PetAction = 13,
    /**宠物喂食 */
    PetFeed = 14,
    /**宠物抱起 */
    PetHold = 15,
    /**宠物骑乘 */
    PetRide = 16,
    /**宠物皮肤 */
    PetSkin = 17,
    /**宠物升级 */
    PetLevel = 18,
    /**宠物比赛 */
    PetRace = 19,
    /**宠物比赛排名 */
    PetRank = 20,
    /**宠物抓捕 */
    CatchPet = 21,
    /**聊天 */
    Chat = 22,
    /**拍照 */
    TakePhoto = 23,
}

export enum TaskTipsIconType {
    /**食物 */
    Food = 1,
    /**玩耍 */
    Play = 2
}

export enum TaskOpenType {
    /**打开服装商店 */
    ClothShop = "1",
    /**打开背包 */
    Bag = "2",
    /**打开宠物皮肤 */
    PetSkin = "3",
    /**打开宠物详情 */
    PetDes = "4",
    /**打开宠物喂食 */
    PetFeed = "5",
    /**打开拍照 */
    TakePhoto = "6"
}

export enum TaskGuideStep {
    /**引导总任务进度 */
    GuideTotal = 58,
    /**引导任务1 */
    Guide1 = 54,
    /**宠物引导任务 */
    Guide2 = 55,
    /**钓鱼引导任务 */
    Guide3 = 56,
    /**采矿引导任务 */
    Guide4 = 57,
    /**无尽之塔任务 */
    Guide5 = 59
}

export enum TaskUseType {
    /**道具 */
    Props = 1,
    /**服装 */
    Cloth = 2
}

export enum TaskFishingType {
    /**长度 */
    Length = 1,
    /**数量 */
    Count = 2,
    /**特定鱼 */
    Fish = 3,
    /**卖鱼钱数 */
    Sell = 4
}
