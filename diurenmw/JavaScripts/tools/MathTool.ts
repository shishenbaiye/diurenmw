export class MathTool {


	/**计算两个3维向量是否平行 */
	static isParallel(v1: Vector, v2: Vector): boolean {
		let v1x = v1.x;
		let v1y = v1.y;
		let v1z = v1.z;
		let v2x = v2.x;
		let v2y = v2.y;
		let v2z = v2.z;
		return (v1y * v2z - v1z * v2y) === 0 && (v1z * v2x - v1x * v2z) === 0 && (v1x * v2y - v1y * v2x) === 0;
	}

	/**
	 * Rotation转欧拉角
	 * @param rotation Rotation
	 * @returns 欧拉角
	 */
	public static rotationToAngles(rotation: mw.Rotation): mw.Vector {
		return new mw.Vector(rotation.x, rotation.y, rotation.z);
	}
	/**
	 * 获取局部欧拉角
	 * @param go GameObject
	 * @returns 欧拉角
	 */
	public static getLocalEulerAngles(go: mw.GameObject): mw.Vector {
		return this.rotationToAngles(go.localTransform.rotation);
	}
	/**
	 * 获取两个向量的旋转角
	 * @param from 起始向量
	 * @param to 目标向量
	 * @param up 旋转轴
	 * @returns 旋转的角度
	 */
	// public static getSignedAngle(from: mw.Vector, to: mw.Vector, up: mw.Vector): number {
	//     let angle = mw.Vector.angle(from, to);
	//     let sign = Math.sign(mw.Vector.dot(up, mw.Vector.cross(from, to)));
	//     let signed_angle = angle * sign;
	//     return signed_angle <= 0 ? 360 + signed_angle : signed_angle;
	// }
	/**
	 * 从数组中随机选择N个不重复的元素
	 * @param arr1 数组
	 * @param n 选择几个元素
	 * @returns
	 */
	public static getRandomArray<T>(arr1: Array<T>, n: number): Array<T> {
		if (n > arr1.length) {
			console.warn(`数组长度不足${n}个`);
			return null;
		}
		let arr = arr1.concat();
		let result: Array<T> = new Array<T>();
		let len: number = arr.length;
		let random: number;
		for (let i: number = 0; i < n; i++) {
			random = Math.floor(Math.random() * len);
			result.push(arr[random]);
			arr.splice(random, 1);
			len--;
		}
		return result;
	}

	/**
	 * 获取两个向量的夹角（弧度制,带正负）
	 * @param v1
	 * @param v2
	 * @returns
	 */
	public static calculateEulerAngles(v1: Vector, v2: Vector): number {
		// 将向量投影到XY平面
		const v1Projected: Vector = new Vector(v1.x, v1.y, 0);
		const v2Projected: Vector = new Vector(v2.x, v2.y, 0);
		// 计算点积
		const dotProduct: number = v1Projected.x * v2Projected.x + v1Projected.y * v2Projected.y;
		// 计算投影向量的模长
		const v1Magnitude: number = Math.sqrt(v1Projected.x ** 2 + v1Projected.y ** 2);
		const v2Magnitude: number = Math.sqrt(v2Projected.x ** 2 + v2Projected.y ** 2);
		// 计算角度
		const cosTheta: number = dotProduct / (v1Magnitude * v2Magnitude);
		const thetaRadians: number = Math.acos(cosTheta);
		// 计算叉积的Z分量
		const crossProductZ: number = v1Projected.x * v2Projected.y - v1Projected.y * v2Projected.x;
		// 根据叉积的Z分量确定角度的正负值
		const signedThetaRadians: number = crossProductZ >= 0 ? thetaRadians : -thetaRadians;
		// 转换为度数
		const thetaDegrees: number = (signedThetaRadians * 180) / Math.PI;
		return thetaDegrees;
	}

	public static calculateEulerYZAngles(v1: Vector, v2: Vector): number {
		// 将向量投影到XY平面
		const v1Projected: Vector = new Vector(0, v1.y, v1.z);
		const v2Projected: Vector = new Vector(0, v2.y, v2.z);
		// 计算点积
		const dotProduct: number = v1Projected.z * v2Projected.z + v1Projected.y * v2Projected.y;
		// 计算投影向量的模长
		const v1Magnitude: number = Math.sqrt(v1Projected.z ** 2 + v1Projected.y ** 2);
		const v2Magnitude: number = Math.sqrt(v2Projected.z ** 2 + v2Projected.y ** 2);
		// 计算角度
		const cosTheta: number = dotProduct / (v1Magnitude * v2Magnitude);
		const thetaRadians: number = Math.acos(cosTheta);
		// 计算叉积的Z分量
		const crossProductZ: number = v1Projected.z * v2Projected.y - v1Projected.y * v2Projected.z;
		// 根据叉积的Z分量确定角度的正负值
		const signedThetaRadians: number = crossProductZ >= 0 ? thetaRadians : -thetaRadians;
		// 转换为度数
		const thetaDegrees: number = (signedThetaRadians * 180) / Math.PI;
		return thetaDegrees;
	}
	/**计算两个二维向量的距离
	 * @param v1
	 * @param v2
	 * @returns
	 * @memberof MathTool
	 *
	 */
	public static calculateDistance2D(v1: Vector2, v2: Vector2): number {
		return Math.sqrt((v1.x - v2.x) ** 2 + (v1.y - v2.y) ** 2);
	}

	/**计算两个三维向量的距离
	 * @param v1
	 * @param v2
	 * @returns
	 * @memberof MathTool
	 *
	 */
	public static calculateDistance3D(v1: Vector, v2: Vector): number {
		return Math.sqrt((v1.x - v2.x) ** 2 + (v1.y - v2.y) ** 2 + (v1.z - v2.z) ** 2);
	}

	/**
	 * 拿到百分比
	 * @param _value
	 * @returns
	 */
	public static getPercent(_value: number, _min: number, _max: number) {
		return (_value - _min) / (_max - _min);
	}


	/**正态分布随机值
	 * @param min 最小值
	 * @param max 最大值
	 * @param bias 越大越偏向最大值，默认2
	 */
	public static normalDistribution(min: number, max: number, bias: number = 2): number {
		const r = Math.random();
		const exponent = bias;
		const value = max - (max - min) * Math.pow(1 - r, exponent);
		return Math.round(value);
	}


	/**伤害计算公式
	 * @param type 伤害类型 1:物理 2:魔法 3:真实
	 * @param skill 技能倍率
	 * @param atk 物理攻击
	 * @param matk 魔法攻击
	 * @param str 力量
	 * @param int 智力
	 * @param damage 伤害加成 
	 * @param skillDamage 技能伤害加成
	 * @param crit 暴击率
	 * @param critDamage 暴击伤害
	 * @returns 伤害值
	 */
	public static damageFormula(type: number, skill: number, atk: number, matk: number, str: number, int: number, damage: number, skillDamage: number, crit: number, critDamage: number): number {
		if (type == 1) {
			// 力量兑换物理攻击值
			const strAdd = 1 + str / 250; 
			const isCrit = Math.random() < crit;
			const res = (atk * strAdd) * skill * skillDamage * damage * (isCrit ? 2*critDamage : 1);
			// 取整
			return Math.round(res);
		}
		if (type == 2) {
			// 智力兑换魔法攻击值
			const intAdd = 1 + int / 250;
			const isCrit = Math.random() < crit;
			const res = (matk * intAdd) * skill * skillDamage * damage * (isCrit ? 2*critDamage : 1);
			// 取整
			return Math.round(res);
		}
		if (type == 3) {
			const isCrit = Math.random() < crit;
			const res = skill * skillDamage * damage * (isCrit ? 2*critDamage : 1);
			return Math.round(res);
		}
	}

	/**计算玩家对怪物造成的伤害 */
	public static calculateActualDamage(damage: number, monsterDef: number, playerLevel: number, monsterLevel: number, K = 50): number {
		// 计算等级因子 LevelFactor
		const levelFactor = 1 / (1 + Math.exp(playerLevel - monsterLevel));

		// 计算实际伤害 ActualDamage
		const actualDamage = damage * K / (K + monsterDef * levelFactor);

		// 确保实际伤害不为负数,取整
		return Math.round(Math.max(actualDamage, 0))
	}

	/**计算怪物对玩家造成伤害 */
	public static calculateMonsterDamage(monsterDamage: number, playerDef: number, playerLevel: number, monsterLevel: number, K = 50): number {
		// 计算等级因子 LevelFactor
		const levelFactor = 1 / (1 + Math.exp(monsterLevel - playerLevel));

		// 计算实际伤害 ActualDamage
		const actualDamage = monsterDamage * K / (K + playerDef * levelFactor);

		// 确保实际伤害不为负数
		return Math.round(Math.max(actualDamage, 0));
	}
}