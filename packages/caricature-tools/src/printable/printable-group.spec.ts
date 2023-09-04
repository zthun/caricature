import { IZCanvas, ZCanvasFactoryNode } from '@zthun/caricature-canvas';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IZPrintable } from './printable';
import { ZPrintableGroup } from './printable-group';
import { ZPrintableNothing } from './printable-nothing';

describe('ZPrintableGroup', () => {
  let canvas: IZCanvas;
  let top: IZPrintable;
  let middle: IZPrintable;
  let bottom: IZPrintable;
  let printed: IZPrintable[];

  function createTestTarget(layers?: IZPrintable[]) {
    return new ZPrintableGroup(layers);
  }

  beforeEach(() => {
    canvas = new ZCanvasFactoryNode().create(200, 200);

    printed = [];
    top = new ZPrintableNothing();
    middle = new ZPrintableNothing();
    bottom = new ZPrintableNothing();

    vi.spyOn(top, 'print').mockImplementation(() => printed.push(top));
    vi.spyOn(middle, 'print').mockImplementation(() => printed.push(middle));
    vi.spyOn(bottom, 'print').mockImplementation(() => printed.push(bottom));
  });

  it('should print no layers if the layers are empty.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    target.print(canvas);
    // Assert
    expect(true).toBeTruthy();
  });

  it('should print the layers.', () => {
    // Arrange
    const target = createTestTarget([bottom, middle, top]);
    // Act
    target.print(canvas);
    // Assert
    expect(printed).toEqual([bottom, middle, top]);
  });
});
