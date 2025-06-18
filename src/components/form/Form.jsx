import React, { useState } from 'react';
import Step1 from './steps/Step1.jsx';
import Step2 from './steps/Step2.jsx';
import Step3 from './steps/Step3.jsx';
import Step4 from './steps/Step4.jsx';
import Step5 from './steps/Step5.jsx';
import Step6 from './steps/Step6.jsx';





import StepFinal from './steps/contact/Stepfinal.jsx';

export default function Form() {
  const [stepIndex, setStepIndex] = useState(0);
  const [categoria, setCategoria] = useState('');
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const stepMap = {
    impermeabilizzazione: [Step2, Step3, Step4, Step5, Step6],
   // 'tenda-veranda': [Stepveranda2, Stepveranda3, Stepveranda4, Stepveranda5],
   // tende: [Steptende2],
    // altre categorie...
  };

  const currentCategorySteps = stepMap[categoria] || [];
  const totalSteps = 1 + currentCategorySteps.length + 1; // Step1 + categoria + StepFinal
  const currentStepNumber = stepIndex + 1;
  const progressPercent = Math.round((currentStepNumber / totalSteps) * 100);

  const goNext = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStepIndex(prev => prev + 1);
  };

  const goBack = () => setStepIndex(prev => prev - 1);

  const handleFinalSubmit = (data) => {
    const finalData = { ...formData, ...data };
    console.log("Dati finali raccolti:", finalData);
    setIsSubmitted(true);
  };

  const renderStep = () => {
    if (isSubmitted) {
      return (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600">Grazie per aver inviato il modulo!</h2>
          <p className="mt-4">Ti ricontatteremo al più presto.</p>
        </div>
      );
    }

    return (
      <>
        {stepIndex === 0 && (
          <Step1
            onNext={(data) => {
              setCategoria(data.servizio);
              goNext(data);
            }}
            formData={formData}
          />
        )}

        {stepIndex > 0 && stepIndex <= currentCategorySteps.length && (
          (() => {
            const StepComponent = currentCategorySteps[stepIndex - 1];
            return StepComponent ? (
              <StepComponent
                onNext={goNext}
                onBack={goBack}
                formData={formData}
              />
            ) : null;
          })()
        )}

        {stepIndex === currentCategorySteps.length + 1 && (
          <StepFinal
            formData={formData}
            onBack={goBack}
            onSubmit={(data) => handleFinalSubmit(data)} 
          />
        )}
      </>
    );
  };

  return (
    <div className="max-w-xl mx-auto py-6 bg-white rounded-lg space-y-6">
      {!isSubmitted  && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      )}

      {renderStep()}
    </div>
  );
}
