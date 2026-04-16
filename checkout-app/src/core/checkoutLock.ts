import { getTabId } from "./tabId";

const KEY = "checkout-lock";

const channel = new BroadcastChannel("checkout-lock");

export const subscribeLock = (cb: () => void) => {
  channel.onmessage = cb;
};

export const setCheckoutLock = () => {
  const lock = {
    owner: getTabId(),
    time: Date.now(),
  };

  localStorage.setItem(KEY, JSON.stringify(lock));
  channel.postMessage(lock);
};

export const clearCheckoutLock = () => {
  localStorage.removeItem(KEY);
  channel.postMessage(null);
};

export const getCheckoutLock = () => {
  const data = localStorage.getItem(KEY);
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

export const isCheckoutLocked = () => {
  const lock = getCheckoutLock();
  if (!lock) return false;

  const myId = getTabId();

  return lock.owner !== myId;
};