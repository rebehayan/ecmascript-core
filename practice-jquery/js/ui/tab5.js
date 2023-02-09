const defaultConfig = {
  activeClassName: 'active',
  tabSelector: '[data-tab-button]',
  tabPanel: '[data-tab-panel]',
};

function createTabControl(component, options = {}) {
  let config = {};
  let tabs = null;
  let panels = null;

  // const component = document.querySelector('[data-tabgroup]');

  function init() {
    setIndex();
    bindEvents();
  }

  function setIndex() {
    tabs.forEach((tab, index) => (tab.dataset.index = index));
    // index는 index값을 받는다 네이밍만 index로 한것뿐
    // tab은 선택자의 값을 받는다. 해당 선택자(tabs)를 each로 각각 대입시킨다.
  }

  function bindEvents() {
    tabs.forEach((button) => {
      button.addEventListener('click', handelActivePanel);
    });
  }

  function handelActivePanel(e) {
    let index = e.target.dataset.index;
    removeClassName(tabs);
    removeClassName(panels);
    activeClassName(tabs, index);
    activeClassName(panels, index);
  }

  function removeClassName(target) {
    const activedClass = target.find((panel) =>
      panel.classList.contains(config.activeClassName)
    );
    if (activedClass) {
      activedClass.classList.remove(config.activeClassName);
    }
  }

  function activeClassName(target, index) {
    target[index].classList.add(config.activeClassName);
  }

  config = { ...defaultConfig, ...options };

  tabs = Array.from(component.querySelectorAll(config.tabSelector));
  panels = Array.from(component.querySelectorAll(config.tabPanel));

  init();
}

export default function createTabs(componentSelector, userConfig = {}) {
  Array.from(document.querySelectorAll(componentSelector)).forEach(
    (tabsElement) => createTabControl(tabsElement, userConfig)
  );
}
