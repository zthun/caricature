import { ZCanvasPrintable } from '@zthun/caricature-react';
import { ZPrintableColor } from '@zthun/caricature-tools';
import { ZFullScreen, ZGrid, useFashionTheme } from '@zthun/fashion-boutique';
import { ZSizeVaried } from '@zthun/fashion-tailor';
import React, { useMemo } from 'react';

export function ZCaricatureApp() {
  const { success } = useFashionTheme();

  const draw = useMemo(() => new ZPrintableColor(success.main), []);

  return (
    <ZFullScreen>
      <ZGrid rows='1fr' height={ZSizeVaried.Full}>
        <ZCanvasPrintable draw={draw} />
      </ZGrid>
    </ZFullScreen>
  );
}
