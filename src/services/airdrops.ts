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

/**
 * Asynchronously retrieves a list of airdrop opportunities.
 *
 * @returns A promise that resolves to an array of AirdropOpportunity objects.
 */
export async function getAirdropOpportunities(): Promise<AirdropOpportunity[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      name: 'Airdrop 1',
      description: 'Description of Airdrop 1',
      link: 'https://example.com/airdrop1',
      potentialEarnings: 100,
    },
    {
      name: 'Airdrop 2',
      description: 'Description of Airdrop 2',
      link: 'https://example.com/airdrop2',
      potentialEarnings: 200,
    },
  ];
}
