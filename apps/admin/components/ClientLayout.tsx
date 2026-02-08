// @ts-nocheck
'use client';

import { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import Providers from '@/components/AuthProvider';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <Providers>
      <ConfigProvider>{children}</ConfigProvider>
    </Providers>
  );
}
