"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGreatestCommonDivisor = exports.getVowelConsonantCounts = void 0;
var fs_1 = require("fs");
(function () {
    var commandLineArguments = process.argv;
    if (!commandLineArguments[2]) {
        console.log('shipment destinations text file is required.');
        return;
    }
    if (!commandLineArguments[3]) {
        console.log('driver names text file is required.');
        return;
    }
    var shipmentDestinations = (0, fs_1.readFileSync)(commandLineArguments[2], 'utf8').split('\n');
    var driverNames = (0, fs_1.readFileSync)(commandLineArguments[3], 'utf8').split('\n');
    var driverNameVowelCount = {};
    var driverNameConsonantCount = {};
    for (var i = 0; i < driverNames.length; i++) {
        var driverName = driverNames[i];
        var vowelConsonantCounts = getVowelConsonantCounts(driverName);
        driverNameVowelCount[i] = vowelConsonantCounts.vowelCount;
        driverNameConsonantCount[i] = vowelConsonantCounts.consonantCount;
    }
    // const isShipmentDestinationStreetNameEven: Record<number, boolean> = {};
    var suitabilityScores = [];
    for (var i = 0; i < shipmentDestinations.length; i++) {
        var shipmentDestination = shipmentDestinations[i];
        var isEven = shipmentDestination.length % 2 === 0;
        for (var j = 0; j < driverNames.length; j++) {
            var driverName = driverNames[j];
            var suitabilityScore = 0;
            if (isEven) {
                suitabilityScore = driverNameVowelCount[j] * 1.5;
            }
            else {
                suitabilityScore = driverNameConsonantCount[j] * 1;
            }
            // Check for common factors
            var greatestCommonDivisor = getGreatestCommonDivisor(driverName.length, shipmentDestination.length);
            if (greatestCommonDivisor > 1) {
                suitabilityScore = suitabilityScore * 1.5;
            }
            suitabilityScores.push({
                suitabilityScore: suitabilityScore,
                driverIndex: j,
                destinationIndex: i,
            });
        }
    }
    suitabilityScores.sort(function (a, b) {
        return b.suitabilityScore - a.suitabilityScore;
    });
    var driverIsAssigned = {};
    var destinationIsAssigned = {};
    var totalSuitabilityScore = 0;
    for (var _i = 0, suitabilityScores_1 = suitabilityScores; _i < suitabilityScores_1.length; _i++) {
        var suitabilityScore = suitabilityScores_1[_i];
        if (!driverIsAssigned[suitabilityScore.driverIndex] &&
            !destinationIsAssigned[suitabilityScore.destinationIndex]) {
            totalSuitabilityScore =
                totalSuitabilityScore + suitabilityScore.suitabilityScore;
            driverIsAssigned[suitabilityScore.driverIndex] = true;
            destinationIsAssigned[suitabilityScore.destinationIndex] = true;
        }
    }
    debugger;
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