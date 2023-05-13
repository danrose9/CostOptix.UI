import React, { useState } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';
import { ProductName } from '../ProductName';
// import { MessageBox } from '../MessageBox';
// import { handleAzureLogin } from '../../auth/AzureSignIn';
import { AzureSignInButton } from '../../components/buttons/AzureButton';
import { StyledForm, StyledDivider, StyledColumn, StyledHeader } from '../../styles/StyledLogin';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrganization] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (e) => {
    setUsername(e.target.value);
    setShowMessage(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Removing errors from console
    setPassword('password');
    setOrganization('org');

    // await checkValidlogin(username);
  };

  return (
    <Grid textAlign="center">
      <Grid.Column style={StyledColumn}>
        <ProductName />
        <StyledForm size="large">
          <StyledHeader>
            <h4 className="ui dividing">Signup</h4>
          </StyledHeader>
          <div>
            <Form.Input
              fluid
              required
              icon="user"
              iconPosition="left"
              placeholder="Email"
              type="text"
              value={username}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              required
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="text"
              value={password}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              required
              icon="lock"
              iconPosition="left"
              placeholder="Re-enter Password"
              type="text"
              value={password}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              required
              icon="building"
              iconPosition="left"
              placeholder="Organization"
              type="text"
              value={organization}
              onChange={handleChange}
            />
            <StyledDivider />
            <Button color="blue" fluid size="large" onClick={handleSubmit}>
              Next
            </Button>
            <StyledDivider />
            <h6 className="ui horizontal divider">OR</h6>
            <StyledDivider />
            <AzureSignInButton buttonText="Sign up with Azure AD" />
          </div>
        </StyledForm>
      </Grid.Column>
    </Grid>
  );
};

export default Signup;
