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
    carouselSwiper: null,
    closeLightBoxButton: null,
    hero:  null,
    headerContainer: null,
    headerSticky: null,
    bandaPreventivo: null,
    //openPreventivo: null,
    //closePreventivo: null,

    init: function () {
      // HEADER
      this.header = document.querySelector('header');
      this.menuTrigger = document.querySelectorAll('.menu-trigger');
      this.menuMobile = document.querySelector('.menu-mobile');
      this.menuItems = document.querySelectorAll('.menu-items li a');
      this.navigation = document.querySelector('.menu-items');
      this.logo = document.querySelectorAll('.logo');
      this.body = document.querySelector('body');
      this.closeLightBoxButton = document.querySelector('#close-lightbox');
      this.headerContainer = document.querySelector('.header-sticky .container');
      this.hero = document.querySelector('.hero')?.offsetHeight || 0;
      this.heroSection = document.querySelector('.hero');
      this.headerSticky = document.querySelector('.header-sticky');
      this.bandaPreventivo = document.querySelector('.banda-preventivo');
      this.btnPreventivo = document.querySelectorAll('.btn-preventivo');
      this.popUp = document.querySelector('#popup');
      this.closePopUp = document.querySelector('#close-popup');
    
      
      // LIGHTBOX
      this.lightbox = document.getElementById("lightbox");

      // CAROUSEL
      this.initSwiperCarousel();
      // Inizializza Swiper una sola volta
      this.initSwiperLightbox();

      this.addEventListeners();
      this.initFaq();
      this.headerScroll();
      this.handleStickyElement();
     // this.openPreventivo();
     // this.closePreventivo();
    },

    /* 
    openPreventivo: function () {
      const btnPreventivo = this.btnPreventivo;
      const popUp = this.popUp;
    
      btnPreventivo.forEach(btn => {
        btn.addEventListener('click', () => { 
          popUp.classList.remove('hidden');
       });
      });
    },

    closePreventivo: function () {
      const btnPreventivo = this.btnPreventivo;
      const popUp = this.popUp;
      const closePopUp = this.closePopUp;
      closePopUp.addEventListener('click', () => {
        popUp.classList.add('hidden');
      });
    },

  */

    headerScroll: function () {
      const headerSticky = this.headerSticky;
      const hero = this.hero;
      let lastScrollTop = window.pageYOffset;
    
      window.addEventListener("scroll", () => {
        let currentScroll = window.pageYOffset;
    
        if (currentScroll > hero) {
          // Solo se abbiamo superato hero
          if (currentScroll > lastScrollTop) {
            // Scrollando in giù -> Nasconde l'header
            headerSticky.classList.add('translate-y-[-300%]', 'opacity-0');
          } else {
            // Scrollando in su -> Mostra l'header
            headerSticky.classList.remove('translate-y-[-300%]', 'opacity-0');
          }
        } else {
          // Se siamo sopra hero, assicuriamoci che l'header sia sempre nascosto
          headerSticky.classList.add('translate-y-[-300%]', 'opacity-0');
        }
    
        lastScrollTop = currentScroll;
      });
    },
    
    


    initFaq: function () {
      const faqToggle = document.querySelectorAll('.faq-item');
      faqToggle.forEach(toggle => { 
        toggle.addEventListener('click', () => {
          const answer = toggle.querySelector('.faq-answer');

          const icon = toggle.querySelector('.faq-icon');

          if(answer.classList.contains('opacity-0')) {
            answer.classList.remove('opacity-0');
            answer.classList.remove('h-0');
            answer.classList.add('mt-3');
          } else {
            answer.classList.add('opacity-0');
            answer.classList.add('h-0');
            answer.classList.remove('mt-3');
          }
          //answer.classList.toggle('visible', 'h-full');
          icon.classList.toggle('rotate-180');
        });
      });
    },



    initSwiperCarousel: function () {
      import('swiper').then(({ default: Swiper }) => {
        import('swiper/modules').then(({ Pagination, Navigation }) => {
          const swiperContainer = document.querySelector('.swiper-carousel');
          const slidesPerView = parseInt(swiperContainer.getAttribute('data-slides-per-view')) || 3;
          const autoplayDelay = parseInt(swiperContainer.getAttribute('data-autoplay-delay')) || 3000;
  
  
          new Swiper('.swiper-carousel', {
            modules: [Pagination, Navigation],
            spaceBetween: 20,
            slidesPerView: window.innerWidth < 768 ? 2 : slidesPerView, // Usa il valore dinamico
            pagination: { el: '.swiper-carousel .swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-carousel .swiper-button-prev', prevEl: '.swiper-carousel.swiper-button-next' },
            autoplay: { delay: autoplayDelay } // Attiva autoplay
          });
        });
      });
    },

    initSwiperLightbox: function () {
      import('swiper').then(({ default: Swiper }) => {
        import('swiper/modules').then(({ Navigation }) => {
          this.lightboxSwiper = new Swiper('.lightbox-slider', {
            modules: [Navigation],
            navigation: { nextEl: '.lightbox-slider .swiper-button-next', prevEl: '.lightbox-slider .swiper-button-prev' },
            loop: false, // Disabilita il loop
            slidesPerView: 1,
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
       // this.menuTrigger.addEventListener('click', this.toggleMenu.bind(this));
        this.menuTrigger.forEach(trigger => {
          trigger.addEventListener('click', this.toggleMenu.bind(this));
        }
        );
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

      this.closeLightBoxButton.addEventListener("click", (e) => {
       
          this.closeLightbox();
       
      });
    },

    toggleMenu: function () {
      const headerHeight = this.header?.getBoundingClientRect();
      const headerContainer = this.headerContainer;
      this.body.classList.add('overflow-y-hidden');

      if (this.menuMobile?.classList.contains('opacity-0')) {
        this.navigation.style.paddingTop = `${headerHeight.height}px`;
        setTimeout(() => {
          this.headerContainer.classList.remove('bg-white', 'p-5');
          this.logo.forEach(logo => {
            logo.src = "/assets/logo-white.svg";
          });
          //this.logo.src = "/src/assets/logo-white.svg";
          this.menuMobile.classList.remove('opacity-0', 'invisible');
          this.menuMobile.classList.add('opacity-100', 'visible', 'z-10');
          //this.menuTrigger.classList.add('active');
          this.menuTrigger.forEach(trigger => {
            trigger.classList.add('active');
          }
          );    
        }, 300);
      } else {
        this.closeMenu();
      }
    },

    closeMenu: function () {
      this.body.classList.remove('overflow-y-hidden');
      const headerContainer = this.headerContainer;

      setTimeout(() => {
        //this.logo.src = "/src/assets/logo.svg";
        this.headerContainer.classList.add('bg-white', 'p-5');
        this.logo.forEach(logo => {
          logo.src = "/assets/logo.svg";
        });
        this.menuMobile.classList.add('opacity-0');
        this.menuMobile.classList.remove('opacity-100', 'visible', 'z-10');
        //this.menuTrigger.classList.remove('active');
        this.menuTrigger.forEach(trigger => {
          trigger.classList.remove('active');
        }
        );   
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
    },

    handleStickyElement: function() {
      const bandaPreventivo = this.bandaPreventivo;
      const elementOriginalOffset = bandaPreventivo.offsetTop;
    
      window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
    
        if (scrollY + window.innerHeight < elementOriginalOffset) {
          // Se il footer è visibile, posiziona l'elemento in basso
          bandaPreventivo.classList.add('fixed', 'bottom-0', 'left-0', 'w-full');
        } else {
          // Se il footer non è visibile, ripristina la posizione originale
          bandaPreventivo.classList.remove('fixed', 'bottom-0', 'left-0', 'w-full');
        }
         
      });

      console.log(elementOriginalOffset);
    },
  };

  document.addEventListener('DOMContentLoaded', function () {
    site.init();
  });
}