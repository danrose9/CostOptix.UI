import React from 'react';
import { Table } from 'semantic-ui-react';
import { formatDate } from '../../../utils/helper';
import styled from 'styled-components';

const HighlightedText = styled.p`
  color: #1678c2;
  cursor: pointer;
`;

export const AzureBillingInvoices = (props) => {
  let totalSubTotal = 0;
  let totalTaxAmount = 0;
  let totalTotalAmount = 0;

  return (
    <>
      {props.content.billingInvoice.invoices === null ? (
        'No Invoices'
      ) : (
        <Table color="teal" size="large">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Invoice Date</Table.HeaderCell>
              <Table.HeaderCell>Invoice Id</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">Sub Total</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">Tax Amount</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">
                Total Amount
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="right">
                Diff (prev. month)
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="right">
                Diff (prev. year)
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="left">Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {props.content.billingInvoice.invoices.map((invoices, index) => {
              totalSubTotal = totalSubTotal + invoices.subTotal;
              totalTaxAmount = totalTaxAmount + invoices.taxAmount;
              totalTotalAmount = totalTotalAmount + invoices.totalAmount;

              return (
                <Table.Row key={index}>
                  <Table.Cell>{formatDate(invoices.invoiceDate)}</Table.Cell>
                  <Table.Cell selectable>
                    <HighlightedText href="#">
                      {invoices.invoiceId}
                    </HighlightedText>
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {props.currencySymbol}
                    {invoices.subTotal}
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {props.currencySymbol}
                    {invoices.taxAmount}
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {props.currencySymbol}
                    {invoices.totalAmount}
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {invoices.diffLastMonthPercent} {''}%
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {invoices.diffLastYearPercent}%
                  </Table.Cell>
                  <Table.Cell textAlign="left">{invoices.status}</Table.Cell>
                </Table.Row>
              );
            })}

            <Table.Row active>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell textAlign="right">
                <strong>
                  {props.currencySymbol} {totalSubTotal.toFixed(2)}
                </strong>
              </Table.Cell>
              <Table.Cell textAlign="right">
                <strong>
                  {props.currencySymbol} {totalTaxAmount.toFixed(2)}
                </strong>
              </Table.Cell>
              <Table.Cell textAlign="right">
                <strong>
                  {props.currencySymbol} {totalTotalAmount.toFixed(2)}
                </strong>
              </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      )}
    </>
  );
};

export default AzureBillingInvoices;
