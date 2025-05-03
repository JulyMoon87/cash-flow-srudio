/**
 * Represents a donation platform.
 */
export interface DonationPlatform {
  /**
   * The name of the donation platform.
   */
  name: string;
  /**
   * The description of the donation platform.
   */
  description: string;
  /**
   * The link to the donation platform.
   */
  link: string;
  /**
   * The average donation amount on the platform.
   */
  averageDonation: number;
}

/**
 * Asynchronously retrieves a list of donation platforms.
 *
 * @returns A promise that resolves to an array of DonationPlatform objects.
 */
export async function getDonationPlatforms(): Promise<DonationPlatform[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      name: 'Donation Platform 1',
      description: 'Description of Donation Platform 1',
      link: 'https://example.com/donation1',
      averageDonation: 10,
    },
    {
      name: 'Donation Platform 2',
      description: 'Description of Donation Platform 2',
      link: 'https://example.com/donation2',
      averageDonation: 15,
    },
  ];
}
