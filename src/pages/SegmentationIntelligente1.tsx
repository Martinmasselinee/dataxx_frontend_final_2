import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ExternalContextCard, PageBackground, UserMenuWrapper, AppHeader, Copyright, TypewriterText, StickyButtonContainer, BoutonPrimaire } from '../components/ReusableComponents';

const SegmentationIntelligente1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const match = location.state?.match;
  
  useEffect(() => {
    // If no match data, redirect to home
    if (!match?.id) {
      navigate('/home');
    }
  }, [match, navigate]);

  const handleEvenementsClick = () => {
    // This will be connected to the actual events view later
    alert('Affichage des événements compétiteurs à venir...');
  };

  const handleRetourClick = () => {
    // Always navigate to home
    navigate('/home');
  };

  const handleSuivantClick = () => {
    // Navigate to the next step (Contexte sportif)
    // This will be implemented in the next phase
    alert('Navigation vers Contexte sportif...');
  };

  const aiAnalysis = "Le match se déroule dans un contexte favorable avec des conditions météorologiques clémentes. La présence d'un jour férié pendant le match et les vacances scolaires suggèrent une disponibilité accrue du public cible. Cependant, la concurrence de 2 autres événements dans la région nécessite une stratégie de communication différenciée.";

  return (
    <PageBackground imagePath="/background_picture.png">
      <UserMenuWrapper>
        <AppHeader />
      </UserMenuWrapper>
      
      <div className="max-w-7xl mx-auto px-4 w-[90%] flex flex-col min-h-0">
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <div className="w-1/3 h-1 bg-blue-500"></div>
            <div className="w-1/3 h-1 bg-gray-200"></div>
            <div className="w-1/3 h-1 bg-gray-200"></div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium mr-2">
                1
              </div>
              <span className="text-sm font-medium text-blue-600">Contexte externe</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium mr-2">
                2
              </div>
              <span className="text-sm font-medium text-gray-500">Contexte sportif</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium mr-2">
                3
              </div>
              <span className="text-sm font-medium text-gray-500">Segments intelligents</span>
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0">
          <div className="mt-6">
            <div className="bg-blue-50 rounded-lg p-6 mb-6 border border-blue-200">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-blue-700 font-medium mb-2">Analyse du contexte externe par l'IA Dataxx</h3>
                  <TypewriterText 
                    text={aiAnalysis}
                    className="text-sm text-blue-700 block"
                  />
                </div>
              </div>
            </div>
            <ExternalContextCard
              jourFerieAvant={false}
              jourFeriePendant={true}
              jourFerieApres={false}
              vacancesScolaires={true}
              ecoleLeLendemain={false}
              evenementsCompetiteurs={2}
              onEvenementsClick={handleEvenementsClick}
            />
          </div>
          <div className="h-24"></div>
        </div>
      </div>

      {/* Add the sticky button container before the Copyright */}
      <StickyButtonContainer>
        <BoutonPrimaire
          onClick={handleRetourClick}
          className="!bg-white !text-black border border-gray-200 hover:!bg-gray-50 !px-6 !w-auto"
        >
          ← Retour accueil
        </BoutonPrimaire>
        <BoutonPrimaire
          onClick={handleSuivantClick}
          className="!bg-black hover:!bg-slate-800 !px-6 !w-auto"
        >
          Continuer l'analyse →
        </BoutonPrimaire>
      </StickyButtonContainer>

      <div className="mt-auto">
        <Copyright />
      </div>
    </PageBackground>
  );
};

export default SegmentationIntelligente1; 