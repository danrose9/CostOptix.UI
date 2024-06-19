import styled from 'styled-components';
import { FONT } from 'src/app/constants';

export const Document = styled.div`
  margin: 0 0 10em;
  * {
    color: ${FONT.SECONDARY_COLOR} !important;
  }
  ul {
    padding: 0.5em 3em;
  }
  li {
    padding: 0.7em 0;
  }
  img {
    max-width: 90%;
    display: block;
    margin-left: 2em;
    margin-right: auto;
  }
`;
