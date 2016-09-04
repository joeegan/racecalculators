const rightKeyCode = 39;
const leftKeyCode = 37;
const isNumberKey = (keycode) =>
  !keycode || keycode > 47 && keycode < 58 || keycode === 186;

module.exports = { rightKeyCode, leftKeyCode, isNumberKey };
