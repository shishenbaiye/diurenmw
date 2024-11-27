import { GameEventBus } from "../../../common/eventBus/EventBus";
import HeadUI_Enemy_Generate from "../../../ui-generate/Head/HeadUI_Enemy_generate";
import { MonsterAttributeSet } from "../base/MonsterAttributeSet";
import RobotManager from "../RobotManager";


/** 头部UI */
export class RobotHeadUI {

    private owner: Character;
    private targetUI: HeadUI_Enemy_Generate;
    private trigger: (attrName: string, val: number, onlyId: string) => void;

    public initHead(player: Character) {
        this.owner = player;
        this.targetUI = UIService.create(HeadUI_Enemy_Generate)
        this.owner.overheadUI.setTargetUIWidget(this.targetUI.uiWidgetBase)
        this.owner.overheadUI.occlusionEnable = false;
        this.owner.overheadUI.headUIMaxVisibleDistance = 3500;
        this.owner.overheadUI.scaledByDistanceEnable = false;
        this.targetUI.progressBar_blood.currentValue = 1;
        //刷新回调
        this.trigger = (attrName: string, val: number, onlyId: string) => {
            if (onlyId !== this.owner.gameObjectId || attrName !== `hp` && attrName !== `maxHp`) return
            this.refreshHp();
        }
        GameEventBus.on("AttributeNpc_Change", this.trigger.bind(this));
    }

    /** 血量刷新 */
    public async refreshHp() {
        let obj = await RobotManager.instance.getRobot(this.owner);
        if (obj && obj.abs.attributeSet instanceof MonsterAttributeSet) {
            let as = obj.abs.attributeSet;
            this.targetUI.progressBar_blood.currentValue = as.hp.getCurrent() / as.maxHp.getCurrent();
        }
    }

    /** 信息刷新 */
    public refreshInfo() {
        this.targetUI.txt_name.text = `怪物`
    }

    /** 显影 */
    public setVisibility(vis: boolean) {
        this.targetUI.rootCanvas.visibility = vis ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }

    /** 销毁 */
    public destroy(): void {
        GameEventBus.off("AttributeNpc_Change", this.trigger.bind(this));
        this.targetUI.destroy();
        this.owner = null;
    }
}
