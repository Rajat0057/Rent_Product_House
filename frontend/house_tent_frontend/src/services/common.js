export const setSessionStorage = (data, objectName) => {
  sessionStorage.setItem(objectName, JSON.stringify(data));
};

export const getSessionStorage = (objectName) => {
  return JSON.parse(sessionStorage.getItem(objectName));
};
