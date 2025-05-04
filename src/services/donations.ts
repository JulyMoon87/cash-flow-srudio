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

// Helper function to generate random data
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFloat = (min: number, max: number, decimals: number) => {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
};
const generateRandomString = (length: number) => Math.random().toString(36).substring(2, 2 + length);


/**
 * Asynchronously retrieves a list of donation platforms.
 * Simulates fetching dynamic data for automation.
 *
 * @returns A promise that resolves to an array of DonationPlatform objects.
 */
export async function getDonationPlatforms(): Promise<DonationPlatform[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, getRandomInt(100, 500)));

  const count = getRandomInt(1, 3); // Generate 1 to 3 platforms
  const platforms: DonationPlatform[] = [];

  for (let i = 0; i < count; i++) {
    const platformName = `Support ${generateRandomString(6)}`;
    platforms.push({
      name: platformName,
      description: `Receive donations for your creative work or open source project on ${platformName}.`,
      link: `https://donate.example/${generateRandomString(7)}`,
      averageDonation: getRandomFloat(5, 50, 2),
    });
  }

  return platforms;
}
