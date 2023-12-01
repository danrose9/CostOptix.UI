import { COST_CONTAINERS } from './apiEndpoints';
import fetchInstance from './fetchInstance';

interface ICostContainerArgs {
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
    return data;
  } else {
    return await response.json();
  }
};

export const getCostContainers = async () => {
  const response = await fetchInstance(COST_CONTAINERS, {
    method: 'GET',
  });

  if (response.ok) {
    let data = await response.json();

    return data;
  } else {
    return await response.json();
  }
};

export const deleteCostContainerById = async (id: string) => {
  const response = await fetchInstance(`${COST_CONTAINERS}/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    let data = await response.json();

    return data;
  } else {
    return await response.json();
  }
};
