const keyboard = {
  localStorage: window.localStorage,

  state: {
    lang: localStorage.getItem('keyboardLang') || 'eng'
  },

  getLayout() {
    const layouts = {
      rus: [
        'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
        'Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
        'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', '&uarr;', 'Shift',
      ],
      eng: [
        '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
        'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
        'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&uarr;', 'Shift',
        'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '&larr;', '&darr;', '&rarr;', 'Ctrl'
      ],
    };

    const codes = [
      'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
      'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
      'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
      'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
      'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];

    return layouts[this.state.lang].map((btn, index) => {
      return {
        title: btn,
        code: codes[index]
      }
    });
  },

  keyRowsMap: [null, 14, 15, 13, 13, 9],

  init() {
    const main = document.createElement('div');
    main.classList.add('main');
    const textArea = document.createElement('textarea');
    main.appendChild(textArea);
    const info = document.createElement('h3');
    info.classList.add('text_center');
    info.innerHTML = 'To switch language please click Alt+Shift';
    main.appendChild(info);
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

      currentRowButtons.forEach((button) => {
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

  toggleHighlightButton(event) {
    const { code, type: eventType } = event;
    const btnIndex = this._getBtnIndex(code);
    const buttonElement = document.querySelectorAll('.keyboard_wrap button')[btnIndex];
    if (eventType === 'keydown') {
      buttonElement.classList.add('active');
    } else if (eventType === 'keyup') {
      buttonElement.classList.remove('active');
    }
  },

  printButton(code, DOMElement) {
    DOMElement.innerHTML += this._getBtnTitle(code);
  },

  changeLanguage() {
    const newLanguage = this.state.lang === 'eng' ? 'rus' : 'eng';
    this.state.lang = newLanguage;
    localStorage.setItem('keyboardLang', newLanguage);
    this._reRenderKeyboard();
  },

  _reRenderKeyboard() {
    const keyboardWrap = document.querySelector('.keyboard_wrap');
    keyboardWrap.remove();
    this._addKeyboardButtons();
  },

  _getBtnIndex(code) {
    return this.getLayout().findIndex(btn => btn.code === code);
  },

  _getBtnTitle(code) {
    const sign = this.getLayout().find(btn => btn.code === code)?.title;
    return sign.length > 1 ? '' : sign
  }
};

window.addEventListener("DOMContentLoaded", function () {
  keyboard.init();
  const areaToPrint = document.querySelector('textarea');

  document.addEventListener('keydown', (event) => {
    event.preventDefault();
    const { repeat } = event;
    if (event.altKey && event.shiftKey) {
      keyboard.changeLanguage();
    }
    if (repeat) {
      return;
    }
    keyboard.toggleHighlightButton(event);
  });

  document.addEventListener('keyup', (event) => {
    const code = event.code;
    keyboard.toggleHighlightButton(event);
    keyboard.printButton(code, areaToPrint)
  });
});
