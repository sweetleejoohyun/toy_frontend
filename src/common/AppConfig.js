const testConfig = {
  envName: 'develop',
  apiRoot: 'http://127.0.0.1:5000/api',
};

const getConfig = () => {
  return testConfig;
};

const appConfig = {
  ...getConfig(),
};

export default appConfig;

export const defaultView = 'object-detection';
