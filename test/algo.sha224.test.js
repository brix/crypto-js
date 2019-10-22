import C from '../src/index';

const VECTOR_TEST_CONFIG = [
  [1, '', 'd14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f'],
  [1, 'The quick brown fox jumps over the lazy dog', '730e109bd7a8a32b1cb9d9a09aa2325d2430587ddbc0c38bad911525'],
  [1, 'The quick brown fox jumps over the lazy dog.', '619cba8e8e05826e9b8c519c0a5c68f4fb653e8a3d8aa04bb2c8cd4c']
];

describe('algo-sha224-test', () => {
  test.each(VECTOR_TEST_CONFIG)(
    'testVector%i',
    (a, b, expected) => {
      expect(C.SHA224(b).toString()).toBe(expected);
    }
  );
});