import React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { reduxState } from '../../services/redux/reduxState';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../../app/router/appRoutes';
import { StyledSpan, StyledDropdown, StyledAvatar } from './__styles__/StyledNavbarItems';
import { NavbarMode } from './NavbarMode';
import { isAuthenticated } from '../../services/api/processToken';
import { IRootState } from 'src/services/redux/rootReducer';

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
      image: <Icon name="user" />,
      onClick: () => navigate(appRoutes.SETTINGS),
    },
    {
      key: 'help',
      text: 'Help',
      image: <Icon name="help" />,
      onClick: () => navigate(appRoutes.HELP_PAGE),
    },
    // {
    //   key: 'settings',
    //   text: 'Settings',
    //   image: <Icon name="setting" />,
    //   onClick: () => navigate(appRoutes.SETTINGS),
    // },
    {
      id: 3,
      key: 'log-out',
      text: 'Log Out',
      image: <Icon name="log out" />,
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
    <StyledDropdown data-testid="navbarItem-2" trigger={trigger}>
      <Dropdown.Menu>
        {/* <Input icon="search" iconPosition="left" className="search" /> */}
        <Dropdown.Menu scrolling>
          {options.map((option) => (
            <Dropdown.Item {...option} />
          ))}
        </Dropdown.Menu>
      </Dropdown.Menu>
    </StyledDropdown>
  );
};

export default NavbarItems;
