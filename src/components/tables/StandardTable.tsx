import * as React from 'react';
import styled from 'styled-components';
import { Segment, SemanticCOLORS, Table } from 'semantic-ui-react';

export const TableContainer = styled.div`
  padding: 0.5em;
`;

export const TableHeader = styled.div`
  display: flex;
`;

export const TableFooter = styled.div``;

export const SegmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SegmentName = styled.div`
  font-size: 1.5em;
`;

interface IStandardTableProps {
  name?: string;
  color?: SemanticCOLORS | undefined;
  data: { headers: string[] };
}

const StandardTable: React.FunctionComponent<IStandardTableProps> = (props) => {
  const { name, color = 'orange' } = props;
  const { headers } = props.data;

  return (
    <>
      <TableContainer>
        <Segment color={color}>
          <SegmentHeader>
            <SegmentName>{name}</SegmentName>
          </SegmentHeader>
          <Table fixed striped>
            <Table.Header>
              {headers.map((header, index) => {
                return <Table.HeaderCell key={index}>{header}</Table.HeaderCell>;
              })}
            </Table.Header>
          </Table>
        </Segment>
      </TableContainer>
    </>
  );
};

export default StandardTable;
