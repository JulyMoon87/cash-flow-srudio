'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { WalletConnect } from '@/components/dashboard/wallet-connect';
import { Coins } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="sm:hidden" />
      <div className="flex items-center gap-2">
        <Coins className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-semibold">Cashflow Navigator</h1>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <WalletConnect />
      </div>
    </header>
  );
}
