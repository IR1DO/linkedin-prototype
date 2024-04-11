import UserCard from '@/components/user-card';
import { db } from '@/lib/db';
import { getKNearestNeighborsByUserId } from '@/lib/knn';
import { users } from '@/lib/schema';
import { Avatar, NumberFormatter } from '@mantine/core';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

async function getUserById(id: string) {
  return await db.query.users.findFirst({
    where: eq(users.id, id),
    with: { usersToUsersSkills: { with: { skill: true } } },
  });
}

async function getSimilarPeople(userId: string) {
  const similarPeople = await getKNearestNeighborsByUserId(userId, 5);
  return similarPeople;
}

export default async function Page({ params }: { params: { id: string } }) {
  // DEBUG
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const { id } = params;
  const user = await getUserById(id);
  const similarPeople = await getSimilarPeople(id);

  if (!user) {
    notFound();
  }

  return (
    <div className='flex flex-row gap-5'>
      <div>
        <UserCard user={user} />
      </div>

      <div>
        <h2 className='font-bold text-xl mb-2'>Bio</h2>
        <div
          className='prose dark:prose-invert'
          dangerouslySetInnerHTML={{ __html: user.bio ?? '' }}
        />

        <h2 className='font-bold text-xl my-6'>Similar People</h2>
        <div className='flex flex-col gap-2'>
          {similarPeople.map((person) => (
            <div
              key={person.user.id}
              className='flex flex-row items-center gap-4'
            >
              <Avatar src={person.user.image} size='md' />
              <div className='flex flex-row gap-4'>
                {person.user.firstName} {person.user.lastName}
                <span className='text-cyan-500'>{person.user.jobTitle}</span>
              </div>

              <div className='flex-grow text-right font-semibold text-emerald-600'>
                <NumberFormatter
                  value={person.similarity * 100}
                  suffix='%'
                  decimalScale={2}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
