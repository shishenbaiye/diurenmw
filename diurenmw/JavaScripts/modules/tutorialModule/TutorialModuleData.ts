import { TaskGuideStep } from "../taskModule/TaskBase/TaskEnum";
import { GuideStep } from "./TutorialBase/TutorialEnum";

export class TutorialModuleData extends Subdata {
    /**是否首次登录 */
    @Decorator.persistence()
    private _guideStep: number = 1;

    /**是否完成新手引导 */
    @Decorator.persistence()
    private _isCompleteGuide: boolean = false;

    /**是否可以发送随机任务事件 */
    @Decorator.persistence()
    private _isSendRandomTask: boolean = false;

    /**是否第一次进入宠物店 */
    @Decorator.persistence()
    private _isFirstEnterPetShop: boolean = true;

    /**是否已经获取鱼竿 */
    @Decorator.persistence()
    private _isGetFishingRod: boolean = false;

    /**是否第一次钓鱼 */
    @Decorator.persistence()
    private _isFirstFishing: boolean = true;

    /**是否第一次钓上来鱼 */
    @Decorator.persistence()
    private _isFirstFishingFish: boolean = true;

    /**新手指南任务列表 */
    @Decorator.persistence()
    private _guideTaskList: number[] = [];

    /**是否能看到其他玩家 */
    @Decorator.persistence()
    private _isCanSeeOtherPlayer: boolean = false;

    /**是否进行背包装备宠物的强制引导 */
    @Decorator.persistence()
    private _isForceEquip: boolean = false;

    /**是否能打开每日任务 */
    @Decorator.persistence()
    private _isOpenDailyTask: boolean = false;

    /**新手引导流程状态 */
    @Decorator.persistence()
    private _newGuide: Array<Array<number>> = [];

    /**第一次进入宠物引导 */
    @Decorator.persistence()
    private _isFirstEnterPet: boolean = true;

    /**第一次进入采矿引导 */
    @Decorator.persistence()
    private _isFirstEnterMining: boolean = true;

    /**第一次进入钓鱼引导 */
    @Decorator.persistence()
    private _isFirstEnterFishing: boolean = true;

    protected initDefaultData(): void {
        this._guideStep = 1;
        this._isCompleteGuide = false;
        this._isSendRandomTask = false;
        this._isFirstEnterPetShop = true;
        this._guideTaskList = [TaskGuideStep.Guide2, TaskGuideStep.Guide3, TaskGuideStep.Guide4, TaskGuideStep.Guide5];
        this._isCanSeeOtherPlayer = false;
        this._newGuide = [];
    }

    public saveNewGuide() {
        this.save(true);
    }

    get guideStep(): GuideStep {
        return this._guideStep;
    }

    set guideStep(value: GuideStep) {
        this._guideStep = value;
        this.save(true);
    }

    get isCompleteGuide(): boolean {
        return this._isCompleteGuide;
    }

    set isCompleteGuide(value: boolean) {
        this._isCompleteGuide = value;
        this.save(true);
    }

    get isSendRandomTask(): boolean {
        return this._isSendRandomTask;
    }

    set isSendRandomTask(value: boolean) {
        this._isSendRandomTask = value;
        this.save(true);
    }

    get isFirstEnterPetShop(): boolean {
        return this._isFirstEnterPetShop;
    }

    set isFirstEnterPetShop(value: boolean) {
        this._isFirstEnterPetShop = value;
        this.save(true);
    }

    get guideTaskList(): number[] {
        return this._guideTaskList;
    }

    set guideTaskList(value: number[]) {
        this._guideTaskList = value;
        this.save(true);
    }

    get isCanSeeOtherPlayer(): boolean {
        return this._isCanSeeOtherPlayer;
    }

    set isCanSeeOtherPlayer(value: boolean) {
        this._isCanSeeOtherPlayer = value;
        this.save(true);
    }

    get isGetFishingRod(): boolean {
        return this._isGetFishingRod;
    }

    set isGetFishingRod(value: boolean) {
        this._isGetFishingRod = value;
        this.save(true);
    }

    get isFirstFishing(): boolean {
        return this._isFirstFishing;
    }

    set isFirstFishing(value: boolean) {
        this._isFirstFishing = value;
        this.save(true);
    }

    get isFirstFishingFish(): boolean {
        return this._isFirstFishingFish;
    }

    set isFirstFishingFish(value: boolean) {
        this._isFirstFishingFish = value;
        console.error(`当前是否第一次钓上来鱼：${value}`);
        this.save(true);
    }

    get isForceEquip(): boolean {
        return this._isForceEquip;
    }

    set isForceEquip(value: boolean) {
        this._isForceEquip = value;
        this.save(true);
    }

    get isOpenDailyTask(): boolean {
        return this._isOpenDailyTask;
    }

    set isOpenDailyTask(value: boolean) {
        this._isOpenDailyTask = value;
        this.save(true);
    }

    get newGuide(): Array<Array<number>> {
        return this._newGuide;
    }

    set newGuide(value: Array<Array<number>>) {
        this._newGuide = value;
        this.save(true);
    }

    /**第一次进入宠物引导 */
    public get isFirstEnterPet(): boolean {
        return this._isFirstEnterPet;
    }

    public set isFirstEnterPet(isFirstEnterPet: boolean) {
        this._isFirstEnterPet = isFirstEnterPet;
        this.save(true);
    }

    /**第一次进入采矿引导 */
    public get isFirstEnterMining(): boolean {
        return this._isFirstEnterMining;
    }

    public set isFirstEnterMining(isFirstEnterMining: boolean) {
        this._isFirstEnterMining = isFirstEnterMining;
        this.save(true);
    }

    /**第一次进入钓鱼引导 */
    public get isFirstEnterFishing(): boolean {
        return this._isFirstEnterFishing;
    }

    public set isFirstEnterFishing(isFirstEnterFishing: boolean) {
        this._isFirstEnterFishing = isFirstEnterFishing;
        this.save(true);
    }
}