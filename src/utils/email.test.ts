import { describe, expect, it } from 'vitest';
import { isValidEmail } from './email';

describe('isValidEmail', () => {
  it('accepts ordinary addresses, ignoring surrounding whitespace', () => {
    expect(isValidEmail('jane@example.com')).toBe(true);
    expect(isValidEmail('  jane.doe+test@sub.example.co  ')).toBe(true);
  });

  it('rejects malformed addresses', () => {
    for (const value of ['', 'jane', 'jane@', '@example.com', 'jane@example', 'ja ne@example.com']) {
      expect(isValidEmail(value)).toBe(false);
    }
  });
});
