import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CodePixel Commerce OS — Admin Panel',
  description: 'একটি প্রিমিয়াম বাংলা e-commerce admin panel demo।',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="bn"><body>{children}</body></html>;
}
