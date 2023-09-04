import { IZCanvas, ZCanvasFactoryNode } from '@zthun/caricature-canvas';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ZPrintableTransform } from './printable-transform';

describe('ZPrintableTransform', () => {
  let canvas: IZCanvas;

  function createTestTarget() {
    return new ZPrintableTransform();
  }

  beforeEach(() => {
    canvas = new ZCanvasFactoryNode().create(200, 200);
  });

  it('should apply the identity transformation on reset.', () => {
    // Arrange
    const target = createTestTarget();
    vi.spyOn(canvas, 'transform');
    // Act
    target.scale(2, 2).skew(4, 5).translate(2, 3).reset().print(canvas);
    // Assert
    expect(canvas.transform).toHaveBeenCalledWith(1, 1, 0, 0, 0, 0);
  });

  it('should apply the appropriate matrix transformation.', () => {
    // Arrange
    const target = createTestTarget().scale(1, 1).skew(1, 1).translate(1, 1);
    vi.spyOn(canvas, 'transform');
    // Act
    target.print(canvas);
    // Assert
    expect(canvas.transform).toHaveBeenCalledWith(1, 1, 1, 1, 1, 1);
  });
});
