/**
 * @file __tests__/lib/electionData.test.ts
 * @description Tests to validate the integrity of the election data.
 */

import {
  ELECTION_PHASES,
  FAQ_ITEMS,
  QUICK_PROMPTS,
} from '@/lib/electionData';

describe('ELECTION_PHASES', () => {
  it('contains exactly 7 phases', () => {
    expect(ELECTION_PHASES).toHaveLength(7);
  });

  it('each phase has a unique id', () => {
    const ids = ELECTION_PHASES.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('each phase has a step number from 1 to 7', () => {
    const steps = ELECTION_PHASES.map((p) => p.step).sort((a, b) => a - b);
    expect(steps).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('every phase has required fields', () => {
    ELECTION_PHASES.forEach((phase) => {
      expect(phase.id).toBeTruthy();
      expect(phase.title).toBeTruthy();
      expect(phase.description).toBeTruthy();
      expect(phase.icon).toBeTruthy();
      expect(phase.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(Array.isArray(phase.details)).toBe(true);
      expect(phase.details.length).toBeGreaterThan(0);
    });
  });
});

describe('FAQ_ITEMS', () => {
  it('has at least 8 FAQ items', () => {
    expect(FAQ_ITEMS.length).toBeGreaterThanOrEqual(8);
  });

  it('each FAQ item has a unique id', () => {
    const ids = FAQ_ITEMS.map((f) => f.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('each FAQ item has a question and answer', () => {
    FAQ_ITEMS.forEach((item) => {
      expect(item.question.trim().length).toBeGreaterThan(0);
      expect(item.answer.trim().length).toBeGreaterThan(0);
    });
  });

  it('each FAQ item has a valid category', () => {
    const validCategories = [
      'registration',
      'voting',
      'candidates',
      'results',
      'eligibility',
      'general',
    ];
    FAQ_ITEMS.forEach((item) => {
      expect(validCategories).toContain(item.category);
    });
  });
});

describe('QUICK_PROMPTS', () => {
  it('has at least 4 quick prompts', () => {
    expect(QUICK_PROMPTS.length).toBeGreaterThanOrEqual(4);
  });

  it('every prompt has a non-empty label and prompt text', () => {
    QUICK_PROMPTS.forEach((qp) => {
      expect(qp.label.trim().length).toBeGreaterThan(0);
      expect(qp.prompt.trim().length).toBeGreaterThan(0);
    });
  });

  it('every prompt has a non-empty icon', () => {
    QUICK_PROMPTS.forEach((qp) => {
      expect(qp.icon.trim().length).toBeGreaterThan(0);
    });
  });
});
