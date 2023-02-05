// 코드 재사용 관점 : 사용자 정의 옵션
const config = {
  activeClassName: 'active',
  tabSelector: 'button',
  panelSelector: 'article',
};

// Tabs 컴포넌트
const $component = $('.tabs');

// Tabs 내부에 제어할 컴포넌트 수집
const $tabs = $component.find(config.tabSelector);
const $tabPanels = $component.find(config.panelSelector);

// 컴포넌트 초기화(initialization)
function init() {
  // 탭 버튼에 인덱스 설정
  setIndex();
  // 이벤트 연결
  bindEvents();
}

function setIndex() {
  // jQuery 방식
  // $.each($tabs, (index, tab) => $(tab).attr('data-index', index));
  // $tabs.each((index, tab) => $(tab).attr('data-index', index));

  // 포인트!!
  // 무조건 jQuery 코드를 사용하는 것은 좋지 않다.
  // 필요한 부분에 한해서만큼은 DOM 스크립트를 활용!
  // console.log($tabs); // [button, button, button]
  // $tabs.each((index, tab) => tab.setAttribute('data-index', index));
  // 참고: https://mzl.la/3RxSNGJ
  $tabs.each((index, tab) => (tab.dataset.index = index));
}

function bindEvents() {
  $tabs.on('click', handleActivePanel);
}

function handleActivePanel(e) {
  // DOM Script
  if (e.target.matches('button')) {
    let index = e.target.dataset.index; // <button data-index=""></button>
    removeActivatedTabPanel();
    activeTabPanel(index);
  }
}

function removeActivatedTabPanel() {
  $tabPanels
    .filter(`.${config.activeClassName}`)
    .removeClass(config.activeClassName);
}

function activeTabPanel(index) {
  $tabPanels.eq(index).addClass(config.activeClassName);
}

init();
