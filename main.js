const keyboard = {
  state: {
    lang: 'eng' // TODO - add rus
  },

  getLayout() {
    const layouts = {
      rus: ['TODO'],
      eng: [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
        "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
        "space"
      ]
    };
    return layouts[this.state.lang];
  },

  init() {
    const main = document.createElement('div');
    main.classList.add('main');
    document.body.appendChild(main);
    this._addKeyboardButtons();
  },

  _addKeyboardButtons() {
    const buttons = this.getLayout();
    const keyboardWrap = document.createElement('div');
    keyboardWrap.classList.add('keyboard_wrap');
    buttons.forEach(button => {
      const btnElement = document.createElement('button');
      btnElement.innerHTML = button;
      keyboardWrap.appendChild(btnElement);
    });
    document.querySelector('.main').appendChild(keyboardWrap);
  }
};

window.addEventListener("DOMContentLoaded", function () {
  keyboard.init();
});