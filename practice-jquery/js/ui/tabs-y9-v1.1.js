const config = {
  activeClassName: 'active',
  tabSelector: 'button',
  panelSelector: 'article',
};

const $component = $('.tabs');

const $tabs = $component.find(config.tabSelector);
const $tabPanels = $component.find(config.panelSelector);

const $tabStyle = $component.children().eq(0);
let tabStyleClassName = '';

function init() {
  setIndex();
  bindEvents();
  tabStyleClassName = getTabStyleClassName();
}

function getTabStyleClassName() {
  return $tabStyle.attr('class');
}

function setIndex() {
  $tabs.each((index, tab) => (tab.dataset.index = index));
}

function bindEvents() {
  $tabs.on('click', handleActivePanel);
}

function handleActivePanel(e) {
  if (e.target.matches(config.tabSelector)) {
    let index = e.target.dataset.index;

    removeActivedClassName($tabs);
    removeActivedClassName($tabPanels);

    addActiveClassName($tabs.eq(index));
    addActiveClassName($tabPanels.eq(index));
  }
}

function removeActivedClassName($target) {
  if ($target.is(config.tabSelector)) {
    let removeClassName = `.${tabStyleClassName}--${config.activeClassName}`;

    $target
      .filter(removeClassName)
      .removeClass(removeClassName.replace('.', ''));
  } else {
    $target
      .filter(`.${config.activeClassName}`)
      .removeClass(config.activeClassName);
  }
}

function addActiveClassName($target) {
  if ($target.is(config.tabSelector)) {
    $target.addClass(`${tabStyleClassName}--${config.activeClassName}`);
  } else {
    $target.addClass(config.activeClassName);
  }
}

init();
