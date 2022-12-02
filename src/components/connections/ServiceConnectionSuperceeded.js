import React, { Component } from 'react';
import ServiceConnections from './ServiceConnections';
import ServiceConnectionModal from './ServiceConnectionModal';
import { sessionStorageGetValue } from '../../utils/helper';
import { Placeholder } from 'semantic-ui-react';

const PageTitle = 'Service Connections';
const PageDescription =
  'Use the service connection page to connect to each application and bring in license and subscription data for us to report on. In order for us to connect to each 3rd party service you will need a global administrator to approve acces.';

export class ServiceConnection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      services: [],
    };
  }

  fetchServices = (customerId) => {
    this.setState({ ...this.state, isFetching: true });
    fetch(
      process.env.REACT_APP_API_URI +
        'customer/services?customerId=' +
        customerId
    )
      .then((response) => response.json())
      .then((response) => JSON.stringify(response))
      .then((result) => {
        this.setState({ services: result, isFetching: false });
      })
      .catch((e) => {
        console.log(e);
        this.setState({ ...this.state, isFetching: false });
      });
  };

  componentDidMount() {
    var organizationId = sessionStorageGetValue('me', 'customerId');
    this.fetchServices(organizationId);
  }

  render() {
    return (
      <>
        <h1>{PageTitle}</h1>
        <p>{PageDescription}</p>
        <div className="ui divider"></div>
        <div className="ui divided items">
          {ServiceConnections.filter((item) => item.active).map(
            (item, index) => {
              if (this.state.isFetching) {
                return (
                  <Placeholder key={index} fluid>
                    <Placeholder.Header image></Placeholder.Header>
                    <Placeholder.Paragraph>
                      <Placeholder.Line />
                      <Placeholder.Line />
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Paragraph>
                  </Placeholder>
                );
              } else {
                return (
                  <div key={index} className="item">
                    <div className="image">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className="content">
                      <a className="header" href={item.href}>
                        {item.name}
                      </a>
                      <div className="meta">
                        <span>Description</span>
                      </div>
                      <div className="description">
                        <p>{item.description}</p>
                      </div>
                      <div className="extra">Additional Details</div>
                      {item.details}
                    </div>
                    <div className="extra">
                      {this.state.services.includes(item.connectionName) ? (
                        <ServiceConnectionModal
                          disabled={true}
                          title="Connected"
                        />
                      ) : (
                        <ServiceConnectionModal
                          disabled={false}
                          title="Connect"
                          name={item.name}
                          vendor={item.vendor}
                          connectionName={item.connectionName}
                        />
                      )}
                    </div>
                  </div>
                );
              }
            }
          )}
        </div>
        <div className="ui divider"></div>
        {this.state.isFetching ? 'Fetching services...' : ''}
      </>
    );
  }
}

export default ServiceConnection;
