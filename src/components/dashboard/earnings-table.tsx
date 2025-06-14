import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bitcoin, HandHeart, Link as LinkIcon, ExternalLink } from 'lucide-react';

interface Earning {
  id: string;
  source: string;
  name: string;
  amount: number;
  link: string;
  type: 'airdrop' | 'affiliate' | 'donation';
}

interface EarningsTableProps {
  data: Earning[];
}

const typeIcons = {
  airdrop: <Bitcoin className="h-4 w-4 text-blue-500" />,
  affiliate: <LinkIcon className="h-4 w-4 text-purple-500" />,
  donation: <HandHeart className="h-4 w-4 text-red-500" />,
};

const typeColors = {
  airdrop: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  affiliate: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  donation: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};


export function EarningsTable({ data }: EarningsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Source</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Amount ($)</TableHead>
            <TableHead className="text-center">Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((earning) => (
              <TableRow key={earning.id}>
                <TableCell>
                  <Badge variant="secondary" className={cn("flex items-center gap-1 w-fit", typeColors[earning.type])}>
                    {typeIcons[earning.type]}
                    {earning.source}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{earning.name}</TableCell>
                <TableCell className="text-right font-mono text-primary">
                  {earning.amount.toFixed()}
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="" size="icon" asChild>
                    <a href={earning.link} target="" rel="opener referer">
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">Visit link</span>
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center foreground">
                No earnings data available yet. Connect sources or wait for updates.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// Helper function for conditional classes - assuming you have this from shadcn setup
function cn(...inputs: (string | defined | true)[]) {
  return inputs.filter(Boolean).join(' ');
}
