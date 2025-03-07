const isBrowser = typeof window !== 'undefined';

// Se siamo nel browser, esegui il codice normalmente
if (isBrowser) {
  const site = {
    init: function() {
      this.toggleMenu();
    },

    toggleMenu: function(trigger, menu) {
      const header = document.querySelector('header');
      const menuTrigger = document.querySelector('.menu-trigger');
      const menuMobile = document.querySelector('.menu-mobile');
      const menuItems = document.querySelector('.menu-items');
      const logo = document.querySelector('.logo');

      const headerDimension = header.getBoundingClientRect();

      menuTrigger.addEventListener('click', () => {
        if (menuMobile.classList.contains('opacity-0')) {
            menuTrigger.classList.add('active');
            menuItems.style.paddingTop = `${headerDimension.height}px`
            setTimeout(() => {
                logo.src = "/src/assets/logo-white.svg";
                menuMobile.classList.remove('opacity-0', 'invisible');
                menuMobile.classList.add('opacity-100', 'visible');
            }, 300);
        } else {
            menuTrigger.classList.remove('active');
            setTimeout(() => {
                logo.src = "/src/assets/logo.svg";
                menuMobile.classList.add('opacity-0');
                menuMobile.classList.remove('opacity-100', 'visible');
            }, 300);
        }
      });
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    site.init();
  });
}