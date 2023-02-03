import { readFileSync } from 'fs';

interface VowelConsonantCounts {
  vowelCount: number;
  consonantCount: number;
}

interface Suitability {
  score: number;
  driverIndex: number;
  destinationIndex: number;
}

interface DriverDestinationPair {
  driverName: string;
  destination: string;
  score: number;
}

(() => {
  const commandLineArguments = process.argv;

  // Handle basic command line file validation
  if (!commandLineArguments[2]) {
    console.log('Shipment destinations text file is required.');
    return;
  }

  if (!commandLineArguments[3]) {
    console.log('Driver names text file is required.');
    return;
  }

  // Read input files
  const destinations = readFileSync(commandLineArguments[2], 'utf8')
    .split('\n')
    .filter((value) => value);
  const drivers = readFileSync(commandLineArguments[3], 'utf8')
    .split('\n')
    .filter((value) => value);

  const suitabilityScores: Suitability[] = [];

  // Calculate the suitability scores for every pair of driver + destination
  for (let i = 0; i < drivers.length; i++) {
    const driverName = drivers[i];
    const driverVowelConsonantCounts = getVowelConsonantCounts(driverName);

    for (let j = 0; j < destinations.length; j++) {
      const destination = destinations[j];
      const score = calculateSuitabilityScore(
        driverName,
        destination,
        driverVowelConsonantCounts,
      );

      suitabilityScores.push({
        score,
        driverIndex: i,
        destinationIndex: j,
      });
    }
  }

  // Sort scores by descending order
  suitabilityScores.sort((a, b) => {
    return b.score - a.score;
  });

  const driverIsAssigned: Record<number, boolean> = {};
  const destinationIsAssigned: Record<number, boolean> = {};

  let totalSuitabilityScore = 0;
  const driverDestinationPairs: DriverDestinationPair[] = [];

  // Calculate the total suitability score and ideal driver + destination matches
  for (const suitabilityScore of suitabilityScores) {
    if (
      !driverIsAssigned[suitabilityScore.driverIndex] &&
      !destinationIsAssigned[suitabilityScore.destinationIndex]
    ) {
      driverDestinationPairs.push({
        driverName: drivers[suitabilityScore.driverIndex],
        destination: destinations[suitabilityScore.destinationIndex],
        score: suitabilityScore.score,
      });

      totalSuitabilityScore = totalSuitabilityScore + suitabilityScore.score;

      driverIsAssigned[suitabilityScore.driverIndex] = true;
      destinationIsAssigned[suitabilityScore.destinationIndex] = true;
    }
  }

  // Print output
  console.log('Total Suitability Score -> ' + totalSuitabilityScore);
  for (const driverDestinationPair of driverDestinationPairs) {
    console.log(
      `Score (${driverDestinationPair.score}) + Driver (${driverDestinationPair.driverName}) + Destination (${driverDestinationPair.destination})`,
    );
  }
})();

/**
 * Counts the number of vowels and consonants in a string.
 *
 * Counts 'y' as a vowel only in case where it is the only vowel and
 * at the end of a word. Ignores counting 'y' as a vowel when it is in
 * or end of a syllable.
 *
 * @param string
 * @returns { vowelCount: number; consonantCount: number; }
 */
function getVowelConsonantCounts(string: string): {
  vowelCount: number;
  consonantCount: number;
} {
  const lowercaseString = string.toLowerCase();
  const regexPattern = /[^A-Za-z]/g;
  const lettersOnlyString = lowercaseString.replace(regexPattern, '');
  let vowelCount = 0;
  let consonantCount = 0;

  for (const character of lettersOnlyString) {
    if (
      character === 'a' ||
      character === 'e' ||
      character === 'i' ||
      character === 'o' ||
      character === 'u'
    ) {
      vowelCount++;
    } else {
      consonantCount++;
    }
  }

  if (lettersOnlyString.includes('y')) {
    if (vowelCount === 0) {
      vowelCount = lettersOnlyString.split('y').length - 1;
      consonantCount = consonantCount - vowelCount;
    } else {
      const lowercaseWordSplit = lowercaseString.split(' ');

      for (const word of lowercaseWordSplit) {
        if (word[word.length - 1] === 'y') {
          vowelCount++;
          consonantCount = consonantCount - 1;
        }
      }
    }
  }

  return {
    vowelCount,
    consonantCount,
  };
}

/**
 * Gets the greatest common divisor of 2 different numbers.
 *
 * @param a number
 * @param b number
 * @returns greatest common divisior - number
 */
function getGreatestCommonDivisor(a: number, b: number): number {
  if (a === 0) {
    return b;
  }

  return getGreatestCommonDivisor(b % a, a);
}

/**
 * Calculates the suitability score for a particular driver and destination.
 * 
 * If the length of the shipment's destination street name is even, the base suitability
score (SS) is the number of vowels in the driver’s name multiplied by 1.5.
 * 
 * If the length of the shipment's destination street name is odd, the base SS is the
number of consonants in the driver’s name multiplied by 1. 
 * If the length of the shipment's destination street name shares any common factors
(besides 1) with the length of the driver’s name, the SS is increased by 50% above the
base SS.
 *
 * @param driverName
 * @param destination 
 * @param driverVowelConsonantCounts 
 * @returns score
 */
function calculateSuitabilityScore(
  driverName: string,
  destination: string,
  driverVowelConsonantCounts: VowelConsonantCounts,
): number {
  let score = 0;
  const isDestinationEven = destination.length % 2 === 0;

  if (isDestinationEven) {
    score = driverVowelConsonantCounts.vowelCount * 1.5;
  } else {
    score = driverVowelConsonantCounts.consonantCount * 1;
  }

  // Check for common factors
  const greatestCommonDivisor = getGreatestCommonDivisor(
    driverName.length,
    destination.length,
  );

  if (greatestCommonDivisor > 1) {
    score = score * 1.5;
  }

  return score;
}

export {
  getVowelConsonantCounts,
  getGreatestCommonDivisor,
  calculateSuitabilityScore,
};
