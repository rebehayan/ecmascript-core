const config = {
  activeClassName: 'active',
  tabSelector: '[data-tab-button]',
  tabPanel: '[data-tab-panel]',
};

const $component = document.querySelector('[data-tabgroup]');

const $tabs = Array.from($component.querySelectorAll(config.tabSelector));
const $panels = Array.from($component.querySelectorAll(config.tabPanel));
// .find() => Array.from();

function init() {
  setIndex();
  bindEvents();
}

function setIndex() {
  $tabs.forEach((tab, index) => (tab.dataset.index = index));
}

function bindEvents() {
  //   $tabs.on('click', handelActivePanel);

  // !!그냥 button.addEvent로 하지않고 forEach로 해야되는지???
  $tabs.forEach((button) => {
    button.addEventListener('click', handelActivePanel);
  });
}

function handelActivePanel(e) {
  let index = e.target.dataset.index;
  removeClassName($tabs);
  removeClassName($panels);
  activeClassName($tabs, index);
  activeClassName($panels, index);
}

function removeClassName($target) {
  const activedClass = $target.find((panel) =>
    panel.classList.contains(config.activeClassName)
  );
  if (activedClass) {
    activedClass.classList.remove(config.activeClassName);
  }
}

function activeClassName($target, index) {
  $target[index].classList.add(config.activeClassName);
}

init();
