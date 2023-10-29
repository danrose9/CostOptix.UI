import fetchInstance from './fetchInstance';
import { ACCOUNT } from './apiEndpoints';

export const deleteOrganization: any = async (retryCount = 0) => {
  const response = await fetchInstance(`${ACCOUNT}`, {
    method: 'DELETE',
  });

  if (response.status === 204) {
    return { status: response.status };
  } else {
    if (retryCount < 2) {
      // start counting at 0 for 3 total tries
      console.log(`Retry attempt ${retryCount + 1}...`);
      return deleteOrganization(retryCount + 1);
    } else {
      return { status: 500, data: { error: 'Failed after 3 retries' } };
    }
  }
};
