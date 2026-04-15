export const vibrate = () => {
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
};