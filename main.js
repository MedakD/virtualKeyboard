const keyboard = {
  state: {
    lang: 'eng' // TODO - add rus
  },

  getLayout() {
    const layouts = {
      rus: ['TODO'],
      eng: [
        '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
        'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
        'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&uarr;', 'Shift',
        'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '&larr;', '&darr;', '&rarr;', 'Ctrl']
    };
    return layouts[this.state.lang];
  },

  keyRowsMap: [null, 14, 15, 13, 13, 9],

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

    this.keyRowsMap.reduce((prev, curr, rowIdx, arr) => {
      const row = document.createElement('div');
      row.classList.add('keyboard_row');
      const currentRowButtons = buttons.slice(prev, curr+prev);
      currentRowButtons.forEach((button, index) => {
        this._addButtonsToTheRow(row, button);
        keyboardWrap.appendChild(row);
      });
      return prev+curr;
    });
    document.querySelector('.main').appendChild(keyboardWrap);
  },

  _addButtonsToTheRow(row, button) {
    const btnElement = document.createElement('button');
    btnElement.innerHTML = button;
    row.appendChild(btnElement);
  },
};

window.addEventListener("DOMContentLoaded", function () {
  keyboard.init();
});