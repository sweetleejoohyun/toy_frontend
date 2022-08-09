const testConfig = {
  envName: 'develop',
  apiRoot: 'http://127.0.0.1:5000/api',
  imageApi: 'http://127.0.0.1:5000/api/image',
  videoApi: 'http://127.0.0.1:5000/api/video',
};

const getConfig = () => {
  return testConfig;
};

const appConfig = {
  ...getConfig(),
};

export default appConfig;

export const defaultView = 'object-detection';

export const getImage = imagePath => {
  return appConfig.imageApi + '?image_path=' + imagePath;
};

export const getVideo = (videoPath) => {
  return (
    appConfig.videoApi + '?videoPath=' + videoPath
  );
};

