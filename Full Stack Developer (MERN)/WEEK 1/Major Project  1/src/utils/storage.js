export const getStored = (key, fallback = []) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

export const setStored = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
