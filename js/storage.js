export const checkVersion = version => {
  try {
    const lastVersion = localStorage.getItem('_version');
    if (version !== lastVersion) {
      localStorage.clear();
    }
    localStorage.setItem('_version', version);
    return true;
  }
  catch (e) {
    return false;
  }
}

export const storeState = (key, state) => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
    return true;
  }
  catch (e) {
    return false;
  }
}

export const restoreState = (key, defaultState) => {
  try {
    const data = window.localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultState;
  }
  catch (e) {
    return defaultState;
  }
}
