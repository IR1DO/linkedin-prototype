import { combinedSimilarity, cosineSimilarity } from '@/lib/similarity';
import { expect, test } from 'vitest';

test('cosine similarity exact vectors', () => {
  const vector1 = [5, 5, 5, 5, 5];
  const vector2 = [5, 5, 5, 5, 5];
  const score = cosineSimilarity(vector1, vector2);
  expect(score).toBe(0.9999999999999999);
});

test('combined similarity same job title', () => {
  const vector1 = [5, 4, 3, 5, 0];
  const vector2 = [0, 0, 3, 4, 5];
  const score = combinedSimilarity(
    vector1,
    vector2,
    'Full Stack Developer',
    'Full Stack Developer'
  );
  expect(score).toBe(0.5788544135504649);
});

test('combined similarity different job title', () => {
  const vector1 = [5, 4, 3, 5, 0];
  const vector2 = [0, 0, 3, 4, 5];
  const score = combinedSimilarity(
    vector1,
    vector2,
    'Full Stack Developer',
    'Back End Developer'
  );
  expect(score).toBe(0.37885441355046484);
});
