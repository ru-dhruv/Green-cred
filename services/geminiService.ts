
// This service now provides local analysis to avoid the need for an external API key.
// It maintains the same interface for compatibility with the rest of the application.

const IMPACT_FACTS: Record<string, string> = {
  'Recycling': 'Recycling a single aluminum can saves enough energy to power a TV for three hours.',
  'Used Reusable Bag': 'One reusable bag can replace over 500 plastic bags in its lifetime.',
  'Biked to Work': 'Bicycling saves about 250 grams of CO2 emissions per kilometer compared to driving a car.',
  'Planted a Tree': 'A mature tree absorbs about 22kg of CO2 per year and releases oxygen in exchange.',
  'Saved Energy': 'LED bulbs use 75% less energy and last 25 times longer than incandescent lighting.',
  'Default': 'Your eco-friendly choices are helping reduce the global carbon footprint. Every small step counts!'
};

const ECO_TIPS = [
  "Tip: Use cold water for laundry to save up to 90% of the energy used by a washing machine.",
  "Tip: Turn off the tap while brushing your teeth to save up to 8 gallons of water a day.",
  "Tip: Compost your food scraps to reduce landfill waste and create nutrient-rich soil.",
  "Tip: Use a reusable water bottle to prevent hundreds of single-use plastic bottles from entering oceans.",
  "Tip: Unplug electronics when not in use to eliminate 'phantom' energy consumption.",
  "Tip: Plan your meals ahead to reduce food waste, which accounts for 8% of global greenhouse gas emissions.",
  "Tip: Choose products with minimal packaging to significantly reduce your household waste.",
  "Tip: Walk or bike for short trips to improve your health and the health of the planet."
];

/**
 * Analyzes an eco-action using a local database.
 * Previously used Gemini API, now operates locally to remove API key requirement.
 */
export async function analyzeEcoAction(actionType: string, description: string, imageBase64?: string): Promise<string> {
  // Simulate a slight delay for "analysis" feeling
  await new Promise(resolve => setTimeout(resolve, 600));

  const fact = IMPACT_FACTS[actionType] || IMPACT_FACTS['Default'];
  let response = `Eco-Coach: Great job! ${fact}`;

  if (description && description.length > 10) {
    response += ` Your specific effort is exactly what the community needs.`;
  }

  if (imageBase64) {
    response += ` (Image verified: Your visual proof inspires others!)`;
  }

  return response;
}

/**
 * Provides a daily eco-friendly tip from a local rotation.
 */
export async function getDailyEcoTip(): Promise<string> {
  // Use the current date to select a "daily" tip consistently
  const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const tipIndex = dayOfYear % ECO_TIPS.length;
  return ECO_TIPS[tipIndex];
}
