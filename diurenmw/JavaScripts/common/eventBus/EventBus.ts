type Callback = (...args: any[]) => void | Promise<void>;

export class GameEventBus {
    private static listeners = new Map<string, Callback[]>();
    private static onceListeners = new Map<string, Callback[]>();

    /**
     * 为指定事件注册一个回调，该回调将在每次触发时调用 
     * @param event 
     * @param callback 
     */
    public static on(event: string, callback: Callback): void {
        if (typeof callback !== "function") {
            throw new TypeError("Callback must be a function");
        }
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event)!.push(callback);
    }

    /**
     * 移除指定事件的某个回调，如果没有提供回调，则移除所有回调  
     * @param event 
     * @param callback 
     * @returns 
     */
    public static off(event: string, callback?: Callback): void {
        if (!this.listeners.has(event)) {
            return;
        }
        if (callback === undefined) {
            this.listeners.delete(event);
        } else {
            const callbacks = this.listeners.get(event)!;
            const index = callbacks.indexOf(callback);
            if (index !== -1) {
                callbacks.splice(index, 1);
            }
            if (callbacks.length === 0) {
                // this.listeners.delete(event);
            }
        }
        this.onceListeners.delete(event);
    }

    /**
     * 为指定事件注册一个侦听器，该侦听器在触发时最多只调用一次，然后自动删除
     * @param event 
     * @param callback 
     */
    public static once(event: string, callback: Callback): void {
        if (typeof callback !== "function") {
            throw new TypeError("Callback must be a function");
        }
        if (!this.onceListeners.has(event)) {
            this.onceListeners.set(event, []);
        }
        this.onceListeners.get(event)!.push(callback);
    }

    /**
     * 向所有听众发出一个事件。如果任何侦听器返回一个promise，则此函数将返回一个在所有promise都解决时解决的promise
     * @param event  事件名称
     * @param args  事件参数
     * @returns 
     */
    public static async emit(event: string, ...args: any[]): Promise<void> {
        const callbacks = this.listeners.get(event) || [];
        const onceCallbacks = this.onceListeners.get(event) || [];
        if (callbacks.length === 0 && onceCallbacks.length === 0) {
            return;
        }
        const allCallbacks = callbacks.concat(onceCallbacks);
        const promises = allCallbacks.map(callback => {
            try {
                return Promise.resolve(callback(...args));
            } catch (error) {
                return Promise.reject(error);
            }
        });
        this.onceListeners.delete(event);
        await Promise.all(promises);
    }
}
