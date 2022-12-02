import React, { Component } from 'react';
import { StackedBarChart } from './StackedBarChart';
import { getOrganizationId } from '../../utils/helper';

export default class SubscribedSkuChart extends Component {
  constructor(props) {
    super(props);
    this.state = { subscribedSkus: [], loading: true };
  }
  componentDidMount() {
    this.getChartData();
  }

  render() {
    return (
      <div>
        <StackedBarChart
          yAxisLabel="Subscription Count"
          xAxisKey="description"
          yAxisKeyA="consumedUnits"
          yAxisKeyB="prepaidUnitsEnabled"
          barChartData={this.state.subscribedSkus}
        />
      </div>
    );
  }

  async getChartData() {
    var organizationId = getOrganizationId();
    const headers = { organizationId: organizationId };

    const response = await fetch(
      process.env.REACT_APP_API_URI + 'microsoft365sku/subscribedSkus',
      {
        headers,
      }
    );
    const data = await response.json();
    this.setState({ subscribedSkus: data, loading: false });
  }
}
