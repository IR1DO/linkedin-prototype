import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchInput() {
  const [query, setQuery] = useState('');
  const { push } = useRouter();

  const handleSearch = function (e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      const params = new URLSearchParams();
      params.set('query', query);
      push(`/dashboard/search?${params.toString()}`);
    }
  };

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  };

  return (
    <TextInput
      rightSection={<IconSearch />}
      placeholder='Search'
      onKeyDown={handleSearch}
      value={query}
      onChange={handleChange}
    />
  );
}
