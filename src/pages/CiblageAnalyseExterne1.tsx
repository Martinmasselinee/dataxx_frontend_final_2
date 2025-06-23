import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppHeader,
  Copyright,
  PageBackground,
  BoutonPrimaire,
  UserMenuWrapper,
  StickyButtonContainer,
  ProgressSteps
} from '../components/ReusableComponents';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const CiblageAnalyseExterne1: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const match = location.state?.match;

  const handleRetourClick = () => {
    // Navigate back to match details with the match ID
    navigate(`/match-details/${match?.id}`);
  };

  const handleContinuerClick = () => {
    // Will be implemented in next step
    console.log('Continuer clicked');
  };

  const steps = [
    "Analyse du contexte externe",
    "Analyse du contexte sportif",
    "Analyse des ventes",
    "Segments intelligents"
  ];

  const currentStep = 1;

  return (
    <PageBackground imagePath="/background_picture.png">
      <UserMenuWrapper>
        <AppHeader />
      </UserMenuWrapper>

      {/* Contenu principal */}
      <div className="px-8 pb-32 flex-1 flex flex-col items-center">
        <div className="w-[90%] mt-4">
          {/* Title and Progress Steps in a more compact layout */}
          <div className="space-y-4">
            <ProgressSteps steps={steps} currentStep={currentStep} />
          </div>
        </div>
      </div>

      {/* Boutons de navigation */}
      <StickyButtonContainer>
        <BoutonPrimaire
          onClick={handleRetourClick}
          className="!bg-white !text-black border border-gray-200 hover:!bg-gray-50 !px-6 !w-auto"
        >
          ← Retour
        </BoutonPrimaire>
        <BoutonPrimaire
          onClick={handleContinuerClick}
          className="!bg-black hover:!bg-slate-800 !px-6 !w-auto flex items-center gap-2"
        >
          <ArrowPathIcon className="h-5 w-5" />
          Continuer l'analyse →
        </BoutonPrimaire>
      </StickyButtonContainer>

      <div className="mt-auto">
        <Copyright />
      </div>
    </PageBackground>
  );
};

export default CiblageAnalyseExterne1; 