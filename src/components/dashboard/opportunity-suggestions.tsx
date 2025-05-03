'use client';

import { useState, useEffect } from 'react';
import { suggestOpportunities } from '@/ai/flows/suggest-opportunities';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Lightbulb } from 'lucide-react';

interface OpportunitySuggestionsProps {
  pastEarningsData: string;
}

export function OpportunitySuggestions({ pastEarningsData }: OpportunitySuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await suggestOpportunities({ pastEarningsData });
        setSuggestions(result.suggestions);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
        setError("Failed to load suggestions. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [pastEarningsData]); // Re-run if past earnings data changes

  if (isLoading) {
    return <SuggestionSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!suggestions) {
    return (
      <Alert>
        <AlertDescription>No suggestions available at the moment.</AlertDescription>
      </Alert>
    );
  }

  // Basic parsing assuming suggestions are newline-separated points or paragraphs
  const suggestionItems = suggestions.split('\n').filter(line => line.trim() !== '');

  return (
    <Alert className="border-accent bg-accent/10">
      <Lightbulb className="h-4 w-4 !text-accent" />
      <AlertTitle className="text-accent">Opportunities</AlertTitle>
      <AlertDescription>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {suggestionItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}

function SuggestionSkeleton() {
  return (
     <div className="space-y-2 p-4">
      <Skeleton className="h-4 w-10 bg-accent/30" /> {/* Title */}
      <Skeleton className="h-4 w-full bg-muted" />
      <Skeleton className="h-4 w-5/6 bg-muted" />
      <Skeleton className="h-4 w-3/4 bg-muted" />
    </div>
  );
}
