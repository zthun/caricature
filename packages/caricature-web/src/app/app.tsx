import { ZCanvasPrinter } from '@zthun/caricature-react';
import { ZPrintableColor } from '@zthun/caricature-tools';
import { useFashionTheme } from '@zthun/fashion-boutique';
import React, { useMemo } from 'react';

export function ZCaricatureApp() {
  const { success } = useFashionTheme();

  const draw = useMemo(() => new ZPrintableColor(success.main), []);

  return <ZCanvasPrinter draw={draw} />;
}
