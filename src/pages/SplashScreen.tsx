import React, { useState, useEffect } from 'react';

const SplashScreen: React.FC = () => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    // Animation timeline
    const timers = [
      // Step 1: Dataxx logo grows at center (start immediately)
      setTimeout(() => setAnimationStep(1), 200),
      
      // Step 2: Logo slides left and club logo appears (after 1.5 seconds)
      setTimeout(() => setAnimationStep(2), 1500),
      
      // Step 3: X appears with rotation (after 1.7 seconds - earlier start)
      setTimeout(() => setAnimationStep(3), 1700),
    ];

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="dataxx-background" style={{ zIndex: 1000 }}>
      <div className="dataxx-content flex items-center justify-center">
        {/* Animation Container - Full Screen Positioned */}
        <div className="absolute inset-0 flex items-center justify-center">
          
          {/* Step 1: Dataxx Logo at Center */}
          <div 
            className="absolute transition-all duration-1000 ease-out"
            style={{
              left: '50%',
              top: '50%',
              transform: animationStep >= 2 
                ? 'translate(-50%, -50%) translateX(-15vw)' 
                : 'translate(-50%, -50%)',
            }}
          >
            <div
              className={`transition-all duration-1000 ease-out ${
                animationStep === 0 ? 'scale-0' : 'scale-100'
              }`}
              style={{
                transformOrigin: 'center center',
              }}
            >
              <img 
                src="/dataxx_logo.png" 
                alt="Dataxx Logo" 
                className="h-[20vh] w-auto block"
              />
            </div>
          </div>

          {/* Step 3: X Separator with Smooth Rotation Animation */}
          <div 
            className={`absolute transition-all duration-[1200ms] ease-in-out ${
              animationStep >= 3 ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              fontFamily: 'Space Grotesk',
              transformOrigin: 'center center',
              fontWeight: '200',
              fontSize: '8rem',
              color: '#9ca3af',
              left: '50%',
              top: '50%',
              transform: animationStep >= 3 
                ? 'translate(-50%, -50%) rotate(180deg) scale(1)' 
                : 'translate(-50%, -50%) rotate(0deg) scale(0.5)',
              transition: 'all 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            ×
          </div>

          {/* Step 2: Home Club Logo (LOSC) - Mirror Position */}
          <div 
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%) translateX(15vw)',
            }}
          >
            <div
              className={`transition-all duration-1000 ease-out ${
                animationStep >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`}
              style={{
                transformOrigin: 'center center',
              }}
            >
              <img 
                src="/home_club_logo.png" 
                alt="LOSC Logo" 
                className="h-[20vh] w-auto block"
              />
            </div>
          </div>

        </div>
        
        {/* Copyright Notice at Bottom Center */}
        <div 
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'Space Grotesk',
            fontSize: '0.875rem',
            fontWeight: '200',
            color: '#9ca3af',
            letterSpacing: '0.05em',
            whiteSpace: 'nowrap',
            zIndex: 1001
          }}
        >
          © 2025 DATAXX SAS - TOUS DROITS RÉSERVÉS
        </div>
      </div>
    </div>
  );
};

export default SplashScreen; 