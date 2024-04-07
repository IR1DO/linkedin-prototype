import PaginationContainer from '@/components/pagination-container';
import UserCard from '@/components/user-card';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { User } from '@/lib/types';
import { count } from 'drizzle-orm';
import Link from 'next/link';

const PER_PAGE = 20;

async function getUsers(page: number) {
  const countRes = await db.select({ value: count() }).from(users);
  const offset = PER_PAGE * (page - 1);
  const data = await db.query.users.findMany({
    limit: PER_PAGE,
    offset: offset,
  });
  const userCount = countRes[0].value;
  const numPages = Math.ceil(userCount / PER_PAGE);

  return {
    data: data,
    count: userCount,
    numPages: numPages,
  };
}

interface Props {
  searchParams: { page: number };
}

export default async function Page({ searchParams }: Props) {
  // DEBUG
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const page = searchParams.page || 1;
  const res = await getUsers(page);

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='font-bold text-xl text-center'>People Page</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
        {res.data.map((user: User) => (
          <div key={user.id}>
            <Link href={`/dashboard/people/${user.id}`}>
              <UserCard user={user} />
            </Link>
          </div>
        ))}
      </div>

      <div className='mt-4'>
        <PaginationContainer total={res.numPages} value={page} />
      </div>
    </div>
  );
}
