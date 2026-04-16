const KEY = "tab-id";

export const getTabId = () => {
  let id = sessionStorage.getItem(KEY);

  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(KEY, id);
  }

  return id;
};