// const config = {
//   activeClassName: 'active',
//   tabSelector: '[data-tab-button]',
//   tabPanel: '[data-tab-panel]',
// };

// const $component = document.querySelector('[data-tabgroup]');

// const $tabs = Array.from($component.querySelectorAll(config.tabSelector));
// const $panels = Array.from($component.querySelectorAll(config.tabPanel));
// // .find() => Array.from();

// function init() {
//   setIndex();
//   bindEvents();
// }

// function setIndex() {
//   $tabs.forEach((tab, index) => (tab.dataset.index = index));
// }

// function bindEvents() {
//   //   $tabs.on('click', handelActivePanel);

//   // !!그냥 button.addEvent로 하지않고 forEach로 해야되는지???
//   $tabs.forEach((button) => {
//     button.addEventListener('click', handelActivePanel);
//   });
// }

// function handelActivePanel(e) {
//   let index = e.target.dataset.index;
//   removeClassName($tabs);
//   removeClassName($panels);
//   activeClassName($tabs, index);
//   activeClassName($panels, index);
// }

// function removeClassName($target) {
//   const activedClass = $target.find((panel) =>
//     panel.classList.contains(config.activeClassName)
//   );
//   if (activedClass) {
//     activedClass.classList.remove(config.activeClassName);
//   }
// }

// function activeClassName($target, index) {
//   $target[index].classList.add(config.activeClassName);
// }

// init();

/* -------------------------------------------------------------------------- */
/*                                    2차시도                                    */
/* -------------------------------------------------------------------------- */

// !! config 설정하는 것을 뭐라고 불리는지??
const config = {
  tabButton: '[data-tab-button]',
  tabPanel: '[data-tab-panel]',
  tabActive: 'active',
};

const component = document.querySelector('[data-tabgroup]');
const tabBtn = Array.from(component.querySelectorAll(config.tabButton));
const tabPanel = Array.from(component.querySelectorAll(config.tabPanel));
function init() {
  tabComponentIndex();
  bindEvent();
}

function tabComponentIndex() {
  tabBtn.forEach((tab, index) => (tab.dataset.index = index));
}

function bindEvent() {
  tabBtn.forEach((button) => {
    button.addEventListener('click', handleActiveTab);
  });
}

function handleActiveTab(e) {
  let index = e.target.dataset.index;
  removeActiveClass(tabBtn);
  removeActiveClass(tabPanel);
  addActiveClass(tabBtn, index);
  addActiveClass(tabPanel, index);
}
// !! jquery에선 matches를 사용하고 여기선 사용안하는 이유??

function removeActiveClass($target) {
  const activedClass = $target.find((panel) =>
    panel.classList.contains(config.tabActive)
  );
  if (activedClass) {
    activedClass.classList.remove(config.tabActive);
  }
}
// !! 아래 3개의 차이점??? ㅠㅠ..
// 명령어( () = {text})
// 명령어( () = text)
// 명령어( () = (text)))

function addActiveClass(target, index) {
  target[index].classList.add(config.tabActive);
}

init();
