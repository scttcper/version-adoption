import React from 'react';
import Link from 'next/link';
import router from 'next/router';

function IndexPage() {
  const [name, setName] = React.useState('');
  function handleSubmit(event: any) {
    event.preventDefault();
    console.log(event);
    router.push(`/package/${name}`);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  return (
    <div>
      <h1>npm package version adoption</h1>
      <p>
        Get downloads by version over the last 7 days. This is scraped from npm's new downloads per
        version and grouped by semver major and minor.
      </p>
      <form onSubmit={handleSubmit}>
        <input placeholder="package name" type="text" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>

      <h3>Examples</h3>
      <ul>
        <li>
          <Link prefetch={false} href="/package/react">
            React
          </Link>
        </li>
        <li>
          <Link prefetch={false} href="/package/vue">
            Vue
          </Link>
        </li>
        <li>
          <Link prefetch={false} href="/package/@angular/core">
            @angular/core
          </Link>
        </li>
        <li>
          <Link prefetch={false} href="/package/typescript">
            typescript
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default IndexPage;
