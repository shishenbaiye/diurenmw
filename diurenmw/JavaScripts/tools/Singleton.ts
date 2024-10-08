export type Constructor<T = unknown> = new (...args: any[]) => T;


/**
 * 单例模板父类
 */
export class Singleton {
    /**
     * 获取单例
     * @param this 
     * @returns 
     */
    static getInstance<T extends {}>(this: new () => T): T {
        if (!(<any>this).instance) {
            (<any>this).instance = new this();
        }
        return (<any>this).instance;
    }
}