import { UIPool } from "../../../tools/UIPool";
import RankPanel_Generate from "../../../ui-generate/Rank/RankPanel_generate";
import RankPlayer_Generate from "../../../ui-generate/Rank/RankPlayer_generate";
import { RankCustomizedData } from "../RankCustomizedData";
// 走马灯动效
class MarqueeItem {
    parentCanvas: Canvas;
    txt: TextBlock;

    private _differentValue: number = 0;
    get differentValue() {
        return this._differentValue;
    }

    set differentValue(value: number) {
        if (this._differentValue == value) return;
        this._differentValue = value;
        if (this._differentValue <= 0) {
            if (this.tween.isPlaying()) this.tween.stop();
        }
        let pos = this.txt.position.clone();
        pos.x = 0;
        this.txt.position = pos.clone();

        if (this._differentValue > 0) {
            this.tween.start()
        }
    }
    private tween: Tween<{ x: number }>;

    constructor() {
        this.tween = new Tween({ x: 0 }).to({ x: 1 }, 3000).onUpdate((obj) => {
            let alpha = Math.abs(((obj.x + 0.5) % 1) - 0.5) * 2;
            this.txt.position = Vector2.lerp(Vector2.zero, new Vector2(-this.differentValue, 0), alpha);
        })
            .repeat(Infinity)
            .repeatDelay(800)
            .yoyo(true)
    }

    setInfo(parentCanvas: Canvas, txt: TextBlock) {
        this.parentCanvas = parentCanvas;
        this.txt = txt;
    }

    clear() {
        this.parentCanvas = null;
        this.txt = null;
    }
}

export class RankPanel extends RankPanel_Generate {

    private pool: UIPool<RankItem> = new UIPool(() => {
        let item = mw.UIService.create(RankItem)
        this.canvas_Player.addChild(item.uiObject);
        return item
    })

    refreshRank(rankData: RankCustomizedData[]) {
        this.pool.resetAll();
        for (let i = 0; i < rankData.length; i++) {
            let item = this.pool.get();
            item.refreshRank(i + 1, rankData[i])
        }
    }

}
class RankItem extends RankPlayer_Generate {
    private marqueeItem: MarqueeItem;
    private refreshCd: number = 0;

    onStart() {
        this.marqueeItem = new MarqueeItem();
        this.marqueeItem.setInfo(this.canvas_Name, this.txt_name);
        this.canUpdate = true
    }

    onUpdate(dt: number) {
        this.refreshCd -= dt;
        if (this.refreshCd > 0) return;
        let value = this.marqueeItem.txt.size.x - this.marqueeItem.parentCanvas.size.x;
        this.marqueeItem.differentValue = value <= 0 ? value : value + 50;
        this.refreshCd = 10;
    }

    refreshRank(rank: number, info: RankCustomizedData) {
        if (rank == 1) {
            this.text_Position.text = "1st";
            this.img_Bg.imageColor = mw.LinearColor.colorHexToLinearColor("FFD600");
        } else if (rank == 2) {
            this.text_Position.text = "2nd";
            this.img_Bg.imageColor = mw.LinearColor.colorHexToLinearColor("ACD1FF");
        }
        else if (rank == 3) {
            this.text_Position.text = "3rd";
            this.img_Bg.imageColor = mw.LinearColor.colorHexToLinearColor("C2723E");
        } else {
            this.text_Position.text = rank.toString();
            this.img_Bg.imageColor = mw.LinearColor.colorHexToLinearColor("#484848");
        }
        this.txt_name.text = info.userName;
        this.text_Number.text = info.userData.toString();
    }

}

