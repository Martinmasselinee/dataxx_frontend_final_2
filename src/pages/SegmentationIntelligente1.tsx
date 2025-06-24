import React from 'react';
import { ExternalContextCard, PageBackground, UserMenuWrapper, AppHeader, Copyright } from '../components/ReusableComponents';

const SegmentationIntelligente1 = () => {
  const handleEvenementsClick = () => {
    // This will be connected to the actual events view later
    alert('Affichage des événements compétiteurs à venir...');
  };

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
            <span className="text-sm font-medium text-blue-600">Contexte externe</span>
            <span className="text-sm font-medium text-gray-500">Contexte sportif</span>
            <span className="text-sm font-medium text-gray-500">Segments intelligents</span>
          </div>
        </div>

        <div className="flex-1 min-h-0">
          <div className="mt-6">
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

      <div className="mt-auto">
        <Copyright />
      </div>
    </PageBackground>
  );
};

export default SegmentationIntelligente1; 