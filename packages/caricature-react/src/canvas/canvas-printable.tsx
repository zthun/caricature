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
  const _canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const context = _canvas.current?.getContext('2d');

    if (context) {
      draw.print(context);
    }
  }, [draw, _canvas.current]);

  return <canvas className={cssJoinDefined('ZCaricatureCanvas-root', classes.canvas)} ref={_canvas} />;
}
