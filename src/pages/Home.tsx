import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BoutonPrimaire, 
  BadgeStatut,
  AppHeader,
  TeamLogoWithName,
  MatchScore,
  SalesDisplay,
  Copyright,
  PageBackground,
  DataTable,
  OverlayContact
} from '../components/ReusableComponents';
import { QuestionMarkCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { mockData } from '../data/mock_data';

interface AppHeaderWithClassName extends React.ComponentProps<typeof AppHeader> {
  className?: string;
}

// Composant pour le menu utilisateur
const UserMenuWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContactOverlay, setShowContactOverlay] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && triggerRef.current && 
          !menuRef.current.contains(event.target as Node) && 
          !triggerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuItemClick = (action: string) => {
    setIsOpen(false);
    if (action === 'aide') {
      setShowContactOverlay(true);
    } else if (action === 'deconnexion') {
      navigate('/', { replace: true });
    }
  };

  const handleLogoClick = () => {
    navigate('/home');
  };

  // Override the circle's background color when menu is open
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement<AppHeaderWithClassName>(child)) {
      return React.cloneElement(child, {
        className: `${isOpen ? '!bg-blue-700' : ''} transition-colors duration-200`
      });
    }
    return child;
  });

  return (
    <div className="relative" ref={triggerRef}>
      <AppHeader 
        circleClassName={`${isOpen ? 'bg-gray-100 !border-gray-400' : ''} transition-colors duration-200`}
        onSettingsClick={() => setIsOpen(!isOpen)}
        onLogoClick={handleLogoClick}
      />
      
      {isOpen && (
        <div 
          ref={menuRef}
          className="absolute right-8 -mt-3 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50"
        >
          <div className="py-1">
            <button
              onClick={() => handleMenuItemClick('aide')}
              className="flex items-center w-full px-4 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              <QuestionMarkCircleIcon className="h-5 w-5 mr-2 text-slate-500" />
              Aide
            </button>
            <button
              onClick={() => handleMenuItemClick('deconnexion')}
              className="flex items-center w-full px-4 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 text-slate-500" />
              Déconnexion
            </button>
          </div>
        </div>
      )}

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

const Home: React.FC = () => {
  // Générer les matchs à partir des templates
  const generateMatches = useMemo(() => {
    const matches = [];
    
    // Ajouter 3 matchs à venir
    for (let i = 0; i < 3; i++) {
      const match = { ...mockData.matchTemplates.aVenir };
      match.id = matches.length + 1;
      // Ajuster la date pour chaque match (ajouter i semaines)
      const date = new Date('2025-07-20');
      date.setDate(date.getDate() + (i * 7));
      match.date = date.toLocaleDateString('fr-FR');
      matches.push(match);
    }
    
    // Ajouter 1 match prochain
    const prochainMatch = { ...mockData.matchTemplates.prochain };
    prochainMatch.id = matches.length + 1;
    matches.push(prochainMatch);
    
    // Ajouter 17 matchs joués
    for (let i = 0; i < 17; i++) {
      const match = { ...mockData.matchTemplates.joue };
      match.id = matches.length + 1;
      // Ajuster la date pour chaque match (soustraire i semaines)
      const date = new Date('2025-07-20');
      date.setDate(date.getDate() - ((i + 1) * 7));
      match.date = date.toLocaleDateString('fr-FR');
      matches.push(match);
    }
    
    return matches;
  }, []);

  const navigate = useNavigate();

  // Configuration des colonnes pour le DataTable
  const columns = [
    {
      key: 'date',
      header: 'Date',
      width: '0.8fr',
      render: (value: string) => (
        <div className="text-sm font-medium text-slate-900">{value}</div>
      )
    },
    {
      key: 'heure',
      header: 'Heure',
      width: '0.5fr',
      render: (value: string) => (
        <div className="text-sm text-slate-600">{value}</div>
      )
    },
    {
      key: 'statut',
      header: 'Statut',
      width: '140px',
      render: (value: string) => <BadgeStatut statut={value} />
    },
    {
      key: 'domicile',
      header: 'Domicile',
      width: '0.96fr',
      render: (value: string, row: any) => (
        <TeamLogoWithName
          teamName={value}
          logoUrl={row.logoEquipeDomicile}
        />
      )
    },
    {
      key: 'resultat',
      header: 'Résultat',
      width: '1fr',
      align: 'center' as const,
      render: (value: string, row: any) => (
        <MatchScore
          status={row.statut}
          score={value}
        />
      )
    },
    {
      key: 'exterieur',
      header: 'Extérieur',
      width: '1.2fr',
      align: 'right' as const,
      render: (value: string, row: any) => (
        <TeamLogoWithName
          teamName={value}
          logoUrl={row.logoEquipeExterieure}
          isReversed
        />
      )
    },
    {
      key: 'ventes',
      header: 'Ventes',
      width: '0.8fr',
      align: 'center' as const,
      render: (value: string) => (
        <SalesDisplay value={value} />
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '1fr',
      align: 'center' as const,
      render: (_: any, row: any) => (
        <BoutonPrimaire
          onClick={() => navigate(`/match-details/${row.id}`)}
          className="!py-2 !px-4 !text-sm !bg-black hover:!bg-slate-800"
        >
          Voir détails →
        </BoutonPrimaire>
      )
    }
  ];

  return (
    <PageBackground imagePath="/background_picture.png">
      <UserMenuWrapper>
        <AppHeader />
      </UserMenuWrapper>
      
      {/* Contenu principal - Tableau des matchs */}
      <div className="px-8 pb-16 flex-1 flex flex-col items-center">
        <DataTable
          columns={columns}
          data={generateMatches}
          className="w-[90%]"
          rowsPerPage={7}
        />
      </div>
      
      <div className="mt-auto">
        <Copyright />
      </div>
    </PageBackground>
  );
};

export default Home; 