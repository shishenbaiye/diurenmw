import { MSingletonPlugin } from "../../framework/DI/MContainer";

@MSingletonPlugin()
export class ScreenInput{
    // private static _instance: ScreenInput;
    // static get instance() {
    //     if (!this._instance) {
    //         this._instance = new ScreenInput();
    //     }
    //     return this._instance;
    // }
    private touch: mw.TouchInput;

    /**按下屏幕的事件 */
    public touchPress: Action2<number,mw.Vector2> = new Action2();
    /**屏幕移动的事件*/
    public touchMove: Action2<number,mw.Vector2> = new Action2();
    /**松开屏幕的事件*/
    public touchRelease: Action2<number,mw.Vector2> = new Action2();
    /**点击屏幕的事件*/
    public touchClick: Action2<number,mw.Vector2> = new Action2();

    init(){
        if(SystemUtil.isClient()){
            this.touch = new mw.TouchInput();

            let relativeStart = null;
            let isMove = false;
            let preTime = 0;
            let curTime = 0;
            this.touch.onTouchBegin.add((index: number, location: mw.Vector2, touchType: TouchInputType)=>{
                this.touchPress.call(index,location);
                relativeStart = location;
                preTime = Date.now();
            });
            this.touch.onTouchMove.add((index: number, location: mw.Vector2, touchType: TouchInputType)=>{
                if(relativeStart && !isMove){
                    let dis = Vector2.distance(relativeStart,location);
                    if(dis > 1){
                        isMove = true;
                    }
                }
                if(isMove){
                    this.touchMove.call(index,location);
                }
            });
            this.touch.onTouchEnd.add((index: number, location: mw.Vector2, touchType: TouchInputType)=>{
                isMove = false;
                if(relativeStart){
                    let dis = Vector2.distance(relativeStart,location);
                    curTime = Date.now();
                    let during = curTime - preTime;
                    if(dis < 10 && during < 200){
                        relativeStart = null;
                        this.touchClick.call(index,location);
                    }
                }
                this.touchRelease.call(index,location);
            });
        }  
    }

    addTouchClick(fun:(index: number, location: mw.Vector2)=>void,thisArg:any){
        this.touchClick.add(fun,thisArg);
    }
    addTouchMove(fun:(index: number, location: mw.Vector2)=>void,thisArg:any){
        this.touchMove.add(fun,thisArg);
    }
    addTouchRelease(fun:(index: number, location: mw.Vector2)=>void,thisArg:any){
        this.touchRelease.add(fun,thisArg);
    }
    addTouchPress(fun:(index: number, location: mw.Vector2)=>void,thisArg:any){
        this.touchPress.add(fun,thisArg);
    }

    removeTouchClick(fun:(index: number, location: mw.Vector2)=>void,thisArg:any){
        this.touchClick.remove(fun,thisArg);
    }
    removeTouchMove(fun:(index: number, location: mw.Vector2)=>void,thisArg:any){
        this.touchMove.remove(fun,thisArg);
    }
    removeTouchRelease(fun:(index: number, location: mw.Vector2)=>void,thisArg:any){
        this.touchRelease.remove(fun,thisArg);
    }
    removeTouchPress(fun:(index: number, location: mw.Vector2)=>void,thisArg:any){
        this.touchPress.remove(fun,thisArg);
    }

    getTouchNum(){
        return this.touch.getTouchVectorArray();
    }
   
}