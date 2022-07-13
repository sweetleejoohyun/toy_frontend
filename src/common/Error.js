export const onAxiosError = error => {
  try {
    error = error.toJSON();
  } catch (e) {
    alert(e);
  }
  if (error.message) {
    alert(error.message);
  } else if (error.response) {
    alert(JSON.stringify(error.response));
  } else if (error.request) {
    alert(JSON.stringify(error.request));
  } else {
    alert(error.toString());
  }
};