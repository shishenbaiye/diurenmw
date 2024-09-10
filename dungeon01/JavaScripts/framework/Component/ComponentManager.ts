import { Constructor, MContainer } from "../DI/MContainer";
import { MBaseComponent } from "./MBaseComponent";

export class ComponentManager{
    private static _instance:ComponentManager;
    public static get instance():ComponentManager{
        if(!this._instance){
            this._instance = new ComponentManager();
        }
        return this._instance;
    }

    private componentListMap:Map<string,Array<Constructor<MBaseComponent>>> = new Map();

    getComponentClassByName(name:string){
        if(this.componentListMap.has(name)){
            let arr = this.componentListMap.get(name);
            return arr;
        }else{
            return null;
        }
    }
    /**创建一个组件 */
    createComponent<T>(componentType:any):T{
        if(!componentType[`_isComponent_`]){
            console.error(`createComponent error, ${componentType.name} is not a MBaseComponent`);
            return null;
        };
        let Component = MContainer.instance.constructorInjection(componentType) as MBaseComponent;
        Component.initial();
        return Component as T;
    }

    //TODO：组件之间循环创建
}



/**组件依赖装饰器 */
export function MComponent<T extends MBaseComponent>(arr?: Constructor<T>[]){
    return (target: any)=> {
        console.warn("componentWarning-inject", target.name, arr);
        if(arr.length > 0){
            ComponentManager.instance[`componentListMap`].set(target.name, (arr as unknown as  Constructor<MBaseComponent>[]))
        }
    }
}