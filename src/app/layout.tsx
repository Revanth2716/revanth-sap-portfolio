import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://revanth2716.github.io'),
  title: 'Yarramsetti Revanth | Entry-Level SAP BASIS Analyst | NetWeaver 7.5 · ABAP · RFC · HANA',
  description:
    'Cinematic enterprise portfolio of Yarramsetti Revanth, Entry-Level SAP BASIS Analyst. 8-month SAP BASIS internship at Eezycode, NetWeaver 7.5 architecture, 9 published SAP GitHub repositories, 475 automated tests, transport management (SE09/STMS), background jobs (SM37), and role administration (SU01/PFCG).',
  keywords: [
    'SAP BASIS',
    'SAP NetWeaver 7.5',
    'ABAP',
    'SAP JCo',
    'RFC',
    'SAP HANA',
    'Transport Management',
    'SE09',
    'STMS',
    'Background Jobs',
    'SM37',
    'PFCG',
    'SU01',
    'Yarramsetti Revanth',
    'SAP Analyst',
    'Enterprise ERP',
  ],
  authors: [{ name: 'Yarramsetti Revanth', url: 'https://github.com/Revanth2716' }],
  creator: 'Yarramsetti Revanth',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://github.com/Revanth2716',
    title: 'Yarramsetti Revanth | Entry-Level SAP BASIS Analyst',
    description:
      'Enterprise SAP BASIS engineering showcase with interactive 3D NetWeaver landscape, live TMS transport simulator, SoD role hierarchy matrix, ST12/ST03 trace analyzer, and 9 published repositories.',
    siteName: 'Yarramsetti Revanth SAP Portfolio',
    images: [
      {
        url: '/avatar_portrait.jpg',
        width: 1200,
        height: 630,
        alt: 'Yarramsetti Revanth - Entry-Level SAP BASIS Analyst',
      },
    ],
  },
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#040814" />
      </head>
      <body>{children}</body>
    </html>
  );
}
