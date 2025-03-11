import AOS from 'aos';
import 'aos/dist/aos.css';

const isBrowser = typeof window !== 'undefined';
 if(isBrowser) {
    AOS.init({
        duration: 1000, // Durata animazione
        once: true, // L'animazione parte solo una volta
      });
 }

