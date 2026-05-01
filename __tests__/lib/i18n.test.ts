/**
 * @file __tests__/lib/i18n.test.ts
 */

import { getTranslations, LANGUAGES, translateDynamic } from '@/lib/i18n';

describe('i18n', () => {
  it('translations', () => {
    expect(getTranslations('en').nav_timeline).toBe('Timeline');
    expect(getTranslations('hi').nav_timeline).toBe('समयरेखा');
  });

  it('languages', () => {
    expect(LANGUAGES.length).toBeGreaterThan(0);
  });

  it('dynamic translation', async () => {
    const result = await translateDynamic('Unknown text', 'hi');
    expect(result).toContain('[Translated: hi]');
  });

  it('dynamic translation with static match', async () => {
    const result = await translateDynamic('Timeline', 'en');
    expect(result).toBe('Timeline');
  });
});
