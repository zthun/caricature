import { IZPrintable, ZPrintableColor } from '@zthun/caricature-tools';
import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { white } from '@zthun/fashion-theme';
import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { ZCanvasPrintable } from './canvas-printable';
import { ZCanvasPrintableComponentModel } from './canvas-printable.cm';

describe('ZCanvasPrintable', () => {
  let draw: IZPrintable;

  const createTestTarget = async () => {
    const element = <ZCanvasPrintable draw={draw} />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZCanvasPrintableComponentModel);
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
