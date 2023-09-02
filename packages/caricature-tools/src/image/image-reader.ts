/* istanbul ignore file */

import { get2d } from '@zthun/caricature-canvas';

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
  read(data: string | Blob): Promise<HTMLCanvasElement>;
}

/**
 * Represents the standard implementation of the image reader object.
 */
export class ZImageReader implements IZImageReader {
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
  public read(data: string | Blob): Promise<HTMLCanvasElement> {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const bmp = get2d(canvas);

    return new Promise<HTMLCanvasElement>((resolve) => {
      const url = typeof data === 'string' ? data : URL.createObjectURL(data);
      const img = new Image();

      img.crossOrigin = 'Anonymous';

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        bmp.drawImage(img, 0, 0);
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
