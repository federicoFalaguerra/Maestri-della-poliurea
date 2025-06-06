import { useState } from 'react';

export default function Step2({ onNext, onBack, formData }) {
  const [servizio1, setServizio1] = useState(formData.servizio1 || '');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!servizio1) {
    setError('Fai una scelta per continuare.');
      return;
    }

    setError('');
    onNext({ servizio1 });
  };


  return (
    <div className="space-y-6 bg-white mx-auto h-[450px] flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <h2 className='text-2xl font-semibold text-gray-800'>Che tipo di immobile è?</h2>
        {['Capannone', 'Edificio pubblico', 'Magazzino/Deposito', 'Altro edificio industriale'].map((option) => (
          <label key={option} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-300 font-semibold ${
            servizio1 === option ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-50 border-2 border-gray-200'
          } hover:bg-green-50`}>
            <input
              type="radio"
              name="servizio1"
              value={option}
              checked={servizio1 === option}
              onChange={() => {setServizio1(option); setError('');}}
              className='w-5 h-5 accent-green-600'
            />
            <span className='text-[16px] text-gray-700'>{option.charAt(0).toUpperCase() + option.slice(1)}</span>
          </label>
        ))}
        {error && <p className="text-red-600 text-sm mt-1 font-display">{error}</p>}
      </div>


      <div className=" flex justify-between">
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
  );
}
