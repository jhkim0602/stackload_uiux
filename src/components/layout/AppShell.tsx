'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isWorkspace = pathname?.startsWith('/workspace');

    if (isWorkspace) {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col min-h-screen">
             <Navbar />
             <div className="flex-1 pt-14">
                 <main>{children}</main>
             </div>
             <Footer />
        </div>
    );
}
