import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import "./globals.css";

export const metadata: Metadata = {
  title: "StackLoad",
  description: "Advanced Tech Career Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <MantineProvider>
            <AppShell>
                {children}
            </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
