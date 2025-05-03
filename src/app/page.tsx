import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EarningsTable } from "@/components/dashboard/earnings-table";
import { OpportunitySuggestions } from "@/components/dashboard/opportunity-suggestions";
import { Skeleton } from "@/components/ui/skeleton";
import { Bitcoin, HandHeart, Link as LinkIcon, BrainCircuit } from 'lucide-react';

export default function DashboardPage() {
  // Combine data from different sources for the table
  // In a real app, this data fetching would likely be more robust, possibly with loading states
  const earningsData = [
     // Placeholder data - replace with actual fetched data
    { id: 'airdrop1', source: 'Airdrop', name: 'Cosmos Drop', amount: 150, link: 'https://cosmos.network', type: 'airdrop' },
    { id: 'affiliate1', source: 'Affiliate', name: 'Exchange Referral', amount: 75.50, link: 'https://exchange.example', type: 'affiliate' },
    { id: 'donation1', source: 'Donation', name: 'Gitcoin Grant', amount: 25.00, link: 'https://gitcoin.co', type: 'donation' },
    { id: 'airdrop2', source: 'Airdrop', name: 'Solana Project', amount: 80, link: 'https://solana.com', type: 'airdrop' },
  ];

  // Mock past earnings data for AI suggestions
  const pastEarningsString = JSON.stringify(earningsData);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Earnings Dashboard Card */}
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Earnings Overview</CardTitle>
           {/* Icons representing sources */}
           <div className="flex gap-2 text-muted-foreground">
             <Bitcoin className="h-5 w-5" />
             <LinkIcon className="h-5 w-5" />
             <HandHeart className="h-5 w-5" />
           </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<EarningsTableSkeleton />}>
            <EarningsTable data={earningsData} />
          </Suspense>
        </CardContent>
      </Card>

      {/* AI Opportunity Suggestions Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">AI Suggestions</CardTitle>
          <BrainCircuit className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <Suspense fallback={<SuggestionSkeleton />}>
            <OpportunitySuggestions pastEarningsData={pastEarningsString} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

// Skeleton component for EarningsTable
function EarningsTableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

// Skeleton component for OpportunitySuggestions
function SuggestionSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
