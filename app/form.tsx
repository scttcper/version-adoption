'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Label, Input, Button, Form, TextField } from 'react-aria-components';

export function IndexForm() {
  const router = useRouter();
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('package');
    router.push(`/package/${name}`);
  }

  return (
    <Form onSubmit={handleSubmit} className="mt-4 mb-8">
      <div className="flex gap-x-4">
        <TextField className="flex-grow flex items-center" name="package">
          <Label className="sr-only">Package name</Label>
          <Input
            placeholder="npm Package Name"
            className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-neutral-500 focus:ring-3 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
          />
        </TextField>
        <Button
          type="submit"
          className="flex-none rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}
