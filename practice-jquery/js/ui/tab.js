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
  // index는 index값을 받는다 네이밍만 index로 한것뿐
  // tab은 선택자의 값을 받는다. 해당 선택자를 each로 각각 대입시킨다.
}

function bindEvents() {
  $tabs.on('click', handelActivePanel);
}

function handelActivePanel(e) {
  //클릭한 대상이 버튼요소인지 확인한다.
  if (e.target.matches('button')) {
    let index = e.target.dataset.index;
    removeActivedTabpanel();
    activeTabPanel(index);
  }
}

function removeActivedTabpanel() {
  $panels
    .filter(`.${config.activeClassName}`)
    .removeClass(config.activeClassName);
}

function activeTabPanel(index) {
  $panels.eq(index).addClass(config.activeClassName);
}

init();
