import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EarningsTable } from "@/components/dashboard/earnings-table";
import { OpportunitySuggestions } from "@/components/dashboard/opportunity-suggestions";
import { Skeleton } from "@/components/ui/skeleton";
import { Bitcoin, HandHeart, Link as LinkIcon, BrainCircuit } from 'lucide-react';

// Helper function to generate random data
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFloat = (min: number, max: number, decimals: number) => {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
};

const generateEarningsData = (count: number) => {
  const types = ['airdrop', 'affiliate', 'donation'] as const;
  const data = [];
  for (let i = 0; i < count; i++) {
    const type = types[getRandomInt(0, 2)];
    let name = '';
    let source = '';
    let link = '';
    switch(type) {
        case 'airdrop':
            name = `Token Drop ${getRandomInt(1, 100)}`;
            source = 'Airdrop';
            link = `https://etherscan.io/tx/${Math.random().toString(36).substring(2)}`;
            break;
        case 'affiliate':
            name = `Referral ${getRandomInt(1, 50)}`;
            source = 'Affiliate';
            link = `https://partner.example/ref${getRandomInt(1000, 9999)}`;
            break;
        case 'donation':
            name = `Supporter ${getRandomInt(1, 200)}`;
            source = 'Donation';
            link = `https://opencollective.com/project-${getRandomInt(1, 10)}`;
            break;
    }
    data.push({
      id: `${type}${i}-${Date.now()}`, // More unique ID
      source: source,
      name: name,
      amount: getRandomFloat(5, 500, 2),
      link: link,
      type: type,
    });
  }
  return data;
};


export default function DashboardPage() {
  // Generate dynamic data to simulate automation
  const earningsData = generateEarningsData(getRandomInt(3, 7)); // Generate 3 to 7 random earnings entries

  // Prepare past earnings data for AI suggestions
  const pastEarningsString = JSON.stringify(earningsData.map(e => ({ source: e.source, name: e.name, amount: e.amount, type: e.type })));

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
            {/* Pass dynamically generated data */}
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
            {/* Pass dynamically generated data string */}
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
