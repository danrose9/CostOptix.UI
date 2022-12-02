import React from 'react';
import { StyledDivider } from '../../styles/StyledLogin';
import { Link } from 'react-router-dom';

export const SignupLink = () => {
  return (
    <div>
      <StyledDivider />
      <Link to="/signup">Sign Up</Link>
    </div>
  );
};
