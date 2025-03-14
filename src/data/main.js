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
    lightbox: null,
    lightboxSwiper: null,
    currentSlideIndex: 0, // Memorizza l'indice corrente

    init: function () {
      // HEADER
      this.header = document.querySelector('header');
      this.menuTrigger = document.querySelector('.menu-trigger');
      this.menuMobile = document.querySelector('.menu-mobile');
      this.menuItems = document.querySelectorAll('.menu-items li a');
      this.navigation = document.querySelector('.menu-items');
      this.logo = document.querySelector('.logo');
      this.body = document.querySelector('body');
      
      // LIGHTBOX
      this.lightbox = document.getElementById("lightbox");

      // Inizializza Swiper una sola volta
      this.initSwiper();

      this.addEventListeners();
    },

    initSwiper: function () {
      import('swiper').then(({ default: Swiper }) => {
        import('swiper/modules').then(({ Navigation }) => {
          this.lightboxSwiper = new Swiper('.lightbox-slider', {
            modules: [Navigation],
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            loop: false, // Disabilita il loop
            on: {
              // Aggiorna l'indice corrente ogni volta che cambia la slide
              slideChange: () => {
                this.currentSlideIndex = this.lightboxSwiper.activeIndex;
                console.log("Slide cambiata. Indice corrente:", this.currentSlideIndex);
              },
            },
          });

          console.log("Swiper inizializzato correttamente.");
        });
      });
    },

    addEventListeners: function () {
      if (this.menuTrigger) {
        this.menuTrigger.addEventListener('click', this.toggleMenu.bind(this));
      }

      if (this.menuItems.length > 0) {
        this.menuItems.forEach(link => {
          link.addEventListener('click', this.closeMenu.bind(this));
        });
      }

      // Lightbox: Aggiunge event listener a tutte le immagini della galleria
      document.querySelectorAll(".gallery img").forEach((img, index) => {
        img.addEventListener("click", () => {
          this.openLightbox(index);
        });
      });

      // Chiudi il lightbox quando si clicca fuori
      this.lightbox?.addEventListener("click", (e) => {
        if (e.target === this.lightbox) {
          this.closeLightbox();
        }
      });
    },

    toggleMenu: function () {
      const headerHeight = this.header?.getBoundingClientRect();
      this.body.classList.add('overflow-y-hidden');

      if (this.menuMobile?.classList.contains('opacity-0')) {
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
    },

    // LIGHTBOX FUNCTIONS
    openLightbox: function (index) {
      console.log("Opening lightbox with index:", index);  // Debugging
      if (!this.lightbox) return;
      this.lightbox.classList.remove("hidden");

      // Imposta la slide corretta
      if (this.lightboxSwiper) {
        this.lightboxSwiper.slideTo(index, 0, false); // Vai alla slide specificata
        this.currentSlideIndex = index; // Aggiorna l'indice corrente
      }
    },

    closeLightbox: function () {
      console.log("Closing lightbox");
      if (!this.lightbox) return;

      // Chiudi la lightbox senza resettare Swiper
      this.lightbox.classList.add("hidden");
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    site.init();
  });
}