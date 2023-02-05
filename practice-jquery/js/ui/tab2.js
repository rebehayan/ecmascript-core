const config = {
  activeClassName: 'active',
  tabSelector: 'button',
  tabPanel: 'article',
};

const $component = $('.tabs');

const $tabs = $component.find(config.tabSelector);
const $panels = $component.find(config.tabPanel);

function init() {
  setIndex();
  bindEvents();
}

function setIndex() {
  $tabs.each((index, tab) => (tab.dataset.index = index));
}

function bindEvents() {
  $tabs.on('click', handelActivePanel);
}

function handelActivePanel(e) {
  if (e.target.matches('button')) {
    let index = e.target.dataset.index;
    removeClassName($tabs);
    removeClassName($panels);
    activeClassName($tabs.eq(index));
    activeClassName($panels.eq(index));
  }
}

function removeClassName($target) {
  $target
    .filter(`.${config.activeClassName}`)
    .removeClass(config.activeClassName);
}

function activeClassName($target) {
  $target.addClass(config.activeClassName);
}

init();
