import { MConstructorInject, MSingletonPlugin } from "../framework/DI/MContainer";
import { MObject } from "../framework/Object/MObject";
import { GameGlobal } from "../globel/GameGlobel";
import { Logger, LoggerManager } from "./LoggerTool";
import { MGSTool } from "./MGSToos";

@MSingletonPlugin()
export class ClientData extends MObject {

    constructor(
        @MConstructorInject(LoggerManager) logger: LoggerManager
    ) {
        super();
        this.log = logger.getLogger(ClientData);
    }

    private log: Logger

    private clientData: any;
    public init() {
        // if (GameGlobal.Config.isDebug) {
        //     this.clientData = "{\n    \"botID\": 83,\n    \"botData\": {\n        \"greeting\": \"这是greeting\",\n      \"gender\": 9,\n  \"bgm\": \"264214\" \n   },\n    \"sceneGuid\": \"352237\",\n    \"botGuid\": \"142894\"\n}"
        // }else{
        //     this.clientData = mw[`getGameTransmissionData`]();
        // }
        // if (!this.clientData) {
        //     this.log.throwErr("获取客户端数据失败");
        // } else {
        //     try {
        //         this.log.warn("获取客户端数据成功", JSON.stringify(this.clientData));
        //         MGSTool.setAibotloading_start(JSON.parse(this.clientData).botID);
        //     } catch (e) {
        //         this.log.warn("获取客户端数据成功,但是埋点发送失败", this.clientData);
        //     }
        // }
    }

    public getClientData() {
        // 测试数据
        // return {
        //     botId:1,
        //     botData:`{"greeting":"这是greeting"}`,
        //     sceneGuid:"347094",
        //     botGuid:"143226"
        // }
        this.log.warn("解析客户端数据", this.clientData);
        // try {
        //     let json = JSON.parse(this.clientData);
        //     if(GameGlobal.Config.isDebug) {
        //         json.botGuid = GameGlobal.Config.botId != ""?GameGlobal.Config.botId:json.botGuid;
        //         json.sceneGuid = GameGlobal.Config.sceneId != ""?GameGlobal.Config.sceneId:json.sceneGuid;
        //         json.botData.gender = GameGlobal.Config.sex?9:10;
        //     }
        //     return json;
        // } catch (e) {
        //     this.log.throwErr("解析客户端数据失败", e, this.clientData);
        //     return null;
        // }
    }
}