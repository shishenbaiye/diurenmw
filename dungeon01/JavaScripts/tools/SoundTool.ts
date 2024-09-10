import { MConstructorInject, MSingletonPlugin, RpcPlugin } from "../framework/DI/MContainer";
import { MObject } from "../framework/Object/MObject";
import { AssetsLoadTool } from "./AssetsLoadTool";
import { Logger, LoggerManager } from "./LoggerTool";

@MSingletonPlugin()
export class SoundTool extends MObject{
    constructor(@MConstructorInject(LoggerManager) logger:LoggerManager,@MConstructorInject(RpcPlugin) private rpc:RpcPlugin){
        super();
        this.log = logger.getLogger(SoundTool);
    }
    private log:Logger;

    async init(assets?:string[]){
        this.log.warn(`初始化声音工具`)
        if(assets){
            await AssetsLoadTool.asyncLoad(assets);
        }
    }

    playBGM(assets:string){
        this.log.warn(`播放背景音乐${assets}`);
        if(assets){
            SoundService.playBGM(assets,0.5);
        }else{
            this.log.error(`播放背景音乐失败`);
        }   
    }
    
    playSound(assetId: string, loopCount?: number, volume?: number,player?:Player){
        if(SystemUtil.isClient()){
            this.log.warn(`播放音效${assetId}`);
            SoundService.playSound(assetId, loopCount, volume);
        }else{
            if(player){
                this.log.warn(`播放音效${assetId}`);
                this.rpc.client(player,this,this.c_playerSound,assetId,loopCount,volume);
            }else{
                SoundService.playSound(assetId, loopCount, volume);
            }
        }
    }

    private c_playerSound(assetId: string, loopCount?: number, volume?: number){
        SoundService.playSound(assetId, loopCount, volume);
    }
}