import { IZCanvas } from '@zthun/caricature-canvas';
import { IZPrintable } from './printable';

/**
 * Represents an object that can print the contexts of a canvas to another canvas.
 */
export class ZPrintableImage implements IZPrintable {
  public constructor(private _image: IZCanvas) {}

  public print(canvas: IZCanvas) {
    canvas.transfer(this._image, 0, 0);
  }
}
