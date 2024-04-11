'use client';

import { updateSkillRating } from '@/lib/actions';
import { Rating } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

export default function SkillRatingForm({
  rating,
  skillId,
}: {
  rating: number;
  skillId: string;
}) {
  const initalState = { errors: {} };
  const [state, dispatch] = useFormState(updateSkillRating, initalState);

  async function handleChange(newRating: number) {
    const formData = new FormData();
    formData.set('rating', newRating.toString());
    formData.set('skillId', skillId);
    dispatch(formData);
  }

  useEffect(() => {
    if (state.success) {
      notifications.show({
        title: 'Success',
        message: 'Skill has been updated',
        color: 'green',
      });
    } else if (state.message) {
      notifications.show({
        title: 'Error',
        message: 'The form submission seems to be invalid',
        color: 'red',
      });
    }
  }, [state]);

  return <Rating value={rating} onChange={handleChange} />;
}
