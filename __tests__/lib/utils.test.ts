/**
 * @file __tests__/lib/utils.test.ts
 * @description Unit tests for utility functions to ensure 100% logic coverage.
 */

import { cn, sanitizeString, generateId, formatTime, isValidMessage } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      expect(cn('a', 'b')).toBe('a b');
      expect(cn('a', false && 'b', 'c')).toBe('a c');
      expect(cn('a', undefined, 'd')).toBe('a d');
    });
  });

  describe('sanitizeString', () => {
    it('escapes HTML special characters', () => {
      const input = '<script>alert("XSS")</script> & "test"';
      const output = sanitizeString(input);
      expect(output).not.toContain('<script>');
      expect(output).toContain('&lt;script&gt;');
      expect(output).toContain('&amp;');
      expect(output).toContain('&quot;');
    });

    it('handles empty strings', () => {
      expect(sanitizeString('')).toBe('');
    });
  });

  describe('generateId', () => {
    it('generates a string ID', () => {
      const id = generateId();
      expect(typeof id).toBe('string');
      expect(id.length).toBeGreaterThan(0);
    });
  });

  describe('formatTime', () => {
    it('formats dates consistently', () => {
      const date = new Date(2026, 4, 1, 14, 30);
      const time = formatTime(date);
      expect(time).toMatch(/\d{1,2}:\d{2}/);
    });
  });

  describe('isValidMessage', () => {
    it('validates messages correctly', () => {
      expect(isValidMessage('Hello')).toBe(true);
      expect(isValidMessage('  ')).toBe(false);
      expect(isValidMessage('')).toBe(false);
      // @ts-ignore
      expect(isValidMessage(null)).toBe(false);
    });
  });
});
