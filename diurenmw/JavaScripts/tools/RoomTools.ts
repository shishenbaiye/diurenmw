import { MConstructorInject, MPropertiesInject, MSingletonPlugin } from "../framework/DI/MContainer";
import { MObject } from "../framework/Object/MObject";
import { LoggerManager, Logger } from "./LoggerTool";
import { PlatformMsgTool } from "./PlatformMsgTool";

@MSingletonPlugin()
export class RoomTools extends MObject{
    constructor(@MConstructorInject(LoggerManager) logger:LoggerManager){
        super();
        this.log = logger.getLogger(RoomTools);
    }
    private log:Logger;

    @MPropertiesInject(PlatformMsgTool)
    private platformMsgTool: PlatformMsgTool;


    /**跳转房间 */
    public async jumpToPlayerRoom(userid: string) {
        const senceId = RouteService.getGameId();
        const ownerRoomid = senceId + "-" + userid;
        console.warn(`准备开始跳房间:`, senceId, userid)
        const mgsGameId = await mw.RouteService.requestMGSGameId(senceId);
        const rooidFromCp = ownerRoomid;
        console.warn(`目标房间参数：`, mgsGameId, rooidFromCp)
        RouteService[`getInstance`]()["followRoom"](mgsGameId, rooidFromCp);
    }


    private jumpGameid: string = "";
    /**跳转游戏 */
    public async jumpToUGCGame(gameId: string) {
        this.jumpGameid = gameId;
        this.log.warn(`准备跳转到游戏`, gameId);
        RouteService.enterNewGame(gameId);
        // this.platformMsgTool.addListener("bridge.action.editor.template",(data:any)=>{
        //     if(data){
        //         let odata = JSON.parse(data);
        //         this.log.warn(`收到客户端获取路径消息`,data);
        //         let path = odata.data.typeData[0].path;
        //         if(path){
        //             RouteService.enterLocalGame(this.jumpGameid, path)
        //         }
        //     }
        // });

        // this.platformMsgTool.sendTo(
        // {
        //     "action": "ue.action.editor.template",
        //     "data": {
        //         // 3. 本地工程目录列表
        //         "type": 3
        //     }
        // });
    }
}