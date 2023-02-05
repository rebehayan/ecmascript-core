export default class Tabs {
  
  static defaultOptions = {
    tabSelector: 'button',
    panelSelector: 'article',
    activeClassName: 'active',
    styleClassName: 'rebehayan',
  };

  constructor(selector, userConfig = {}) {
    this.selector = selector;
    this.component = document.querySelector(selector);

    this.tabs = null;
    this.panels = null;

    this.config = { ...Tabs.defaultOptions, ...userConfig };

    this.#init();
  }

  #init() {
    this.#findControls();
    this.#setDataIndex();
    this.#bindEvents();
  }

  #findControls() {
    this.tabs = Array.from(
      this.component.querySelectorAll(this.config.tabSelector)
    );
    this.panels = Array.from(
      this.component.querySelectorAll(this.config.panelSelector)
    );
  }

  #setDataIndex() {
    this.tabs.forEach((tab, index) => {
      tab.dataset.index = index;
    });
  }

  #bindEvents() {
    this.component.addEventListener('click', this.#handleClick.bind(this));
  }

  #handleClick(e) {
    let index = e.target.dataset.index;

    if (e.target.matches(this.config.tabSelector)) {
      this.#removeActiveClass();
      this.#addActiveClass(index);
    }
  }

  #removeActiveClass() {
    const activeTabClassName = `${this.config.styleClassName}--${this.config.activeClassName}`;

    const activedTab = this.tabs.find((tab) => {
      return tab.classList.contains(activeTabClassName);
    });

    if (activedTab) {
      activedTab.classList.remove(activeTabClassName);
    }

    const activedPanel = this.panels.find((panel) =>
      panel.classList.contains(this.config.activeClassName)
    );

    if (activedPanel) {
      activedPanel.classList.remove(this.config.activeClassName);
    }
  }

  #addActiveClass(index) {
    this.tabs[index].classList.add(
      `${this.config.styleClassName}--${this.config.activeClassName}`
    );
    this.panels[index].classList.add(this.config.activeClassName);
  }

  active(index) {
    this.tabs[index].click();
  }
  deactive() {
    this.#removeActiveClass();
  }
}
