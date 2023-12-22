import styled, {css} from 'styled-components';
import { Menu } from 'semantic-ui-react';
import { COLORS, FONT } from '../app/constants';

export const Container = styled.div`
  width: 100vw;
  display: flex;
  overflow: hidden;
  position: absolute;
  bottom: 0px;
  top: 0px;
  backface-visibility: hidden;
  will-change: overflow;
`;

const closedSidebar = `
  width: 0;
  transition: 1s;
  & * {
    display: none !important;
  }
`;

export const StyledSidebar = styled.div`  
      font-family: 'Poppins', sans-serif;
      font-weight: 200;
      background-color: ${COLORS.PRIMARY};
      width: 18vw;
      margin: 0;
      border-radius: 0;
      & ul {
        width: 100%;
       }

      ${(props) =>
        !props.toggleSidebar &&
        css`
          ${closedSidebar}
        `}     
`;

export const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledNavbar = styled(Menu)`
    &&& {
      background-color: ${COLORS.BACKGROUND};
      height: 70px;
      margin: 0;
      align-items: center;
    }
`;

export const MainPage = styled.div`
  overflow-y: auto !important;
  background: rgb(255,255,255);
  background: linear-gradient(0deg, rgba(255,255,255,1) 36%, rgba(174,238,228,0.5503151944371498) 100%);
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  height: 100%;
`;

export const ApplicationFooter = styled.div`
  height: 1.5em;
  background-color: ${COLORS.PRIMARY};
  & p {
    font-size: 0.8em;
    color: ${FONT.WHITE};
    text-align: right;
}
`;