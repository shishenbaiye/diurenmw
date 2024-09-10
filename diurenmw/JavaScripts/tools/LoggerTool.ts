import { Constructor, MSingletonPlugin } from "../framework/DI/MContainer";

/**只显示哪些模块的日志，空的话就不做限制 */
const ONLYSHOW = [];
/**是否开启日志 */
const WORKING = true;

@MSingletonPlugin()
export class LoggerManager{
    private _loggerMap:Map<string,Logger> = new Map<string,Logger>();
    // 默认开启日志输出
    private _isWorking:boolean = WORKING;
    private _onlyShow:string[] = ONLYSHOW;

    public set working(value:boolean){
        this._isWorking = value;
        this._loggerMap.forEach((value,key,map)=>{
            value.working = this._isWorking;
        });
    }
    /**获取一个日志对象
     * @param Class 类名
     * @param customString 自定义字符串（可为空）
     * @returns 日志对象
     * @example
     * const logger = LoggerManager.getInstance().getLogger("TestModule","test");
     * logger.error("test");
     * const logger2 = LoggerManager.getInstance().getLogger(TestModule,"test");
     * logger2.error("test");
     */
    public getLogger(Class:Constructor|string,customString?:string):Logger{
        let logger:Logger;
        if(typeof Class === "string"){
            if(this._loggerMap.has(Class)){
                logger = this._loggerMap.get(Class);
            }else{
                logger = new Logger(Class,customString);
                this._loggerMap.set(Class,logger);
            }
            if(this._onlyShow.length === 0){
                logger.working = this._isWorking;
            }else{
                if(this._onlyShow.indexOf(Class) !== -1){
                    logger.working = this._isWorking;
                }else{
                    logger.working = false;
                }
            }
           
        }
        if(typeof Class === "function"){
            if(this._loggerMap.has(Class.name)){
                logger = this._loggerMap.get(Class.name);
            }else{
                logger = new Logger(Class,customString);
                this._loggerMap.set(Class.name,logger);
            }
            if(this._onlyShow.length === 0){
                logger.working = this._isWorking;
            }else{
                if(this._onlyShow.indexOf(Class.name) !== -1){
                    logger.working = this._isWorking;
                }else{
                    logger.working = false;
                }
            }
        }
       
        return logger;
    }
}

export class Logger{
    private _className:string;
    private _custom:string;
    private _isWorking:boolean;
    constructor(Class:string,customString?:string);
    constructor(Class:Constructor,customString?:string);

    constructor(Class:Constructor|string,customString?:string){
        if(typeof Class === "string"){
            this._className = Class;
        }
        if(typeof Class === "function"){
            this._className = Class.name;
        }
        if(customString){
            this._custom = customString;
        }else{
            this._custom = "";
        }
        
        this._isWorking = true;
    }


    set working(value:boolean){
        this._isWorking = value;
    }

    public error(...params:any[]){
        if(this._isWorking){
            if(this._custom){
                console.error(`MLOG [ ${this._className} ] : <${this._custom}> `,...params);
            }else{
                console.error(`MLOG [ ${this._className} ] : `,...params);
            }
            
        }       
    }

    public log(...params:any[]){
        if(this._isWorking){
            if(this._custom){
                console.log(`MLOG [ ${this._className} ] : <${this._custom}> `,...params);
            }else{
                console.log(`MLOG [ ${this._className} ] : `,...params);
            }
        }
    }

    public warn(...params:any[]){
        if(this._isWorking){
            if(this._custom){
                console.warn(`MLOG [ ${this._className} ] : <${this._custom}> `,...params);
            }else{
                console.warn(`MLOG [ ${this._className} ] : `,...params);
            }  
        }
    }

    public throwErr(...params:any[]){
        if(this._isWorking){
            if(this._custom){
                throw new Error(`MLOG [ ${this._className} ] : <${this._custom}>  ${params}`);
            }else{
                throw new Error(`MLOG [ ${this._className} ] : ${params}`);
            }  
        }
    }
    
}