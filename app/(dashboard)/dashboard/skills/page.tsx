import { db } from '@/lib/db';
import { skills, usersToSkills } from '@/lib/schema';
import { Card } from '@mantine/core';
import { IconUsersGroup } from '@tabler/icons-react';
import { eq, sql } from 'drizzle-orm';
import Link from 'next/link';

async function getSkills() {
  const res = await db
    .select({
      id: skills.id,
      name: skills.name,
      count: sql<number>`count(${usersToSkills.userId})`,
    })
    .from(skills)
    .leftJoin(usersToSkills, eq(skills.id, usersToSkills.skillId))
    .groupBy(skills.id, skills.name);

  return res;
}

// DEBUG
// async function getTest() {
//   const res = await db
//     .select({
//       id: skills.id,
//       name: skills.name,
//       userId: usersToSkills.userId,
//     })
//     .from(skills)
//     .leftJoin(usersToSkills, eq(skills.id, usersToSkills.skillId))
//     .orderBy(skills.name);

//   return res;
// }

export default async function Page() {
  const skills = await getSkills();

  // DEBUG
  // const test = await getTest();
  // console.log('-----test: ');
  // console.log(test);

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-xl font-bold text-center'>Skills</h1>
      <ul className='flex flex-col gap-2'>
        {skills.map((skill) => (
          <li key={skill.id}>
            <Link href={`/dashboard/skills/${skill.id}`}>
              <Card withBorder shadow='md'>
                <div className='flex flex-row justify-between'>
                  {skill.name}
                  <span className='flex flex-row gap-2'>
                    <IconUsersGroup /> {skill.count}
                  </span>
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
