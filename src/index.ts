import { readFileSync } from 'fs';
import { DriverDestinationPair } from './interfaces/DriverDestinationPair';
import { Suitability } from './interfaces/Suitability';

(() => {
  const commandLineArguments = process.argv;

  if (!validateArguments(commandLineArguments)) {
    return;
  }

  debugger;
  // Read input files
  const drivers = parseDriverFile(commandLineArguments[3]);
  const destinations = parseDestinationFile(commandLineArguments[2]);

  // Calculate the suitability scores for every pair of driver + destination
  const suitabilityScores: Suitability[] = calculateSuitabilityScores(
    drivers,
    destinations,
  );

  // Sort scores by descending order
  suitabilityScores.sort((a, b) => {
    return b.score - a.score;
  });

  // Calculate total suitability score and match ideal drivers to destinations
  const { totalSuitabilityScore, driverDestinationPairs } =
    calculateTotalSuitabilityScoreAndDriverDestinationPairs(
      suitabilityScores,
      drivers,
      destinations,
    );

  // Print output
  console.log('Total Suitability Score -> ' + totalSuitabilityScore);
  for (const driverDestinationPair of driverDestinationPairs) {
    console.log(
      `Score (${driverDestinationPair.score}) + Driver (${driverDestinationPair.driverName}) + Destination (${driverDestinationPair.destination})`,
    );
  }
})();

/**
 * @param commandLineArguments
 * @returns
 */
function validateArguments(commandLineArguments: string[]): boolean {
  // Handle basic command line file validation
  if (!commandLineArguments[2]) {
    console.log('Shipment destinations text file is required.');

    return false;
  }

  if (!commandLineArguments[3]) {
    console.log('Driver names text file is required.');

    return false;
  }

  return true;
}

/**
 * @param driverFilePath
 * @returns drivers
 */
function parseDriverFile(driverFilePath: string): string[] {
  const drivers = readFileSync(driverFilePath, 'utf8')
    .split('\n')
    .filter((value) => value);

  return drivers;
}

/**
 * @param destinationFilePath
 * @returns destinations
 */
function parseDestinationFile(destinationFilePath: string): string[] {
  const destinations = readFileSync(destinationFilePath, 'utf8')
    .split('\n')
    .filter((value) => value);

  return destinations;
}

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
 * Calculates the suitability scores for all driver / destination pairs.
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
 * @param drivers
 * @param destinations
 * @returns scores
 */
function calculateSuitabilityScores(
  drivers: string[],
  destinations: string[],
): Suitability[] {
  const suitabilityScores: Suitability[] = [];

  for (let i = 0; i < drivers.length; i++) {
    const driverName = drivers[i];
    const driverVowelConsonantCounts = getVowelConsonantCounts(driverName);

    for (let j = 0; j < destinations.length; j++) {
      const destination = destinations[j];
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

      suitabilityScores.push({
        score,
        driverIndex: i,
        destinationIndex: j,
      });
    }
  }

  return suitabilityScores;
}

function calculateTotalSuitabilityScoreAndDriverDestinationPairs(
  suitabilityScores: Suitability[],
  drivers: string[],
  destinations: string[],
): {
  totalSuitabilityScore: number;
  driverDestinationPairs: DriverDestinationPair[];
} {
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

  return {
    totalSuitabilityScore,
    driverDestinationPairs,
  };
}

export {
  getVowelConsonantCounts,
  getGreatestCommonDivisor,
  calculateSuitabilityScores,
};
