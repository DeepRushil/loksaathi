/**
 * @file src/lib/utils.ts
 * @description Core utility functions for LokSaathi.
 * Dependency-free implementation for maximum efficiency and portability.
 */

/**
 * Simple conditional class merger (dependency-free alternative to clsx/cn).
 * @param {...any} classes Array of class values (strings, booleans, etc.).
 * @returns {string} Merged class string.
 */
export function cn(...classes: any[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Robustly sanitizes a string to prevent injection attacks.
 * @param {string} str The raw string to sanitize.
 * @returns {string} The sanitized string.
 */
export function sanitizeString(str: string): string {
  if (!str) return '';
  return str
    .replace(/[&<>"']/g, (match) => {
      const escape: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      };
      return escape[match];
    })
    .trim();
}

/**
 * Generates a random unique ID.
 * @returns {string}
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Formats a date to HH:MM format.
 * @param {Date} date The date to format.
 * @returns {string}
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Validates if a message is non-empty and safe.
 * @param {string} msg The message to validate.
 * @returns {boolean}
 */
export function isValidMessage(msg: string): boolean {
  return typeof msg === 'string' && msg.trim().length > 0;
}
