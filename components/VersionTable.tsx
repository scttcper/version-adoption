import { VersionData } from '../interfaces/types';

type Props = {
  total: number;
  data: VersionData;
};

function VersionTable({ data, total }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <td>version</td>
          <td>downloads</td>
          <td>percent</td>
        </tr>
      </thead>
      <tbody>
        {data.map(([version, downloads]) => (
          <tr key={version}>
            <td style={{ textAlign: 'center' }}>{version}</td>
            <td style={{ textAlign: 'right' }}>{downloads.toLocaleString()}</td>
            <td style={{ textAlign: 'right' }}>{(downloads / total).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 1 })}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default VersionTable;
