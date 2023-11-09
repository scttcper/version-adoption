import Link from 'next/link';
import groupBy from 'lodash/groupBy';
import semver from 'semver';

import VersionTable from '../../../components/VersionTable';
import { VersionData } from '../../../interfaces/types';

type Props = {
  major: VersionData;
  minor: VersionData;
  total: number;
};

function groupByVersion(
  versionsDownloads: Record<string, number>,
  semverVersion: 'major' | 'minor'
) {
  return groupBy(Object.entries(versionsDownloads), ([key]) => {
    try {
      const version = semver.parse(key);
      if (version) {
        if (semverVersion === 'major') {
          return version.major;
        }
        if (semverVersion === 'minor') {
          return `${version.major}.${version.minor}`;
        }
      }
    } catch (e) {
      // pass
    }

    return null;
  });
}

/** Make each group a valid version, for some reason semver won't parse '3' as a version */
function toVersion(version: string) {
  return version.split('.').length === 1 ? `${version}.0.0` : `${version}.0`;
}

function totalByVersion(groups: ReturnType<typeof groupByVersion>) {
  return Object.entries(groups)
    .map(([major, versionResults]) => {
      return [major, versionResults.reduce((acc, currentValue) => acc + currentValue[1], 0)] as [
        string,
        number
      ];
    })
    .sort(([versionA], [versionB]) => semver.compareLoose(toVersion(versionA), toVersion(versionB)))
    .reverse();
}

function filterByPercent(percent: number): (data: VersionData[0]) => boolean {
  return ([_, downloads]) => downloads > percent;
}

async function getData(pkg: string): Promise<Props> {
  const request = await fetch(`https://www.npmjs.com/package/${pkg.toLowerCase()}`);
  const text = await request.text();

  const contextObj = /window\.__context__\s?=\s?(?<context>.*)<\/script/.exec(text);
  if (contextObj === null || !contextObj.groups) {
    throw new Error('failed to get package data object');
  }
  // Bad at regex
  const context = JSON.parse(contextObj.groups.context.split('</script>')[0]);
  const versionsDownloads: Record<string, number> = context.context.versionsDownloads;
  const majorGroups = groupByVersion(versionsDownloads, 'major');
  const minorGroups = groupByVersion(versionsDownloads, 'minor');
  delete majorGroups['null'];
  delete minorGroups['null'];

  const major = totalByVersion(majorGroups);
  const minor = totalByVersion(minorGroups);
  const total = major.reduce((acc, currentValue) => acc + currentValue[1], 0);
  const onePercent = total * 0.01;
  const majorFiltered = major.filter(filterByPercent(onePercent));
  const minorFiltered = minor.filter(filterByPercent(onePercent));
  return { major: majorFiltered, minor: minorFiltered, total };
}

export default async function PackagePage({ params: { pkg } }: { params: { pkg: string } }) {
  if (!pkg) {
    throw new Error('Package name required');
  }

  if (Array.isArray(pkg) && pkg.length > 2) {
    throw new Error('Invalid package name');
  }

  const packageName = decodeURIComponent(Array.isArray(pkg) ? pkg.join('/') : pkg);
  const data = await getData(packageName);

  return (
    <div>
      <div className="mb-8 mt-8">
        <Link href="/" className="text-gray-700 font-semibold">
          Home
        </Link>
      </div>

      <p className="leading-7 text-lg">
        <span className="">Package:</span>{' '}
        <a href={`https://npmjs.com/${packageName}`} target="_blank" rel="noopener">
          {decodeURIComponent(packageName)}
        </a>{' '}
      </p>
      <p className="mb-10 leading-7 text-lg">
        <span className="">Downloads last 7 days:</span> {data.total.toLocaleString()} <br />
      </p>
      <h4 className="text-xl leading-10 mb-3">Major</h4>
      <VersionTable data={data.major} total={data.total} />
      <h4 className="text-xl leading-10 mb-3">Minor</h4>
      <VersionTable data={data.minor} total={data.total} />

      <p>
        <small>
          Downloads are from the last 7 days. Versions with less than 1% total downloads are not
          listed.
        </small>
      </p>
    </div>
  );
}
