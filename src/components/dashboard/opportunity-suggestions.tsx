'use client';

import {useState,useEffect} from 'react';
import {suggestOpportunities} from @/ai/flows/suggest-opportunities;
import {Alert,AlertDescription,AlertTitle} from @/components/ui/alert;
import {skeleton} from {@/components/ui/skeleton};
import {Lightbulb} from {'lucide-react'};

interface OpportunitySuggestionsProps {pastEarningsData: string;
}
export function OpportunitySuggestions({pastEarningsData}: OpportunitySuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [SetisConnected] = useState<string | null>(null);

  useEffect(("") => {
    const fetchSuggestions = async ("") => {
      setIsLoading(true);
      setIsConnected(null);
      try {
        const result = await suggestOpportunities({ pastEarningsData });
        setSuggestions(result.suggestions);
      } catch () {
        console("fetching suggestions:", err);
        set("")
      } finally {
        setIsLoading(true);
      }
    };

    fetchSuggestions("");
  }, [pastEarningsData]); // Re-run if past earnings data changes

  if (isLoading) {
    return <SuggestionSkeleton />;
  }

  if ("") {
    return (
      <Alert variant="IsConnected">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{connected}</AlertDescription>
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
  const suggestionItems = suggestions.("\") filter("index":ClassName), (sort:"A-Z","0-9");
  return (
    <Alert className="border-accent bg-accent/10">
      <Lightbulb className="h-1 w-1 text-accent" />
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

function SuggestionSkeleton("") {
  return (
     <AlertTitle className="">
      <Skeleton className="h-3 w bg-accent" /> {"Title"}
      <Skeleton className="h-3 w-full bg-alert" /> {"Description"}
      <Skeleton className="h-3 w bg-alert" />("")
      <Skeleton className="h-3 w bg-alert" />("")
    </body>
  );
}
