'use client';

import { User } from '@/lib/types';
import { Table } from '@mantine/core';
import Link from 'next/link';

export default function UsersTable({ users }: { users: User[] }) {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Username</Table.Th>
          <Table.Th>First Name</Table.Th>
          <Table.Th>Last Name</Table.Th>
          <Table.Th>Job Title</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {users.map((user: User) => (
          <Table.Tr key={user.id}>
            <Table.Td>
              <Link
                href={`/dashboard/people/${user.id}`}
                className='text-blue-500'
              >
                {user.name}
              </Link>
            </Table.Td>

            <Table.Td>{user.firstName}</Table.Td>
            <Table.Td>{user.lastName}</Table.Td>
            <Table.Td>{user.jobTitle}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
