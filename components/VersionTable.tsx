'use client';

import { Cell, Column, Row, Table, TableBody, TableHeader } from 'react-aria-components';

import { VersionData } from '../interfaces/types';
import { HydrationSafeDate } from './hydrateDate';

type Props = {
  total: number;
  data: VersionData;
};

function VersionTable({ data, total }: Props) {
  return (
    <Table aria-label="Version data" className="mb-5 tabular-nums">
      <TableHeader
        columns={[
          { key: 'version', isRowHeader: true },
          { key: 'downloads' },
          { key: '% total' },
          { key: 'last updated' },
        ]}
      >
        {column => (
          <Column id={column.key} isRowHeader={column.isRowHeader} className="py-2 px-3">
            {column.key}
          </Column>
        )}
      </TableHeader>
      <TableBody items={data}>
        {([version, downloads, dateTs]) => (
          <Row id={version} key={version}>
            <Cell className="py-1 px-3 text-center border-t border-gray-300">
              {version}
            </Cell>
            <Cell className="py-1 px-3 text-right border-t border-gray-300">
              {downloads.toLocaleString()}
            </Cell>
            <Cell className="py-1 px-3 text-right border-t border-gray-300">
              {(downloads / total).toLocaleString(undefined, {
                style: 'percent',
                minimumFractionDigits: 1,
              })}
            </Cell>
            <Cell className="py-1 px-3 text-right border-t border-gray-300">
              <HydrationSafeDate dateTs={dateTs} />
            </Cell>
          </Row>
        )}
      </TableBody>
    </Table>
  );
}

export default VersionTable;
