import createTabs from './tabs-y9-v1.2.js';

const $tabs1 = createTabs('.tabs');

const $tabs2 = createTabs('.another-tabs', {
  styleClassName: 'tab-type2',
});
