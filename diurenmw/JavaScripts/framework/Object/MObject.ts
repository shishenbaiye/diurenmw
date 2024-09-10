export class MObject{
    /**用来判断是否继承于MObject */
    private static _isMOject_ = true;
    constructor(){}

    /**深度拷贝复制对象，引用的也会被复制 */
    clone():MObject{
        for(let key in this){
            if(typeof this[key] == "object"){
                this[key] = this[key][`clone`]();
            }
        }
        return Object.assign({}, this);
    }
}