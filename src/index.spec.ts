import { getGreatestCommonDivisor } from './index';

describe('getGreatestCommonDivisor()', () => {
  test('2,13', async () => {
    const expected = 1;
    const actual = getGreatestCommonDivisor(2, 13);
    expect(expected).toEqual(actual);
  });

  test('2,14', async () => {
    const expected = 2;
    const actual = getGreatestCommonDivisor(2, 14);
    expect(expected).toEqual(actual);
  });

  test('6,18', async () => {
    const expected = 6;
    const actual = getGreatestCommonDivisor(6, 18);
    expect(expected).toEqual(actual);
  });

  test('3,12', async () => {
    const expected = 3;
    const actual = getGreatestCommonDivisor(3, 12);
    expect(expected).toEqual(actual);
  });

  test('5,11', async () => {
    const expected = 1;
    const actual = getGreatestCommonDivisor(5, 11);
    expect(expected).toEqual(actual);
  });

  test('4,11', async () => {
    const expected = 1;
    const actual = getGreatestCommonDivisor(4, 11);
    expect(expected).toEqual(actual);
  });
});
