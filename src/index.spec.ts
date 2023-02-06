import {
  getVowelConsonantCounts,
  getGreatestCommonDivisor,
  calculateSuitabilityScores,
} from './index';

debugger;

describe('getVowelConsonantCounts()', () => {
  test('Jared Potter', () => {
    const expectedVowelCount = 4;
    const expectedConsonantCount = 7;
    const actual = getVowelConsonantCounts('Jared Potter');
    expect(actual.vowelCount).toEqual(expectedVowelCount);
    expect(actual.consonantCount).toEqual(expectedConsonantCount);
  });

  test('Platform Science', () => {
    const expectedVowelCount = 5;
    const expectedConsonantCount = 10;
    const actual = getVowelConsonantCounts('Platform Science');
    expect(actual.vowelCount).toEqual(expectedVowelCount);
    expect(actual.consonantCount).toEqual(expectedConsonantCount);
  });

  test('gym', () => {
    const expectedVowelCount = 1;
    const expectedConsonantCount = 2;
    const actual = getVowelConsonantCounts('gym');
    expect(actual.vowelCount).toEqual(expectedVowelCount);
    expect(actual.consonantCount).toEqual(expectedConsonantCount);
  });

  test('candy', () => {
    const expectedVowelCount = 2;
    const expectedConsonantCount = 3;
    const actual = getVowelConsonantCounts('candy');
    expect(actual.vowelCount).toEqual(expectedVowelCount);
    expect(actual.consonantCount).toEqual(expectedConsonantCount);
  });

  test('deny', () => {
    const expectedVowelCount = 2;
    const expectedConsonantCount = 2;
    const actual = getVowelConsonantCounts('deny');
    expect(actual.vowelCount).toEqual(expectedVowelCount);
    expect(actual.consonantCount).toEqual(expectedConsonantCount);
  });

  test('deny candy', () => {
    const expectedVowelCount = 4;
    const expectedConsonantCount = 5;
    const actual = getVowelConsonantCounts('deny candy');
    expect(actual.vowelCount).toEqual(expectedVowelCount);
    expect(actual.consonantCount).toEqual(expectedConsonantCount);
  });
});

describe('getGreatestCommonDivisor()', () => {
  test('2,13', async () => {
    const expected = 1;
    const actual = getGreatestCommonDivisor(2, 13);
    expect(actual).toEqual(expected);
  });

  test('2,14', async () => {
    const expected = 2;
    const actual = getGreatestCommonDivisor(2, 14);
    expect(actual).toEqual(expected);
  });

  test('6,18', async () => {
    const expected = 6;
    const actual = getGreatestCommonDivisor(6, 18);
    expect(actual).toEqual(expected);
  });

  test('3,12', async () => {
    const expected = 3;
    const actual = getGreatestCommonDivisor(3, 12);
    expect(actual).toEqual(expected);
  });

  test('5,11', async () => {
    const expected = 1;
    const actual = getGreatestCommonDivisor(5, 11);
    expect(actual).toEqual(expected);
  });

  test('4,11', async () => {
    const expected = 1;
    const actual = getGreatestCommonDivisor(4, 11);
    expect(actual).toEqual(expected);
  });
});

describe('calculateSuitabilityScores()', () => {
  test('Jacquelyn Badcock, 382 Creekside Dr.', () => {
    const expected = 16.5;
    const actual = calculateSuitabilityScores(
      ['Jacquelyn Badcock'],
      ['382 Creekside Dr.'],
    )[0];
    expect(actual.score).toEqual(expected);
  });

  test('Larry, 150 S 800 E APT G66.', () => {
    const expected = 4.5;
    const actual = calculateSuitabilityScores(
      ['Larry'],
      ['150 S 800 E APT G66.'],
    )[0];
    expect(actual.score).toEqual(expected);
  });

  test('Lachlan Clemens, 382 Colonial Street', () => {
    const expected = 10;
    const actual = calculateSuitabilityScores(
      ['Lachlan Clemens'],
      ['382 Colonial Street'],
    )[0];
    expect(actual.score).toEqual(expected);
  });

  test('Impersonal Partner Inc, 11111 Sandy Creek Drive UT', () => {
    const expected = 15.75;
    const actual = calculateSuitabilityScores(
      ['Impersonal Partner Inc'],
      ['11111 Sandy Creek Drive UT'],
    )[0];
    expect(actual.score).toEqual(expected);
  });

  test('gym gym, 11111 Sandy Creek Drive UT', () => {
    const expected = 3;
    const actual = calculateSuitabilityScores(
      ['gym gym'],
      ['11111 Sandy Creek Drive UT'],
    )[0];
    expect(actual.score).toEqual(expected);
  });

  test('candy candy, 11111 Sandy Creek Drive UT', () => {
    const expected = 6;
    const actual = calculateSuitabilityScores(
      ['candy candy'],
      ['11111 Sandy Creek Drive UT'],
    )[0];
    expect(actual.score).toEqual(expected);
  });
});
