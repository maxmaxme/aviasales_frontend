import { getMethodUrl } from './base';

export const resolveSearchId = (): Promise<string> => {
  const url = getMethodUrl('search');
  return fetch(url)
    .then((r) => r.json())
    .then(({ searchId }) => searchId);
};
