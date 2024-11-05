import HeadUI_Enemy_Generate from "../../../ui-generate/Head/HeadUI_Enemy_generate";
import { MonsterAttributeSet } from "../MonsterAttributeSet";
import NpcScript from "../NpcScript";

/** 头部UI */
export class NpcHeadUI {

    private targetCharacter: Character;
    private targetUI: HeadUI_Enemy_Generate;
    private attributeSet: MonsterAttributeSet;
    private targetPlayer: NpcScript;

    public initInfo(player: Character) {
        this.targetCharacter = player;
        this.targetUI = UIService.create(HeadUI_Enemy_Generate)
        this.targetCharacter.overheadUI.setTargetUIWidget(this.targetUI.uiWidgetBase)
        this.targetCharacter.overheadUI.occlusionEnable = false;
        this.targetCharacter.overheadUI.headUIMaxVisibleDistance = 3500;
        this.targetCharacter.overheadUI.scaledByDistanceEnable = false;
        //初始化
        this.targetUI.progressBar_blood.currentValue = 1;
    }

    public refreshInfo() {
        if (!this.targetPlayer) this.targetPlayer = this.targetCharacter.getComponent(NpcScript);
        if (this.targetPlayer) {
            // 名称
            this.targetUI.txt_name.text = `怪物`
        }
    }

    public refreshHp() {
        if (!this.attributeSet) this.attributeSet = this.targetCharacter.getComponent(MonsterAttributeSet)
        if (this.attributeSet) {
            let as = this.attributeSet as MonsterAttributeSet;
            this.targetUI.progressBar_blood.currentValue = as.hp.getCurrent() / as.maxHp.getCurrent();
        }
    }

    public setVisibility(vis: boolean) {
        this.targetUI.rootCanvas.visibility = vis ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }

    public destroy(): void {
        this.targetUI.destroy();
        this.targetCharacter = null;
    }
}
