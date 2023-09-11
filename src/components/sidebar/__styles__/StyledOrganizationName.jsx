import styled from 'styled-components';
import { FONT } from '../../../app/constants';

export const StyledOrganizationName = styled.div`
  height: 60px;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  text-align: center;
  justify-content: center;
  align-content: center;
  color: ${FONT.PRIMARY_COLOR};
  font-size: 1.2em;
  margin: auto;
  font-weight: 300;
  border-top: 1px solid #666699;
  border-bottom: 1px solid #666699;
  cursor: pointer;
`;
