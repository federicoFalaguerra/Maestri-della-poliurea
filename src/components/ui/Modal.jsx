// File: src/components/ui/Modal.jsx
import React, { useEffect } from 'react';
import LogoUrl from '../../assets/logo.svg?url';

/**
 * Componente Modal riutilizzabile
 * @param {boolean} isOpen - Indica se il modal è aperto
 * @param {function} onClose - Funzione da chiamare per chiudere il modal
 * @param {ReactNode} children - Contenuto del modal
 * @param {string} className - Classi CSS aggiuntive per il contenitore principale
 */
const Modal = ({ isOpen, onClose, children, className = '' }) => {
  // Previene lo scroll del body quando il modal è aperto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
    
    // Cleanup quando il componente viene smontato
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [isOpen]);

  // Gestisce la chiusura del modal con il tasto ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Se il modal non è aperto, non renderizzare nulla
  if (!isOpen) return null;
  
  // Gestisce i click sul backdrop per chiudere il modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-1000 bg-[white] bg-opacity-60 ${className}`}
      onClick={handleBackdropClick}
    >
      <div className='px-6 md:my-7 my-4 container'><img src={LogoUrl} alt="Logo" className="w-4/12 sm:w-3/12 md:w-3/12 lg:w-[200px] mx-auto lg:mx-0" /></div>
      <div className='flex justify-center'>
        <div className="bg-white border-[#e3e5e8] border-solid rounded-[8px] border-[1px] w-full max-w-[500px] p-6 relative min-h-[70vh] flex flex-col">
          <div className='flex items-center'>
            <div className='w-[48px]'></div>
            <div className='w-auto flex-auto text-center'><h3 className='font-semibold'>Richiedi Preventivo Gratuito</h3></div>
            <div className='w-[48px]'>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 p-[4px] hover:cursor-pointer hover:bg-[#f0f1f2] rounded-[100%]"
                aria-label="Chiudi"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;