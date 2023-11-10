import React from 'react';
import { Table } from 'semantic-ui-react';

interface IDefaultTableHeaderProps {
  title: string;
  colSpan?: number;
}

const DefaultTableHeader: React.FC<IDefaultTableHeaderProps> = ({ title, colSpan }) => {
  return (
    <>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan={colSpan}>{title}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    </>
  );
};

export default DefaultTableHeader;
