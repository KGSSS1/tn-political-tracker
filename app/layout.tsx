import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'sonner';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          {/* Global Toaster for sleek notifications */}
          <Toaster position="bottom-right" richColors theme="system" />
        </Providers>
      </body>
    </html>
  );
}