import React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { reduxState } from '../../services/redux/reduxState';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../../app/router/appRoutes';
import { StyledSpan, StyledDropdown, StyledAvatar } from './__styles__/StyledNavbarItems';
import { NavbarMode } from './NavbarMode';
import { isAuthenticated } from '../../utils/processToken';

export const NavbarItems = () => {
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state[reduxState.USER_PROFILE].name);
  const userAvatar = useSelector((state) => state[reduxState.USER_PROFILE].photo.image);
  const organizationStatus = useSelector((state) => state[reduxState.USER_PROFILE].organization.status);

  const options = [
    {
      key: 'user',
      text: <NavbarMode status={organizationStatus} />,
      disabled: true,
    },
    {
      key: 'profile',
      text: 'Your Profile',
      image: <Icon name="user" />,
      onClick: () => navigate(appRoutes.SETTINGS),
    },
    // { key: 'help', text: 'Help', image: <Icon name="help" /> },
    // {
    //   key: 'settings',
    //   text: 'Settings',
    //   image: <Icon name="setting" />,
    //   onClick: () => navigate(appRoutes.SETTINGS),
    // },
    //   key: 'tour',
    //   text: 'Take a Tour',
    //   image: <Icon name="user" />,
    //   onClick: () => navigate('/dashboard-cost', { state: { startTour: true } }),
    // },
    {
      key: 'settings',
      text: 'Settings',
      image: <Icon name="setting" />,
      onClick: () => navigate(appRoutes.SETTINGS),
    },
    {
      key: 'log-out',
      text: 'Log Out',
      image: <Icon name="log out" />,
      onClick: () => navigate(appRoutes.LOGOUT),
      disabled: !isAuthenticated(),
    },
  ];

  const trigger = (
    <StyledSpan data-testid="navbarItem-3">
      <StyledAvatar avatar src={userAvatar} />
      {loggedInUser}
    </StyledSpan>
  );

  return (
    <StyledDropdown data-testid="navbarItem-2" trigger={trigger}>
      <Dropdown.Menu>
        {/* <Input icon="search" iconPosition="left" className="search" /> */}
        <Dropdown.Menu scrolling>
          {options.map((option) => (
            <Dropdown.Item key={option.value} {...option} />
          ))}
        </Dropdown.Menu>
      </Dropdown.Menu>
    </StyledDropdown>
  );
};

export default NavbarItems;
