export const getPath = () => {
  return sessionStorage.getItem('path') || null;
}

export const setPathSession = path => {
  sessionStorage.path = path;
}

export const removePathSession = () => {
  sessionStorage.removeItem('path')
}