import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppHeader,
  Copyright,
  PageBackground,
  BoutonPrimaire,
  UserMenuWrapper,
  StickyButtonContainer,
  ProgressSteps,
  Carte3D
} from '../components/ReusableComponents';
import { 
  ArrowPathIcon, 
  CalendarIcon, 
  MapPinIcon,
  SunIcon,
  CloudIcon,
  CloudArrowDownIcon
} from '@heroicons/react/24/outline';

// Custom weather icon component
const WeatherIcon: React.FC<{ type: 'sun' | 'cloud' | 'rain' | 'snow' | 'wind' }> = ({ type }) => {
  const iconClass = "w-6 h-6";
  switch (type) {
    case 'sun':
      return <SunIcon className={iconClass} />;
    case 'cloud':
      return <CloudIcon className={iconClass} />;
    case 'rain':
      return <CloudArrowDownIcon className={iconClass} />;
    case 'snow':
      return <CloudIcon className={`${iconClass} animate-bounce`} />;
    case 'wind':
      return <CloudIcon className={`${iconClass} animate-pulse`} />;
    default:
      return <SunIcon className={iconClass} />;
  }
};

const CiblageAnalyseExterne1: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const match = location.state?.match || {
    date: '2025-06-29',
    heure: '21h00'
  };

  // Weather mock data (to be replaced with real API data)
  const weather = {
    temperature: 22,
    condition: 'sun' as const,
    precipitation: 0
  };

  // Debug log
  console.log('Match data received:', match);

  // Format the date and time in French style
  const formatDateHeure = (dateStr: string, heure: string) => {
    try {
      // Handle different possible date formats
      let dateObj;
      if (dateStr.includes('-')) {
        // If date is in YYYY-MM-DD format
        const [year, month, day] = dateStr.split('-').map(num => parseInt(num, 10));
        dateObj = new Date(year, month - 1, day);
      } else if (dateStr.includes('/')) {
        // If date is in DD/MM/YYYY format
        const [day, month, year] = dateStr.split('/').map(num => parseInt(num, 10));
        dateObj = new Date(year, month - 1, day);
      } else {
        throw new Error('Format de date non reconnu');
      }

      // Verify if date is valid
      if (isNaN(dateObj.getTime())) {
        throw new Error('Date invalide');
      }

      const formatter = new Intl.DateTimeFormat('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });

      const formattedDate = formatter.format(dateObj);
      // Capitalize first letter
      const finalDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
      return `${finalDate} à ${heure}`;
    } catch (error) {
      console.error('Erreur de formatage de la date:', error);
      return 'Date à définir';
    }
  };

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

          {/* Grille de cartes */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Carte3D
              title="Stade"
              value="Decathlon Arena - Stade Pierre Mauroy"
              subtitle="Villeneuve-d'Ascq"
              icon={<MapPinIcon className="w-6 h-6" />}
              borderColor="border-indigo-500"
            />
            <Carte3D
              title="Date et heure"
              value={formatDateHeure(match.date, match.heure)}
              icon={<CalendarIcon className="w-6 h-6" />}
              borderColor="border-orange-500"
            />
            <Carte3D
              title="Prédictions météo"
              value={`${weather.temperature}°C`}
              subtitle={`${weather.precipitation} mm de précipitations`}
              icon={<WeatherIcon type={weather.condition} />}
              borderColor="border-sky-500"
            />
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