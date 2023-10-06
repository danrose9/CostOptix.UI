import { store } from '../redux/store';
import { SEARCH_RESOURCES } from '../redux/thunks/resourceThunk';

export const searchQuery = (pageNumber = 1, searchValue = null, pageSize) => {
  let skip = pageSize * (pageNumber - 1);
  let query = '';
  if (searchValue === null) {
    query = `?$top=${pageSize}&$skip=${skip}`;
  } else {
    query = `?$top=${pageSize}&$skip=${skip}&$search="${searchValue}"`;
  }

  store.dispatch(SEARCH_RESOURCES(query));
};
