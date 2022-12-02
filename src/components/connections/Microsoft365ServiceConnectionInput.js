import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';

export class Microsoft365ServiceConnectionInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenantDomain: '',
      disableButton: true,
    };
  }

  // componentDidMount() {
  //   this.setState({ disableButton: true });
  //   console.log('disableButton : ' + this.state.disableButton);
  // }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  };

  render() {
    return (
      <Form size="large">
        <Form.Field required width={10}>
          <label>Tenant Name</label>
          <Input
            name="tenantDomain"
            placeholder="Tenant Name"
            label=".onmicrosoft.com"
            labelPosition="right"
            onChange={this.handleChange}
          />
        </Form.Field>
      </Form>
    );
  }
}
