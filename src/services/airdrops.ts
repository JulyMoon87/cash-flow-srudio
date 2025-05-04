/**
 * Represents an airdrop opportunity.
 */
export interface AirdropOpportunity {
  /**
   * The name of the airdrop.
   */
  name: string;
  /**
   * The description of the airdrop.
   */
  description: string;
  /**
   * The link to the airdrop.
   */
  link: string;
  /**
   * The potential earnings from the airdrop.
   */
  potentialEarnings: number;
}

// Helper function to generate random data
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFloat = (min: number, max: number, decimals: number) => {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
};
const generateRandomString = (length: number) => Math.random().toString(36).substring(2, 2 + length);

/**
 * Asynchronously retrieves a list of airdrop opportunities.
 * Simulates fetching dynamic data for automation.
 *
 * @returns A promise that resolves to an array of AirdropOpportunity objects.
 */
export async function getAirdropOpportunities(): Promise<AirdropOpportunity[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, getRandomInt(100, 500)));

  const count = getRandomInt(1, 5); // Generate 1 to 5 opportunities
  const opportunities: AirdropOpportunity[] = [];

  for (let i = 0; i < count; i++) {
    const projectName = `Project ${generateRandomString(5).toUpperCase()}`;
    opportunities.push({
      name: `${projectName} Airdrop`,
      description: `Claim your ${projectName} tokens for participating in the ecosystem. Eligibility criteria may apply.`,
      link: `https://example-airdrop.com/${generateRandomString(8)}`,
      potentialEarnings: getRandomFloat(50, 1000, 2),
    });
  }

  return opportunities;
}
