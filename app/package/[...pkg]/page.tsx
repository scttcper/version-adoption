import Link from 'next/link';
import groupBy from 'lodash/groupBy';
import semver from 'semver';

import VersionTable from '../../../components/VersionTable';
import { VersionData } from '../../../interfaces/types';
import { IndexForm } from '../../form';
import { NpmContext } from '../../../interfaces/npmContext';

type Props = {
  major: VersionData;
  minor: VersionData;
  total: number;
};

interface DownloadsWithDate {
  version: string;
  downloads: number;
  date: number;
}

function CombineDownloadsAndDates(
  downloads: Record<string, number>,
  versions: NpmContext['context']['packument']['versions'],
): DownloadsWithDate[] {
  return Object.entries(downloads)
    .map(([version, downloads]) => {
      const date = versions.find(v => v.version === version)?.date.ts;
      return {
        version,
        downloads,
        date: date ?? null,
      };
    })
    .filter((v): v is DownloadsWithDate => v.date !== null);
}

function groupByVersion(
  downloadsWithDate: DownloadsWithDate[],
  semverVersion: 'major' | 'minor',
) {
  return groupBy(downloadsWithDate, downloads => {
    try {
      const version = semver.parse(downloads.version);
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

function totalByVersion(groups: ReturnType<typeof groupByVersion>): VersionData {
  return Object.entries(groups)
    .map<VersionData[number]>(([major, data]) => {
      return [
        major,
        data.reduce((acc, currentValue) => acc + currentValue.downloads, 0),
        data.reduce((acc, currentValue) => {
          if (currentValue.date > acc) {
            return currentValue.date;
          }
          return acc;
        }, 0),
      ];
    })
    .sort(([versionA], [versionB]) =>
      semver.compareLoose(toVersion(versionA), toVersion(versionB)),
    )
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
  const context = JSON.parse(
    contextObj.groups.context.split('</script>')[0],
  ) as NpmContext;
  // Downloads are stored as a record of version -> downloads
  const versionsDownloads = context.context.versionsDownloads;
  // Versions have the date in the packument
  const versions = context.context.packument.versions;
  const versionsDownloadsAndDates = CombineDownloadsAndDates(versionsDownloads, versions);
  const majorGroups = groupByVersion(versionsDownloadsAndDates, 'major');
  const minorGroups = groupByVersion(versionsDownloadsAndDates, 'minor');
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

export default async function PackagePage({
  params: { pkg },
}: {
  params: { pkg: string };
}) {
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
      <div className="mb-12 mt-8">
        <Link href="/" className="text-gray-700 font-semibold">
          Home
        </Link>
        <IndexForm />
      </div>

      <p className="leading-8 text-xl font-bold">
        <a href={`https://npmjs.com/${packageName}`} target="_blank" rel="noopener">
          {decodeURIComponent(packageName)}
        </a>{' '}
      </p>
      <p className="mb-10 leading-7">
        <span className="">Downloads last 7 days:</span> {data.total.toLocaleString()}{' '}
        <br />
      </p>
      <h4 className="text-lg leading-10 mb-3">Major</h4>
      <VersionTable data={data.major} total={data.total} />
      <h4 className="text-lg leading-10 mb-3">Minor</h4>
      <VersionTable data={data.minor} total={data.total} />

      <p>
        <small>
          Downloads are from the last 7 days. Versions with less than 1% total downloads
          are not listed.
        </small>
      </p>
    </div>
  );
}
