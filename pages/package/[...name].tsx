import { GetServerSideProps } from 'next';
import Link from 'next/link';
import got from 'got';
import groupBy from 'lodash/groupBy';
import semver from 'semver';

import VersionTable from '../../components/VersionTable';
import { VersionData } from '../../interfaces/types';

type Props = {
  name?: string;
  major?: VersionData;
  minor?: VersionData;
  total?: number;
  errors?: string;
};

const StaticPropsDetail = ({ name, major = [], minor = [], total = 1, errors }: Props) => {
  if (errors) {
    return <div>Error: {errors}</div>;
  }

  return (
    <div>
      <p>
        <Link href="/">Home</Link>
      </p>
      <p>
        Package:{' '}
        <a href={`https://npmjs.com/${name}`} target="_blank" rel="noopener">
          {name}
        </a>{' '}
        <br />
        Downloads last 7 days: {total.toLocaleString()} <br />
      </p>
      <h4>Major</h4>
      <VersionTable data={major} total={total} />
      <h4>Minor</h4>
      <VersionTable data={minor} total={total} />

      <p>
        <small>
          Downloads are from the last 7 days. Versions with less than 1% total downloads are not
          listed.
        </small>
      </p>
    </div>
  );
};

export default StaticPropsDetail;

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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.name) {
    return { props: { errors: 'Package name required' } };
  }

  try {
    if (params?.name?.length > 2) {
      return { props: { errors: 'Invalid package name' } };
    }
    const name = Array.isArray(params?.name) ? params.name.join('/') : params.name;

    const text = await got
      .get(`https://www.npmjs.com/package/${name.toLowerCase()}`, {
        retry: { limit: 0 },
        timeout: { request: 5000 },
      })
      .text();

    const contextObj = /window\.__context__\s?=\s?(?<context>.*)<\/script/.exec(text);
    if (contextObj === null || !contextObj.groups) {
      return { props: { errors: 'failed to get package data object' } };
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
    return { props: { name, major: majorFiltered, minor: minorFiltered, total } };
  } catch (err: any) {
    return { props: { errors: err.message } };
  }
};
