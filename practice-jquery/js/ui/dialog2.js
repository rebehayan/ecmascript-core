const defaultConfig = {
  animate: 'fade', //slide, fade, default
  openDefault: false,
  duration: 300,
  zIndex: 1000,
  hasDimmed: true,
  dimmedClassName: 'dimmed',
  dimmedClick: true,
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

  const $opener = $(config.opener);
  const $dialog = $(config.dialog);
  const $template = $(config.template);

  let $dim = $(`<div class="${config.dimmedClassName}"></div>`);
  let $closer = null;

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
    $dialog.html($template.html());
    // 템플릿을 그리기 전에 닫기를 실행하면 인식하지 못함.
    settings();
  }

  function settings() {
    $closer = $(config.closer);

    $dialog.attr('tabindex', -1);
    $dialog.css({
      'z-index': config.zIndex,
    });
    $dim.css({
      'z-index': config.zIndex - 1,
    });
  }

  function bindEvent() {
    $opener.on('click', openDialog);
    $closer.on('click', closeDialog);
    $dim.on('click', closeDimmed);
  }

  function openDialog() {
    let { animate, duration, hasDimmed } = config;

    // animate ? $dialog.slideDown(duration) : $dialog.show();

    showAnimation($dialog, animate, duration);
    hasDimmed ? openDim() : null;

    focusElement($dialog);
  }

  function closeDialog() {
    let { animate, duration } = config;

    hideAnimation($dialog, animate, duration);
    closeDim();
    focusElement($opener);
  }

  function closeDimmed() {
    let { dimmedClick } = config;

    dimmedClick ? closeDialog() : null;
  }

  function hideAnimation($target, animate, duration) {
    if (animate == 'slide') {
      $target.slideUp(duration);
    } else if (animate == 'fade') {
      $target.fadeOut(duration);
    } else {
      $target.hide();
    }
  }

  function showAnimation($target, animate, duration) {
    if (animate == 'slide') {
      $target.slideDown(duration);
    } else if (animate == 'fade') {
      $target.fadeIn(duration);
    } else {
      $target.show();
    }
  }

  function openDim() {
    let { hasDimmed } = config;

    if (hasDimmed) {
      $dialog.after($dim);
      $dim.show();
    }
  }

  function closeDim() {
    // let { animate, duration } = config;

    // hideAnimation($dim, animate, duration);
    $dim.detach();
  }

  function focusElement($target) {
    $target.focus();
  }

  init();
}
