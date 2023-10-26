import React, { useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Grid } from 'semantic-ui-react';
import { CLEAN_QUERY, SEARCH_CLICK } from '../../../services/redux/reducers/resourceSlice';
import { reduxState } from '../../../services/redux/reduxState';
import { SEARCH_RESOURCES } from '../../../services/redux/thunks/resourceThunk';
import styled from 'styled-components';
import { IRootState } from '../../../services/redux/rootReducer';
import { AppDispatch } from '../../../services/redux/store';

const keyDelay = process.env.REACT_APP_KEY_DELAY;
const StyledSearchGrid = styled(Grid)`
  position: absolute;
  right: 2em;
`;

interface ISearchResourcesProps {
  initialQuery: string;
  pageSize: number;
  isAvailable?: boolean;
}

const SearchResources: React.FC<ISearchResourcesProps> = ({ initialQuery, pageSize }) => {
  const dispatch = useDispatch();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  let { searchValue } = useSelector((state: IRootState) => state[reduxState.RESOURCES]);

  const handleSearchChange = useCallback(
    (e: any, data: any) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      dispatch(SEARCH_CLICK(data.value));
      let searchValue = data.value;

      timeoutRef.current = setTimeout(
        () => {
          if (data.value.length === 0) {
            dispatch<AppDispatch>(CLEAN_QUERY());
            dispatch<AppDispatch>(SEARCH_RESOURCES(initialQuery));
            return;
          }

          const query = `?$top=${pageSize}&$search="${searchValue}"`;

          dispatch<AppDispatch>(SEARCH_RESOURCES(query));
        },
        keyDelay ? parseInt(keyDelay) : 300
      );
    },
    [dispatch, initialQuery, pageSize]
  );

  useEffect(() => {
    dispatch<AppDispatch>(SEARCH_RESOURCES(initialQuery));

    return () => {
      clearTimeout(timeoutRef.current as NodeJS.Timeout);
    };
  }, [dispatch, initialQuery]);

  return (
    <StyledSearchGrid>
      <Grid.Column width={6}>
        <Search placeholder="Search..." onSearchChange={handleSearchChange} value={searchValue} showNoResults={false} />
      </Grid.Column>
    </StyledSearchGrid>
  );
};

export default SearchResources;
