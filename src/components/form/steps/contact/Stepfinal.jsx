import React, { useState, useEffect } from 'react';


export default function StepFinal({ formData, onSubmit, onBack, setIsSubmitted }) {
  const [localData, setLocalData] = useState({
    nome: '',
    email: '',
    cap: '',
    phone: '',
    // Campo honeypot - i bot lo compileranno, gli umani no
    website: '',
    // Aggiungiamo l'URL della pagina
    pageUrl: ''
  });

  const [errorMsg, setErrorMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setLocalData(prev => ({
      ...prev,
      ...formData,
    }));
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ Blocca il reload
    onSubmit(localData); // ✅ Manda i dati al padre (Form.jsx)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData(prev => ({ ...prev, [name]: value }));
  };

  const handleClick = async () => {
    setErrorMsg(null);

    if (!localData.nome || !localData.cap || !localData.email || !localData.phone) {
      setErrorMsg("Per favore, compila tutti i campi.");
      return;
    }

    // Verifica honeypot - se il campo website è stato compilato, è probabilmente un bot
    if (localData.website) {
      // Fingiamo che l'invio sia andato a buon fine ma in realtà non inviamo nulla
      console.log("Honeypot attivato, probabile bot");
      if (onSubmit && typeof onSubmit === 'function') {
        onSubmit(localData);
      }
      if (setIsSubmitted && typeof setIsSubmitted === 'function') {
        setIsSubmitted(true);
      }
      return;
    }

    setIsSubmitting(true);

    try {
     
      const [emailResponse, zapierResponse] = await Promise.allSettled([
        // Invio al tuo endpoint per l'email
        fetch("https://maestridellapoliurea.it/api/send.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(localData)
        }),
        fetch("https://maestridellapoliurea.it/api/proxy-zapier.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(localData)
        }),
      ]);
      // Gestisci la risposta dell'endpoint email
      let emailSuccess = false;
      if (emailResponse.status === 'fulfilled') {
        if (emailResponse.value.ok) {
          const emailResult = await emailResponse.value.json();
          console.log("Risposta da send.php:", emailResult);
          emailSuccess = emailResult.success;
        }
      } else {
        console.error("Errore invio email:", emailResponse.reason);
      }

      // Gestisci la risposta del proxy Zapier
      let zapierSuccess = false;
      if (zapierResponse.status === 'fulfilled') {
        if (zapierResponse.value.ok) {
          const zapierResult = await zapierResponse.value.json();
          console.log("Risposta da Zapier:", zapierResult);
          zapierSuccess = zapierResult.success;
        } else {
          const errorResult = await zapierResponse.value.json();
          console.error("Errore proxy Zapier:", errorResult);
        }
      } else {
        console.error("Errore invio Zapier:", zapierResponse.reason);
      }
     
      // Se almeno uno dei due invii è andato a buon fine, considera l'operazione riuscita
      if (emailSuccess || zapierSuccess) {
        // Notifica il genitore che l'invio è avvenuto con successo
        if (onSubmit && typeof onSubmit === 'function') {
          onSubmit(localData);
        }
        
        // Aggiorna lo stato nel componente genitore
        if (setIsSubmitted && typeof setIsSubmitted === 'function') {
          setIsSubmitted(true);
        }

        // Log per debugging
        if (!emailSuccess) {
          console.warn("Invio email fallito,");
        }
        if (!zapierSuccess) {
          console.warn("Invio Zapier fallito, ma email è riuscita");
        }
      } else {
        setErrorMsg("Errore nell'invio del modulo, riprova più tardi.");
      }

    } catch (error) {
      setErrorMsg("Errore di rete, controlla la connessione.");
      console.error("Errore generale:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className='space-y-6 bg-white mx-auto h-[450px] flex flex-col justify-between'>
      <div>
        <h2 className='font-semibold text-gray-800 text-[20px] text-center'>Inserisci i tuoi dati per il preventivo</h2>
        <div className='mt-4'>
          <input name="cap" value={localData.cap} onChange={handleChange} className='border-2 border-gray-200 rounded-lg p-2 bg-gray-50 hover:bg-gray-50 transition-colors duration-300 w-full font-display font-semibold' placeholder='CAP' required  />
        </div>
        <div className='mt-4'>
          <input name="nome" value={localData.nome} onChange={handleChange} className='border-2 border-gray-200 rounded-lg p-2 bg-gray-50 hover:bg-gray-50 transition-colors duration-300 w-full font-display font-semibold' placeholder='Nome e Cognome' required  />
        </div>
        <div className='mt-4'>
          <input name="email" type="email" value={localData.email} onChange={handleChange} required className='border-2 border-gray-200 rounded-lg p-2 bg-gray-50 hover:bg-gray-50 transition-colors duration-300 w-full font-display font-semibold' placeholder='Email' />
        </div>
        <div className='mt-4'>
          <input name="phone" type="tel" value={localData.phone} onChange={handleChange} required className='border-2 border-gray-200 rounded-lg p-2 bg-gray-50 hover:bg-gray-50 transition-colors duration-300 w-full font-display font-semibold' placeholder='Telefono' />
        </div>
        <div className='mt-4 flex items-end gap-2 w-full'>
          <input
            type="checkbox"
            id="privacyCheckbox"
            name="privacyAccepted"
            defaultChecked
            required
            className="mt-1 border-2 border-gray-200 rounded-lg w-5 h-5 accent-blue-600"
          />
          <label className="text-sm font-display font-semibold text-gray-700 w-full flex" htmlFor="privacyCheckbox">
            Accetto&nbsp;<span className='hidden md:block'>Termini e Condizioni della&nbsp;</span> <a href="#" target="_blank" className="text-blue-600 underline" id='privacyAccepted'> Privacy Policy</a>.
          </label>
        </div>
      
      </div>
      
      {/* Campo honeypot nascosto con CSS */}
      <div style={{ position: 'absolute', left: '-5000px', ariaHidden: 'true' }}>
        <label>Website (non compilare questo campo):</label>
        <input 
          name="website" 
          tabIndex="-1" 
          value={localData.website} 
          onChange={handleChange} 
          autoComplete="off" 
        />
      </div>

      {errorMsg && (
        <div style={{ color: 'red', marginTop: '1rem' }}>
          {errorMsg}
        </div>
      )}

      <div className='flex justify-between'>
        <button type="button" onClick={onBack} disabled={isSubmitting} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-display font-semibold hover:cursor-pointer">Indietro</button>
        <button type="button" onClick={handleClick} disabled={isSubmitting}  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors font-display font-semibold hover:cursor-pointer">
          {isSubmitting ? "Invio in corso..." : "Invia"}
        </button>
      </div>
    </div>
    </form>
  );
}