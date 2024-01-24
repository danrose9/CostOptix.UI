import React from 'react';
import { useSelector } from 'react-redux';
import { StyledOrganizationName } from './sidebar/__styles__/StyledOrganizationName';
import { reduxState } from '../services/redux/reduxState';
import * as appRoutes from '../app/router/appRoutes';
import { useNavigate } from 'react-router-dom';
import { IRootState } from 'src/services/redux/rootReducer';

export const OrganizationName = () => {
  const organizationName = useSelector((state: IRootState) => state[reduxState.USER_PROFILE].organization.name);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(appRoutes.SETTINGS);
  };

  return (
    <StyledOrganizationName onClick={() => handleClick()} data-testid="sidebar-organizationName">
      {organizationName}
    </StyledOrganizationName>
  );
};
