/* istanbul ignore file --@preserve */

import { Canvas } from 'canvas';
import { IZCanvas, ZCanvas } from './canvas';
import { IZCanvasFactory } from './canvas-factory';

export class ZCanvasFactoryNode implements IZCanvasFactory {
  public create(w: number, h: number): IZCanvas {
    return new ZCanvas(new Canvas(w, h));
  }
}
