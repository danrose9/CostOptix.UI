import React, { Component } from 'react';
import { DashboardCard } from '../index';
import { withRouter } from 'react-router-dom';
import { sessionStorageGetValue } from '../../utils/helper';

export class ServiceConnectionCard extends Component {
  constructor(props) {
    super(props);
    this.handleRoute = this.handleRoute.bind(this);
    this.state = {
      isFetching: false,
      servicesCount: 0,
    };
  }

  fetchServices = (organizationId) => {
    this.setState({ ...this.state, isFetching: true });
    const url =
      process.env.REACT_APP_API_URI +
      'ServiceConnections/customerConnections?organizationId=' +
      organizationId;
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ servicesCount: result.length, isFetching: false });
      })
      .catch((e) => {
        console.log(e);
        this.setState({ ...this.state, isFetching: false });
      });
  };

  handleRoute = () => {
    this.props.navigate.push('/services');
  };

  componentDidMount() {
    var organizationId = sessionStorageGetValue('me', 'organizationId');

    this.fetchServices(organizationId);
    this.timer = setInterval(
      () => this.fetchServices(organizationId),
      process.env.REACT_APP_APPLICATION_REFRESH
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    return (
      <>
        <DashboardCard
          title="Service Connections"
          icon="connectdevelop"
          iconcolor="teal"
          iconsize="big"
          content={this.state.servicesCount}
          description="Number of service connections for your organization"
          onClick={this.handleRoute}
        />
      </>
    );
  }
}

export default withRouter(ServiceConnectionCard);
