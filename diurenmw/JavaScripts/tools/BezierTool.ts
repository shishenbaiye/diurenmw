export class BezierTool {
    // 多维二次贝塞尔曲线插值函数
    public static Bezier2D(t: number, start: Vector2, end: Vector2, control: Vector2): Vector2 {
        let x = (1 - t) * (1 - t) * start.x + 2 * t * (1 - t) * control.x + t * t * end.x;
        let y = (1 - t) * (1 - t) * start.y + 2 * t * (1 - t) * control.y + t * t * end.y;
        return new Vector2(x, y);
    }

    // 多维三次贝塞尔曲线插值函数
    public static Bezier3D(t: number, start: Vector2, end: Vector2, control1: Vector2, control2: Vector2): Vector2 {
        let x = (1 - t) * (1 - t) * (1 - t) * start.x + 3 * t * (1 - t) * (1 - t) * control1.x + 3 * t * t * (1 - t) * control2.x + t * t * t * end.x;
        let y = (1 - t) * (1 - t) * (1 - t) * start.y + 3 * t * (1 - t) * (1 - t) * control1.y + 3 * t * t * (1 - t) * control2.y + t * t * t * end.y;
        return new Vector2(x, y);
    }

    // 多维二次贝塞尔曲线插值函数
    public static BezierV3(t: number, start: Vector, end: Vector, control: Vector): Vector {
        let x = (1 - t) * (1 - t) * start.x + 2 * t * (1 - t) * control.x + t * t * end.x;
        let y = (1 - t) * (1 - t) * start.y + 2 * t * (1 - t) * control.y + t * t * end.y;
        let z = (1 - t) * (1 - t) * start.z + 2 * t * (1 - t) * control.z + t * t * end.z;
        return new Vector(x, y, z);
    }
}
