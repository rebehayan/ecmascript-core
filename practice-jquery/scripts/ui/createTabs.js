// 탭 메뉴 기본 옵션 (개발자 정의)
const defaultConfig = {
  activeClassName: 'active',
  tabSelector: 'button',
  panelSelector: 'article',
};

function createTabControl(
  /* 컴포넌트로 적용할 문서 요소 */
  component,
  /* 사용자 정의 탭 메뉴 옵션 */
  options = {}
) {
  // 개발자 + 사용자 정의 구성 객체
  let config = {};

  // 탭 버튼 집합 객체
  let tabs = null;
  // 탭 패널 집합 객체
  let panels = null;

  // 초기화 함수
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

  // 개발자가 정의한 기본 옵션과 사용자가 전달한 옵션을 병합
  // 전개 구문 (객체 합성)
  config = { ...defaultConfig, ...options };

  tabs = Array.from(component.querySelectorAll(config.tabSelector));
  panels = Array.from(component.querySelectorAll(config.panelSelector));

  init();
}

// 탭 메뉴 생성 함수 (재사용)
export default function createTabs(componentSelector, userConfig = {}) {
  Array.from(document.querySelectorAll(componentSelector)).forEach(
    (tabsElement) => createTabControl(tabsElement, userConfig)
  );
}
