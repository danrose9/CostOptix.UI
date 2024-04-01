import React from 'react';
import { Dropdown, Icon as SemanticIcon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { reduxState } from '../../services/redux/reduxState';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../../app/router/appRoutes';
import { StyledSpan, StyledDropdown, StyledAvatar } from './__styles__/StyledNavbarItems';
import { NavbarMode } from './NavbarMode';
import { isAuthenticated } from '../../services/api/processToken';
import { IRootState } from 'src/services/redux/rootReducer';
import { Feedback } from '../Feedback';

export const NavbarItems = () => {
  const navigate = useNavigate();
  const { name, photo, organization } = useSelector((state: IRootState) => state[reduxState.USER_PROFILE]);

  const options = [
    {
      id: 1,
      key: 'user',
      text: <NavbarMode status={organization.status} />,
      disabled: true,
    },
    {
      id: 2,
      key: 'profile',
      text: 'Your Profile',
      image: <SemanticIcon name="user" color="blue" />,
      onClick: () => navigate(appRoutes.SETTINGS),
    },
    {
      key: 'settings',
      text: 'Account Settings',
      image: <SemanticIcon name="settings" color="grey" />,
      onClick: () => navigate(appRoutes.SETTINGS),
    },
    {
      key: 'feedback',
      text: 'Feedback',
      content: <Feedback />,
    },
    {
      key: 'help',
      text: 'Help',
      image: <SemanticIcon name="help" color="green" />,
      onClick: () => navigate(appRoutes.HELP_PAGE),
    },
    {
      id: 3,
      key: 'log-out',
      text: 'Log Out',
      image: <SemanticIcon name="log out" color="black" />,
      onClick: () => navigate(appRoutes.LOGOUT),
      disabled: !isAuthenticated(),
    },
  ];

  const trigger = (
    <StyledSpan data-testid="navbarItem-3">
      <StyledAvatar avatar src={photo.image} />
      {name}
    </StyledSpan>
  );

  return (
    <StyledDropdown simple data-testid="navbarItem-2" open={false} trigger={trigger}>
      <Dropdown.Menu>
        {options.map((option) => (
          <Dropdown.Item {...option} />
        ))}
      </Dropdown.Menu>
    </StyledDropdown>
  );
};

export default NavbarItems;
