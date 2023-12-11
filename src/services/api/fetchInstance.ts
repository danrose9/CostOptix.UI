import { BASE } from './apiEndpoints';
import { checkTokens } from './processToken';

/// <summary>
/// Makes the original fetch request
/// <input> url: string, config: RequestInit </input>
/// <return> Promise<Response> </return>
/// <summary>
const originalRequest = async (url: string, config: RequestInit): Promise<Response> => {
  url = `${BASE}${url}`;
  const response = await fetch(url, config);
  return response;
};

/// <summary>
/// Checks the authToken for validity and refreshes it if necessary
/// <input> url: string, config: RequestInit </input>
/// <return> Promise<Response> </return>
/// <summary>
const customFetcher = async (url: string, config: RequestInit = {}): Promise<Response> => {
  let authTokens = await checkTokens();

  config['headers'] = {
    Authorization: `Bearer ${authTokens.accessToken}`,
    'Content-Type': 'application/json',
  };

  let response = await originalRequest(url, config);
  return response;
};

export default customFetcher;
