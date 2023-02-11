// const config = {
//   activeClassName: 'active',
//   tabSelector: 'button',
//   tabPanel: 'article',
// };

// const $component = $('.tabs');

// const $tabs = $component.find(config.tabSelector);
// const $panels = $component.find(config.tabPanel);

// function init() {
//   setIndex();
//   bindEvents();
// }

// function setIndex() {
//   $tabs.each((index, tab) => (tab.dataset.index = index));
//   // index는 index값을 받는다 네이밍만 index로 한것뿐
//   // tab은 선택자의 값을 받는다. 해당 선택자를 each로 각각 대입시킨다.
// }

// function bindEvents() {
//   $tabs.on('click', handelActivePanel);
// }

// function handelActivePanel(e) {
//   //클릭한 대상이 버튼요소인지 확인한다.
//   if (e.target.matches('button')) {
//     let index = e.target.dataset.index;
//     removeActivedTabpanel();
//     activeTabPanel(index);
//   }
// }

// function removeActivedTabpanel() {
//   $panels
//     .filter(`.${config.activeClassName}`)
//     .removeClass(config.activeClassName);
// }

// function activeTabPanel(index) {
//   $panels.eq(index).addClass(config.activeClassName);
// }

// init();

/* -------------------------------------------------------------------------- */
/*                                    2차시도                                 */
/* -------------------------------------------------------------------------- */

// 변수설정
// const config = {
//   tabButton: 'button',
//   tabPanel: 'article',
//   tabActive: 'active',
// };

// const $component = $('.tabs');

// let $tabButton = $component.find(config.tabButton);
// let $tabPanel = $component.find(config.tabPanel);

// // 전체초기화 함수
// function init() {
//   setIndex();
//   bindEvent();
// }

// // 버튼에 각각 data-index를 넣는다.
// function setIndex() {
//   // 탭버튼이 몇번째 버튼인지 알아야 한다.
//   // index부터 와야 한다.
//   $tabButton.each((index, tab) => (tab.dataset.index = index));
// }

// // 클릭이벤트 설정
// function bindEvent() {
//   $tabButton.on('click', handleActiveClass);
// }

// // 클래스 핸들링
// function handleActiveClass(e) {
//   if (e.target.matches('button')) {
//     let index = e.target.dataset.index;
//     // 클래스 삭제
//     removeTabClass($tabButton);
//     removeTabClass($tabPanel);
//     addTabClass($tabButton.eq(index));
//     addTabClass($tabPanel.eq(index));
//   }
// }
// // removeclass
// function removeTabClass($target) {
//   $target.filter(`.${config.tabActive}`).removeClass(config.tabActive);
// }

// // addClass
// function addTabClass($target) {
//   $target.addClass(config.tabActive);
// }

// init();

/* -------------------------------------------------------------------------- */
/*                                    3차시도                                 */
/* -------------------------------------------------------------------------- */

const config = {
  tabButton: '[data-tab-button]',
  tabPanel: '[data-tab-panel]',
  tabActive: 'active',
};

const $component = $('[data-tabgroup]');
const $tabBtn = $component.find(config.tabButton);
const $tabPanel = $component.find(config.tabPanel);

function init() {
  tabComponentIndex();
  bindEvent();
}
function tabComponentIndex() {
  $tabBtn.each((index, tab) => (tab.dataset.index = index));
}

function bindEvent() {
  $tabBtn.on('click', handleActiveTab);
}
function handleActiveTab(e) {
  if (e.target.matches(config.tabButton)) {
    let index = e.target.dataset.index;
    removeActiveClass($tabBtn);
    removeActiveClass($tabPanel);
    addActiveClass($tabBtn.eq(index));
    addActiveClass($tabPanel.eq(index));
  }
}
function removeActiveClass($target) {
  $target.filter(`.${config.tabActive}`).removeClass(config.tabActive);
}

function addActiveClass($target) {
  $target.addClass(config.tabActive);
}

init();
