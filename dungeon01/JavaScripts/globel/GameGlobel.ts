declare global {
    var UE: any;
}
export namespace GameGlobal{
    export function AutoInit(target: any) {
		target.initSelf();
	}

	export class Config{
		// 是否是编辑器
		static isEditor:boolean = false;
		// 机器人id
		static botId:string = "";
		// 场景id
		static sceneId:string = "";
		// 性别
		static sex:boolean = true;
		// 是否是Debug模式
		static isDebug:boolean = false;
		// 开始加载的时间戳
		static startTime:number = 0;

		// isShowAIButton
		static isShowAIButton:boolean = false;

		static isListenServer:boolean = false;

		// 相机基础值
        static baseCamera: number;
		// 相机系数
        static cameraCoefficient: number;
		// 角色缩放基础值
        static baseCharacter: number;
		// 角色缩放系数
        static characterCoefficient: number;
	}
    export class Data{
        static needGm:boolean = false;

        /**当前客户端玩家Player（客户端） */
        static curPlayer:mw.Player = null;
        /**当前客户端玩家Character（客户端） */
        static curChar:mw.Character = null;
    }
    export class Mode{
        /**1:主人 2:客人*/
        static mode:number = 1;
    }
    export class Area{
        /**1：室外 2：室内 */
        static areaId:number = 1;
    }

    /**
	 * 全局时间方法
	 */
	@AutoInit
	export class Time {
		public static initSelf() {
			TimeUtil.onEnterFrame.add((dt: number) => {
				Time.update(dt);
			});
		}
		private static timer = 0;
		private static curTimeHours = 0;
		private static update(dt: number) {
			let timeStemp = Date.now();
			// 判断timeStemp是否为整点
			let result = new Date().getHours();
			if (result != this.curTimeHours) {
				this.curTimeHours = result;
				Time.onHourEvent.call(result);
			}
			let time = this.getGameTime();
			if (time.hour != this.timer) {
				this.timer = time.hour;
				Time.onGameHourEvent.call(time.hour);
			}
		}
		/**整点事件监听器（现实时间）*/
		public static onHourEvent: Action1<number> = new Action1<number>();
		/**游戏内事件整点监听器（游戏时间） */
		public static onGameHourEvent: Action1<number> = new Action1<number>();
		/**时间膨胀倍率 */
		public static timeScale: number = 48;
		/**更新时间 */
		private static updateTime: number = 7;
		/**
		 * 比较当前时间戳和传入时间戳是否跨天，早上7点跨天（现实时间）
		 * @param time 时间戳
		 * @returns {boolean} true:跨天 false:未跨天
		 */
		public static isCrossDay(time: number): boolean {
			// this.logger.error("isCrossDay",time);

			let date = new Date(time);
			let now = new Date();
			if (date.getFullYear() != now.getFullYear()) {
				return true;
			}
			if (date.getMonth() != now.getMonth()) {
				return true;
			}
			if (date.getDate() != now.getDate()) {
				if (date.getHours() >= Time.updateTime && now.getHours() < Time.updateTime) {
					return false;
				} else {
					return true;
				}
			}
			if (date.getHours() < Time.updateTime && now.getHours() >= Time.updateTime) {
				return true;
			}
			return false;
		}

		/**
		 * 获取当前游戏内时间，根据时间膨胀倍率计算（游戏时间）
		 * @returns {hour:小时,minute:分钟,second:秒}
		 * @memberof Time
		 * @example
		 * let time = GlobalM.Time.getGameTime();
		 */
		public static getGameTime(): { hour: number; minute: number; second: number } {
			// 计算当前游戏经过的时间
			let timer = (Date.now() / 1000) * this.timeScale;
			// 排除超过24小时
			timer = timer % (24 * 60 * 60);
			// 计算小时
			let hour = Math.floor(timer / (60 * 60));
			// 计算分钟
			let minute = Math.floor((timer - hour * 60 * 60) / 60);
			// 计算秒
			let second = Math.floor(timer - hour * 60 * 60 - minute * 60);
			return { hour: hour, minute: minute, second: second };
		}

		/**
		 * 获取当前时间距离更新时间的剩余时间(现实时间)
		 * @returns {Hour:小时,Minute:分钟,Second:秒}
		 */
		public static getRemainTime(): { Hour: number; Minute: number; Second: number } {
			let now = new Date();
			let hour = Time.updateTime - now.getHours() - 1;
			let minute = 60 - now.getMinutes() - 1;
			let second = 60 - now.getSeconds();
			if (hour < 0) {
				hour += 24;
			}
			if (minute < 0) {
				minute += 60;
			}
			if (second < 0) {
				second += 60;
			}
			return { Hour: hour, Minute: minute, Second: second };
		}

		/**
		 * 获取当前时间（现实时间）
		 * @returns {Hour:小时,Minute:分钟,Second:秒}
		 */
		public static getNowTime(): { Hour: number; Minute: number; Second: number } {
			let now = new Date();
			return { Hour: now.getHours(), Minute: now.getMinutes(), Second: now.getSeconds() };
		}
	}
}