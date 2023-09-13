import React, { useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Grid } from 'semantic-ui-react';
import { CLEAN_QUERY, SEARCH_CLICK } from '../../../services/redux/reducers/resourceSlice';
import { reduxState } from '../../../services/redux/reduxState';
import { SEARCH_RESOURCES } from '../../../services/redux/thunks/resourceThunk';

const keyDelay = process.env.REACT_APP_KEY_DELAY;

const SearchResources = (props) => {
  const dispatch = useDispatch();
  const timeoutRef = useRef();

  let { searchValue } = useSelector((state) => state[reduxState.RESOURCES]);

  const handleSearchChange = useCallback(
    (e, data) => {
      clearTimeout(timeoutRef.current);
      dispatch(SEARCH_CLICK(data.value));
      let searchValue = data.value;

      timeoutRef.current = setTimeout(() => {
        if (data.value.length === 0) {
          dispatch(CLEAN_QUERY());
          dispatch(SEARCH_RESOURCES(props.initialQuery));
          return;
        }

        const query = `?$top=${props.pageSize}&$search="${searchValue}"`;

        dispatch(SEARCH_RESOURCES(query));
      }, keyDelay);
    },
    [dispatch, props.initialQuery, props.pageSize]
  );

  useEffect(() => {
    dispatch(SEARCH_RESOURCES(props.initialQuery));
    console.log('SearchResources: ', props.initialQuery);
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [dispatch, props.initialQuery]);

  return (
    <Grid>
      <Grid.Column width={6}>
        <Search placeholder="Search..." onSearchChange={handleSearchChange} value={searchValue} showNoResults={false} />
      </Grid.Column>
    </Grid>
  );
};

export default SearchResources;
