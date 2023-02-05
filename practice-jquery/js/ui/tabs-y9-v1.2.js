function createTabControl($component, config) {
  const $tabs = $component.find(config.tabSelector);
  const $tabPanels = $component.find(config.panelSelector);

  function init() {
    setIndex();
    bindEvents();
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
      let removeClassName = `.${config.styleClassName}--${config.activeClassName}`;

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
      $target.addClass(`${config.styleClassName}--${config.activeClassName}`);
    } else {
      $target.addClass(config.activeClassName);
    }
  }

  init();

  return $tabs;
}

export default function createTabs(componentSelector, userConfig = {}) {
  const $components = $(componentSelector);
  const config = { ...createTabs.defaultConfig, ...userConfig };

  let $tabs = [];

  $components.each((index) => {
    $tabs.push(createTabControl($components.eq(index), config));
  });

  return $tabs;
}

createTabs.defaultConfig = {
  styleClassName: 'rebehayan',
  activeClassName: 'active',
  tabSelector: 'button',
  panelSelector: 'article',
};
