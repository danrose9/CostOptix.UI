import React from 'react';
import styled from 'styled-components';
import { Search, SemanticSIZES } from 'semantic-ui-react';

const StyledSearchInput = styled(Search)`
  &.ui.search .prompt {
    border-radius: unset !important;
  }
`;

interface ISearchInputProps {
  placeholder?: string;
  onSearchChange?: (e: React.MouseEvent<HTMLElement, MouseEvent>, data: any) => void;
  showNoResults?: boolean;
  size?: SemanticSIZES;
  value?: string;
}

const SearchInput: React.FC<ISearchInputProps> = (props) => {
  return (
    <>
      <StyledSearchInput {...props} />
    </>
  );
};

export default SearchInput;
