import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoutonPrimaire, BoutonSecondaire, ChampSaisie, OverlayContact } from '../components/ReusableComponents';
import { mockData } from '../data/mock_data';

const SignIn: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showContactOverlay, setShowContactOverlay] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pour l'instant, on redirige directement vers la page d'accueil
    // Plus tard, on ajoutera la logique d'authentification
    navigate('/home');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 font-sans relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/background_picture.png)'
      }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Bienvenue sur<br />
            Dataxx <span className="text-blue-600">×</span> <span className="text-blue-600">LOSC</span>
          </h1>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            {/* Champ Email */}
            <ChampSaisie
              label="Adresse e-mail"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Saisissez votre e-mail"
              icon={
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              }
            />

            {/* Champ Mot de passe */}
            <ChampSaisie
              label="Mot de passe"
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Saisissez votre mot de passe"
              icon={
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
              rightIcon={
                showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )
              }
              onRightIconClick={() => setShowPassword(!showPassword)}
            />

            {/* Bouton Principal */}
            <BoutonPrimaire
              type="submit"
              disabled={password.length === 0}
              className="mb-3"
            >
              Se connecter
            </BoutonPrimaire>

            {/* Bouton Secondaire */}
            <BoutonSecondaire 
              type="button"
              onClick={() => setShowContactOverlay(true)}
            >
              Clé oubliée ? Contactez votre administrateur
            </BoutonSecondaire>
          </form>
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

      {/* Overlay de contact administrateur */}
      <OverlayContact
        isOpen={showContactOverlay}
        onClose={() => setShowContactOverlay(false)}
        telephone={mockData.supportAdministrateur.telephone}
        email={mockData.supportAdministrateur.email}
        nom={mockData.supportAdministrateur.nom}
      />
    </div>
  );
};

export default SignIn; 