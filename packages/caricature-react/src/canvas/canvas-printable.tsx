import { ZCanvas } from '@zthun/caricature-canvas';
import { IZPrintable } from '@zthun/caricature-tools';
import { createStyleHook } from '@zthun/fashion-boutique';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { useEffect, useRef } from 'react';

export interface IZCanvas {
  draw: IZPrintable;
}

const useCanvasStyles = createStyleHook(() => ({
  canvas: {
    height: '100%',
    width: '100%',
    flexGrow: 1,
    justifySelf: 'center',
    alignSelf: 'center'
  }
}));

export function ZCanvasPrintable(props: IZCanvas) {
  const { draw } = props;
  const { classes } = useCanvasStyles();
  const _dom = useRef<HTMLCanvasElement>(document.createElement('canvas'));

  useEffect(() => {
    draw.print(new ZCanvas(_dom.current));
  }, [draw, _dom.current]);

  return <canvas className={cssJoinDefined('ZCanvasPrintable-root', classes.canvas)} ref={_dom} />;
}
