// import './tab.js'; // jQuery문법
// import './tab2.js'; // jQuery + buttonToggle
// import './tab3.js'; // jQuery + buttonToggle + [attr]
// import './tab4.js'; // 바닐라 스크립트 + DOM 스크립트
// import createTabs from './tab5.js'; // 바닐라 스크립트 + DOM 스크립트 +  재사용 가능한 모듈
// createTabs('.tabs'); // 바닐라 스크립트 + DOM 스크립트 +  재사용 가능한 모듈

// import { createDialog } from './dialog.js'; //jQuery문법

// createDialog('dialog-a', {
//   animate: 'slide', //slide, fade, default
//   openDefault: false,
//   duration: 300,
//   zIndex: 1000,
//   hasDimmed: true,
//   dimmedClassName: 'dimmed',
//   dimmedClick: true,
// });

// createDialog('dialog-b', {
//   animate: 'fade', //slide, fade, default
//   openDefault: false,
//   duration: 300,
//   zIndex: 1001,
//   hasDimmed: false,
//   dimmedClassName: 'dimmed',
//   dimmedClick: true,
// });

import { createDialog } from './dialog3.js'; //jQuery + helpers
createDialog('dialog-a');
createDialog('dialog-b');
