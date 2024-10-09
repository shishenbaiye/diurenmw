// 引导阶段
export enum GuideStep {
    // 阶段1 创建角色
    STEP1 = 1,
    // 阶段2 进入世界开始功能引导
    STEP2 = 2,
    // 阶段3 引导UI滑动
    STEP3 = 3,
    // 阶段4 引导UI移动
    STEP4 = 4,
    // 阶段5 引导完成任务
    STEP5 = 5,
    // 阶段6 引导完成任务
    STEP6 = 6,
    // 引导完成
    Completed
}

export enum TutorialWorldType {
    /**主城 */
    MainCity = 1,
    /**宠物店 */
    PetShop = 2
}

export enum EUnLockModule {
    /**宠物 */
    Pet = 1,
    /**全部解锁 */
    All = 2
}

export enum ETutorialType {
    /**新手引导到达某地 */
    Arrive = 1,
    /**新手引导点击某地 */
    Click = 2,
    /**打开任务完成提示框 */
    OpenTaskComplete = 3,
    /**NPC对话 */
    NpcTalk = 4,
    /**打开新手指南 */
    OpenTutorial = 5,
    /**添加任务 */
    AddTask = 6,
    /**全屏奖励 */
    FullScreenReward = 7,
    /**通用奖励 */
    CommonReward = 8,
    /**添加道具 */
    AddItem = 9,
    /**解锁HUD功能 */
    UnlockHUD = 10,
    /**关闭HUD功能 */
    CloseHUD = 11,
    /**CG */
    CG = 12,
    /**镜头看向某个物体或者NPC */
    CameraLookAt = 13,
    /**打开UI */
    OpenUI = 14,
    /**关闭UI */
    CloseUI = 15,
    /**引导或者传送到某个地方 */
    GuideOrTeleport = 16,
    /**等待一定时间 */
    WaitTime = 17,
    /**埋点 */
    MGS = 18
}

export enum ETutorialStep {
    /**初学者手册开始-进入宠物引导 */
    BeginnerGuide1 = 1,
    /**宠物引导【获取宠物对话引导】 */
    PetGuide1 = 2,
    /**宠物引导【获取宠物界面引导】 */
    PetGuide2 = 3,
    /**宠物引导【宠物喂养】 */
    PetGuide3 = 4,
    /**宠物引导【宠物骑乘】 */
    PetGuide4 = 5,
    /**宠物引导【宠物活动】 */
    PetGuide5 = 6
}

/**新手引导进度枚举 */
export enum ETutorialProgress {
    /**未开始 */
    NotStart = 0,
    /**已完成 */
    Completed = 1,
    /**进行中 */
    InProgress = 2
}