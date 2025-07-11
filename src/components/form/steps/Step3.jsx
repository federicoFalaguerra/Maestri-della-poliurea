import { useState } from 'react';

export default function Step3({ onNext, onBack, formData }) {
  const [servizio2, setServizio2] = useState(formData.servizio2 || '');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!servizio2) {
    setError('Fai una scelta per continuare.');
      return;
    }

    setError('');
    onNext({ servizio2 });
  };


  return (
    <>    
    <div className='flex flex-col flex-auto'>
    <div className="space-y-6 bg-white rounded-lg min-h-[300px] flex flex-col flex-auto">
      <div className="flex flex-col gap-4">
        <h2 className='font-semibold text-gray-800 text-[20px] text-center'>Cosa Vorresti Impermabilizzare?</h2>
        {['Copertura/Tetto', 'Pavimenti industriali', 'Muro esterno', 'Vasche o cisterne', 'Altro'].map((option) => (
          <label key={option} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-300 font-semibold ${
            servizio2 === option ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-50 border-2 border-gray-200'
          } hover:bg-green-50`}>
            <input
              type="radio"
              name="servizio2"
              value={option}
              checked={servizio2 === option}
              onChange={() => {setServizio2(option); setError('');}}
              className='w-5 h-5 accent-green-600'
            />
            <span className='text-[16px] text-gray-700'>{option.charAt(0).toUpperCase() + option.slice(1)}</span>
          </label>
        ))}
        {error && <p className="text-red-600 text-sm mt-1 font-display">{error}</p>}
      </div>
      </div>  

      <div className=" flex justify-between  py-6">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-display font-semibold hover:cursor-pointer"
        >
          Indietro
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors font-display font-semibold hover:cursor-pointer"
        >
          Avanti
        </button>
      </div>
    </div>
  </>

  );
}
