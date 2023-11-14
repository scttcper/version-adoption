'use client';
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { SearchField, Label, Input, Button } from 'react-aria-components';

export function IndexForm() {
  const router = useRouter();
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('package');
    router.push(`/package/${name}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 mb-8">
      <div className="flex gap-x-4">
        <SearchField className="flex-grow flex items-center">
          <Label htmlFor="package" className="sr-only">
            Package name
          </Label>
          <Input
            name="package"
            placeholder="npm Package Name"
            type="text"
            required
            className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </SearchField>
        <Button
          type="submit"
          className="flex-none rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
