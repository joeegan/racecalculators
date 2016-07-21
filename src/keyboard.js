export const rightKeyCode = 39;
export const leftKeyCode = 37;
export const isNumberKey = (keycode) => {
  return !keycode || keycode > 47 && keycode < 58 || keycode == 186;
};
