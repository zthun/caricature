import { IZPrintable, ZPrintableColor } from '@zthun/caricature-tools';
import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { white } from '@zthun/fashion-theme';
import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { ZCanvasPrinter } from './canvas-printer';
import { ZCanvasPrinterComponentModel } from './canvas-printer.cm';

describe('ZCanvasPrinter', () => {
  let draw: IZPrintable;

  const createTestTarget = async () => {
    const element = <ZCanvasPrinter draw={draw} />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZCanvasPrinterComponentModel);
  };

  beforeEach(() => {
    draw = new ZPrintableColor(white());
  });

  it('should render the canvas', async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
