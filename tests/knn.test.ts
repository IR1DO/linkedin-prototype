import { getKNearestNeighborsByUserId } from '@/lib/knn';
import { expect, test } from 'vitest';
import util from 'util';

test('k nearest neighbors', async () => {
  const users = await getKNearestNeighborsByUserId(
    'd794b392-6cc5-47e2-824b-4f38e0214394',
    5
  );
  console.log(util.inspect(users, { colors: true, depth: null }));
  expect(users.length).toBe(5);
});
