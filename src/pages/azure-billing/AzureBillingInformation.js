import React from 'react';
import { Table } from 'semantic-ui-react';
import { splitCamelCase } from '../../../utils/helper';

export const AzureBillingInformation = (props) => {
  return (
    <Table definition>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Agreement Type</Table.Cell>
          <Table.Cell>
            {splitCamelCase(props.content.billingInvoice.agreementType)}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Subscription ID</Table.Cell>
          <Table.Cell>{props.content.billingInvoice.subscriptionId}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Directory</Table.Cell>
          <Table.Cell>{props.content.billingInvoice.directory}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Subscription Name</Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Currency</Table.Cell>
          <Table.Cell>
            {props.content.billingInvoice.currency} ({props.currencySymbol})
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Status</Table.Cell>
          <Table.Cell>{props.content.billingInvoice.status}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
