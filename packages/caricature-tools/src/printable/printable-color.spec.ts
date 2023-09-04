import { IZCanvas, ZCanvasFactoryNode } from '@zthun/caricature-canvas';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ZPrintableColor } from './printable-color';

describe('ZPrintableColor', () => {
  let canvas: IZCanvas;

  function createTestTarget(color?: string) {
    return new ZPrintableColor(color);
  }

  beforeEach(() => {
    canvas = new ZCanvasFactoryNode().create(200, 200);
    vi.spyOn(canvas, 'fill');
  });

  it('should print transparent to the entire canvas.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    target.print(canvas);
    // Assert
    expect(canvas.fill).toHaveBeenCalledWith('transparent', 0, 0, canvas.width, canvas.height);
  });

  it('should print the correct color to the entire canvas.', () => {
    // Arrange
    const expected = '#123456';
    const target = createTestTarget(expected);
    // Act
    target.print(canvas);
    // Assert
    expect(canvas.fill).toHaveBeenCalledWith(expected, 0, 0, canvas.width, canvas.height);
  });
});
