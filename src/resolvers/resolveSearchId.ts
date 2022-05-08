import { getMethodUrl } from './base';

export const resolveSearchId = (useFallbackApi: boolean): Promise<string> => {
  const url = getMethodUrl(useFallbackApi, 'search');
  return fetch(url)
    .then((r) => r.json())
    .then(({ searchId }) => searchId);
};
