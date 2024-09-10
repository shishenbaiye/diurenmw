import { ComponentManager } from "../Component/ComponentManager";
import { MBaseComponent } from "../Component/MBaseComponent";
import { Constructor, MContainer } from "../DI/MContainer";
import { MActor } from "./MActor";

export class ActorManager{
    private static _instance:ActorManager;
    public static get instance():ActorManager{
        if(!this._instance){
            this._instance = new ActorManager();
        }
        return this._instance;
    }

    createActor<T extends MActor>(actorType:Constructor<T>):T{
        if(!actorType[`_isActor_`]) {
            console.error(`createActor error, ${actorType.name} is not a MActor`);
            return null;
        }
        let actor = MContainer.instance.constructorInjection(actorType);
        let componentArr = ComponentManager.instance.getComponentClassByName(actorType.name);
        if(componentArr){
            for(let i = 0;i < componentArr.length;i++){
                let component = ComponentManager.instance.createComponent<MBaseComponent>(componentArr[i]);
                actor.addComponent(component);
            }
        }
        return actor;
    }
}