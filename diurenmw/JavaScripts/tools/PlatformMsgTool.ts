import { GameEventBus } from "../common/eventBus/EventBus";
import { MConstructorInject, MSingletonPlugin } from "../framework/DI/MContainer";
import { MObject } from "../framework/Object/MObject";
import { Logger, LoggerManager } from "./LoggerTool";

@MSingletonPlugin()
export class PlatformMsgTool extends MObject{

    constructor(@MConstructorInject(LoggerManager) private logger:LoggerManager){
        super();
        this.log = logger.getLogger(PlatformMsgTool);
    }

    private log:Logger;

    register(actionArray:string[]){
        actionArray.forEach((action)=>{
            mw.MessageChannelService.registerAction(action,this,(data)=>{
                this.log.warn(`PlatformMsgTool receive action:${action} data:${data}`);
                GameEventBus.emit(action,data);
            });
        })
    }

    addListener(action:string,fun:(...data:any[])=>void){
        GameEventBus.on(action,fun);
    }

    sendTo(data:any){
        try{
            let datastring = JSON.stringify(data);
            this.log.warn(`PlatformMsgTool sendTo data:${datastring}`);
            mw.MessageChannelService.sendTo(MessageChannelReceiver.Client,datastring);
        }catch(e){
            this.log.error(`PlatformMsgTool sendTo error`,e);
        }
    }
    
}