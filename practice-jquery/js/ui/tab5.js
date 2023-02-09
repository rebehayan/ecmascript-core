const defaultConfig = {
  activeClassName: 'active',
  tabSelector: '[data-tab-button]',
  tabPanel: '[data-tab-panel]',
};

// !!options = {} 존재의 이유??
function createTabControl(component, options = {}) {
  // !!변수 초깃값 설정에 대해 이해가 안되는듯? ㅠㅠ..
  let config = {};
  let tabs = null;
  let panels = null;

  // const component = document.querySelector('[data-tabgroup]');
  // 해당 코드는 createTabs(선택자)로 대체된다.

  // 초기화
  function init() {
    setIndex();
    bindEvents();
  }

  function setIndex() {
    tabs.forEach((tab, index) => (tab.dataset.index = index));
    // index는 index값을 받는다 네이밍만 index로 한것뿐
    // tab은 선택자의 값을 받는다. 해당 선택자(tabs)를 each로 각각 대입시킨다.
  }

  // 이벤트 묶어주기
  function bindEvents() {
    tabs.forEach((button) => {
      button.addEventListener('click', handleActivePanel);
    });
  }

  // 이벤트 제어
  function handleActivePanel(e) {
    let index = e.target.dataset.index;
    removeClassName(tabs);
    removeClassName(panels);
    activeClassName(tabs, index);
    activeClassName(panels, index);
  }

  // 클래스제거
  function removeClassName(target) {
    const activedClass = target.find((panel) =>
      panel.classList.contains(config.activeClassName)
    );
    if (activedClass) {
      activedClass.classList.remove(config.activeClassName);
    }
  }

  // 클래스추가
  function activeClassName(target, index) {
    target[index].classList.add(config.activeClassName);
  }

  // !!이녀석들의 정체는?
  config = { ...defaultConfig, ...options };

  // !!왜 선택자를 후반부에 넣는지???
  // !!이녀석들은 const를 넣지 않는 이유?? 넣으니 이미 tabs가 실행중이라고 나옴 ㅋ;
  tabs = Array.from(component.querySelectorAll(config.tabSelector));
  panels = Array.from(component.querySelectorAll(config.tabPanel));

  // 초기화 함수 실행
  init();
}

// export해서 index.js의 import로 받게 한다.
// !!userConfig = {}의 역할은?
export default function createTabs(componentSelector, userConfig = {}) {
  // array로 선택자를 받아서 각각(forEach) 처리해준다.
  Array.from(document.querySelectorAll(componentSelector)).forEach(
    (tabsElement) => createTabControl(tabsElement, userConfig)
  );
}
