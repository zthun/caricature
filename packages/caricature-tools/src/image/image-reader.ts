/* istanbul ignore file */

import { IZCanvas, IZCanvasFactory } from '@zthun/caricature-canvas';

/*
 * The methods in this module are untestable in the jest framework.
 *
 * It's honestly not worth the effort to mock all this out.
 *
 * https://github.com/jsdom/jsdom/issues/1721
 */

/**
 * Represents an object that can be used to read an image.
 */
export interface IZImageReader {
  /**
   * Reads the data blob.
   *
   * @param data -
   *        The data to read.  This can be a url to an image or a Blob that can convert locally to an image.
   *
   * @returns
   *        A promise that returns the loaded canvas.  If the read fails,
   *        then a canvas that is a 1x1 white pixel will be returned.
   */
  read(data: string | Blob | null): Promise<IZCanvas>;
}

/**
 * Represents the standard implementation of the image reader object.
 */
export class ZImageReader implements IZImageReader {
  public constructor(private _factory: IZCanvasFactory) {}

  /**
   * Reads the data blob.
   *
   * @param data -
   *        The data to read.  This can be a url to an image or a Blob that can convert locally to an image.
   *
   * @returns
   *        A promise that returns the loaded canvas.  If the read fails,
   *        then a canvas that is a 1x1 white pixel will be returned.
   */
  public read(data: string | Blob | null): Promise<IZCanvas> {
    const canvas = this._factory.create(1, 1);

    return new Promise<IZCanvas>((resolve) => {
      if (data == null) {
        resolve(canvas);
        return;
      }

      const url = typeof data === 'string' ? data : URL.createObjectURL(data);
      const img = new Image();

      img.crossOrigin = 'Anonymous';

      img.onload = () => {
        canvas.resize(img.width, img.height);
        canvas.transfer(img, 0, 0);
        URL.revokeObjectURL(url);
        resolve(canvas);
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(canvas);
      };

      img.src = url;
    });
  }
}
