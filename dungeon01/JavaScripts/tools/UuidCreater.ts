export class UuidCreater {
    static create(): string {
        // 获取当前时间的毫秒数
        const timestamp = Date.now();

        // 将时间戳转换为长度为12的16进制字符串
        const timestampHex = ('000000000000' + timestamp.toString(16)).slice(-12);

        // 生成长度为20的随机16进制字符串
        const randomHex = 'xxxxxxxxxxxxxxxxxxxx'.replace(/x/g, function () {
            return (Math.random() * 16 | 0).toString(16);
        });

        // 将时间戳和随机数组合成 UUID 格式
        const uuid = timestampHex + randomHex;

        // 格式化为标准 UUID 格式（8-4-4-4-12）
        return uuid.slice(0, 8) + '-' + uuid.slice(8, 12) + '-' +
            uuid.slice(12, 16) + '-' + uuid.slice(16, 20) + '-' +
            uuid.slice(20);
    }

    /**通过uuid获取创建的时间戳 */
    static extractTimestamp(uuid: string): number {
        // 去掉 UUID 中的 '-' 符号
        const uuidStr = uuid.replace(/-/g, '');

        // 提取前12位作为时间戳的16进制字符串
        const timestampHex = uuidStr.slice(0, 12);

        // 将16进制字符串转换为十进制数字
        const timestamp = parseInt(timestampHex, 16);

        return timestamp;
    }
}