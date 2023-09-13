import React, { Component } from 'react';
import { Table, Loader, Icon } from 'semantic-ui-react';
import { getOrganizationId } from '../../utils/helper';
import { StyledTableCell } from '../tables/DefaultTableStyles';

export default class Subscriptions extends Component {
  constructor(props) {
    super(props);
    this.state = { subscribedSkus: [], loading: true };
  }

  componentDidMount() {
    this.populateSkuData();
  }

  static renderTable(subscribedSkus) {
    return (
      <Table color="orange">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Sku PartNumber</Table.HeaderCell>
            <Table.HeaderCell>Prepaid Units Enabled</Table.HeaderCell>
            <Table.HeaderCell>Consumed Units</Table.HeaderCell>
            <Table.HeaderCell>Available Units</Table.HeaderCell>
            <Table.HeaderCell>Prepaid Units Suspended</Table.HeaderCell>
            <Table.HeaderCell>Prepaid Units Warning</Table.HeaderCell>
            <Table.HeaderCell>Free Subscription</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {subscribedSkus.map((sku) => (
            <Table.Row key={sku.skuId}>
              <Table.Cell>{sku.description}</Table.Cell>
              <Table.Cell>{sku.partNumber}</Table.Cell>
              <StyledTableCell>{sku.prepaidUnitsEnabled}</StyledTableCell>
              <StyledTableCell>{sku.consumedUnits}</StyledTableCell>
              <StyledTableCell>{sku.prepaidUnitsEnabled - sku.consumedUnits}</StyledTableCell>
              <StyledTableCell>{sku.prepaidUnitsSuspended}</StyledTableCell>
              <StyledTableCell>{sku.prepaidUnitsWarning}</StyledTableCell>
              <StyledTableCell>
                {sku.isFree ? <Icon color="green" name="checkmark" size="large" /> : ''}
              </StyledTableCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }

  render() {
    let contents = this.state.loading ? (
      <Loader active inline="centered">
        Loading
      </Loader>
    ) : (
      Subscriptions.renderTable(this.state.subscribedSkus)
    );

    return (
      <div>
        <h1 id="tabelLabel">Subscriptions</h1>
        <p>A full and complete list of Microsoft 365 subscriptions</p>
        {contents}
      </div>
    );
  }

  async populateSkuData() {
    var organizationId = getOrganizationId();
    const headers = { organizationId: organizationId };

    const response = await fetch(process.env.REACT_APP_API_URI + 'microsoft365sku/subscribedSkus?showIsFree=true', {
      headers,
    });
    const data = await response.json();

    this.setState({ subscribedSkus: data, loading: false });
  }
}
