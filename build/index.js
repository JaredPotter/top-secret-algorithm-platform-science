"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSuitabilityScore = exports.getGreatestCommonDivisor = exports.getVowelConsonantCounts = void 0;
var fs_1 = require("fs");
(function () {
    var commandLineArguments = process.argv;
    validateArguments(commandLineArguments);
    debugger;
    // Read input files
    var drivers = parseDriverFile(commandLineArguments[3]);
    var destinations = parseDestinationFile(commandLineArguments[2]);
    // Calculate the suitability scores for every pair of driver + destination
    var suitabilityScores = calculateSuitabilityScore(drivers, destinations);
    // Sort scores by descending order
    suitabilityScores.sort(function (a, b) {
        return b.score - a.score;
    });
    // Calculate total suitability score and match ideal drivers to destinations
    var _a = calculateTotalSuitabilityScoreAndDriverDestinationPairs(suitabilityScores, drivers, destinations), totalSuitabilityScore = _a.totalSuitabilityScore, driverDestinationPairs = _a.driverDestinationPairs;
    // Print output
    console.log('Total Suitability Score -> ' + totalSuitabilityScore);
    for (var _i = 0, driverDestinationPairs_1 = driverDestinationPairs; _i < driverDestinationPairs_1.length; _i++) {
        var driverDestinationPair = driverDestinationPairs_1[_i];
        console.log("Score (".concat(driverDestinationPair.score, ") + Driver (").concat(driverDestinationPair.driverName, ") + Destination (").concat(driverDestinationPair.destination, ")"));
    }
})();
/**
 * @param commandLineArguments
 * @returns
 */
function validateArguments(commandLineArguments) {
    // Handle basic command line file validation
    if (!commandLineArguments[2]) {
        console.log('Shipment destinations text file is required.');
        return;
    }
    if (!commandLineArguments[3]) {
        console.log('Driver names text file is required.');
        return;
    }
}
/**
 * @param driverFilePath
 * @returns drivers
 */
function parseDriverFile(driverFilePath) {
    var drivers = (0, fs_1.readFileSync)(driverFilePath, 'utf8')
        .split('\n')
        .filter(function (value) { return value; });
    return drivers;
}
/**
 * @param destinationFilePath
 * @returns destinations
 */
function parseDestinationFile(destinationFilePath) {
    var destinations = (0, fs_1.readFileSync)(destinationFilePath, 'utf8')
        .split('\n')
        .filter(function (value) { return value; });
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
function getVowelConsonantCounts(string) {
    var lowercaseString = string.toLowerCase();
    var regexPattern = /[^A-Za-z]/g;
    var lettersOnlyString = lowercaseString.replace(regexPattern, '');
    var vowelCount = 0;
    var consonantCount = 0;
    for (var _i = 0, lettersOnlyString_1 = lettersOnlyString; _i < lettersOnlyString_1.length; _i++) {
        var character = lettersOnlyString_1[_i];
        if (character === 'a' ||
            character === 'e' ||
            character === 'i' ||
            character === 'o' ||
            character === 'u') {
            vowelCount++;
        }
        else {
            consonantCount++;
        }
    }
    if (lettersOnlyString.includes('y')) {
        if (vowelCount === 0) {
            vowelCount = lettersOnlyString.split('y').length - 1;
            consonantCount = consonantCount - vowelCount;
        }
        else {
            var lowercaseWordSplit = lowercaseString.split(' ');
            for (var _a = 0, lowercaseWordSplit_1 = lowercaseWordSplit; _a < lowercaseWordSplit_1.length; _a++) {
                var word = lowercaseWordSplit_1[_a];
                if (word[word.length - 1] === 'y') {
                    vowelCount++;
                    consonantCount = consonantCount - 1;
                }
            }
        }
    }
    return {
        vowelCount: vowelCount,
        consonantCount: consonantCount,
    };
}
exports.getVowelConsonantCounts = getVowelConsonantCounts;
/**
 * Gets the greatest common divisor of 2 different numbers.
 *
 * @param a number
 * @param b number
 * @returns greatest common divisior - number
 */
function getGreatestCommonDivisor(a, b) {
    if (a === 0) {
        return b;
    }
    return getGreatestCommonDivisor(b % a, a);
}
exports.getGreatestCommonDivisor = getGreatestCommonDivisor;
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
function calculateSuitabilityScore(drivers, destinations) {
    var suitabilityScores = [];
    for (var i = 0; i < drivers.length; i++) {
        var driverName = drivers[i];
        var driverVowelConsonantCounts = getVowelConsonantCounts(driverName);
        for (var j = 0; j < destinations.length; j++) {
            var destination = destinations[j];
            var score = 0;
            var isDestinationEven = destination.length % 2 === 0;
            if (isDestinationEven) {
                score = driverVowelConsonantCounts.vowelCount * 1.5;
            }
            else {
                score = driverVowelConsonantCounts.consonantCount * 1;
            }
            // Check for common factors
            var greatestCommonDivisor = getGreatestCommonDivisor(driverName.length, destination.length);
            if (greatestCommonDivisor > 1) {
                score = score * 1.5;
            }
            suitabilityScores.push({
                score: score,
                driverIndex: i,
                destinationIndex: j,
            });
        }
    }
    return suitabilityScores;
}
exports.calculateSuitabilityScore = calculateSuitabilityScore;
function calculateTotalSuitabilityScoreAndDriverDestinationPairs(suitabilityScores, drivers, destinations) {
    var driverIsAssigned = {};
    var destinationIsAssigned = {};
    var totalSuitabilityScore = 0;
    var driverDestinationPairs = [];
    // Calculate the total suitability score and ideal driver + destination matches
    for (var _i = 0, suitabilityScores_1 = suitabilityScores; _i < suitabilityScores_1.length; _i++) {
        var suitabilityScore = suitabilityScores_1[_i];
        if (!driverIsAssigned[suitabilityScore.driverIndex] &&
            !destinationIsAssigned[suitabilityScore.destinationIndex]) {
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
        totalSuitabilityScore: totalSuitabilityScore,
        driverDestinationPairs: driverDestinationPairs,
    };
}
//# sourceMappingURL=index.js.map