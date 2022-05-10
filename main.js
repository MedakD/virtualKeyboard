const keyboard = {
  state: {
    lang: 'eng'
  },

  getLayout() {
    const layouts = {
      rus: [
        'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
        'Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
        'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', '&uarr;', 'Shift',
        'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '&larr;', '&darr;', '&rarr;', 'Ctrl'],
      eng: [
        '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
        'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
        'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&uarr;', 'Shift',
        'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '&larr;', '&darr;', '&rarr;', 'Ctrl'],
    };

    const keyCodes = [
      192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8,
      9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 46,
      20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13,
      16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 38, 16,
      17, 91, 18, 32, 18, 37, 40, 39, 17,
    ];

    return layouts[this.state.lang].map((btn, index) => {
      return {
        title: btn,
        keyCode: keyCodes[index]
      }
    });
  },

  keyRowsMap: [null, 14, 15, 13, 13, 9],

  init() {
    const main = document.createElement('div');
    main.classList.add('main');
    const textArea = document.createElement('textarea');
    main.appendChild(textArea);
    document.body.appendChild(main);
    this._addKeyboardButtons();
  },

  _addKeyboardButtons() {
    const buttons = this.getLayout();
    const keyboardWrap = document.createElement('div');
    keyboardWrap.classList.add('keyboard_wrap');

    this.keyRowsMap.reduce((prev, curr) => {
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
    btnElement.innerHTML = button.title;
    row.appendChild(btnElement);
  },

  highlightButton(keyCode) {
    const btnIndex = this._getBtnIndex(keyCode);
    const buttonToHighlight = document.querySelectorAll('.keyboard_wrap button')[btnIndex];
    buttonToHighlight.classList.toggle('active');
  },

  printButton(keyCode, DOMElement) {
    DOMElement.innerHTML += this._getBtnTitle(keyCode);
  },

  changeLanguage() {
    this.state.lang === 'eng' ? this.state.lang = 'rus' : this.state.lang = 'eng';
    this._reRenderKeyboard();
  },

  _reRenderKeyboard() {
    const keyboardWrap = document.querySelector('.keyboard_wrap');
    keyboardWrap.remove();
    this._addKeyboardButtons();
  },

  _getBtnIndex(keyCode) {
    return this.getLayout().findIndex(btn => btn.keyCode === keyCode);
  },

  _getBtnTitle(keyCode) {
    return this.getLayout().find(btn => btn.keyCode === keyCode)?.title;
  }
};

window.addEventListener("DOMContentLoaded", function () {
  keyboard.init();
  const areaToPrint = document.querySelector('textarea');

  document.addEventListener('keydown', (event) => {
    const { repeat } = event;
    if (event.keyCode === 18) {
      keyboard.changeLanguage();
    }
    if (repeat) {
      return;
    }
    const keyCode = event.keyCode;
    keyboard.highlightButton(keyCode);
  });

  document.addEventListener('keyup', (event) => {
    const keyCode = event.keyCode;
    keyboard.highlightButton(keyCode);
    keyboard.printButton(keyCode, areaToPrint)
  });
});
