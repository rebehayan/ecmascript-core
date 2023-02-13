const defaultConfig = {
  animate: false,
  openDefault: false,
  duration: 500,
  zIndex: 1000,
  hasDimmed: true,
  dimmedClassName: 'dimmed',
  dimmedClick: false,
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
  }
  function template() {
    $dialog.html($template.html());
    // 템플릿이 그리기전에 닫기를 실행하면 인식하지 못함.
    settings();
  }

  function settings() {
    $closer = $(config.closer);

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
    $dim.on('click', closeDialog);
  }

  function openDialog() {
    $dialog.show();
    openDim();
  }

  function closeDialog() {
    $dialog.hide();
    closeDim();
  }

  function openDim() {
    $dialog.after($dim);
  }
  function closeDim() {
    $dim.detach();
  }

  init();
}
