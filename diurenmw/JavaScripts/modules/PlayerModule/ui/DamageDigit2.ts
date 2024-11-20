import DamageDigitView2_Generate from "../../../ui-generate/Attribute/DamageDigitView2_generate";

export class DamageDigit2 {
    public static get instance(): DamageDigit2 {
        if (!this._instance) this._instance = new DamageDigit2()
        return this._instance
    }
    private static _instance: DamageDigit2
    private static getBezier(p0: number, p1: number, p2: number, t: number) {
        if (t > 1) {
            t = 1 + (t - 1) / 20;
        }
        let x = (1 - t) * (1 - t) * p0 + 2 * t * (1 - t) * p1 + t * t * p2;
        return x;
    }
    public static showDamage(content: string, loc: mw.Vector, color: string, startSize: number, startOffset: Vector2, endSize: number, endOffset: Vector2, posBias: number = 0): void {
        this.instance.flyDamage(content, loc, color, startSize, startOffset, endSize, endOffset, posBias)
    }

    /**飘字缓存池 */
    private pools: DamageDigitView2_Generate[] = [];
    constructor() {
        for (let index = 0; index < 10; index++) {
            this.pools.push(mw.UIService.create(DamageDigitView2_Generate))
        }
    }

    private flyDamage(content: string, loc: mw.Vector, color: string, startSize: number, startOffset: Vector2, endSize: number, endOffset: Vector2, posBias: number = 0) {
        let item: DamageDigitView2_Generate;
        if (this.pools.length == 0) {
            item = mw.UIService.create(DamageDigitView2_Generate);
        } else {
            item = this.pools.pop();
        }
        let start = mw.InputUtil.projectWorldPositionToWidgetPosition(loc, false).screenPosition;
        if (posBias) {
            startOffset.x += Math.random() * posBias;
            startOffset.y + Math.random() * posBias;
            endOffset.x += Math.random() * posBias;
            endOffset.y += Math.random() * posBias;
        }
        let startPos = start.clone().add(startOffset);
        let endPos = start.clone().add(endOffset);
        try {
            this.flyTween(item, content, color, startSize, endSize, startPos, endPos);
        }
        catch (e) {
            UIService.hideUI(item);
            this.pools.push(item);
        }
    }

    private flyTween(item: DamageDigitView2_Generate, content: string, color: string, startSize: number, endSize: number, startPos: Vector2, endPos: Vector2) {
        mw.UIService.showUI(item, mw.UILayerBottom);
        item.mFontText.fontSize = (startSize);
        item.mFontText.fontColor = LinearColor.colorHexToLinearColor(color);
        item.rootCanvas.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        item.mFontText.position = startPos;
        item.mFontText.text = content;
        new mw.Tween({ textPos: startPos, t: 0.0 })
            .to({ textPos: endPos, t: 1.0 }, 1000)
            .onUpdate(({ textPos: pos, t: t }) => {
                item.mFontText.position = pos;
                item.mFontText.fontSize = (DamageDigit2.getBezier(startSize, endSize, startSize, t * 3));
            }).onComplete(() => {
                mw.UIService.hideUI(item);
                this.pools.push(item);
            }).onStop(() => {
                mw.UIService.hideUI(item);
                this.pools.push(item);
            }).start();
    }

}

