import { MathTool } from "../../../tools/MathTool"
import { WorldUIPool } from "../../../tools/UIPool"
import DamageDigitView_Generate from "../../../ui-generate/Attribute/DamageDigitView_generate"

export class DamageDigit {
    private static pool: WorldUIPool<DamageDigitView>

    static showDamage(action: (view: DamageDigitView) => void) {
        this.checkPool()
        let view = this.pool.get()
        action(view)
    }

    private static checkPool() {
        if (DamageDigit.pool) return
        this.pool = new WorldUIPool<DamageDigitView>(() => {
            return new DamageDigitView();
        })
    }
}

class DamageDigitView {
    ui: DamageDigitView_Generate
    uiWidget: UIWidget
    stage: boolean
    private startPosition: mw.Vector
    private readonly endPosition: mw.Vector
    private readonly currentScale: mw.Vector2
    private tween1: Tween<{ x: number }>
    private tween2: Tween<{ x: number }>
    private tween3: Tween<{ x: number }>

    constructor() {
        this.ui = UIService.create(DamageDigitView_Generate)
        this.uiWidget = <UIWidget>GameObject.spawn('UIWidget')
        this.uiWidget.setTargetUIWidget(this.ui.uiWidgetBase)
        this.uiWidget.widgetSpace = mw.WidgetSpaceMode.Screen
        this.uiWidget.occlusionEnable = false

        this.endPosition = new Vector()
        this.currentScale = new Vector2()

        this.tween3 = new Tween({ x: 1 }).to({ x: 0 }, 300).onUpdate(obj => {
            this.ui.txt_context.renderOpacity = obj.x
        }).onComplete(() => {
            this.stage = false
            this.uiWidget.setVisibility(mw.PropertyStatus.Off)
        })
        this.tween2 = new Tween({ x: 0 }).to({ x: 1 }, 500).onUpdate(obj => {
            this.uiWidget.worldTransform.position = mw.Vector.lerp(this.startPosition, this.endPosition, obj.x)
        }).chain(this.tween3)
        this.tween1 = new Tween({ x: 0 }).to({ x: 1 }, 400).onUpdate(obj => {
            let s = MathTool.lerp(1, 0.5, MathTool.pingPong(obj.x))
            this.currentScale.x = s
            this.currentScale.y = s
            this.ui.txt_context.renderScale = this.currentScale
        }).chain(this.tween2)
    }

    playTween(startPosition: mw.Vector) {
        this.startPosition = startPosition
        this.endPosition.x = this.startPosition.x
        this.endPosition.y = this.startPosition.y
        this.endPosition.z = this.startPosition.z + 110
        this.uiWidget.worldTransform.position = startPosition

        this.ui.txt_context.renderOpacity = 1
        this.tween1.start()
    }
}