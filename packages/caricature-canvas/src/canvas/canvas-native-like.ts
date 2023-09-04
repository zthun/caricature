export interface IZCanvasNativeContextLike<TImageSource> {
  fillStyle: string | CanvasGradient | CanvasPattern;

  transform(a: number, b: number, c: number, d: number, e: number, f: number): void;
  resetTransform(): void;
  fillRect(x: number, y: number, w: number, h: number): void;
  clearRect(x: number, y: number, w: number, h: number): void;
  drawImage(source: TImageSource, x: number, y: number): void;
}

export interface IZCanvasNativeLike<TImageSource> {
  width: number;
  height: number;

  getContext(context: '2d'): IZCanvasNativeContextLike<TImageSource> | null;
}
