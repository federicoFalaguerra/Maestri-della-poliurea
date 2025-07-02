import { useState } from 'react';

export default function Step5({ onNext, onBack, formData }) {
  const [dettagli, setDettagli] = useState(formData.Dettagli || '');

  const handleNext = () => {
    onNext({ dettagli });
  };


  return (
    <>    
    <div className='flex flex-col flex-auto'>
    <div className="space-y-6 bg-white rounded-lg min-h-[300px] flex flex-col flex-auto">
      <div className="flex flex-col gap-4">
        <h2 className='font-semibold text-gray-800 text-[20px] text-center'>Vuoi scriverci maggiori dettagli? (facoltativo)</h2>
        <div className="border-2 border-gray-200 rounded-lg p-3 bg-gray-50 hover:bg-gray-50 transition-colors duration-300">
          <textarea
            name="dettagli"
            value={dettagli}
            onChange={(e) => setDettagli(e.target.value)}
            rows="5"
            placeholder="Scrivi qui i dettagli (facoltativo)"
            className="w-full bg-transparent outline-none resize-none text-gray-700 font-display placeholder-gray-400"
          />
        </div>
      </div>
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
    </>

  );
}
