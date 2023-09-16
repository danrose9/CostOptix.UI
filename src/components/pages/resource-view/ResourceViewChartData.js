import React from 'react';
import { Table } from 'semantic-ui-react';
import getSymbolFromCurrency from 'currency-symbol-map';
import { formatDateFull } from '../../../utils/helper';

export const ResourceViewChartData = ({ data }) => {
  const currencySymbol = getSymbolFromCurrency(data.currency);

  return (
    <Table celled color="purple">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Period Start</Table.HeaderCell>
          <Table.HeaderCell>Period End</Table.HeaderCell>
          <Table.HeaderCell>Amount</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {[...data?.monthlySpend].reverse().map((item, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>{formatDateFull(item.periodStart)}</Table.Cell>
              <Table.Cell>{formatDateFull(item.periodEnd)}</Table.Cell>
              <Table.Cell>
                {currencySymbol}
                {item.amount}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default ResourceViewChartData;
