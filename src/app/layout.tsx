import { getText } from '@/utils';
import type { Metadata } from 'next';
import Head from 'next/head';
import type { ReactNode } from 'react';

import '@/styles/reset.css';
import '@/styles/globals.css';

export var metadata: Metadata = {
  title: getText('app.name'),
  description: getText('app.slogan'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
