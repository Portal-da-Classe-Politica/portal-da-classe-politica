import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';

import './globals.css';
import 'ol/ol.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import { Footer } from '@components/sections/Footer';
import { AccessibilityHeader } from '@components/sections/AccessibilityHeader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Redem',
  description: 'Portal da Classe Politica',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <body className={`${inter.className} flex flex-col`} style={{ height: '100%' }}>
        <AccessibilityHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
