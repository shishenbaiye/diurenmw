import { DSEventModuleC } from "./DSEventModuleC";

/**
 * 节点服务信息
 */
class DSNodeServerInfo {

    public sid: string = "";
    public createTime: number = Date.now();
    public latestUpdateTime: number = Date.now();
    public lifeTime: number = 0;
    public isMaster: boolean = false;
    public version: number = 0;

    public constructor(uid: string, lifeTime: number, _version: number = 0) {
        this.sid = uid;
        this.lifeTime = lifeTime;
        if (_version == 0) {
            let version = SystemUtil.getVersion()
            let splitVersion = version.split('.');
            let verCount = 1;
            let verNum = 0;
            for (let i = splitVersion.length - 1; i >= 0; i--) {
                verNum += parseInt(splitVersion[i]) * verCount;
                verCount *= 1000;
            }
            this.version = verNum;
        } else {
            this.version = _version;
        }
    }

    public updateLifeTime(dt: number) {
        this.lifeTime += dt;
    }

    public toJson(): string {
        return JSON.stringify(this);
    }

}

/**
 * 节点pingpong时间
 */
const updateInterval = 2500;
/**
 * 活跃节点数量
 */
const activeNodeCount = 2;
/**
 * 清理条件索引 (将会清理小于这个index的节点)
 */
const clearConditionIndex = 1;

/**
 * 节点超时时间
 */
const nodeServerTimeout = 6000;

const updateMatchServerKey = "updateMatchServer";
const syncMatchServerAckKey = "syncMatchServerAck";
const syncMatchServerKey = "syncMatchServer";
const IgnoreVersionKey = "IgnoreVersion";
const BySceneKey = "ByScene";

/**
 * 节点服务查询表 （忽略所有版本 Scene）
 */
class DSNodeServerTableByGameIgnoreVersion {

    public static instance: DSNodeServerTableByGameIgnoreVersion = new DSNodeServerTableByGameIgnoreVersion();

    private self: DSNodeServerInfo = null;
    private serverList: DSNodeServerInfo[] = [];
    private serverMap: Map<string, DSNodeServerInfo> = new Map<string, DSNodeServerInfo>();
    private isInit = false;

    /**
     * 初始化监听
     */
    private initListen() {
        /**
         * 有匹配服务节点更新。
         */
        Event.addGameEventListener(updateMatchServerKey + IgnoreVersionKey, (msg: string) => {
            let svrInfoMsg = JSON.parse(msg) as DSNodeServerInfo;
            // console.error("updateMatchServerIgnoreVersion : " + svrInfoMsg.sid)

            let svrInfo = new DSNodeServerInfo(svrInfoMsg.sid, svrInfoMsg.lifeTime, svrInfoMsg.version);

            svrInfo.createTime = svrInfoMsg.createTime;
            svrInfo.version = svrInfoMsg.version;
            //svrInfo.latestUpdateTime = svrInfoMsg.latestUpdateTime;

            if (this.serverMap.has(svrInfo.sid)) {
                let cache = this.serverMap.get(svrInfo.sid);
                cache.lifeTime = svrInfoMsg.lifeTime;
                cache.latestUpdateTime = Date.now();
            } else {
                this.addServer(svrInfo);
            }
            this.chooseMaster();
        })
    }

    /**
     * 初始化
     * @param self
     * @returns
     */
    public async init(self: DSNodeServerInfo) {

        if (this.isInit) {
            // console.error("[IgnoreVersion]MatchServerTable already init!")
            return;
        }
        // console.error("[IgnoreVersion]MatchServerTable init start!")

        this.self = self;

        //同步完整服务List
        await this.syncServerList();

        //监听服务
        this.initListen();

        //更新自己的匹配服务信息
        this.updateNodeInfo(this.self);

        this.isInit = true;
        // console.error("[IgnoreVersion]MatchServerTable init success!");

    }

    /**
     *
     * @param self 更新自己的匹配服务信息
     */

    private lateUpdateMatchServer = 0;


    /**
     * 更新服务信息
     * @param self
     * @returns
     */
    public updateNodeInfo(self: DSNodeServerInfo) {

        let now = Date.now();
        if (now - this.lateUpdateMatchServer < updateInterval) {
            return;
        }

        if (mw.Player.getAllPlayers().length <= 0) return;

        this.lateUpdateMatchServer = now;
        self.latestUpdateTime = now;

        // console.error("[Global]========================")
        // console.error("[Global]自己 : " + self.sid)
        let index = -1;
        for (let i = 0; i < this.serverList.length; i++) {

            // console.error("[Global]对比 : " + this.serverList[i].sid)
            if (this.serverList[i].sid == self.sid) {
                index = i;
                break;
            }
        }
        if (index >= activeNodeCount) {
            return;
        }

        // console.error("[Global]提交自己的更新信息 : " + index);

        Event.dispatchGameEvent(updateMatchServerKey + IgnoreVersionKey, self.toJson());

    }

    /**
     * 同步服务列表
     * @returns
     */
    private async syncServerList(): Promise<void> {

        return new Promise((resolve, reject) => {

            /**
             * 2s 超时，自己当主机
             */
            let timeout = setTimeout(() => {
                // console.error("syncMatchServerAck timeout");
                resolve();
            }, 2000);

            /**
             * 同步下发回来
             */
            Event.addGameEventListener(syncMatchServerAckKey + IgnoreVersionKey, (msg: string) => {
                // console.error(syncMatchServerAckKey + IgnoreVersionKey);
                clearTimeout(timeout);
                let list = JSON.parse(msg) as DSNodeServerInfo[];
                this.serverList = [];
                this.serverMap = new Map();
                list.forEach(e => {
                    let newInfo = new DSNodeServerInfo(e.sid, e.lifeTime, e.version);
                    newInfo.createTime = e.createTime;
                    newInfo.isMaster = e.isMaster;
                    newInfo.latestUpdateTime = e.latestUpdateTime;
                    this.addServer(newInfo);
                })
                resolve();
            });

            /**
             * master 同步请求
             */
            Event.addGameEventListener(syncMatchServerKey + IgnoreVersionKey, (msg: string) => {

                if (this.localIsMaster()) {
                    // console.error("syncMatchServerAckIgnoreVersion")
                    Event.dispatchGameEvent(syncMatchServerAckKey + IgnoreVersionKey, JSON.stringify(this.serverList));
                }

            })

            /**
             * 提交同步请求
             */
            Event.dispatchGameEvent(syncMatchServerKey + IgnoreVersionKey, "req");

        })

    }

    /**
     * 添加服务
     * @param server
     */
    private addServer(server: DSNodeServerInfo) {
        this.serverList.push(server);
        this.serverMap.set(server.sid, server);
        server.latestUpdateTime = Date.now();
    }

    /**
     * 选择主机
     */
    public chooseMaster() {

        /**
         * 自己之前是否是Master
         */

        let selfIsMaster = (this.serverList.length > 0 && this.serverList[0].sid == this.self.sid);

        let remove = [];
        let newList = [];

        for (let i = 0; i < this.serverList.length; i++) {
            let info = this.serverList[i];
            if (Date.now() - info.latestUpdateTime > nodeServerTimeout && i < clearConditionIndex) {
                remove.push(info);
            } else {
                newList.push(info);
            }
            info.isMaster = false;
        }

        remove.forEach(e => {
            this.serverMap.delete(e.sid);
        })

        this.serverList = newList;

        this.serverList.sort((a, b) => {

            if (b.version == a.version) {
                return a.createTime - b.createTime;
            }

            return ((b.version - a.version));
        });

        if (this.serverList.length > 0) {
            this.serverList[0].isMaster = true;
        }

        /**
         * 自己Master被取消了
         */
        if (selfIsMaster && this.localIsMaster() == false) {
            DSEventService.getAllDSEvent().forEach(e => {
                e.onCancelMaster(DSBroadcastTypeEnum.Game, true);
            })

        }

        if (!selfIsMaster && this.localIsMaster() == true) {
            DSEventService.getAllDSEvent().forEach(e => {
                e.onConfirmMaster(DSBroadcastTypeEnum.Game, true);
            })
        }

    }

    /**
     * 获取主机sid
     * @returns
     */
    public getMasterSid() {
        if (this.serverList.length > 0) {
            return this.serverList[0].sid;
        }
        return "";
    }

    /**
     * 获取存活服务数量
     * @returns
     */
    public getServerCount(): number {
        return this.serverList.length;
    }

    /**
     * 是否是Master
     * @returns
     */
    public localIsMaster(): boolean {
        return this.isInit && this.serverList.length > 0 && this.serverList[0].isMaster && this.serverList[0].sid == this.self.sid && mw.Player.getAllPlayers().length > 0;
    }

}

/**
 * 节点服务查询表 (不忽略版本 Scene)
 */
class DSNodeServerTable {

    public static instance: DSNodeServerTable = new DSNodeServerTable();

    private self: DSNodeServerInfo = null;
    private serverList: DSNodeServerInfo[] = [];
    private serverMap: Map<string, DSNodeServerInfo> = new Map<string, DSNodeServerInfo>();
    private isInit = false;

    /**
     * 初始化监听
     */
    private initListen() {
        /**
         * 有匹配服务节点更新。
         */
        Event.addGameEventListener(updateMatchServerKey, (msg: string) => {
            let svrInfoMsg = JSON.parse(msg) as DSNodeServerInfo;

            let svrInfo = new DSNodeServerInfo(svrInfoMsg.sid, svrInfoMsg.lifeTime, svrInfoMsg.version);

            svrInfo.createTime = svrInfoMsg.createTime;
            svrInfo.version = svrInfoMsg.version
            //svrInfo.latestUpdateTime = svrInfoMsg.latestUpdateTime;

            if (this.serverMap.has(svrInfo.sid)) {
                let cache = this.serverMap.get(svrInfo.sid);
                cache.lifeTime = svrInfoMsg.lifeTime;
                cache.latestUpdateTime = Date.now();
            } else {
                this.addServer(svrInfo);
            }
            this.chooseMaster();
        })
    }

    /**
     * 初始化
     * @param self 
     * @returns 
     */
    public async init(self: DSNodeServerInfo) {

        if (this.isInit) {
            // console.error("MatchServerTable already init!")
            return;
        }
        // console.error("MatchServerTable init start!")

        this.self = self;

        //同步完整服务List
        await this.syncServerList();

        //监听服务
        this.initListen();

        //更新自己的匹配服务信息
        this.updateNodeInfo(this.self);

        this.isInit = true;
        // console.error("MatchServerTable init success!");

    }

    /**
     * 
     * @param self 更新自己的匹配服务信息
     */

    private lateUpdateMatchServer = 0;

    /**
     * 更新服务信息
     * @param self 
     * @returns 
     */
    /**
     * 更新服务信息
     * @param self
     * @returns
     */
    public updateNodeInfo(self: DSNodeServerInfo) {

        let now = Date.now();
        if (now - this.lateUpdateMatchServer < updateInterval) {
            return;
        }

        if (mw.Player.getAllPlayers().length <= 0) return;

        this.lateUpdateMatchServer = now;
        self.latestUpdateTime = now;

        // console.error("========================")
        // console.error("自己 : " + self.sid)
        let index = -1;
        for (let i = 0; i < this.serverList.length; i++) {

            // console.error("对比 : " + this.serverList[i].sid)
            if (this.serverList[i].sid == self.sid) {
                index = i;
                break;
            }
        }
        if (index >= activeNodeCount) {
            return;
        }

        // console.error("提交自己的更新信息 : " + index);
        Event.dispatchGameEvent(updateMatchServerKey, self.toJson());

    }

    /**
     * 同步服务列表
     * @returns 
     */
    private async syncServerList(): Promise<void> {

        return new Promise((resolve, reject) => {

            /**
             * 2s 超时，自己当主机
             */
            let timeout = setTimeout(() => {
                // console.error("syncMatchServerAck timeout");
                resolve();
            }, 2000);

            /**
             * 同步下发回来
             */
            Event.addGameEventListener(syncMatchServerAckKey, (msg: string) => {
                // console.error(syncMatchServerAckKey);
                clearTimeout(timeout);
                let list = JSON.parse(msg) as DSNodeServerInfo[];
                this.serverList = [];
                this.serverMap = new Map();
                list.forEach(e => {
                    let newInfo = new DSNodeServerInfo(e.sid, e.lifeTime, e.version);
                    newInfo.createTime = e.createTime;
                    newInfo.isMaster = e.isMaster;
                    newInfo.latestUpdateTime = e.latestUpdateTime;
                    this.addServer(newInfo);
                })
                resolve();
            });

            /**
             * master 同步请求
             */
            Event.addGameEventListener(syncMatchServerKey, (msg: string) => {

                if (this.localIsMaster()) {
                    // console.error(syncMatchServerAckKey)
                    Event.dispatchGameEvent(syncMatchServerAckKey, JSON.stringify(this.serverList));
                }

            })

            /**
             * 提交同步请求
             */
            Event.dispatchGameEvent(syncMatchServerKey, "req");

        })

    }

    /**
     * 添加服务
     * @param server 
     */
    private addServer(server: DSNodeServerInfo) {
        this.serverList.push(server);
        this.serverMap.set(server.sid, server);
        server.latestUpdateTime = Date.now();
    }

    /**
     * 选择主机
     */
    public chooseMaster() {

        /**
         * 自己之前是否是Master
         */

        let selfIsMaster = (this.serverList.length > 0 && this.serverList[0].sid == this.self.sid);

        let remove = [];
        let newList = [];

        for (let i = 0; i < this.serverList.length; i++) {
            let info = this.serverList[i];
            if (Date.now() - info.latestUpdateTime > nodeServerTimeout && i < clearConditionIndex) {
                remove.push(info);
            } else {
                newList.push(info);
            }
            info.isMaster = false;
        }

        remove.forEach(e => {
            this.serverMap.delete(e.sid);
        })

        this.serverList = newList;

        this.serverList.sort((a, b) => {

            if (b.version == a.version) {
                return a.createTime - b.createTime;
            }

            return ((b.version - a.version));
        });

        if (this.serverList.length > 0) {
            this.serverList[0].isMaster = true;
        }

        /**
         * 自己Master被取消了
         */
        if (selfIsMaster && this.localIsMaster() == false) {
            DSEventService.getAllDSEvent().forEach(e => {
                e.onCancelMaster(DSBroadcastTypeEnum.Game, false);
            })

        }

        if (!selfIsMaster && this.localIsMaster() == true) {
            DSEventService.getAllDSEvent().forEach(e => {
                e.onConfirmMaster(DSBroadcastTypeEnum.Game, false);
            })
        }

    }

    /**
     * 获取主机sid
     * @returns 
     */
    private getMasterSid() {
        if (this.serverList.length > 0) {
            return this.serverList[0].sid;
        }
        return "";
    }

    public static getMasterSid(type: DSBroadcastTypeEnum, ingoreVersion: boolean): string {
        if (type == DSBroadcastTypeEnum.Scene) {
            return DSNodeServerTableByScene.getMasterSid(ingoreVersion);
        }
        if (ingoreVersion) return DSNodeServerTableByGameIgnoreVersion.instance.getMasterSid();
        return this.instance.getMasterSid()
    }

    /**
     * 获取存活服务数量
     * @returns 
     */
    public getServerCount(): number {
        return this.serverList.length;
    }

    /**
     * 是否是Master
     * @returns 
     */
    private localIsMaster(): boolean {
        return this.isInit && this.serverList.length > 0 && this.serverList[0].isMaster && this.serverList[0].sid == this.self.sid && mw.Player.getAllPlayers().length > 0;
    }

    public static localIsMaster(type: DSBroadcastTypeEnum, ingoreVersion: boolean = false): boolean {

        if (type == DSBroadcastTypeEnum.Scene) {
            return DSNodeServerTableByScene.localIsMaster();
        }

        if (ingoreVersion) return DSNodeServerTableByGameIgnoreVersion.instance.localIsMaster();
        return this.instance.localIsMaster();
    }

}

/**
 * 节点服务查询表 (不忽略版本 Scene)
 */
class DSNodeServerTableByScene {

    public static instance: DSNodeServerTableByScene = new DSNodeServerTableByScene();

    private self: DSNodeServerInfo = null;
    private serverList: DSNodeServerInfo[] = [];
    private serverMap: Map<string, DSNodeServerInfo> = new Map<string, DSNodeServerInfo>();
    private isInit = false;

    /**
     * 初始化监听
     */
    private initListen() {
        /**
         * 有匹配服务节点更新。
         */
        Event.addSceneEventListener(updateMatchServerKey + BySceneKey, (msg: string) => {
            let svrInfoMsg = JSON.parse(msg) as DSNodeServerInfo;

            let svrInfo = new DSNodeServerInfo(svrInfoMsg.sid, svrInfoMsg.lifeTime, svrInfoMsg.version);

            svrInfo.createTime = svrInfoMsg.createTime;
            svrInfo.version = svrInfoMsg.version
            //svrInfo.latestUpdateTime = svrInfoMsg.latestUpdateTime;

            if (this.serverMap.has(svrInfo.sid)) {
                let cache = this.serverMap.get(svrInfo.sid);
                cache.lifeTime = svrInfoMsg.lifeTime;
                cache.latestUpdateTime = Date.now();
            } else {
                this.addServer(svrInfo);
            }
            this.chooseMaster();
        })
    }

    /**
     * 初始化
     * @param self 
     * @returns 
     */
    public async init(self: DSNodeServerInfo) {

        if (this.isInit) {
            // console.error("MatchServerTable already init!")
            return;
        }
        // console.error("MatchServerTable init start!")

        this.self = self;

        //同步完整服务List
        await this.syncServerList();

        //监听服务
        this.initListen();

        //更新自己的匹配服务信息
        this.updateNodeInfo(this.self);

        this.isInit = true;
        // console.error("MatchServerTable init success!");

    }

    /**
     * 
     * @param self 更新自己的匹配服务信息
     */

    private lateUpdateMatchServer = 0;

    /**
     * 更新服务信息
     * @param self 
     * @returns 
     */
    /**
     * 更新服务信息
     * @param self
     * @returns
     */
    public updateNodeInfo(self: DSNodeServerInfo) {

        let now = Date.now();
        if (now - this.lateUpdateMatchServer < updateInterval) {
            return;
        }

        if (mw.Player.getAllPlayers().length <= 0) return;

        this.lateUpdateMatchServer = now;
        self.latestUpdateTime = now;

        // console.error("========================")
        // console.error("自己 : " + self.sid)
        let index = -1;
        for (let i = 0; i < this.serverList.length; i++) {

            // console.error("对比 : " + this.serverList[i].sid)
            if (this.serverList[i].sid == self.sid) {
                index = i;
                break;
            }
        }
        if (index >= activeNodeCount) {
            return;
        }

        // console.error("提交自己的更新信息 : " + index);
        Event.dispatchSceneEvent(updateMatchServerKey + BySceneKey, self.toJson());

    }

    /**
     * 同步服务列表
     * @returns 
     */
    private async syncServerList(): Promise<void> {

        return new Promise((resolve, reject) => {

            /**
             * 2s 超时，自己当主机
             */
            let timeout = setTimeout(() => {
                // console.error("syncMatchServerAck timeout");
                resolve();
            }, 2000);

            /**
             * 同步下发回来
             */
            Event.addSceneEventListener(syncMatchServerAckKey + BySceneKey, (msg: string) => {
                // console.error(syncMatchServerAckKey + BySceneKey);
                clearTimeout(timeout);
                let list = JSON.parse(msg) as DSNodeServerInfo[];
                this.serverList = [];
                this.serverMap = new Map();
                list.forEach(e => {
                    let newInfo = new DSNodeServerInfo(e.sid, e.lifeTime, e.version);
                    newInfo.createTime = e.createTime;
                    newInfo.isMaster = e.isMaster;
                    newInfo.latestUpdateTime = e.latestUpdateTime;
                    this.addServer(newInfo);
                })
                resolve();
            });

            /**
             * master 同步请求
             */
            Event.addSceneEventListener(syncMatchServerKey + BySceneKey, (msg: string) => {

                if (this.localIsMaster()) {
                    // console.error(syncMatchServerAckKey + BySceneKey)
                    Event.dispatchSceneEvent(syncMatchServerAckKey + BySceneKey, JSON.stringify(this.serverList));
                }

            })

            /**
             * 提交同步请求
             */
            Event.dispatchSceneEvent(syncMatchServerKey + BySceneKey, "req");

        })

    }

    /**
     * 添加服务
     * @param server 
     */
    private addServer(server: DSNodeServerInfo) {
        this.serverList.push(server);
        this.serverMap.set(server.sid, server);
        server.latestUpdateTime = Date.now();
    }

    /**
     * 选择主机
     */
    public chooseMaster() {

        /**
         * 自己之前是否是Master
         */

        let selfIsMaster = (this.serverList.length > 0 && this.serverList[0].sid == this.self.sid);

        let remove = [];
        let newList = [];

        for (let i = 0; i < this.serverList.length; i++) {
            let info = this.serverList[i];
            if (Date.now() - info.latestUpdateTime > nodeServerTimeout && i < clearConditionIndex) {
                remove.push(info);
            } else {
                newList.push(info);
            }
            info.isMaster = false;
        }

        remove.forEach(e => {
            this.serverMap.delete(e.sid);
        })

        this.serverList = newList;

        this.serverList.sort((a, b) => {

            if (b.version == a.version) {
                return a.createTime - b.createTime;
            }

            return ((b.version - a.version));
        });

        if (this.serverList.length > 0) {
            this.serverList[0].isMaster = true;
        }

        /**
         * 自己Master被取消了
         */
        if (selfIsMaster && this.localIsMaster() == false) {
            DSEventService.getAllDSEvent().forEach(e => {
                e.onCancelMaster(DSBroadcastTypeEnum.Scene, false);
            })

        }

        if (!selfIsMaster && this.localIsMaster() == true) {
            DSEventService.getAllDSEvent().forEach(e => {
                e.onConfirmMaster(DSBroadcastTypeEnum.Scene, false);
            })
        }

    }

    /**
     * 获取主机sid
     * @returns 
     */
    private getMasterSid() {
        if (this.serverList.length > 0) {
            return this.serverList[0].sid;
        }
        return "";
    }

    public static getMasterSid(ingoreVersion: boolean): string {
        return this.instance.getMasterSid()
    }

    /**
     * 获取存活服务数量
     * @returns 
     */
    public getServerCount(): number {
        return this.serverList.length;
    }

    /**
     * 是否是Master
     * @returns 
     */
    private localIsMaster(): boolean {
        return this.isInit && this.serverList.length > 0 && this.serverList[0].isMaster && this.serverList[0].sid == this.self.sid && mw.Player.getAllPlayers().length > 0;
    }

    public static localIsMaster(): boolean {
        return this.instance.localIsMaster();
    }

}

class DSPackage {

    sid: string = "";
    fid: string = "";
    params: any[] = [];

}

/**
 * DS事件服务
 */
class DSEventService {

    public static EventKey = "AtomicEvt_";

    private static atomicEventMap: Map<string, DSEvent> = new Map<string, DSEvent>();

    private static isInit: boolean = false;

    /**
     * 注册DS事件
     * @param cls 
     */
    public static registerDSEvent<T extends DSEvent>(cls: mw.TypeName<T>) {

        let name = cls.name || cls.constructor.name;

        if (this.atomicEventMap.has(name)) {
            // console.error("AtomicEventService.registerAtomicClass error! : " + name);
            return;
        }

        let val = new cls() as T;
        this.atomicEventMap.set(name, val);
        this.initEvt(name, val)

    }

    public static getAllDSEvent<T extends DSEvent>(): Map<string, DSEvent> {
        return this.atomicEventMap;
    }

    /**
     * 获取DS事件
     * @param cls 
     * @returns 
     */
    public static getDSEvent<T extends DSEvent>(cls: mw.TypeName<T>): T {
        let name = cls.name || cls.constructor.name;
        return this.atomicEventMap.get(name) as T;
    }

    public static evtBroadcast: Map<string, DSBroadcastTypeEnum> = new Map();
    public static evtWhoHandle: Map<string, DSWhoHandleEnum> = new Map();
    public static evtIgnoreVersion: Map<string, DSIgnoreVersion> = new Map();

    /**
     * 注册事件网络处理类型
     * @param evtName 
     * @param broadcastType 
     * @param whoHandle 
     */
    public static registerEventNetHandleType(evtName: string, broadcastType: DSBroadcastTypeEnum, whoHandle: DSWhoHandleEnum, ignoreVersion: DSIgnoreVersion = DSIgnoreVersion.None) {
        this.evtBroadcast.set(evtName, broadcastType);
        this.evtWhoHandle.set(evtName, whoHandle);
        this.evtIgnoreVersion.set(this.EventKey + evtName, ignoreVersion);
    }

    /**
     * 获取事件广播类型
     * @param evtName 
     * @returns 
     */
    public static getEventNetBroadcastType(evtName: string): DSBroadcastTypeEnum {

        if (!this.evtBroadcast.has(evtName)) {
            return DSBroadcastTypeEnum.None;
        }

        return this.evtBroadcast.get(evtName);
    }

    /**
     * 获取事件处理类型
     * @param evtName 
     * @returns 
     */
    public static getEventNetWhoHandle(evtName: string): DSWhoHandleEnum {

        if (!this.evtWhoHandle.has(evtName)) {
            return DSWhoHandleEnum.None;
        }

        return this.evtWhoHandle.get(evtName);
    }

    /**
     * 获取事件忽略版本类型
     * @param evtName 
     * @returns 
     */
    public static getIgnoreVersion(evtName: string): DSIgnoreVersion {
        if (!this.evtIgnoreVersion.has(evtName)) {
            return DSIgnoreVersion.None;
        }

        return this.evtIgnoreVersion.get(evtName);
    }

    /**
     * 处理网络返回值
     */
    private static net_CallResCache: Map<string, any> = new Map();
    private static net_CallEventIsRegister: boolean = false;

    private static isRegister: Map<string, boolean> = new Map();

    private static timeOutLog(text: string) {
        return;
        setTimeout(() => {
            console.error("timeOutLog => " + text)
        }, 30000)
    }

    /**
     * 初始化事件
     * @param className 
     * @param classInstance 
     * @param force 
     * @returns 
     */
    private static async initEvt(className: string, classInstance: any, force: boolean = false) {

        hookerComposeEventKey();

        let sidByScene = DSEventModuleS.localSidByScene;
        let sid = DSEventModuleS.localSid;
        let sidIngoreVersion = DSEventModuleS.localSidIgnoreVer;

        if (!this.isInit && !force) {
            return;
        }

        let v = classInstance;

        let names = Object.getOwnPropertyNames(Object.getPrototypeOf(v))
        let funcs = names.filter(name => typeof v[name] === 'function');

        //注册返回值事件
        if (this.net_CallEventIsRegister == false) {
            this.net_CallEventIsRegister = true;

            /**
             * 处理返回值
             */
            Event.addSceneEventListener(this.EventKey + "SceneRes" + sidByScene, (msg: string) => {

                let ins: DSPackage = JSON.parse(msg);

                if (this.net_CallResCache.has(ins.fid)) {
                    let resolve = this.net_CallResCache.get(ins.fid);
                    this.net_CallResCache.delete(ins.fid);
                    resolve(...ins.params);
                }

            });

            /**
             * 处理返回值
             */
            Event.addGameEventListener(this.EventKey + "GameRes" + sid, (msg: string) => {

                let ins: DSPackage = JSON.parse(msg);

                if (this.net_CallResCache.has(ins.fid)) {
                    let resolve = this.net_CallResCache.get(ins.fid);
                    this.net_CallResCache.delete(ins.fid);
                    resolve(...ins.params);
                }

            });

            /**
             * 处理返回值
             */
            // Event.addSceneEventListener(this.EventKey + "SceneRes" + sidIngoreVersion, (msg: string) => {

            //     let ins: DSPackage = JSON.parse(msg);

            //     if (this.net_CallResCache.has(ins.fid)) {
            //         let resolve = this.net_CallResCache.get(ins.fid);
            //         this.net_CallResCache.delete(ins.fid);
            //         resolve(...ins.params);
            //     }

            // });

            /**
             * 处理返回值
             */
            Event.addGameEventListener(this.EventKey + "GameRes" + sidIngoreVersion, (msg: string) => {

                let ins: DSPackage = JSON.parse(msg);

                if (this.net_CallResCache.has(ins.fid)) {
                    let resolve = this.net_CallResCache.get(ins.fid);
                    this.net_CallResCache.delete(ins.fid);
                    resolve(...ins.params);
                }

            });
        }


        funcs.forEach(funcName => {

            /**
             * 获取基础数据
             */
            let srcCall = v[funcName].bind(v);
            let broadcastType = this.getEventNetBroadcastType(className + funcName);
            let whoHandle = this.getEventNetWhoHandle(className + funcName);

            if (this.isRegister.has(className + funcName)) {
                return;
            }
            this.isRegister.set(className + funcName, true);


            if (broadcastType == DSBroadcastTypeEnum.None || whoHandle == DSWhoHandleEnum.None) return;

            const type = DSEventService.getIgnoreVersion(this.EventKey + className + funcName);
            //console.error("get " + this.EventKey + className + funcName + " == " + type)


            /**
             * 添加函数监听
             */
            if (broadcastType == DSBroadcastTypeEnum.Scene) {
                // console.error(" regSceneEvt : " + funcName);
                // this.timeOutLog("reg => " + this.EventKey + className + funcName)
                Event.addSceneEventListener(this.EventKey + className + funcName, async (msg: string) => {


                    // console.error("listen join " + this.EventKey + className + funcName);
                    let res = null;
                    let ins: DSPackage = null;

                    if (whoHandle == DSWhoHandleEnum.All ||
                        (whoHandle == DSWhoHandleEnum.Master && DSNodeServerTable.localIsMaster(broadcastType, type == DSIgnoreVersion.AllVersion))) {
                        // console.error("EventKey", this.EventKey + className + funcName);
                        ins = JSON.parse(msg);
                        res = await srcCall(...ins.params);
                    } else if (whoHandle == DSWhoHandleEnum.OtherNode && !DSNodeServerTable.localIsMaster(broadcastType, type == DSIgnoreVersion.AllVersion)) {
                        // console.error("EventKey 2", this.EventKey + className + funcName);
                        ins = JSON.parse(msg);
                        res = await srcCall(...ins.params);
                    }

                    if (res && ins && DSNodeServerTable.localIsMaster(broadcastType, type == DSIgnoreVersion.AllVersion)) {
                        let resMsg = new DSPackage();
                        resMsg.sid = ins.sid;
                        resMsg.fid = ins.fid;
                        resMsg.params = [res];
                        Event.dispatchSceneEvent(this.EventKey + "SceneRes" + resMsg.sid, JSON.stringify(resMsg));
                    }

                })

                Event.addSceneEventListener(this.EventKey + className + funcName + sidByScene, async (msg: string) => {

                    let res = null;
                    let ins: DSPackage = null;

                    if (whoHandle == DSWhoHandleEnum.All || (whoHandle == DSWhoHandleEnum.Master && DSNodeServerTable.localIsMaster(broadcastType, type == DSIgnoreVersion.AllVersion))) {
                        // console.error("roomId EventKey" + this.EventKey + className + funcName);
                        ins = JSON.parse(msg);
                        res = await srcCall(...ins.params);
                    } else if (whoHandle == DSWhoHandleEnum.OtherNode && !DSNodeServerTable.localIsMaster(broadcastType, type == DSIgnoreVersion.AllVersion)) {
                        // console.error("EventKey 2", this.EventKey + className + funcName);
                        ins = JSON.parse(msg);
                        res = await srcCall(...ins.params);
                    }

                    if (res && ins && DSNodeServerTable.localIsMaster(broadcastType, type == DSIgnoreVersion.AllVersion)) {
                        let resMsg = new DSPackage();
                        resMsg.sid = ins.sid;
                        resMsg.fid = ins.fid;
                        resMsg.params = [res];
                        Event.dispatchSceneEvent(this.EventKey + "SceneRes" + resMsg.sid, JSON.stringify(resMsg));
                    }

                })

                // Event.addSceneEventListener(this.EventKey + className + funcName + sidIngoreVersion, async (msg: string) => {

                //     let res = null;
                //     let ins: DSPackage = null;

                //     if (whoHandle == DSWhoHandleEnum.All || (whoHandle == DSWhoHandleEnum.Master &&
                //         DSNodeServerTable.localIsMaster(broadcastType, type == DSIgnoreVersion.AllVersion))) {
                //         //console.error("roomId EventKey" + this.EventKey + className + funcName);
                //         ins = JSON.parse(msg);
                //         res = await srcCall(...ins.params);
                //     } else if (whoHandle == DSWhoHandleEnum.OtherNode && !DSNodeServerTable.localIsMaster(broadcastType, type == DSIgnoreVersion.AllVersion)) {
                //         //console.error("EventKey 2", this.EventKey + className + funcName);
                //         ins = JSON.parse(msg);
                //         res = await srcCall(...ins.params);
                //     }

                //     if (res && ins && DSNodeServerTable.localIsMaster(broadcastType, type == DSIgnoreVersion.AllVersion)) {
                //         let resMsg = new DSPackage();
                //         resMsg.sid = ins.sid;
                //         resMsg.fid = ins.fid;
                //         resMsg.params = [res];
                //         Event.dispatchSceneEvent(this.EventKey + "SceneRes" + resMsg.sid, JSON.stringify(resMsg));
                //     } else {

                //         console.error("unHandle => " + whoHandle + "," + type + "," + DSNodeServerTable.localIsMaster(broadcastType, type == DSIgnoreVersion.AllVersion))

                //     }

                // })

                // const str = this.EventKey + className + funcName + sidByScene;
                // this.timeOutLog(str);

            }

            /**
             * 添加函数监听
             */
            if (broadcastType == DSBroadcastTypeEnum.Game) {
                Event.addGameEventListener(this.EventKey + className + funcName, async (msg: string) => {

                    let res = null;
                    let ins: DSPackage = null;

                    if (whoHandle == DSWhoHandleEnum.All || (whoHandle == DSWhoHandleEnum.Master &&
                        DSNodeServerTable.localIsMaster(broadcastType, type == DSIgnoreVersion.AllVersion))) {
                        //console.error("Gmae EventKey" + this.EventKey + className + funcName);
                        ins = JSON.parse(msg);
                        res = await srcCall(...ins.params);
                    } else if (whoHandle == DSWhoHandleEnum.OtherNode && !DSNodeServerTable.localIsMaster(broadcastType, type == DSIgnoreVersion.AllVersion)) {
                        //console.error("Gmae EventKey 2" + this.EventKey + className + funcName);
                        ins = JSON.parse(msg);
                        res = await srcCall(...ins.params);
                    }

                    if (res && ins && DSNodeServerTable.localIsMaster(broadcastType, type == DSIgnoreVersion.AllVersion)) {
                        let resMsg = new DSPackage();
                        resMsg.sid = ins.sid;
                        resMsg.fid = ins.fid;
                        resMsg.params = [res];
                        Event.dispatchGameEvent(this.EventKey + "GameRes" + resMsg.sid, JSON.stringify(resMsg));
                    }

                })
                this.timeOutLog("reg => " + this.EventKey + className + funcName + sid)
                Event.addGameEventListener(this.EventKey + className + funcName + sid, async (msg: string) => {

                    let res = null;
                    let ins: DSPackage = null;

                    if (whoHandle == DSWhoHandleEnum.All || (whoHandle == DSWhoHandleEnum.Master && DSNodeServerTable.localIsMaster(broadcastType, type == DSIgnoreVersion.AllVersion))) {
                        //console.error("Ex Gmae EventKey" + this.EventKey + className + funcName);
                        ins = JSON.parse(msg);
                        res = await srcCall(...ins.params);
                    } else if (whoHandle == DSWhoHandleEnum.OtherNode && !DSNodeServerTable.localIsMaster(broadcastType, type == DSIgnoreVersion.AllVersion)) {
                        //console.error("Ex Gmae EventKey 2" + this.EventKey + className + funcName);
                        ins = JSON.parse(msg);
                        res = await srcCall(...ins.params);
                    }

                    if (res && ins && DSNodeServerTable.localIsMaster(broadcastType, type == DSIgnoreVersion.AllVersion)) {
                        let resMsg = new DSPackage();
                        resMsg.sid = ins.sid;
                        resMsg.fid = ins.fid;
                        resMsg.params = [res];
                        Event.dispatchGameEvent(this.EventKey + "GameRes" + resMsg.sid, JSON.stringify(resMsg));
                    }

                })

                this.timeOutLog("reg => " + this.EventKey + className + funcName + sidIngoreVersion)

                Event.addGameEventListener(this.EventKey + className + funcName + sidIngoreVersion, async (msg: string) => {

                    let res = null;
                    let ins: DSPackage = null;
                    //console.error("EventKey 3" + this.EventKey + className + funcName)

                    if (whoHandle == DSWhoHandleEnum.All || (whoHandle == DSWhoHandleEnum.Master && DSNodeServerTable.localIsMaster(broadcastType, type == DSIgnoreVersion.AllVersion))) {
                        //console.error("Ex Gmae EventKey" + this.EventKey + className + funcName);
                        ins = JSON.parse(msg);
                        res = await srcCall(...ins.params);
                    } else if (whoHandle == DSWhoHandleEnum.OtherNode && !DSNodeServerTable.localIsMaster(broadcastType, type == DSIgnoreVersion.AllVersion)) {
                        //console.error("Ex Gmae EventKey 2" + this.EventKey + className + funcName);
                        ins = JSON.parse(msg);
                        res = await srcCall(...ins.params);
                    }

                    if (res && ins && DSNodeServerTable.localIsMaster(broadcastType, type == DSIgnoreVersion.AllVersion)) {
                        let resMsg = new DSPackage();
                        resMsg.sid = ins.sid;
                        resMsg.fid = ins.fid;
                        resMsg.params = [res];
                        Event.dispatchGameEvent(this.EventKey + "GameRes" + resMsg.sid, JSON.stringify(resMsg));
                    }

                })

                const str = this.EventKey + className + funcName + sidIngoreVersion;
                this.timeOutLog(str);

            }

            //Hook 处理函数调用内部逻辑
            v[funcName] = (...params: any[]) => {

                // console.error("处理函数 : " + funcName);

                return new Promise<any>(async (resolve, reject) => {

                    let preMsg = new DSPackage();
                    preMsg.sid = (type == DSIgnoreVersion.AllVersion) ? sid : sidIngoreVersion;
                    preMsg.fid = DSEventModuleS.generateUniqueId();
                    this.net_CallResCache.set(preMsg.fid, resolve);
                    //设置5秒超时
                    setTimeout(() => {
                        if (this.net_CallResCache.has(preMsg.fid)) {
                            this.net_CallResCache.delete(preMsg.fid);
                            resolve(null);
                        }
                    }, 5000);

                    if (params.length > 0) {
                        preMsg.params = params;
                    }

                    let paramsStr = JSON.stringify(preMsg);

                    if (whoHandle == DSWhoHandleEnum.Master) {
                        if (DSNodeServerTable.localIsMaster(broadcastType, type == DSIgnoreVersion.AllVersion)) {

                            // console.error("self is Master run call : ", type)

                            let res = await srcCall(...params);
                            if (this.net_CallResCache.has(preMsg.fid)) {
                                this.net_CallResCache.delete(preMsg.fid);
                                resolve(res);
                            }
                        } else {

                            // console.error("not master")

                            if (broadcastType == DSBroadcastTypeEnum.Scene) {

                                Event.dispatchSceneEvent(this.EventKey +
                                    className +
                                    funcName +
                                    DSNodeServerTable.getMasterSid(broadcastType, type == DSIgnoreVersion.AllVersion)
                                    , paramsStr);

                            } else if (broadcastType == DSBroadcastTypeEnum.Game) {

                                Event.dispatchGameEvent(this.EventKey +
                                    className +
                                    funcName +
                                    DSNodeServerTable.getMasterSid(broadcastType, type == DSIgnoreVersion.AllVersion)
                                    , paramsStr);
                            }

                        }
                    } else if (whoHandle == DSWhoHandleEnum.All) {
                        if (broadcastType == DSBroadcastTypeEnum.Scene) {
                            //console.error("call all scene => " + this.EventKey + className + funcName);
                            Event.dispatchSceneEvent(this.EventKey + className + funcName, paramsStr);
                        } else if (broadcastType == DSBroadcastTypeEnum.Game) {
                            Event.dispatchGameEvent(this.EventKey + className + funcName, paramsStr);
                        }
                    } else if (whoHandle == DSWhoHandleEnum.OtherNode) {
                        if (!DSNodeServerTable.localIsMaster(broadcastType, type == DSIgnoreVersion.AllVersion)) {
                            srcCall(...params);
                        } else {
                            if (broadcastType == DSBroadcastTypeEnum.Scene) {
                                Event.dispatchSceneEvent(this.EventKey + className + funcName, paramsStr);
                            } else if (broadcastType == DSBroadcastTypeEnum.Game) {
                                Event.dispatchGameEvent(this.EventKey + className + funcName, paramsStr);
                            }
                        }
                    }

                });

            }

        });

    }

    /**
     * 初始化
     */
    public static init() {
        this.atomicEventMap.forEach((v, className, maps) => {
            this.initEvt(className, v, true);
            v.onAwake();
        })
        this.isInit = true;
    }

}

function hookerComposeEventKey() {
    if (Event["composeEventKey"].length > 6) {
        Event["composeEventKey"] = (bSandboxMode, region, dsVersion, level, id, gameVersion, eventName) => {

            let type: DSIgnoreVersion = DSIgnoreVersion.None;

            if (eventName.indexOf(DSEventModuleS.localSid) != -1) {
                let str = eventName + "";
                str = str.replace(DSEventModuleS.localSid, "")
                type = DSEventService.getIgnoreVersion(str)
            } else if (eventName.indexOf(DSEventModuleS.localSidIgnoreVer) != -1) {
                let str = eventName + "";
                str = str.replace(DSEventModuleS.localSidIgnoreVer, "")
                type = DSEventService.getIgnoreVersion(str)
            } else if (eventName.indexOf(DSEventModuleS.localSidByScene) != -1) {
                let str = eventName + "";
                str = str.replace(DSEventModuleS.localSidByScene, "")
                type = DSEventService.getIgnoreVersion(str)
            } else {
                type = DSEventService.getIgnoreVersion(eventName)
            }

            //忽略版本，或者发送给全局的master
            //返回值 默认忽略版本

            let globalMasterSid = DSNodeServerTable.getMasterSid(DSBroadcastTypeEnum.Game, true);

            if (eventName.indexOf(IgnoreVersionKey) != -1 ||
                (globalMasterSid != "" && eventName.indexOf(globalMasterSid) != -1) ||
                eventName.indexOf(DSEventService.EventKey + "GameRes") != -1 ||
                eventName.indexOf(DSEventService.EventKey + "SceneRes") != -1) {
                // console.error("ignoreVersion Modify")
                type = DSIgnoreVersion.AllVersion
            }

            if (type == DSIgnoreVersion.DSVersion) {
                return `${bSandboxMode ? "Sandbox--" : ""}${""}--${level}--${id}--${gameVersion}--${eventName}`;
            } else if (type == DSIgnoreVersion.GameVersion) {
                return `${bSandboxMode ? "Sandbox--" : ""}${dsVersion}--${level}--${id}--${""}--${eventName}`;
            } else if (type == DSIgnoreVersion.AllVersion) {
                // console.error(`${bSandboxMode ? "Sandbox--" : ""}${""}--${level}--${id}--${""}--${eventName}`);
                return `${bSandboxMode ? "Sandbox--" : ""}${""}--${level}--${id}--${""}--${eventName}`;
            }
            // console.error(`${bSandboxMode ? "Sandbox--" : ""}${dsVersion}--${level}--${id}--${gameVersion}--${eventName}`);
            return `${bSandboxMode ? "Sandbox--" : ""}${dsVersion}--${level}--${id}--${gameVersion}--${eventName}`;
        }
    } else {
        Event["composeEventKey"] = (region, dsVersion, level, id, gameVersion, eventName) => {
            let type: DSIgnoreVersion = DSIgnoreVersion.None;

            if (eventName.indexOf(DSEventModuleS.localSid) != -1) {
                let str = eventName + "";
                str = str.replace(DSEventModuleS.localSid, "")
                type = DSEventService.getIgnoreVersion(str)
            } else if (eventName.indexOf(DSEventModuleS.localSidIgnoreVer) != -1) {
                let str = eventName + "";
                str = str.replace(DSEventModuleS.localSidIgnoreVer, "")
                type = DSEventService.getIgnoreVersion(str)
            } else if (eventName.indexOf(DSEventModuleS.localSidByScene) != -1) {
                let str = eventName + "";
                str = str.replace(DSEventModuleS.localSidByScene, "")
                type = DSEventService.getIgnoreVersion(str)
            } else {
                type = DSEventService.getIgnoreVersion(eventName)
            }

            let globalMasterSid = DSNodeServerTable.getMasterSid(DSBroadcastTypeEnum.Game, true);

            //忽略版本，或者发送给全局的master
            //返回值 默认忽略版本
            if (eventName.indexOf(IgnoreVersionKey) != -1 ||
                (globalMasterSid != "" && eventName.indexOf(globalMasterSid) != -1) ||
                eventName.indexOf(DSEventService.EventKey + "GameRes") != -1 ||
                eventName.indexOf(DSEventService.EventKey + "SceneRes") != -1) {
                //console.error("ignoreVersion Modify")
                type = DSIgnoreVersion.AllVersion
            }

            if (type == DSIgnoreVersion.DSVersion) {
                return `${""}--${level}--${id}--${gameVersion}--${eventName}`;
            } else if (type == DSIgnoreVersion.GameVersion) {
                return `${dsVersion}--${level}--${id}--${""}--${eventName}`;
            } else if (type == DSIgnoreVersion.AllVersion) {
                //console.error(`${""}--${level}--${id}--${""}--${eventName}`);
                return `${""}--${level}--${id}--${""}--${eventName}`;
            }
            return `${dsVersion}--${level}--${id}--${gameVersion}--${eventName}`;
        }
    }
}

hookerComposeEventKey();

/**
 * DS事件广播类型
 */
export enum DSBroadcastTypeEnum {
    None, //未知
    Scene, //场景内广播
    Game, //游戏内广播,目前暂不支持。
}

/**
 * 哪个DS处理
 */
export enum DSWhoHandleEnum {
    None, //未知
    Master, //只有Master处理
    All, //所有节点处理
    OtherNode, //非Master节点处理
}

/**
 * 忽略版本
 */
export enum DSIgnoreVersion {
    None, //不忽略版本，默认隔离
    DSVersion, //忽略ds版本
    GameVersion, //忽略游戏版本
    AllVersion, //忽略所有版本
}

/**
 * DS函数装饰器
 * @param mulType 事件广播类型，是Scene（场景），还是整个游戏。
 * @param whoHandle 谁处理该事件
 * @returns 
 */
export function DSFunc(mulType: DSBroadcastTypeEnum, whoHandle: DSWhoHandleEnum, ignoreVersion: DSIgnoreVersion = DSIgnoreVersion.None) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let className = target.constructor.name;
        let methodName = propertyKey;

        /**
         * 消息发给master的情况，目前必须做隔离，否则会出现多master 执行。
         * 主从选择上 目前有隔离版本，不同版本的master 会存在多个
         */

        if (mulType == DSBroadcastTypeEnum.Scene) {
            ignoreVersion = DSIgnoreVersion.None;
        }

        DSEventService.registerEventNetHandleType(className + methodName, mulType, whoHandle, ignoreVersion);

    }

}

/**
 * DS事件基类
 */
export abstract class DSEvent {

    public abstract onAwake();

    /**
     * 取消master
     */
    public abstract onCancelMaster(broadcastType: DSBroadcastTypeEnum, ignoreVersion: boolean);

    /**
     * 成为master
     */
    public abstract onConfirmMaster(broadcastType: DSBroadcastTypeEnum, ignoreVersion: boolean);

    public isMaster(broadcastType: DSBroadcastTypeEnum, ignoreVersion: boolean): boolean {
        return DSNodeServerTable.localIsMaster(broadcastType, ignoreVersion);
    }

}


/**
 * DS事件队列模块
 */
export class DSEventModuleS extends ModuleS<DSEventModuleC, null> {

    public static localSidByScene: string = DSEventModuleS.generateUniqueId();
    public static localSidIgnoreVer: string = DSEventModuleS.generateUniqueId();
    public static localSid: string = DSEventModuleS.generateUniqueId();

    public sInfoignoreVer: DSNodeServerInfo = null;
    public sInfo: DSNodeServerInfo = null;
    public sInfoByScene: DSNodeServerInfo = null;

    public net_IsMaster(broadcastType: DSBroadcastTypeEnum, ingoreVersion: boolean = false): boolean {
        return DSNodeServerTable.localIsMaster(broadcastType, ingoreVersion);
    }

    public net_GetMasterId(broadcastType: DSBroadcastTypeEnum, ingoreVersion: boolean = false): string {
        return DSNodeServerTable.getMasterSid(broadcastType, ingoreVersion);
    }

    /**
     * 注册DS事件
     * @param cls 
     */
    public registerDSEvent<T extends DSEvent>(cls: mw.TypeName<T>) {
        DSEventService.registerDSEvent(cls);
    }

    /**
     * 获取DS事件
     * @param cls 
     * @returns 
     */
    public getDSEvent<T extends DSEvent>(cls: mw.TypeName<T>): T {
        return DSEventService.getDSEvent(cls);
    }

    /**
     * 生成唯一id
     * @returns 
     */
    public static generateUniqueId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    //====================================================================内部函数

    protected async onAwake(): Promise<void> {

        this.sInfo = new DSNodeServerInfo(DSEventModuleS.localSid, 0);
        this.sInfoignoreVer = new DSNodeServerInfo(DSEventModuleS.localSidIgnoreVer, 0);
        this.sInfoByScene = new DSNodeServerInfo(DSEventModuleS.localSidByScene, 0);
        await DSNodeServerTable.instance.init(this.sInfo);
        await DSNodeServerTableByGameIgnoreVersion.instance.init(this.sInfoignoreVer);
        await DSNodeServerTableByScene.instance.init(this.sInfoByScene);
        await DSEventService.init();


    }

    protected onUpdate(dt: number): void {

        if (this.sInfo == null) return;

        this.sInfo.updateLifeTime(dt);
        this.sInfoignoreVer.updateLifeTime(dt);
        this.sInfoByScene.updateLifeTime(dt);
        DSNodeServerTable.instance.updateNodeInfo(this.sInfo);
        DSNodeServerTableByGameIgnoreVersion.instance.updateNodeInfo(this.sInfoignoreVer);
        DSNodeServerTableByScene.instance.updateNodeInfo(this.sInfoByScene);

    }

}