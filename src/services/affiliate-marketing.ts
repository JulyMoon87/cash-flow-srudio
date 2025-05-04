/**
 * Represents an affiliate marketing opportunity.
 */
export interface AffiliateOpportunity {
  /**
   * The name of the affiliate program.
   */
  name: string;
  /**
   * The description of the affiliate program.
   */
  description: string;
  /**
   * The affiliate link.
   */
  link: string;
  /**
   * The potential earnings from the affiliate program (e.g., commission rate or flat fee).
   */
  potentialEarnings: number; // Assuming this represents a potential % or fixed amount example
}

// Helper function to generate random data
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFloat = (min: number, max: number, decimals: number) => {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
};
const generateRandomString = (length: number) => Math.random().toString(36).substring(2, 2 + length);


/**
 * Asynchronously retrieves a list of affiliate marketing opportunities.
 * Simulates fetching dynamic data for automation.
 *
 * @returns A promise that resolves to an array of AffiliateOpportunity objects.
 */
export async function getAffiliateOpportunities(): Promise<AffiliateOpportunity[]> {
   // Simulate API call delay
   await new Promise(resolve => setTimeout(resolve, getRandomInt(100, 500)));

   const count = getRandomInt(1, 4); // Generate 1 to 4 opportunities
   const opportunities: AffiliateOpportunity[] = [];

   for (let i = 0; i < count; i++) {
     const serviceName = `Service ${generateRandomString(4).toUpperCase()}`;
     const commission = getRandomFloat(5, 25, 1); // e.g., 5.0% to 25.0%
     opportunities.push({
       name: `${serviceName} Affiliate Program`,
       description: `Earn ${commission}% commission for every new customer you refer to ${serviceName}.`,
       link: `https://partner.${serviceName.toLowerCase()}.com/signup?ref=${generateRandomString(10)}`,
       potentialEarnings: commission, // Representing commission rate here
     });
   }

   return opportunities;
}
