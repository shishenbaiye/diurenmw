import { MActor } from "../Actor/MActor";
import { MObject } from "../Object/MObject";

export class MBaseComponent extends MObject{
    private static _isComponent_:boolean = true;
    public actor:MActor = null;
    /**创建时候执行，此时可以调用DI，actor为空 */
    initial(){}

    /**附加到actor上执行，此时actor存在 */
    onStart(){}

    /**销毁函数 */
    destroy(){}
}