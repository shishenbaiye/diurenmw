import { BezierTool } from "./BezierTool";

export class Tween<T> extends mw.Tween<T> {}

export default class TweenTool {
    /**
     * 主要是按钮的缩放播放，基本上同时只会存在一个
     */
    private static tween: Tween<{ scale: number }>;

    /**
     * HUD 界面tip的缩放
     */
    private static tweenTipScale1: Tween<{ scale: number }>;

    private static tweenTipScale2: Tween<{ scale: number }>;

    /**
     * 添加按钮缩放动画
     * @param _con 按钮父容器
     * @param _btn 按钮
     */
    static registerBtnClickEffect(_con: mw.Widget, _btn: mw.Button | mw.StaleButton) {
        if (_btn) {
            _btn.onPressed.add(() => {
                //oTrace(`test:button onPressed ${_btn.isPressed()} ${_btn.isHovered}`)
                TweenTool.tweenButtonDefaultScale(_con);
            });
            _btn.onReleased.add(() => {
                //oTrace(`test:button onReleased ${_btn.isPressed()}  ${_btn.isHovered}`)

                TweenTool.tweenButtonDefaultScale(_con, true);
            });

            _btn.onHovered.add(() => {
                //oTrace(`test:button onHovered   ${_btn.isPressed()} ${_btn.isHovered}`)
                //TweenTool.tweenButtonDefaultScale(_con, true);
            });
            _btn.onUnhovered.add(() => {
                //oTrace(`test:button onUnhovered  ${_btn.isPressed()} ${_btn.isHovered}`)
                if (_btn.isPressed()) {
                    TweenTool.tweenButtonDefaultScale(_con, true);
                }
            });
        }
    }

    /**
     * 按钮容器缩放 ，默认值
     * @param _obj
     */
    static tweenButtonDefaultScale(_obj: mw.Widget | mw.Button | mw.TextBlock, _reversal: boolean = false) {
        if (_reversal) {
            this.tweenScale(_obj, 0.85, 1, 100);
        } else {
            this.tweenScale(_obj, 1, 0.85, 100);
        }
    }

    /**
     * 按钮容器缩放 ，默认值
     * @param _obj
     */
    static tweenHeadButtonScale(_obj: mw.Widget | mw.Button | mw.TextBlock, _reversal: boolean = false) {
        if (_reversal) {
            this.tweenScale(_obj, 0.85, 1.25, 100);
        } else {
            this.tweenScale(_obj, 1.25, 0.85, 100);
        }
    }

    /**
     * 缩放物体
     * @param _obj 对象
     * @param _targetValue 最小缩放值
     * @param _ownValue 最大缩放值
     * @param _duration 延迟 毫秒
     * @param _easing 补间动画
     */
    static tweenScale(_obj: mw.Widget | mw.Button | mw.TextBlock, _ownValue: number = 1, _targetValue: number, _duration: number = 200, _easing = TweenUtil.Easing.Linear.None) {
        this.tween = new Tween({ scale: _ownValue })
            .to({ scale: _targetValue }, _duration)
            .easing(_easing)
            .onUpdate((_param) => {
                try {
                    _obj.renderScale = new mw.Vector2(_param.scale, _param.scale);
                } catch (e) {
                    console.error(`缩放错误！`, _obj);
                }
            })
            .onComplete((_param) => {})
            .start();
    }

    /**
     * HUD 按钮 tip 显示
     * @param _obj
     * @param _ownValue
     * @param _targetValue
     * @param _duration
     * @param _easing
     * @param _stayDelay
     */
    static tweenTipScale(_obj: mw.Widget | mw.Button | mw.TextBlock, _ownValue: number = 0, _targetValue: number = 1, _duration: number = 200, _easing = TweenUtil.Easing.Linear.None, _stayDelay: number = 1000) {
        _obj.renderScale = new mw.Vector2(0, 0);

        this.tweenTipScale1 = new Tween({ scale: _ownValue })
            .to({ scale: _targetValue }, _duration)
            .easing(_easing)
            .onUpdate((_param) => {
                try {
                    _obj.renderScale = new mw.Vector2(_param.scale, _param.scale);
                } catch (e) {
                    // console.error(`缩放错误！`, _obj);
                }
            })
            .onComplete((_param) => {});

        this.tweenTipScale2 = new Tween({ scale: _targetValue })
            .to({ scale: _ownValue }, _duration)
            .easing(_easing)
            .onUpdate((_param) => {
                try {
                    _obj.renderScale = new mw.Vector2(_param.scale, _param.scale);
                } catch (e) {
                    // console.error(`缩放错误！`, _obj);
                }
            })
            .onComplete((_param) => {})
            .delay(_stayDelay);

        this.tweenTipScale1.chain(this.tweenTipScale2);
        this.tweenTipScale1.start();
    }
    //#region 文本的变动

    /**
     * 文本的变动
     */
    private static numberTween: Tween<{ val: number }>;

    /**
     *
     * @param _newValue 新的值
     * @param _oldValue 旧值
     * @param _update 更新函数
     * @param _duration 延迟时间
     */
    static tweenNumber(_newValue: number, _oldValue: number, _update: Function, _duration: number = 200) {
        this.numberTween = new Tween({ val: _oldValue })
            .to({ val: _newValue }, _duration)
            .onUpdate((_param) => {
                _update(_param.val);
            })
            .onComplete((_param) => {})
            .start();
    }

    //#endregion

    private static t0: Tween<{ val: number }>;

    private static t1: Tween<{ val: number }>;
    //#region 左右晃动

    static tweenPhone(_obj: mw.Widget) {
        var p0 = { val: _obj.position.x },
            p1 = { val: _obj.position.x };

        this.t0 = new Tween(p0)
            .to({ val: _obj.position.x - 10 }, 30)
            .easing(mw.TweenUtil.Easing.Elastic.InOut)
            .onUpdate((_param) => {
                _obj.position = new mw.Vector2(_param.val, _obj.position.y);

                //oTrace("111111111111 "+_param.val);
            })
            .onComplete(function () {})
            .repeat(15)
            .yoyo(true)
            .start();
    }

    //#endregion

    private static scr1: Tween<{ val: number }>;
    private static scr2: Tween<{ val: number }>;
    private static s1: any = null;
    private static s2: any = null;
    private static left1 = -1;
    private static left2 = 1;
    private static scr: mw.ScrollBox = null;
    private static target = 0;

    /**
     * 滚动条箭头动画
     * @param scr 滚动条
     * @param img1 箭头1
     * @param img2 箭头2
     * @param size 页签大小
     * @param count 页签数量
     * @param space 间隔
     */
    public static tweenScr(scr: mw.ScrollBox, img1: mw.Image | mw.Button, img2: mw.Image | mw.Button, size: number, count: number, space: number): void {
        this.scr = scr;
        img1.visibility = 2;
        img1.position = new mw.Vector2(this.scr.position.x - 60, img1.position.y);
        img2.visibility = size * count + space * (count - 1) <= scr.size.x ? 2 : 4;
        img2.position = new mw.Vector2(this.scr.position.x + this.scr.size.x - 40, img2.position.y);
        this.s1 = { val: img1.position.x };
        this.s2 = { val: img2.position.x };
        this.scr1 = new Tween(this.s1)
            .to({ val: img1.position.x + 10 * this.left1 }, 1000)
            .onUpdate((_param) => {
                img1.position = new mw.Vector2(_param.val, img1.position.y);
            })
            .repeat(Infinity)
            .yoyo(true)
            .start();
        this.scr2 = new Tween(this.s2)
            .to({ val: img2.position.x + 10 * this.left2 }, 1000)
            .onUpdate((_param) => {
                img2.position = new mw.Vector2(_param.val, img2.position.y);
            })
            .repeat(Infinity)
            .yoyo(true)
            .start();
        this.target = (size + space) * (count - 1) - scr.size.x + size * 0.25;
        this.scr.onUserScrolled.add((offset: number) => {
            if (offset >= size * 0.75) {
                if (img1.visibility != 4) {
                    img1.visibility = 4;
                }
            } else {
                if (img1.visibility != 2) {
                    img1.visibility = 2;
                }
            }
            if (offset <= this.target) {
                if (img2.visibility != 4) {
                    img2.visibility = 4;
                }
            } else {
                if (img2.visibility != 2) {
                    img2.visibility = 2;
                }
            }
        });
    }

    /**停止滚动箭头动画 */
    public static tweenScrStop(): void {
        this.scr1.stop();
        this.scr2.stop();
        this.scr.onUserScrolled.clear();
    }
    //#endregion

    //#region 大小变化+透明度变化
    private static st: Tween<{ x: number }>;
    private static ot: Tween<{ y: number }>;
    /**
     * 缩放+透明度
     * @param _ui UI实体
     * @param smin  缩放最小值
     * @param smax  缩放最大值
     * @param omin  透明度最小值
     * @param omax  透明度最大值
     * @param duration 时长
     * @param seasing 缩放缓动
     * @param oeasing 透明度缓动
     */
    static tweenScaleAndOpacity(_ui: mw.Widget, smin: number = 0.75, smax: number = 1, omin: number = 0.5, omax: number = 1, duration: number = 100, seasing = TweenUtil.Easing.Cubic.Out, oeasing = TweenUtil.Easing.Linear.None, delayTime = 0, onComplete?: Function) {
        this.st = new Tween({ x: smin })
            .to({ x: smax }, duration)
            .easing(seasing)
            .onUpdate((s) => {
                try {
                    _ui.renderScale = new Vector2(s.x);
                } catch (e) {
                    console.error(`tween动画错误！`, _ui);
                }
            });
        this.ot = new Tween({ y: omin })
            .to({ y: omax }, duration)
            .easing(oeasing)
            .onUpdate((o) => {
                try {
                    _ui.renderOpacity = o.y;
                } catch (e) {
                    console.error(`tween动画错误！`, _ui);
                }
            });
        this.st.delay(delayTime).start();
        this.ot
            .delay(delayTime)
            .start()
            .onComplete(() => {
                onComplete && onComplete();
            });
    }
    //#endregion

    //#region 持续大小变换
    /**
     * 持续大小变换
     * @param _ui UI实体
     * @param smin  缩放最小值
     * @param smax  缩放最大值
     * @param duration 时长
     * @param seasing 缩放缓动
     * @returns tween动画实例
     **/
    static tweenContinuedScale(_ui: mw.Widget, smin: number = 0.5, smax: number = 1.5, duration: number = 100, seasing = TweenUtil.Easing.Linear.None): Tween<{ x: number }> {
        let Tweent = new Tween({ x: smin })
            .to({ x: smax }, duration)
            .easing(seasing)
            .onUpdate((s) => {
                try {
                    _ui.renderScale = new Vector2(s.x);
                } catch (e) {
                    console.error(`tween持续变换大小动画错误！`, _ui);
                    Tweent.stop();
                }
            })
            .yoyo(false)
            .start();
        return Tweent;
    }
    //#endregion

    //#region 持续透明度变换
    /**
     * 持续透明度变换
     * @param _ui UI实体
     * @param smin  缩放最小值
     * @param smax  缩放最大值
     * @param duration 时长
     * @param seasing 缩放缓动
     * @returns tween动画实例
     **/
    static tweenContinuedAlpha(_ui: mw.Widget, smin: number = 0, smax: number = 1, duration: number = 1000, seasing = TweenUtil.Easing.Linear.None): Tween<{ x: number }> {
        return new Tween({ x: smin })
            .to({ x: smax }, duration)
            .easing(seasing)
            .onUpdate((s) => {
                _ui.renderOpacity = s.x;
            })
            .onComplete(() => {
                _ui.renderOpacity = 0;
            })
            .repeat(0)
            .yoyo(false)
            .start();
    }

    /**
     * 持续上下移动
     * @param _ui UI实体
     * @param duration 时长
     * @param seasing 缩放缓动
     * @returns tween动画实例
     **/
    static tweenContinuedY(_ui: mw.Widget, duration: number = 100, seasing = TweenUtil.Easing.Linear.None): Tween<{ y: number }> {
        return new Tween({ y: _ui.position.y })
            .to({ y: _ui.position.y + 10 }, duration)
            .easing(seasing)
            .onUpdate((s) => {
                _ui.position = new Vector2(_ui.position.x, s.y);
            })
            .repeat(Infinity)
            .yoyo(true)
            .start();
    }

    /**一维二次贝塞尔曲线插值函数动画(通俗的讲就是起点终点，中间的路径会受控制点位置进行弯曲偏移)
     * @param _ui UI实体
     * @param start 起点
     * @param end 终点
     * @param control 控制点
     * @param time 时长
     * @param easing 缓动
     * @returns tween动画实例（需要手动播放）
     */
    public static tweenQuadBezier(_ui: mw.Widget, start: Vector2, end: Vector2, control: Vector2, time: number, easing: (t: number) => number = TweenUtil.Easing.Linear.None) {
        const startPos = start;
        const endPos = end;
        const controlPos = control;
        const duration = time;
        const objectToAnimate = { progress: 0 };
        return new Tween(objectToAnimate)
            .to({ progress: 1 }, duration)
            .easing(easing)
            .onUpdate(() => {
                let pos = BezierTool.Bezier2D(objectToAnimate.progress, startPos, endPos, controlPos);
                _ui.position = pos;
            })
            .start();
    }

    /**
     * 持续旋转
     * @param _ui UI实体
     * @param duration 时长
     * @param seasing 缩放缓动
     * @returns tween动画实例
     **/
    static tweenAngle(_ui: mw.Widget, duration: number = 300, seasing = TweenUtil.Easing.Linear.None): Tween<{ y: number }> {
        return new Tween({ y: _ui.renderTransformAngle })
            .to({ y: _ui.renderTransformAngle + 360 }, duration)
            .easing(seasing)
            .onUpdate((s) => {
                if (_ui.renderTransformAngle >= 180) {
                    _ui.renderTransformAngle = -180;
                }
                _ui.renderTransformAngle = s.y;
            })
            .repeat(Infinity)
    }

    /**
     * 从下到上显示
     * @param _ui UI实体
     * @param duration 时长
     * @returns tween动画实例
     **/
    static tweenDown(_ui: mw.Widget, duration: number = 1000, Callback: () => void): Tween<{ y: number }> {
        // console.log("s.y  ===========  ");
        return new Tween({ y: 1100 })
            .to({ y: 300 }, duration)
            .onUpdate((s) => {
                // console.log("s.y    "+s.y);
                _ui.position = new Vector2(_ui.position.x, s.y);
            })
            .onComplete(() => {
                if (null != Callback) {
                    Callback();
                    return;
                }
            })
            .start();
    }
    // 写一个物体大小抖动的方法
    static tweenScaleShake(_obj: mw.GameObject, duration: number = 1000, Callback: () => void) {
        let basey = _obj.worldTransform.scale.y;
        let basex = _obj.worldTransform.scale.x;
        let basez = _obj.worldTransform.scale.z;

        let tw = new Tween({ y: basey, x: basex, z: basez })
            .to({ y: basey * 1.2, x: basex * 1.2, z: basez * 0.8 }, duration)
            .onUpdate((s) => {
                _obj.worldTransform.scale = new Vector(s.x, s.y, s.z);
            })
            .easing(TweenUtil.Easing.Cubic.Out);

        let tw1 = new Tween({ y: basey * 1.2, x: basex * 1.2, z: basez * 0.8 })
            .to({ y: basey * 0.8, x: basex * 0.8, z: basez * 1.2 }, duration)
            .onUpdate((s) => {
                _obj.worldTransform.scale = new Vector(s.x, s.y, s.z);
            })
            .yoyo(true)
            .easing(TweenUtil.Easing.Cubic.Out);

        let tw2 = new Tween({ y: basey * 0.8, x: basex * 0.8, z: basez * 1.2 })
            .to({ y: basey * 1.1, x: basex * 1.1, z: basez * 0.9 }, duration * 0.8)
            .onUpdate((s) => {
                _obj.worldTransform.scale = new Vector(s.x, s.y, s.z);
            })
            .yoyo(true)
            .easing(TweenUtil.Easing.Cubic.Out);

        let tw3 = new Tween({ y: basey * 1.1, x: basex * 1.1, z: basez * 0.9 })
            .to({ y: basey, x: basex, z: basez }, duration * 0.8)
            .onUpdate((s) => {
                _obj.worldTransform.scale = new Vector(s.x, s.y, s.z);
            })
            .yoyo(true)
            .onComplete(() => {
                _obj.worldTransform.scale = new Vector(basex, basey, basez);
                if (null != Callback) {
                    Callback();
                    return;
                }
            })
            .easing(TweenUtil.Easing.Cubic.Out);

        tw.chain(tw1);
        tw1.chain(tw2);
        tw2.chain(tw3);
        tw.start();
    }

    /**
     * 改变透明度和位移
     * @param ui
     * @param renderstart
     * @param renderend
     * @param movePos
     * @param Callback
     */
    static tweenRenderPosition(ui: BaseView, renderstart: number, renderend: number, movePosUp: Vector2, moveUpDown: Vector2, timeUp: number, timeDown: number, Callback?: () => void) {
        let tween = new Tween({ tp: renderstart })
            .to({ tp: renderstart * 0.8 }, timeUp)
            .onUpdate((data: { tp: number }) => {
                ui.uiObject.position = ui.uiObject.position.clone().add(movePosUp);
                ui.uiObject.renderOpacity = data.tp;
            })
            .onComplete(() => {
                setTimeout(() => {
                    tween1.start();
                }, 100);
            })
            .easing(TweenUtil.Easing.Sinusoidal.Out)
            .start();

        let tween1 = new Tween({ tp: renderstart * 0.8 })
            .to({ tp: renderend }, timeDown)
            .onUpdate((data: { tp: number }) => {
                ui.uiObject.position = ui.uiObject.position.clone().add(moveUpDown);
                ui.uiObject.renderOpacity = data.tp;
            })
            .onComplete(() => {
                Callback();
            })
            .easing(TweenUtil.Easing.Sinusoidal.In);
    }

    static tweenObjectPosition(obj: GameObject | Character, startPos: Vector, endPos: Vector, duration: number, Callback?: Function) {
        {
            let newtween = new Tween({ pos: startPos })
                .to({ pos: endPos }, duration)
                .onUpdate((pos) => {
                    obj.worldTransform.position = pos.pos.clone();
                })
                .onComplete((pos) => {
                    if (Callback) {
                        Callback();
                    }
                })
                .start();
            return newtween;
        }
    }
}
