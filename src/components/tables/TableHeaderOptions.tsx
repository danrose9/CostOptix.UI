import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';
import { FONT } from 'src/app/constants';

interface ITableHeaderOptionsProps {
  showDownloadCSV?: boolean;
  handleExportToCSV?: () => void;
}

const StyledDropdown = styled(Dropdown)`
  color: ${FONT.TERNARY_COLOR};
  font-size: 1.2em !important;
`;

export const TableHeaderOptions: React.FunctionComponent<ITableHeaderOptionsProps> = ({
  showDownloadCSV = true,
  handleExportToCSV,
}) => {
  return (
    <>
      <StyledDropdown icon="ellipsis vertical" simple item direction="left" open={false}>
        <Dropdown.Menu>
          {showDownloadCSV ? (
            <Dropdown.Item text="Download CSV" icon="file excel outline" onClick={handleExportToCSV} />
          ) : null}
        </Dropdown.Menu>
      </StyledDropdown>
    </>
  );
};

export default TableHeaderOptions;
