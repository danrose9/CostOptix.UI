import React, { SyntheticEvent } from 'react';
import { Dropdown, DropdownItemProps } from 'semantic-ui-react';
import styled from 'styled-components';
import { FONT } from 'src/app/constants';
import { usePagination } from './PaginationContext';

const PageSizeSelector = styled.div`
  color: ${FONT.SECONDARY_COLOR} !important;
`;
const ActionBarContainer = styled.div`
  padding: 1em 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const pageSelectorOptions: DropdownItemProps[] = [
  { text: '10', value: 10 },
  { text: '25', value: 25 },
  { text: '50', value: 50 },
  { text: '100', value: 100 },
];

interface ITableActionBarProps {
  showSearch?: boolean;
  searchFunction?: React.ReactNode;
}

const TableActionBar: React.FC<ITableActionBarProps> = ({ showSearch, searchFunction }) => {
  const { setPageSize } = usePagination();

  const handlePageSizeChange = (e: SyntheticEvent<HTMLElement>, data: any) => {
    setPageSize(data.value);
  };

  return (
    <ActionBarContainer>
      <PageSizeSelector>
        Show{' '}
        <Dropdown
          compact
          selection
          options={pageSelectorOptions}
          defaultValue={pageSelectorOptions[0].value}
          onChange={handlePageSizeChange}
        />{' '}
        entries
      </PageSizeSelector>
      {searchFunction}
    </ActionBarContainer>
  );
};

export default TableActionBar;
