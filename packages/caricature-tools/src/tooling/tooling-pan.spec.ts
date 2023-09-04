import { IZCanvas, ZCanvasFactoryNode } from '@zthun/caricature-canvas';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { IZPrintable } from '../printable/printable';
import { ZPrintableNothing } from '../printable/printable-nothing';
import { ZPrintableTransform } from '../printable/printable-transform';
import { IZTransformTranslate } from '../transform/transform-translate';
import { ZToolingPan } from './tooling-pan';

describe('ZToolingPan', () => {
  let canvas: IZCanvas;
  let element: HTMLElement;
  let transform: IZTransformTranslate;
  let drawing: IZPrintable;
  let _target: ZToolingPan;

  function createTestTarget() {
    _target = new ZToolingPan();
    _target.init(element, canvas, drawing, transform);
    return _target;
  }

  beforeEach(() => {
    element = document.createElement('canvas');
    canvas = new ZCanvasFactoryNode().create(100, 100);
    transform = new ZPrintableTransform();
    drawing = new ZPrintableNothing();

    vi.spyOn(drawing, 'print');
  });

  afterEach(() => {
    _target.destroy();
  });

  it('should move along the (x, y) axis when dragging.', () => {
    // Arrange
    createTestTarget();
    // Act
    element.dispatchEvent(new MouseEvent('mousedown', { screenX: 50, screenY: 100 }));
    element.dispatchEvent(new MouseEvent('mousemove', { screenX: 100, screenY: 50 }));
    document.dispatchEvent(new MouseEvent('mouseup'));
    element.dispatchEvent(new MouseEvent('mousemove', { screenX: 105, screenY: 57 }));
    const coords = [transform.translateX, transform.translateY];
    // Assert
    expect(coords).toEqual([50, -50]);
  });

  it('should move along the (x, y) axis while respecting the previous movements.', () => {
    // Arrange
    transform.translate(200, 400);
    createTestTarget();
    // Act
    element.dispatchEvent(new MouseEvent('mousedown', { screenX: 50, screenY: 100 }));
    element.dispatchEvent(new MouseEvent('mousemove', { screenX: 100, screenY: 50 }));
    document.dispatchEvent(new MouseEvent('mouseup'));
    element.dispatchEvent(new MouseEvent('mousemove', { screenX: 105, screenY: 57 }));
    const coords = [transform.translateX, transform.translateY];
    // Assert
    expect(coords).toEqual([250, 350]);
  });

  it('should refresh the drawing while moving.', () => {
    // Arrange
    createTestTarget();
    // Act
    element.dispatchEvent(new MouseEvent('mousedown', { screenX: 50, screenY: 100 }));
    element.dispatchEvent(new MouseEvent('mousemove', { screenX: 100, screenY: 50 }));
    element.dispatchEvent(new MouseEvent('mousemove', { screenX: 101, screenY: 51 }));
    document.dispatchEvent(new MouseEvent('mouseup'));
    element.dispatchEvent(new MouseEvent('mousemove', { screenX: 105, screenY: 57 }));
    // Assert
    expect(drawing.print).toHaveBeenCalledTimes(2);
  });

  it('should not move if the user never mouses down.', () => {
    // Arrange
    createTestTarget();
    const expected = [transform.translateX, transform.translateY];
    // Act
    element.dispatchEvent(new MouseEvent('mousemove', { screenX: 100, screenY: 50 }));
    element.dispatchEvent(new MouseEvent('mousemove', { screenX: 101, screenY: 51 }));
    const actual = [transform.translateX, transform.translateY];
    // Assert
    expect(actual).toEqual(expected);
  });

  it('should no longer activate once the tool is destroyed.', () => {
    // Arrange
    const expected = [transform.translateX, transform.translateY];
    const target = createTestTarget();
    // Act
    target.destroy();
    element.dispatchEvent(new MouseEvent('mousedown', { screenX: 50, screenY: 100 }));
    element.dispatchEvent(new MouseEvent('mousemove', { screenX: 100, screenY: 50 }));
    document.dispatchEvent(new MouseEvent('mouseup'));
    element.dispatchEvent(new MouseEvent('mousemove', { screenX: 105, screenY: 57 }));
    const actual = [transform.translateX, transform.translateY];
    // Assert
    expect(actual).toEqual(expected);
  });
});
