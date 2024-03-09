import React from 'react';
import styled from 'styled-components';
import { Search as SemanticSearch, SemanticSIZES } from 'semantic-ui-react';

const StyledSearchInput = styled(SemanticSearch)`
  &.ui.search .prompt {
    border-radius: unset !important;
  }
`;

interface ISearchInputProps {
  loading?: boolean;
  onResultSelect?: (e: React.MouseEvent<HTMLElement, MouseEvent>, data: any) => void;
  onSearchChange?: (e: React.MouseEvent<HTMLElement, MouseEvent>, data: any) => void;
  resultRenderer?: (props: any) => JSX.Element;
  placeholder?: string;
  results?: any;
  showNoResults?: boolean;
  size?: SemanticSIZES;
  value?: string;
  category?: boolean;
}

const SearchInput: React.FC<ISearchInputProps> = (props) => {
  return (
    <>
      <StyledSearchInput {...props} />
    </>
  );
};

export default SearchInput;
