export const resolveSearchId = (): Promise<string> => {
  const url = 'https://front-test.beta.aviasales.ru/search';
  return fetch(url)
    .then((r) => r.json())
    .then(({ searchId }) => searchId);
};
