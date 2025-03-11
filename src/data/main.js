const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
  const site = {
    header: null,
    menuTrigger: null,
    menuMobile: null,
    menuItems: null,
    logo: null,
    navigation: null,
    body: null,

    init: function () {
      // HEADER
      this.header = document.querySelector('header');
      this.menuTrigger = document.querySelector('.menu-trigger');
      this.menuMobile = document.querySelector('.menu-mobile');
      this.menuItems = document.querySelectorAll('.menu-items li a'); // Seleziona direttamente i link
      this.navigation = document.querySelector('.menu-items'); // Seleziona direttamente i link
      this.logo = document.querySelector('.logo');
      this.body = document.querySelector('body');
      // FINE HEADER

      this.addEventListeners();
    },

    addEventListeners: function () {
      this.menuTrigger.addEventListener('click', this.toggleMenu.bind(this));

      this.menuItems.forEach(link => {
        link.addEventListener('click', this.closeMenu.bind(this));
      });
    },

    toggleMenu: function () {
      const headerHeight = this.header.getBoundingClientRect();
      this.body.classList.add('overflow-y-hidden');

      if (this.menuMobile.classList.contains('opacity-0')) {
        this.navigation.style.paddingTop = `${headerHeight.height}px`;

        setTimeout(() => {
          this.logo.src = "/src/assets/logo-white.svg";
          this.menuMobile.classList.remove('opacity-0', 'invisible');
          this.menuMobile.classList.add('opacity-100', 'visible', 'z-1');
          this.menuTrigger.classList.add('active');
        }, 300);
      } else {
        this.closeMenu();
      }
    },

    closeMenu: function () {
      this.body.classList.remove('overflow-y-hidden');
      setTimeout(() => {
        this.logo.src = "/src/assets/logo.svg";
        this.menuMobile.classList.add('opacity-0');
        this.menuMobile.classList.remove('opacity-100', 'visible', 'z-1');
        this.menuTrigger.classList.remove('active');
      }, 300);
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    site.init();
  });
}
