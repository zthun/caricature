import { IZCanvasNativeContextLike, IZCanvasNativeLike } from './canvas-native-like';

export interface IZCanvas {
  readonly width: number;
  readonly height: number;

  readonly native: any;

  resize(w: number, h: number): void;
  transform(sx: number, sy: number, kx: number, ky: number, tx: number, ty: number): void;
  resetTransform(): void;
  clear(): void;
  fill(style: string, x: number, y: number, w: number, h: number): void;
  transfer(source: IZCanvas | HTMLImageElement, x: number, y: number): void;
}

export class ZCanvas implements IZCanvas {
  private _context: IZCanvasNativeContextLike<any>;

  public get width() {
    return this.native.width;
  }

  public get height() {
    return this.native.height;
  }

  public constructor(public readonly native: IZCanvasNativeLike<any>) {
    this._context = this.native.getContext('2d')!;
  }

  public resize(w: number, h: number): void {
    this.native.width = w;
    this.native.height = h;
  }

  public transform(sx: number, sy: number, kx: number, ky: number, tx: number, ty: number): void {
    // See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform for transformation information.

    /*
     * The transformation matrix is described by:
     * [ a c e ]
     * [ b d f ]
     * [ 0 0 1 ]
     *
     * Where the following is true.
     *
     * a = scale (x)
     * b = skew (y)
     * c = skew (x)
     * d = scale (y)
     * e = translate (x)
     * f = translate (y)
     */
    this._context.transform(sx, ky, kx, ky, tx, ty);
  }

  public resetTransform() {
    this._context.resetTransform();
  }

  public clear() {
    this._context.clearRect(0, 0, this.native.width, this.native.height);
  }

  public fill(style: string, x: number, y: number, w: number, h: number): void {
    this._context.fillStyle = style;
    this._context.fillRect(x, y, w, h);
  }

  public transfer(source: IZCanvas | HTMLImageElement, x: number, y: number): void {
    const native = source instanceof HTMLImageElement ? source : source.native;
    this._context.drawImage(native, x, y);
  }
}
