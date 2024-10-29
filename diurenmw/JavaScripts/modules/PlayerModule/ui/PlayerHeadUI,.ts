import HeadUI_Generate from "../../../ui-generate/Head/HeadUI_generate";
import { PlayerData } from "../PlayerData";


/** 玩家头部UI */
export class PlayerHeadUI {

    private targetCharacter: Character;
    private targetUI: HeadUI_Generate;

    public initInfo(player: Character) {
        this.targetCharacter = player;
        this.targetUI = UIService.create(HeadUI_Generate)
        this.targetCharacter.overheadUI.setTargetUIWidget(this.targetUI.uiWidgetBase)
        this.targetCharacter.overheadUI.occlusionEnable = false;
        this.targetCharacter.overheadUI.headUIMaxVisibleDistance = 3500;
    }

    public refreshInfo(data: PlayerData) {
        // 名称
        this.targetUI.text_Name.text = data.name;
        // vip
        this.targetUI.img_vip.visibility = data.vip ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Hidden
    }

    public refreshHp(curHp: number, maxHp: number) {
        this.targetUI.progressBar_blood.currentValue = curHp / maxHp;
    }

    public setVisibility(vis: boolean) {
        this.targetUI.rootCanvas.visibility = vis ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }

    public destroy(): void {
        this.targetUI.destroy();
        this.targetCharacter = null;
    }
}
