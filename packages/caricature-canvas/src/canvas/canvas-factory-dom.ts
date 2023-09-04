/* istanbul ignore file --@preserve */
import { IZCanvas, ZCanvas } from './canvas';
import { IZCanvasFactory } from './canvas-factory';

export class ZCanvasFactoryDom implements IZCanvasFactory {
  public create(w: number, h: number): IZCanvas {
    const cvs = document.createElement('canvas');
    cvs.width = w;
    cvs.height = h;
    return new ZCanvas(cvs);
  }
}
