/**节流 */
export class Throttling{
    private static _instance:Throttling;
    public static get instance():Throttling{
        if(!Throttling._instance) Throttling._instance = new Throttling();
        return Throttling._instance;
    }
    private _throttleMap:Map<string,()=>void> = new Map();

    /**创建节流
     * @param key 节流的key
     * @param duration 节流的时间间隔
     * @param callback 节流的回调
     */
    public throttle(key:string,duration:number = 1000,callback:()=>void):boolean{
        if(this._throttleMap.has(key)) return false;
        this._throttleMap.set(key,callback);
        setTimeout(()=>{
            if(!this._throttleMap.has(key)) return;
            this._throttleMap.get(key)();
            this._throttleMap.delete(key);
        },duration);
        return true;
    }

    /**删除节流 */
    public clearThrottle(key:string):void{
        this._throttleMap.delete(key);
    }
}