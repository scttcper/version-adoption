import Link from 'next/link';
import { IndexForm } from './form';
import GitHubLink from '../components/GitHubLink';

const examples = [
  'npm',
  'react',
  'vue',
  '@angular/core',
  'typescript',
  'next',
  'vite',
  'webpack',
  '@rspack/core',
  'puppeteer',
  'eslint',
  '@sentry/core',
];

export default function IndexPage() {
  return (
    <div>
      <div className="mt-4 mb-6 flex items-center justify-between">
        <h1 className="leading-10 text-xl">npm Version Adoption</h1>
        <GitHubLink />
      </div>
      
      <p className="">
        Downloads by version over the last 7 days. Pulled directly from npm and grouped
        into semver major and minor.
      </p>

      <IndexForm />

      <h3 className="text-lg mt-4">Examples</h3>
      <ul className="leading-6">
        {examples.map(name => (
          <li key={name}>
            <Link
              prefetch={false}
              href={`/package/${name}`}
              className="text-slate-600 hover:text-slate-600 focus:text-slate-800 visited:text-neutral-600 underline underline-offset-2"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
