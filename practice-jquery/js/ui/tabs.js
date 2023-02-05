// jQuery CSS Selector (simple)

// $('.tabs').on('click', 'button', () => {

// 이벤트 리스너(핸들러)는 필히 이벤트 객체를 마지막 인자로 전달받게 됨
// e.target
// e.currentTarget

const ACTIVE_CLASSNAME = 'active';

const $tabs = $('.tabs');

$tabs.on('click', 'li', (e) => {
  const $listItem = $(e.currentTarget);
  const $nav = $listItem.parents('nav');

  let navClassName = $nav.attr('class');
  let idx = $listItem.index();

  $listItem
    .addClass(`${navClassName}--active`)
    .siblings()
    .removeClass();

  $nav
    .siblings('article')
    .eq(idx)
    .addClass(ACTIVE_CLASSNAME)
    .siblings('article')
    .removeClass(ACTIVE_CLASSNAME);
});