const CELLSIZE = 50;

// 四叉树
export class QuadTreeNode<T> {
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;
    private _children: QuadTreeNode<T>[] | null;
    private _value: T | null;

    constructor(startx: number, starty: number, width: number, height: number, matrix: T[][]) {
        this._x = startx;
        this._y = starty;
        this._width = width;
        this._height = height;
        this._children = null;
        this._value = null;

        if (this._width <= CELLSIZE && this._height <= CELLSIZE) {
            this._value = matrix[0][0];
        } else if(this._width <= CELLSIZE || this._height <= CELLSIZE) {
            if(this._width == CELLSIZE){
                let halfHeight = Math.floor(this._height / 2);
                let matri = matrix.length; // 8
                let matcj = matrix[0].length;// 32
                let matrix1 = [new Array<T>()];
                let matrix2 = [new Array<T>()];
                for (let i = 0; i < matri; i++) {
                    if (i < matri / 2) {
                        matrix1[i] = matrix[i].slice(0, matcj);
                    } else {
                        matrix2[i- matri / 2] = matrix[i].slice(0, matcj);
                    }
                }
                this._children = [
                    new QuadTreeNode(startx, starty, this._width, halfHeight, matrix1),
                    new QuadTreeNode(startx + halfHeight, starty , this._width, halfHeight, matrix2),
                ];
            }
            if(this._height == CELLSIZE){
                let halfWidth = Math.floor(this._width / 2);
                let matri = matrix.length; // 1
                let matcj = matrix[0].length;// 2
                let matrix1 = [new Array<T>()];
                let matrix2 = [new Array<T>()];
                for (let i = 0; i < matri; i++) {
                    if (i < matri / 2) {
                        matrix1[i] = matrix[i].slice(0, matcj / 2);
                        matrix2[i] = matrix[i].slice(matcj / 2);
                    }
                }
                this._children = [
                    new QuadTreeNode(startx, starty, halfWidth, this._height, matrix1),
                    new QuadTreeNode(startx , starty + halfWidth, halfWidth, this._height, matrix2),
                ];
            }
        }else{
            let halfWidth = Math.floor(this._width / 2);
            let halfHeight = Math.floor(this._height / 2);
            // 将matrix分成四份
            let matri = matrix.length; // 8
            let matcj = matrix[0].length;// 32
            let matrix1 = [new Array<T>()];
            let matrix2 = [new Array<T>()];
            let matrix3 = [new Array<T>()];
            let matrix4 = [new Array<T>()];
            for (let i = 0; i < matri; i++) {
                if (i < matri / 2) {
                    matrix1[i] = matrix[i].slice(0, matcj / 2);
                    matrix3[i] = matrix[i].slice(matcj / 2);
                } else {
                    matrix2[i- matri / 2] = matrix[i].slice(0, matcj / 2);
                    matrix4[i- matri / 2]  = matrix[i].slice(matcj / 2);
                }
            }
            this._children = [
                new QuadTreeNode(startx, starty, halfWidth, halfHeight, matrix1),
                new QuadTreeNode(startx + halfHeight, starty, halfWidth, halfHeight, matrix2),
                new QuadTreeNode(startx, starty + halfWidth, halfWidth, halfHeight, matrix3),
                new QuadTreeNode(startx + halfHeight, starty + halfWidth, halfWidth, halfHeight, matrix4)
            ];
        }
    }

    public getValueAt(x: number, y: number): T | null {
        // 先判断是否在当前树内
        if (x < this._x || x >= this._x + this._height || y < this._y || y >= this._y + this._width) {
            return null;
        }
        // 如果当前节点有值，说明是叶子节点，直接返回
        if (this._value !== null) {
            return this._value;
        }
        // 如果当前节点没有值，说明是分支节点，递归查找
        if (this._children !== null) {
            for (let child of this._children) {
                let value = child.getValueAt(x, y);
                if (value !== null) {
                    return value;
                }
            }
        }
    }
}