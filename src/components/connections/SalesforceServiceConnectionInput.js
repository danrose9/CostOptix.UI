import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';

export class SalesforceServiceConnectionInput extends Component {
  state = {
    username: '',
    password: '',
  };

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
          <label>Username</label>
          <Input
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
          />
          <label>Password</label>
          <Input
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
        </Form.Field>
      </Form>
    );
  }
}
