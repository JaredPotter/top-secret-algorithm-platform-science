import { readFileSync } from 'fs';

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

  // Handle Basic Command Line File Validation
  if (!commandLineArguments[2]) {
    console.log('shipment destinations text file is required.');
    return;
  }

  if (!commandLineArguments[3]) {
    console.log('driver names text file is required.');
    return;
  }

  const destinations = readFileSync(commandLineArguments[2], 'utf8')
    .split('\n')
    .filter((value) => value);
  const drivers = readFileSync(commandLineArguments[3], 'utf8')
    .split('\n')
    .filter((value) => value);
  const driverNameVowelCount: Record<number, number> = {};
  const driverNameConsonantCount: Record<number, number> = {};

  for (let i = 0; i < drivers.length; i++) {
    const driverName = drivers[i];
    const vowelConsonantCounts = getVowelConsonantCounts(driverName);

    driverNameVowelCount[i] = vowelConsonantCounts.vowelCount;
    driverNameConsonantCount[i] = vowelConsonantCounts.consonantCount;
  }

  const suitabilityScores: Suitability[] = [];

  for (let i = 0; i < destinations.length; i++) {
    const destination = destinations[i];
    const isEven = destination.length % 2 === 0;

    for (let j = 0; j < drivers.length; j++) {
      const driverName = drivers[j];
      let score = 0;

      if (isEven) {
        score = driverNameVowelCount[j] * 1.5;
      } else {
        score = driverNameConsonantCount[j] * 1;
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
        driverIndex: j,
        destinationIndex: i,
      });
    }
  }

  suitabilityScores.sort((a, b) => {
    return b.score - a.score;
  });

  const driverIsAssigned: Record<number, boolean> = {};
  const destinationIsAssigned: Record<number, boolean> = {};

  let totalSuitabilityScore = 0;
  const driverDestinationPairs: DriverDestinationPair[] = [];

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

  // Print Output
  console.log('Total Suitability Score -> ' + totalSuitabilityScore);
  for (const driverDestinationPair of driverDestinationPairs) {
    console.log(
      `Score (${driverDestinationPair.score}) + Driver (${driverDestinationPair.driverName}) + Destination (${driverDestinationPair.destination})`,
    );
  }
})();

function getVowelConsonantCounts(word: string): {
  vowelCount: number;
  consonantCount: number;
} {
  const lowercaseWord = word.toLowerCase();
  let vowelCount = 0;
  let consonantCount = 0;

  for (const character of lowercaseWord) {
    if (
      character === 'a' ||
      character === 'e' ||
      character === 'i' ||
      character === 'o' ||
      character === 'u' ||
      character === 'y'
    ) {
      vowelCount++;
    } else {
      consonantCount++;
    }
  }

  return {
    vowelCount,
    consonantCount,
  };
}

function getGreatestCommonDivisor(a: number, b: number): number {
  if (a === 0) {
    return b;
  }

  return getGreatestCommonDivisor(b % a, a);
}

export { getVowelConsonantCounts, getGreatestCommonDivisor };
