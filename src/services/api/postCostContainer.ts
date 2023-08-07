import { COST_CONTAINERS } from './apiEndpoints';
import fetchInstance from './fetchInstance';

export interface ICostContainerArgs {
  name: string;
  description: string;
  owner: string;
  query: any[];
}

export const postCostContainer = async (args: ICostContainerArgs) => {
  const response = await fetchInstance(COST_CONTAINERS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: args.name,
      description: args.description,
      owner: args.owner,
      query: args.query,
    }),
  });

  if (response.ok) {
    let data = await response.json();
    console.log('postCostContainer', data);
    return data;
  } else {
    return await response.json();
  }
};
