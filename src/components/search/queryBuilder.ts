/// Responsible for building the query string for the search API

export const queryBuilder = (searchValue?: string, top?: number, skip?: number, exportToCSV?: boolean) => {
  let queryParts = [];

  if (typeof top === 'number') {
    queryParts.push(`$top=${top}`);
  }

  if (typeof skip === 'number') {
    queryParts.push(`$skip=${skip}`);
  }

  if (typeof searchValue === 'string' && searchValue.trim() !== '') {
    queryParts.push(`$search="${encodeURIComponent(searchValue)}"`);
  }

  if (exportToCSV) {
    queryParts.push('csvResponse=true');
  }

  return queryParts.length > 0 ? '?' + queryParts.join('&') : '';
};
