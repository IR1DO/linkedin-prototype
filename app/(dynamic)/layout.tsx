import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/session-provider';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <SessionProvider session={session}>
      <div>{children}</div>
    </SessionProvider>
  );
}
