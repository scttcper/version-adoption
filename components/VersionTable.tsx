import { VersionData } from '../interfaces/types';

type Props = {
  total: number;
  data: VersionData;
};

function VersionTable({ data, total }: Props) {
  return (
    <table className="mb-5">
      <thead>
        <tr className="font-semibold">
          <th scope="col" className="py-2 px-3">
            version
          </th>
          <th scope="col" className="py-2 px-3">
            downloads
          </th>
          <th scope="col" className="py-2 px-3">
            percent
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(([version, downloads]) => (
          <tr key={version}>
            <td className="py-1 px-3 text-center border-t border-gray-300">{version}</td>
            <td className="py-1 px-3 text-right border-t border-gray-300">
              {downloads.toLocaleString()}
            </td>
            <td className="py-1 px-3 text-right border-t border-gray-300">
              {(downloads / total).toLocaleString(undefined, {
                style: 'percent',
                minimumFractionDigits: 1,
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default VersionTable;
