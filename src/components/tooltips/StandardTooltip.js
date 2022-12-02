import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import { ProviderImage } from '../ProviderImage';

export default class StandardTooltip extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { provider, accountName } = this.props.instance;

    return (
      <Card>
        <Card.Content>
          <ProviderImage floated="right" size="mini" provider={provider} />
          <Card.Header>{provider}</Card.Header>
          <Card.Meta>{accountName}</Card.Meta>
        </Card.Content>

        <Card.Content>{this.props.children}</Card.Content>
      </Card>
    );
  }
}
