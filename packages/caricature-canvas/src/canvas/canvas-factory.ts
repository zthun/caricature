import { IZCanvas } from './canvas';

export interface IZCanvasFactory {
  create(w: number, h: number): IZCanvas;
}
