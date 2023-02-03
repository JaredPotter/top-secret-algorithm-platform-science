"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGreatestCommonDivisor = exports.getVowelConsonantCounts = void 0;
var fs_1 = require("fs");
(function () {
    var commandLineArguments = process.argv;
    // Handle Basic Command Line File Validation
    if (!commandLineArguments[2]) {
        console.log('shipment destinations text file is required.');
        return;
    }
    if (!commandLineArguments[3]) {
        console.log('driver names text file is required.');
        return;
    }
    var destinations = (0, fs_1.readFileSync)(commandLineArguments[2], 'utf8')
        .split('\n')
        .filter(function (value) { return value; });
    var drivers = (0, fs_1.readFileSync)(commandLineArguments[3], 'utf8')
        .split('\n')
        .filter(function (value) { return value; });
    var driverNameVowelCount = {};
    var driverNameConsonantCount = {};
    for (var i = 0; i < drivers.length; i++) {
        var driverName = drivers[i];
        var vowelConsonantCounts = getVowelConsonantCounts(driverName);
        driverNameVowelCount[i] = vowelConsonantCounts.vowelCount;
        driverNameConsonantCount[i] = vowelConsonantCounts.consonantCount;
    }
    var suitabilityScores = [];
    for (var i = 0; i < destinations.length; i++) {
        var destination = destinations[i];
        var isEven = destination.length % 2 === 0;
        for (var j = 0; j < drivers.length; j++) {
            var driverName = drivers[j];
            var score = 0;
            if (isEven) {
                score = driverNameVowelCount[j] * 1.5;
            }
            else {
                score = driverNameConsonantCount[j] * 1;
            }
            // Check for common factors
            var greatestCommonDivisor = getGreatestCommonDivisor(driverName.length, destination.length);
            if (greatestCommonDivisor > 1) {
                score = score * 1.5;
            }
            suitabilityScores.push({
                score: score,
                driverIndex: j,
                destinationIndex: i,
            });
        }
    }
    suitabilityScores.sort(function (a, b) {
        return b.score - a.score;
    });
    var driverIsAssigned = {};
    var destinationIsAssigned = {};
    var totalSuitabilityScore = 0;
    var driverDestinationPairs = [];
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
    // Print Output
    console.log('Total Suitability Score -> ' + totalSuitabilityScore);
    for (var _a = 0, driverDestinationPairs_1 = driverDestinationPairs; _a < driverDestinationPairs_1.length; _a++) {
        var driverDestinationPair = driverDestinationPairs_1[_a];
        console.log("Score (".concat(driverDestinationPair.score, ") + Driver (").concat(driverDestinationPair.driverName, ") + Destination (").concat(driverDestinationPair.destination, ")"));
    }
})();
function getVowelConsonantCounts(word) {
    var lowercaseWord = word.toLowerCase();
    var vowelCount = 0;
    var consonantCount = 0;
    for (var _i = 0, lowercaseWord_1 = lowercaseWord; _i < lowercaseWord_1.length; _i++) {
        var character = lowercaseWord_1[_i];
        if (character === 'a' ||
            character === 'e' ||
            character === 'i' ||
            character === 'o' ||
            character === 'u' ||
            character === 'y') {
            vowelCount++;
        }
        else {
            consonantCount++;
        }
    }
    return {
        vowelCount: vowelCount,
        consonantCount: consonantCount,
    };
}
exports.getVowelConsonantCounts = getVowelConsonantCounts;
function getGreatestCommonDivisor(a, b) {
    if (a === 0) {
        return b;
    }
    return getGreatestCommonDivisor(b % a, a);
}
exports.getGreatestCommonDivisor = getGreatestCommonDivisor;
//# sourceMappingURL=index.js.map