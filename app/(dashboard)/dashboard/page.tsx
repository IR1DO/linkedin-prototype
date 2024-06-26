import { db } from '@/lib/db';
import { skills, users, usersToSkills } from '@/lib/schema';
import { count, desc, eq } from 'drizzle-orm';
import { BarChart } from '@mantine/charts';

async function getCountOfJobTitles() {
  return await db
    .select({ jobTitle: users.jobTitle, count: count() })
    .from(users)
    .groupBy(users.jobTitle)
    .orderBy(desc(count()));
}

async function getCountOfSkills() {
  return await db
    .select({ name: skills.name, count: count() })
    .from(skills)
    .leftJoin(usersToSkills, eq(skills.id, usersToSkills.skillId))
    .groupBy(skills.name)
    .orderBy(desc(count()));
}

export default async function Page() {
  const jobTitleData = await getCountOfJobTitles();
  const SkillsData = await getCountOfSkills();

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='font-bold text-xl text-center'>Dashboard</h1>
      <h2 className='font-bold text-xl'>Job Titles</h2>
      <BarChart
        h={300}
        data={jobTitleData}
        dataKey='jobTitle'
        type='stacked'
        orientation='vertical'
        yAxisProps={{ width: 80 }}
        series={[{ name: 'count', color: 'blue.6' }]}
      />

      <h2 className='font-bold text-xl'>Skills</h2>
      <BarChart
        h={300}
        data={SkillsData}
        dataKey='name'
        type='stacked'
        orientation='vertical'
        yAxisProps={{ width: 80 }}
        series={[{ name: 'count', color: 'green.6' }]}
      />
    </div>
  );
}
