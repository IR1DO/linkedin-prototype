'use client';

import { updateUser } from '@/lib/actions';
import { User } from '@/lib/types';
import { TextInput } from '@mantine/core';
import { useFormState } from 'react-dom';

export default function UserForm({ user }: { user: User }) {
  const initialState = { errors: {} };

  const [state, dispatch] = useFormState(updateUser, initialState);

  return (
    <div>
      <form action={dispatch}>
        <div>
          <TextInput
            label='Job Title'
            name='jobTitle'
            error={state?.errors?.jobTitle}
            defaultValue={user.jobTitle!}
          />
        </div>
      </form>
    </div>
  );
}
