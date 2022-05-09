const keyboard = {
  layouts: {
    eng: [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
      "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
      "space"
    ]
  },

  init() {
    const main = document.createElement('div');
    main.classList.add('main');
    document.body.appendChild(main);
  }
};

window.addEventListener("DOMContentLoaded", function () {
  keyboard.init();
});