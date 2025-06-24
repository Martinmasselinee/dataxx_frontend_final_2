import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppHeader,
  Copyright,
  PageBackground,
  UserMenuWrapper
} from '../components/ReusableComponents';

const CiblageTransition: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const match = location.state?.match;

  useEffect(() => {
    // Navigate to the next page after 5 seconds
    const timer = setTimeout(() => {
      navigate('/segmentation-intelligente-1', { state: { match } });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, match]);

  return (
    <PageBackground imagePath="/background_picture.png">
      <UserMenuWrapper>
        <AppHeader />
      </UserMenuWrapper>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Notice/Info Box at the top */}
        <div className="w-[90%] mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm text-center">
              Préparation de l'analyse intelligente des données...
            </p>
          </div>
        </div>

        {/* Centered Loading Animation */}
        <div className="flex flex-col items-center justify-center flex-1 -mt-20">
          <div className="relative">
            {/* Scanning circle */}
            <div className="absolute -inset-8 border-2 border-blue-400/30 rounded-full animate-scan"></div>
            {/* Outer circle */}
            <div className="w-24 h-24 border-4 border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-indigo-500 rounded-full animate-spin"></div>
            {/* Inner circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-t-pink-500 border-r-indigo-500 border-b-blue-500 border-l-purple-500 rounded-full animate-spin-reverse"></div>
            {/* Center logo */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8">
              <img 
                src="/dataxx_logo.png" 
                alt="Dataxx Logo" 
                className="w-full h-full object-contain animate-pulse"
              />
            </div>
          </div>

          {/* Match Information */}
          <div className="mt-12 text-center">
            <p className="text-xl font-semibold text-slate-800">
              {match?.domicile} vs {match?.exterieur}
            </p>
            <p className="mt-2 text-slate-600">
              {match?.date} à {match?.heure}
            </p>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin-reverse {
            from {
              transform: translate(-50%, -50%) rotate(360deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(0deg);
            }
          }
          .animate-spin-reverse {
            animation: spin-reverse 3s linear infinite;
          }
          @keyframes scan {
            0% {
              transform: scale(0.8);
              opacity: 0;
            }
            50% {
              opacity: 0.5;
            }
            100% {
              transform: scale(1.2);
              opacity: 0;
            }
          }
          .animate-scan {
            animation: scan 2s ease-out infinite;
          }
        `}
      </style>

      <div className="mt-auto">
        <Copyright />
      </div>
    </PageBackground>
  );
};

export default CiblageTransition; 