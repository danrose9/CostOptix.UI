import React from 'react';
import { Button } from 'semantic-ui-react';
import { BASE, EXTERNAL_LOGIN, DEMO_LOGIN } from '../../services/api/apiEndpoints';

export const LoginButton = (props) => {
  return (
    <form method="POST" action={BASE + EXTERNAL_LOGIN}>
      <Button
        data-testid="login-ext-button"
        primary={props.primary}
        disabled={props.disabled}
        content={props.content}
        icon={props.icon}
        color={props.color}
        size={props.size}
      />
    </form>
  );
};

export const LoginDemoButton = (props) => {
  return (
    <form method="POST" action={BASE + DEMO_LOGIN}>
      <Button
        data-testid="login-demo-button"
        style={props.style}
        primary={props.primary}
        disabled={props.disabled}
        content={props.content}
        icon={props.icon}
        color={props.color}
        labelPosition={props.labelPosition}
        size={props.size}
      />
    </form>
  );
};

export const SignupButton = (props) => {
  return (
    <form>
      <Button
        data-testid="signup-button"
        style={props.style}
        primary={props.primary}
        disabled={props.disabled}
        content={props.content}
        icon={props.icon}
        color={props.color}
        labelPosition={props.labelPosition}
        size={props.size}
      />
    </form>
  );
};
