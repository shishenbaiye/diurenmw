import HeadUI_Generate from "../../../ui-generate/Head/HeadUI_generate";
import { AbilitySystemComponent } from "../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import PlayerScript from "../PlayerScript";


/** 玩家头部UI */
export class PlayerHeadUI {

    private targetCharacter: Character;
    private targetUI: HeadUI_Generate;
    private targetAbs: AbilitySystemComponent;
    private targetPlayer: PlayerScript;

    public initInfo(player: Character) {
        this.targetCharacter = player;
        this.targetUI = UIService.create(HeadUI_Generate)
        this.targetCharacter.overheadUI.setTargetUIWidget(this.targetUI.uiWidgetBase)
        this.targetCharacter.overheadUI.occlusionEnable = false;
        this.targetCharacter.overheadUI.headUIMaxVisibleDistance = 3500;
        this.targetCharacter.overheadUI.scaledByDistanceEnable = false;
        //初始化
        this.targetUI.text_Name.text = ``;
        this.targetUI.img_vip.visibility = SlateVisibility.Collapsed;
        this.targetUI.con_hp.visibility = SlateVisibility.Collapsed;
        this.targetUI.progressBar_blood.currentValue = 1;
    }

    public refreshInfo() {
        if (!this.targetPlayer) this.targetPlayer = this.targetCharacter.getComponent(PlayerScript);
        if (this.targetPlayer) {
            // 名称
            this.targetUI.text_Name.text = this.targetPlayer.headInfo.name;
            // vip
            this.targetUI.img_vip.visibility = this.targetPlayer.headInfo.vip ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Hidden
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
