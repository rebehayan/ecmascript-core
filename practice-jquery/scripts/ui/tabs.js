const config = {
  activeClassName: 'active',
  tabSelector: 'button',
  panelSelector: 'article',
};

const component = document.querySelector('.tabs');
let tabs = Array.from(component.querySelectorAll(config.tabSelector));
let panels = Array.from(component.querySelectorAll(config.panelSelector));

function init() {
  setIndex();
  bindEvents();
}

function setIndex() {
  tabs.forEach((button, index) => {
    button.dataset.index = index;
  });
}

function bindEvents() {
  tabs.forEach((button) => {
    button.addEventListener('click', handleActiveTabPanel);
  });
}

function handleActiveTabPanel(e) {
  let index = e.target.dataset.index;
  removeActivedTabPanel();
  activeTabPanel(index);
}

function removeActivedTabPanel() {
  const activedPanel = panels.find((panel) =>
    panel.classList.contains(config.activeClassName)
  );
  if (activedPanel) {
    activedPanel.classList.remove(config.activeClassName);
  }
}

function activeTabPanel(index) {
  panels[index].classList.add(config.activeClassName);
}

init();
