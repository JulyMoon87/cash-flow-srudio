// use server'

/**
 * @fileOverview An AI agent that suggests promising earning opportunities based on user data.
 *
 * - suggestOpportunities - A function that handles the suggestion of earning opportunities.
 * - SuggestOpportunitiesInput - The input type for the suggestOpportunities function.
 * - SuggestOpportunitiesOutput - The return type for the suggestOpportunities function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getAirdropOpportunities} from '@/services/airdrops';
import {getAffiliateOpportunities} from '@/services/affiliate-marketing';
import {getDonationPlatforms} from '@/services/donations';

const SuggestOpportunitiesInputSchema = z.object({
  pastEarningsData: z
    .string()
    .describe(
      'A string containing the user\'s past earnings data from various sources (crypto airdrops, affiliate links, donations).'
    ),
});
export type SuggestOpportunitiesInput = z.infer<typeof SuggestOpportunitiesInputSchema>;

const SuggestOpportunitiesOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('A list of suggested earning opportunities based on the user\'s past earnings data.'),
});
export type SuggestOpportunitiesOutput = z.infer<typeof SuggestOpportunitiesOutputSchema>;

export async function suggestOpportunities(input: SuggestOpportunitiesInput): Promise<SuggestOpportunitiesOutput> {
  return suggestOpportunitiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOpportunitiesPrompt',
  input: {
    schema: z.object({
      pastEarningsData: z
        .string()
        .describe(
          'A string containing the user\'s past earnings data from various sources (crypto airdrops, affiliate links, donations).'
        ),
      airdrops: z.array(z.object({
        name: z.string(),
        description: z.string(),
        link: z.string(),
        potentialEarnings: z.number(),
      })).describe('A list of available airdrop opportunities.'),
      affiliates: z.array(z.object({
        name: z.string(),
        description: z.string(),
        link: z.string(),
        potentialEarnings: z.number(),
      })).describe('A list of available affiliate opportunities.'),
      donations: z.array(z.object({
        name: z.string(),
        description: z.string(),
        link: z.string(),
        averageDonation: z.number(),
      })).describe('A list of available donation platforms.'),
    }),
  },
  output: {
    schema: z.object({
      suggestions: z
        .string()
        .describe('A list of suggested earning opportunities based on the user\'s past earnings data.'),
    }),
  },
  prompt: `You are an AI assistant designed to analyze user data and suggest the most promising earning opportunities.

  Analyze the user's past earnings data and suggest the best earning opportunities from the provided airdrops, affiliate programs and donation platforms.

  Past Earnings Data: {{{pastEarningsData}}}

  Available Airdrops: {{#each airdrops}}- Name: {{name}}, Description: {{description}}, Potential Earnings: {{potentialEarnings}}, Link: {{link}}\n{{/each}}

  Available Affiliate Programs: {{#each affiliates}}- Name: {{name}}, Description: {{description}}, Potential Earnings: {{potentialEarnings}}, Link: {{link}}\n{{/each}}

  Available Donation Platforms: {{#each donations}}- Name: {{name}}, Description: {{description}}, Average Donation: {{averageDonation}}, Link: {{link}}\n{{/each}}

  Suggestions:`,
});

const suggestOpportunitiesFlow = ai.defineFlow<
  typeof SuggestOpportunitiesInputSchema,
  typeof SuggestOpportunitiesOutputSchema
>({
  name: 'suggestOpportunitiesFlow',
  inputSchema: SuggestOpportunitiesInputSchema,
  outputSchema: SuggestOpportunitiesOutputSchema,
}, async input => {
  const airdrops = await getAirdropOpportunities();
  const affiliates = await getAffiliateOpportunities();
  const donations = await getDonationPlatforms();

  const {output} = await prompt({
    ...input,
    airdrops,
    affiliates,
    donations,
  });
  return output!;
});
