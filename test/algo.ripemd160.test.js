import C from '../src/index';

const VERTOR_TEST_CONFIG = [
  [1, 'The quick brown fox jumps over the lazy dog', '37f332f68db77bd9d7edd4969571ad671cf9dd3b'],
  [2, 'The quick brown fox jumps over the lazy cog', '132072df690933835eb8b6ad0b77e7b6f14acad7'],
  [3, '', '9c1185a5c5e9fc54612808977ee8f548b2258d31']
];

describe('algo-ripemd160-test', () => {
  test.each(VERTOR_TEST_CONFIG)(
    'testVector%i',
    (a, b, expected) => {
      expect(C.RIPEMD160(b).toString()).toBe(expected);
    }
  );
});