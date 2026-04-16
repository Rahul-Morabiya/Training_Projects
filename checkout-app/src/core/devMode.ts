let devMode = false;

const listeners: Function[] = [];

export const getDevMode = () => devMode;

export const toggleDevMode = () => {
  devMode = !devMode;
  listeners.forEach((l) => l(devMode));
};

export const subscribeDevMode = (cb: (v: boolean) => void) => {
  listeners.push(cb);
};