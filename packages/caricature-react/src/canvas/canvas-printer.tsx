import { ZCanvas } from '@zthun/caricature-canvas';
import { IZPrintable } from '@zthun/caricature-tools';
import React, { useEffect, useRef } from 'react';

export interface IZCanvasPrinter {
  draw?: IZPrintable;

  height?: number;
  width?: number;
}

export function ZCanvasPrinter(props: IZCanvasPrinter) {
  const { draw, width = 1280, height = 720 } = props;
  const _dom = useRef<HTMLCanvasElement>(document.createElement('canvas'));

  useEffect(() => {
    const canvas = new ZCanvas(_dom.current);
    canvas.resize(width, height);
    draw?.print(new ZCanvas(_dom.current));
  }, [draw, _dom.current, height, width]);

  return <canvas className='ZCanvasPrintable-root' ref={_dom} />;
}
