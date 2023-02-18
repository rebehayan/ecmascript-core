const defaultConfig = {
  animate: 'fade', //slide, fade, default
  openDefault: false,
  duration: 300,
  zIndex: 1000,
  hasDimmed: true,
  dimmedClassName: 'dimmed',
  dimmedClick: false,
};
//
// jQuery 메서드 생성
//
const createDimmed = (type, className) => {
  const element = document.createElement(type);
  if (className && typeof className == 'string') {
    element.classList.add(className);
  }
  return element;
};

const getStyle = (element, property) => {
  return getComputedStyle(element, null).getPropertyValue(property);
  // getComputedStyle 요소의 모든 css속성값을 감은 객체를 회신함
  // getPropertyValue 지정된 css속성값이 포함된 문자열을 반환함.  예) top 을 넣으면 해당된 값을 반환함
};

const setStyle = (element, property, value) => {
  element.style[property] = value;
  // 특정선택자.style[css속성] = 해당 css속성의 값;
  // inline-style로 작성됨.
};

const css = (element, property, value) => {
  if (!value) {
    return getStyle(element, property);
  } else {
    setStyle(element, property, value); // !! return하지 않는이유???
  }
};

// !! hide부분 이해안감.. ㅠ..
const hide = (element) => {
  let originalDisplay = getStyle(element, 'display');
  element.dataset.display = originalDisplay;
  css(element, 'display', 'none');
};

const show = (element) => {
  element.style.display = element.dataset.display ?? 'block';
};

const detach = (element) => {
  // html을 삭제하기 전에 기억해둔다.
  const memoryElement = element;
  // html을 삭제한다.
  element.remove();
  // 기억했던 html을 리턴한다.
  return element;
};

const fadeIn = (element, duration = 300, callback) => {
  show(element);

  element.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration,
    interation: 1,
  });

  if (typeof callback === 'function') {
    setTimeout(callback, duration);
  }
};

const fadeOut = (element, duration = 300, callback) => {
  element.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration,
    interation: 1,
  });
  setTimeout(() => {
    hide(element);
  }, duration - 10);

  if (typeof callback === 'function') {
    setTimeout(callback, duration);
  }
};

export function createDialog(id, options = {}) {
  const config = {
    opener: `[data-dialog-opener=${id}]`,
    closer: `[data-dialog-closer=${id}]`,
    dialog: `[data-dialog=${id}]`,
    template: `[data-dialog-template=${id}]`,
    ...defaultConfig,
    ...options,
  };

  const opener = document.querySelector(config.opener);
  const dialog = document.querySelector(config.dialog);
  const template2 = document.querySelector(config.template);

  //   let $dim = $(`<div class="${config.dimmedClassName}"></div>`);
  let dim = createDimmed('div', config.dimmedClassName);
  let closer = null;

  function init() {
    template();
    bindEvent();

    // || 논리 연산자를 사용한 조건 처리
    // 앞에 값이 거짓이면 뒤에 값이 실행
    config.openDefault || closeDialog();
    !config.openDefault || openDim();

    // openDim();
  }
  function template() {
    // $dialog.html($template.html());
    dialog.innerHTML = template2.innerHTML;
    // 템플릿을 그리기 전에 닫기를 실행하면 인식하지 못함.
    settings();
  }

  function settings() {
    // closer = $(config.closer);
    closer = document.querySelector(config.closer);

    // dialog.attr('tabindex', -1);
    dialog.setAttribute('tabindex', -1);

    // dialog.css({
    //   'z-index': config.zIndex,
    // });
    dialog.style.cssText = `
      z-index:${config.zIndex};
    `;
    dim.style.cssText = `
      z-index:${config.zIndex - 1};
    `;
  }

  function bindEvent() {
    // opener.on('click', openDialog);
    opener.addEventListener('click', openDialog);
    closer.addEventListener('click', closeDialog);
    dim.addEventListener('click', closeDimmed);
  }

  function openDialog() {
    let { animate, duration, hasDimmed } = config;

    // animate ? dialog.slideDown(duration) : dialog.show();

    showAnimation(dialog, animate, duration);
    hasDimmed ? openDim() : null;

    focusElement(dialog);
  }

  function closeDialog() {
    let { animate, duration } = config;

    hideAnimation(dialog, animate, duration);
    closeDim();
    focusElement(opener);
  }

  function closeDimmed() {
    let { dimmedClick } = config;

    dimmedClick ? closeDialog() : null;
  }

  function hideAnimation(target, animate, duration) {
    if (animate == 'slide') {
      // target.slideUp(duration);
    } else if (animate == 'fade') {
      fadeOut(target);
    } else {
      hide(target);
    }
  }

  function showAnimation(target, animate, duration) {
    if (animate == 'slide') {
      // target.slideDown(duration);
    } else if (animate == 'fade') {
      fadeIn(target);
    } else {
      show(target);
    }
  }

  function openDim() {
    let { hasDimmed } = config;

    if (hasDimmed) {
      dialog.after(dim);
      show(dim);
    }
  }

  function closeDim() {
    detach(dim);
  }

  function focusElement(target) {
    target.focus();
  }

  init();
}
