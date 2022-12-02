import styled from 'styled-components';
import { Dropdown, Icon, Image } from 'semantic-ui-react';

export const StyledDropdown = styled(Dropdown)`
    &&& {
      padding: 9px;
      font-size: 1.2rem;
      position: relative;
      z-index: 1000;
  }
`;

export const ProductLogo = styled(Icon)`
    &&& {
      color: lime;
      align-self: end;
      cursor: default;
      font-size: 3rem; 
      
    }
`;

export const StyledSpan = styled.span`
    &&& {
      padding: 0;
      font-size: 1.3rem;
      font-family: 'Poppins', sans-serif;
  }
`;

export const ToggleButton = styled(Icon)`
    &&& {
      color: #3266BB;
      align-self: center;
      margin: 0 12px;
      cursor: pointer;
  }
`;

export const StyledAvatar = styled(Image)`
    &&& {
      font-size: 1.8rem; 
  }
`;