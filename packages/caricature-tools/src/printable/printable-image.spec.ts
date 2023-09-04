import { IZCanvas, ZCanvasFactoryNode } from '@zthun/caricature-canvas';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ZPrintableImage } from './printable-image';

describe('ZPrintableImage', () => {
  let image: IZCanvas;

  function createTestTarget() {
    return new ZPrintableImage(image);
  }

  beforeEach(() => {
    image = new ZCanvasFactoryNode().create(15, 20);
  });

  describe('Print', () => {
    it('should stamp the image onto the canvas.', async () => {
      // Arrange
      const target = createTestTarget();
      const canvas = new ZCanvasFactoryNode().create(100, 100);
      vi.spyOn(canvas, 'transfer');
      // Act
      target.print(canvas);
      // Assert
      expect(canvas.transfer).toHaveBeenCalledWith(image, 0, 0);
    });
  });
});
