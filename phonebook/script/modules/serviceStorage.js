const getStorage = (key) => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const setStorage = (key, object) => {
  const data = getStorage(key);
  data.push(object);
  localStorage.setItem(key, JSON.stringify(data));
};

const removeStorage = (key, phoneNumber) => {
  const data = getStorage(key);
  const dataFiltered = data.filter((item) => item.phone != phoneNumber);
  localStorage.setItem(key, JSON.stringify(dataFiltered));
};

export default {
  getStorage,
  setStorage,
  removeStorage,
};
