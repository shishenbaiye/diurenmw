/*
 * @Author: zebin.ge
 * @Date: 2022-08-10 10:20:11
 * @LastEditors: zebin.ge
 * @LastEditTime: 2023-02-21 20:57:12
 * @FilePath: \baseframework\JavaScripts\Container.ts
 * @Description: 可以将一些通用类注入到模块内双端可用，插件之间也可以相互注入
 */
//#region 容器单例

import { GameGlobal } from "../../globel/GameGlobel";

// import 'reflect-metadata';
export class MContainer {
    private static _instance: MContainer;
    static get instance(): MContainer {
        if (!this._instance) {
            this._instance = new MContainer();
        }
        return this._instance;
    }

    /**插件 */
    private PluginMap: Map<string, Constructor> = new Map<string, Constructor>();
    /**单例插件 */
    private singletonPluginMap: Map<string, Constructor> = new Map<string, Constructor>();
    /**单例实例缓存 */
    private singletonInstanceMap: Map<string, any> = new Map<string, any>();

    /**注入模块对应关系 */
    private injectableMap: Map<string, Array<Constructor>> = new Map<string, Array<Constructor>>();

    private varMap: Map<string, Array<any>> = new Map<string, Array<any>>();

    private constructorMap: Map<string, Array<any>> = new Map<string, Array<any>>();

    /**初始化一些内部plug */
    initial() {
        // 初始化内部的基础插件
        this.getPlugin(RpcPlugin)[`initListener`]();
        // 调用引擎执行命令行
        // UE.KismetSystemLibrary.ExecuteConsoleCommand(null,`t.MaxFPS 60`);
    }

    /**注册单例插件 */
    private registerSingletonPlugin(pluginName: string, pluginClass: Constructor) {
        if (this.singletonPluginMap.has(pluginName)) {
            console.error("Container-Error:Plugin is repetitive! PluginName=" + pluginName);//插件重复注册
            return;
        }
        // let singletonPlugs = new pluginClass();
        if(GameGlobal.Config.isDebug) console.log("Container-warning:SingletonPlugin is register!! PluginName=" + pluginName);
        this.singletonPluginMap.set(pluginName, pluginClass);
    }
    /**注册插件 */
    private registerPlugin(pluginName: string, pluginClass: Constructor) {
        if (this.PluginMap.has(pluginName)) {
            console.error("Container-Error:Plugin is repetitive! PluginName=" + pluginName);//插件重复注册
            return;
        }
        this.PluginMap.set(pluginName, pluginClass);
        if(GameGlobal.Config.isDebug) console.log("Container-warning:Plugin is register!! PluginName=" + pluginName);
    }

    /**参数形式注入
     * @param 对象实例
     */
    varInjection<T>(instance: T): T {
        if(GameGlobal.Config.isDebug) console.log(`开始参数注入`, instance.constructor.name);
        if (this.varMap.has(instance.constructor.name)) {
            this.varMap.get(instance.constructor.name).forEach(item => {
                let classtype = this.getPluginClassByName(item[1]);
                if(GameGlobal.Config.isDebug) console.log(`参数可注入`, item[0])
                instance[item[0]] = this.constructorInjection(classtype);
            })
        } else {
            if(GameGlobal.Config.isDebug) console.warn(`Container-var-log:${instance.constructor.name}没有可以注入的参数`)
        }
        return instance;
    }

    /**setter形式注入任一模块，固定set方法为:importPlugs(...args)
     * @param target 实例
     */
    setterInjection<T>(target: T): T {
        if(GameGlobal.Config.isDebug) console.log("开始setter注入:", target.constructor.name);
        let args: any = [];
        const providers = this.getProviders(target.constructor.name);
        // 将实例化的数组作为target类的参数，并返回target的实例
        if (providers !== undefined) {
            args = providers.map((provider: Constructor) => this.constructorInjection(provider));
            target[`importPlugs`](...args);
            return target;
        } else {
            if(GameGlobal.Config.isDebug) console.warn(`Container-setter-log:${target.constructor.name}没有注入依赖`);
            return target;
        }
    }

    /**构造形式注入任一模块
     * @param target 构造类
     */
    public constructorInjection<T>(target: Constructor<T>): T {
        if(GameGlobal.Config.isDebug) console.log(`开始创建`, target.name);
        if (this.singletonInstanceMap.has(target.name)) {
            return this.singletonInstanceMap.get(target.name);
        }

        let instanceArr = [];
        let args = [];
        if (this.constructorMap.has(target.name)) {
            this.constructorMap.get(target.name).forEach(item => {
                let classtype = this.getPluginClassByName(item[1]);
                if (classtype === undefined) {
                    console.error(`Container-constructor-log:${item[1]} is not register!`);
                    return undefined;
                }
                let instance = this.constructorInjection(classtype);
                instanceArr.push([item[0], instance]);
            })
            // 对instanceArr的元素按照第一个元素进行排序，从小到大
            instanceArr.sort((a, b) => {
                return a[0] - b[0];
            })

            instanceArr.forEach(item => {
                args.push(item[1]);
            })
        }
        if (this.PluginMap.has(target.name)) {
            let pluginClass = this.PluginMap.get(target.name);
            if (pluginClass !== undefined) {
                if (instanceArr.length > 0) {
                    let newPlugin = new pluginClass(...args);
                    this.varInjection(newPlugin);
                    this.setterInjection(newPlugin);
                    return newPlugin;
                }
                let newPlugin = new pluginClass();
                this.varInjection(newPlugin);
                this.setterInjection(newPlugin);
                return newPlugin;
            } else {
                console.error(`Container-constructor-log:${target.name} is not register!`);
                return undefined;
            }
        }
        else {
            if (this.singletonInstanceMap.has(target.name)) {
                return this.singletonInstanceMap.get(target.name);
            }
            if (this.singletonPluginMap.has(target.name)) {
                let singletonPlugs = this.singletonPluginMap.get(target.name);
                if (singletonPlugs !== undefined) {
                    if (instanceArr.length > 0) {
                        let singletonInstance = new singletonPlugs(...args);
                        this.varInjection(singletonInstance);
                        this.setterInjection(singletonInstance);
                        this.singletonInstanceMap.set(target.name, singletonInstance);
                        return singletonInstance;
                    }
                    let singletonInstance = new singletonPlugs();
                    this.varInjection(singletonInstance);
                    this.setterInjection(singletonInstance);
                    this.singletonInstanceMap.set(target.name, singletonInstance);
                    return singletonInstance;
                } else {
                    console.error(`Container-constructor-log:${target.name} is not register!`);
                    return undefined;

                }
            }
            return undefined;
        }
    }

    /**注入实例的属性和setter */
    public injectInstance<T>(target: T): T {
        let oneInstance = this.varInjection(target);
        let twoInstance = this.setterInjection(oneInstance);
        return twoInstance;
    }
    /**获取模块依赖的插件关系 */
    private getProviders(className: string): Array<Constructor> {
        if (this.injectableMap.has(className)) {
            return this.injectableMap.get(className);
        }
        return undefined;
    }
    /**获取一个插件 */
    getPlugin<T>(pluginName: Constructor<T>): T {
        if(GameGlobal.Config.isDebug) console.log(`Container-log: getPlugin :${pluginName.name}`);
        if (this.singletonInstanceMap.has(pluginName.name)) {
            return this.singletonInstanceMap.get(pluginName.name);
        }
        if (this.singletonPluginMap.has(pluginName.name)) {
            let singletonInstance = this.constructorInjection(this.singletonPluginMap.get(pluginName.name));
            let twoInstance = this.varInjection(singletonInstance);
            let threeInstance = this.setterInjection(twoInstance);
            this.singletonInstanceMap.set(pluginName.name, threeInstance);
            return threeInstance;
        }
        if (this.PluginMap.has(pluginName.name)) {
            let pluginClass = this.PluginMap.get(pluginName.name);
            if (pluginClass !== undefined) {
                let newPlugin = this.constructorInjection(pluginClass);
                this.varInjection(newPlugin);
                this.setterInjection(newPlugin);
                return newPlugin;
            }
        }
        return undefined;
    }
    /**获取一个插件（类名） */
    getPluginByName<T>(pluginName: string): T {
        if(GameGlobal.Config.isDebug) console.log(`Container-log: getPluginByName :${pluginName}`);
        if (this.singletonInstanceMap.has(pluginName)) {
            return this.singletonInstanceMap.get(pluginName);
        }
        if (this.singletonPluginMap.has(pluginName)) {
            let singletonInstance = this.constructorInjection(this.singletonPluginMap.get(pluginName));
            let twoInstance = this.varInjection(singletonInstance);
            let threeInstance = this.setterInjection(twoInstance);
            this.singletonInstanceMap.set(pluginName, threeInstance);
            return threeInstance;
        }
        if (this.PluginMap.has(pluginName)) {
            let pluginClass = this.PluginMap.get(pluginName);
            if (pluginClass !== undefined) {
                let newPlugin = this.constructorInjection(pluginClass);
                this.varInjection(newPlugin);
                this.setterInjection(newPlugin);
                return newPlugin;
            }
        }
        return undefined;
    }

    getPluginClassByName<T>(pluginName: string): Constructor<T> {
        if(GameGlobal.Config.isDebug) console.log(`Container-log: getPluginByName :${pluginName}`);
        if (this.singletonPluginMap.has(pluginName)) {
            return this.singletonPluginMap.get(pluginName);
        }
        if (this.PluginMap.has(pluginName)) {
            let pluginClass = this.PluginMap.get(pluginName);
            if (pluginClass !== undefined) {
                return pluginClass;
            }
        }
        return undefined;
    }

    selectPlugByName(pluginName: string): any {
        if (this.singletonPluginMap.has(pluginName)) {
            return this.singletonPluginMap.get(pluginName);
        }
        if (this.PluginMap.has(pluginName)) {
            return this.PluginMap.get(pluginName);
        }
        return undefined;
    }
}
//#endregion

//#region 装饰器和接口
export interface IPlugs {
    /**注入插件 */
    importPlugs(...args: any[]): void
}
export type Constructor<T = any> = new (...args: any[]) => T;

/**注入装饰器
 * @param arr 插件数组
 */
export const MInjectable = (arr?: Array<Constructor<any>>) => {
    return function (target: any) {
        let arrName = [];
        arr.forEach(item => arrName.push(item.name));
        if(GameGlobal.Config.isDebug) console.log("Injectable-log:Injectable", target.name, arrName);
        MContainer.instance[`injectableMap`].set(target.name, arr)
    }
}

/**属性装饰器
 * @param 要注入的类
 * @example
 * class A{
 *     @MPropertiesInject(B)
 *     private _b:B
 * }
 */
export const MPropertiesInject = (classtype: any) => {
    return (target: any, propertyKey: string) => {
        if(GameGlobal.Config.isDebug) console.log(`MPropertiesInject`, target, propertyKey, classtype.name)
        if (MContainer.instance[`varMap`].has(target.constructor.name)) {
            MContainer.instance[`varMap`].get(target.constructor.name).push([propertyKey, classtype.name])
        } else {
            MContainer.instance[`varMap`].set(target.constructor.name, [[propertyKey, classtype.name]])
        }
    }
}

/**构造注入器
 * @param 要注入的类
 * @example
 * class A{
 *      constructor(@MConstructorInject(B) private _b:B){}
 * }
 */
export const MConstructorInject = (classtype: any) => {
    return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
        // console.error(`MConstructorInject`,target.constructor.name,propertyKey,parameterIndex,classtype.name
        if (MContainer.instance[`constructorMap`].has(target.name)) {
            MContainer.instance[`constructorMap`].get(target.name).push([parameterIndex, classtype.name])
        } else {
            MContainer.instance[`constructorMap`].set(target.name, [[parameterIndex, classtype.name]])
        }
    }
}
/**插件
 * 每个模块注入的是一个单独的对象，与其他模块不共用
 * @example
 * //
 *  @MPlugin()
 *  class A{}
 */
export const MPlugin = () => {
    return function (target: any) {
        MContainer.instance[`registerPlugin`](target.name, target);
    }
}
/**单例插件
 * 全局共用一个对象
 */
export const MSingletonPlugin = () => {
    return function (target: any) {
        MContainer.instance[`registerSingletonPlugin`](target.name, target);
    }
}
//#endregion

//######################################################################################################################
//内部插件：插件可以依赖插件，Injectable装饰器中注入的顺序需要跟importPlugs中的顺序一致!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//#region rpc插件
@MSingletonPlugin()
export class RpcPlugin {

    private rpcMap: Map<string, any> = new Map();

    private initListener() {
        console.warn(`RpcPlugin: initListener`);
        if (mw.SystemUtil.isClient()) {
            Event.addServerListener("RpcPlugin_Client", (objName: string, funName: string, ...args) => {
                let obj = MContainer.instance.getPluginByName(objName);
                obj[funName](...args);
            })
            Event.addServerListener("RpcPlugin_Client_Net", (objName: string, funName: string, ...args) => {
                let obj = MContainer.instance.getPluginByName(objName);
                obj[funName](...args);
            })
        }
        if (mw.SystemUtil.isServer()) {
            Event.addClientListener("RpcPlugin_Server", (player: mw.Player, objName: string, funName: string, ...args) => {
                let obj = MContainer.instance.getPluginByName(objName);
                obj[funName](player, ...args);
            })
            Event.addClientListener("RpcPlugin_Server_Net", (player: mw.Player, objName: string, funName: string, ...args) => {
                let obj = MContainer.instance.getPluginByName(objName);
                obj[funName](player, ...args);
            })
        }
    }
    /**
     * 调用客户端方法（用于插件通讯）
     * @param player 玩家
     * @param properties 原型对象（类名）例如：this或者其他this.plugin插件
     * @param fun 方法
     * @param args 参数
     */
    public client(player: mw.Player, properties: any, fun: Function, ...args: any[]) {
        let objName = properties.constructor.name;
        let funName = fun.name;
        //本地先初步校验一次（失败就不通讯了）
        let obj = MContainer.instance.selectPlugByName(objName);
        if (!obj) { console.error(`RpcPlugin-Error:调用客户端类"${objName}"不存在`); }
        else {
            let fun = obj.prototype[funName];
            if (!fun) { console.error(`RpcPlugin-Error:调用客户端方法"${objName}.${funName}"不存在`); }
            else {
                Event.dispatchToClient(player, `RpcPlugin_Client`, objName, funName, ...args)
            }
        }
    }
    /**
     * 调用所有客户端方法（用于插件通讯）
     * @param properties 原型对象（类名）例如：this或者其他this.plugin插件
     * @param fun 方法
     * @param args 参数
     */
    public allClient(properties: any, fun: Function, ...args: any[]) {
        let objName = properties.constructor.name;
        let funName = fun.name;
        //本地先初步校验一次（失败就不通讯了）
        let obj = MContainer.instance.selectPlugByName(objName);
        if (!obj) { console.error(`RpcPlugin-Error:调用客户端类"${objName}"不存在`); }
        else {
            let fun = obj.prototype[funName];
            if (!fun) { console.error(`RpcPlugin-Error:调用客户端方法"${objName}.${funName}"不存在`); }
            else {
                Event.dispatchToAllClient(`RpcPlugin_Client`, objName, funName, ...args)
            }
        }
    }
    /**
     * 请求服务器方法（用于插件通讯）
     * @param properties 原型对象（类名）例如：this或者其他this.plugin插件
     * @param fun 方法
     * @param args 参数（服务端方法第一个参数固定为player）
     */
    public server(properties: any, fun: Function, ...args: any[]) {
        let objName = properties.constructor.name;
        let funName = fun.name;
        //本地先初步校验一次（失败就不通讯了）
        let obj = MContainer.instance.selectPlugByName(objName);
        if (!obj) { console.error(`RpcPlugin-Error:请求服务端类"${objName}"不存在`); }
        else {
            console.error(`请求方法`, objName, funName)
            let fun = obj.prototype[funName];
            if (!fun) { console.error(`RpcPlugin-Error:请求服务端方法"${objName}.${funName}"不存在`); }
            else {
                Event.dispatchToServer(`RpcPlugin_Server`, objName, funName, ...args)
            }
        }
    }
    // 注册形式通讯。。待完成
    // public registerRpc(s: Constructor<any>, c: Constructor<any>) {
    //     if (mw.SystemUtil.isServer()) {
    //         let newc = new c();
    //         newc[`RPC_TYPE`] = null;
    //         newc[`RPC_OBJ`] = null;
    //         for (let key in newc) {
    //             if (typeof newc[key] == "function") {
    //                 newc[key] = function (...args) {
    //                     if (this[`RPC_TYPE`] == `Client`) {
    //                         Event.dispatchToClient(this[`RPC_OBJ`], `RpcPlugin_Server_Net`, c.name, key, ...args);
    //                     }
    //                     if (this[`RPC_TYPE`] == `allClient`) {
    //                         Event.dispatchToAllClient(`RpcPlugin_Server_Net`, c.name, key, ...args);
    //                     }

    //                 }.bind(newc)
    //             }
    //         }
    //     }
    // }
    // public clientObj<T>(Player: mw.Player, obj: Constructor<T>): T {
    //     return
    // }
}
//#endregion


