let _localStorageCheck = {};

function hasLocalStorage() {
  if (_localStorageCheck.checked) {
    return _localStorageCheck.value;
  }
  try {
    window.localStorage.setItem('test', '1');
    _localStorageCheck.value = (window.localStorage.getItem('test') === '1');
  } catch (e) {
    _localStorageCheck.value = false
  }
  _localStorageCheck.checked = true
  return _localStorageCheck.value
}

export function load(key) {
  if (!hasLocalStorage()) {
    return null;
  }
  
  return window.localStorage.getItem(key);
}

export function store(key, value) {
  if (!hasLocalStorage()) {
    return null;
  }
  
  window.localStorage.setItem(key, value);
}
