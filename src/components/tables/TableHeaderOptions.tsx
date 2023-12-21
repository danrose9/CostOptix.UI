import React from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { FONT } from 'src/app/constants';

interface ITableHeaderOptionsProps {
  showDownload?: boolean;
}

const StyledIcon = styled(Icon)`
  color: ${FONT.TERNARY_COLOR};
  cursor: pointer;
  font-size: 1.2em !important;
`;

export const TableHeaderOptions: React.FunctionComponent<ITableHeaderOptionsProps> = (props) => {
  return (
    <>
      <StyledIcon name="ellipsis vertical" />
    </>
  );
};

export default TableHeaderOptions;
