import { ComponentManager } from "../Component/ComponentManager";
import { MBaseComponent } from "../Component/MBaseComponent";
import { MNetComponent } from "../Component/MNetComponent";
import { MObject } from "../Object/MObject";

export class MBaseActor extends MObject {
    protected rootComponent:MBaseComponent = null;
    protected components:MBaseComponent[] = [];

    // 使用网络组件（属性同步）
    protected useNet:boolean = false;

    protected constructor(){
        super();
        if(this.useNet){
            this.rootComponent = ComponentManager.instance.createComponent(MNetComponent);
        }
        TimeUtil.onEnterFrame.add(this.update,this);
    }
    /**给actor添加组件 */
    addComponent(component:MBaseComponent){
        component.actor = this;
        component.onStart();
        this.components.push(component);
    }

    /**尝试获取当前actor里的组件 */
    getComponent<T extends MBaseComponent>(componentType: { new(): T ;}):T{
        for(let i = 0;i < this.components.length;i++){
            if(this.components[i] instanceof componentType){
                return this.components[i] as T;
            }
        }
        return null;
    }

    protected update(dt:number){}


    destroy(){
        for(let i = 0;i < this.components.length;i++){
            this.components[i].destroy();
        }
        this.components = [];
        TimeUtil.onEnterFrame.remove(this.update,this);
    }
}