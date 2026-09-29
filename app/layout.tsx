import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'CodePixel Web — Demo Admin Panel', description: 'একটি সম্পূর্ণ E-commerce Admin Panel-এর Interactive Demo দেখুন।' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="bn"><body>{children}</body></html>; }
