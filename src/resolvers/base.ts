export const getMethodUrl = (useFallbackApi: boolean, method: string) => {
  if (useFallbackApi) {
    return 'https://maxmax.me/aviasales_backend_tst/' + method + '.php';
  }
  return 'https://front-test.beta.aviasales.ru/' + method;
};
