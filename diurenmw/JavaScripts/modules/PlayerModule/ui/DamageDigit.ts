import { WorldUIPool } from "../../../tools/UIPool";
import DamageDigitView_Generate from "../../../ui-generate/Attribute/DamageDigitView_generate";

const MaxDamage: number = 1e10;

export class DamageDigit {
    private static pool: WorldUIPool<DamageDigitView>
    public static view: number = 0;
    private static num: number = 0;

    public static showDamage(action: (view: DamageDigitView) => void) {
        this.checkPool()
        let view = this.pool.get()
        action(view)
    }

    public static showObjDamage(damage: number, obj: GameObject) {
        console.log(`DamageDigit.showObjDamage: ${damage}, ${obj}`);
        if (Number.isNaN(damage)) return
        this.checkPool()
        let view = this.pool.get()
        let tips = `${Math.abs(damage) >= MaxDamage ? MaxDamage : Math.abs(damage)}`;
        let star = obj.worldTransform.position;
        star.z += (obj.getBoundingBox().z / 2)
        view.ui.txt_context.text = tips;
        view.ui.txt_context2.text = tips;
        DamageDigit.num++;
        view.playTween(star, DamageDigit.num);
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
    private readonly endPosition2: mw.Vector
    private readonly currentScale: mw.Vector2
    //缩放动画
    private tween1: Tween<{ z: number }>
    //位移动画
    private tween2: Tween<{ zz: number }>
    //透明度动画
    private tween3: Tween<{ o: number }>

    constructor() {
        this.ui = UIService.create(DamageDigitView_Generate)
        this.uiWidget = <UIWidget>GameObject.spawn('UIWidget')
        this.uiWidget.setTargetUIWidget(this.ui.uiWidgetBase)
        this.uiWidget.widgetSpace = mw.WidgetSpaceMode.Screen
        this.uiWidget.occlusionEnable = false

        this.endPosition = new Vector()
        this.endPosition2 = new Vector()
        this.currentScale = new Vector2()

        this.tween3 = new Tween({ o: 1 }).to({ o: 0 }, 50).onUpdate(obj => {
            this.ui.txt_context.renderOpacity = obj.o
        }).onComplete(() => {
            this.tween2.stop();
            this.stage = false
            this.uiWidget.setVisibility(mw.PropertyStatus.Off)
        })

        this.tween2 = new Tween({ zz: 0 }).to({ zz: 1 }, 150)
            .onStart(() => {

            }).onUpdate(obj => {
                this.uiWidget.worldTransform.position = mw.Vector.lerp(this.endPosition, this.endPosition2, obj.zz)
            })


        this.tween1 = new Tween({ z: 0 }).to({ z: 1 }, 800)
            .delay(300)
            .onStart(() => {
                this.ui.txt_context.renderOpacity = 1;
                this.ui.txt_context2.renderOpacity = 0;
            })
            .onUpdate(obj => {
                this.uiWidget.worldTransform.position = mw.Vector.lerp(this.startPosition, this.endPosition, obj.z)
            }).onComplete(() => {
                this.tween2.start()
                this.tween3.start()
            })


    }

    playTween(startPosition: mw.Vector, mask: number) {

        let random1 = Math.random() * 50;
        let random2 = Math.random() * 50;

        this.startPosition = startPosition.add(new Vector(0, random1, random2))

        this.endPosition.x = this.startPosition.x
        this.endPosition.y = this.startPosition.y
        this.endPosition.z = this.startPosition.z + 5;
        this.endPosition2.x = this.startPosition.x
        this.endPosition2.y = this.startPosition.y
        this.endPosition2.z = this.endPosition.z + 100;
        this.uiWidget.worldTransform.position = startPosition
        this.ui.txt_context.renderOpacity = 0
        this.ui.txt_context2.renderOpacity = 1
        this.tween1.start()
        this.uiWidget.translucentSortPriority = mask;
    }
}