import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  AppHeader,
  Copyright,
  PageBackground,
  DataTable,
  BoutonPrimaire,
  BadgeStatut,
  TeamLogoWithName,
  MatchScore,
  LoadingFootballAnimation,
  OverlayContact,
  UserMenuWrapper,
  StickyButtonContainer
} from '../components/ReusableComponents';
import { QuestionMarkCircleIcon, ArrowRightOnRectangleIcon, ClockIcon, SparklesIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { mockData } from '../data/mock_data';
import type { DataTableColumn } from '../components/ReusableComponents';

interface HistoryTableRow {
  status: string;
  dateCreation: string;
  heure: string;
  segments: number;
  fans: string;
  billetsVendus: string;
}

const MatchDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleLogoClick = () => {
    navigate('/home');
  };

  const handleRetourClick = () => {
    navigate('/home');
  };

  // Générer le match spécifique à partir des templates
  const match = useMemo(() => {
    // Convertir l'ID en nombre
    const matchId = parseInt(id || '0', 10);
    
    // Fonction pour créer un match avec un ID spécifique
    const createMatchWithId = (template: any, targetId: number) => {
      const match = { ...template };
      match.id = targetId;
      const date = new Date('2025-07-20');
      
      if (targetId <= 3) {
        // Matchs à venir
        date.setDate(date.getDate() + ((targetId - 1) * 7));
        return { ...mockData.matchTemplates.aVenir, id: targetId, date: date.toLocaleDateString('fr-FR') };
      } else if (targetId === 4) {
        // Match prochain
        return { ...mockData.matchTemplates.prochain, id: targetId };
      } else {
        // Matchs joués
        date.setDate(date.getDate() - ((targetId - 4) * 7));
        return { ...mockData.matchTemplates.joue, id: targetId, date: date.toLocaleDateString('fr-FR') };
      }
    };

    return createMatchWithId(mockData.matchTemplates.joue, matchId);
  }, [id]);

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
      width: '0.8fr',
      render: (value: string) => (
        <div>
          <BadgeStatut statut={value} />
        </div>
      )
    },
    {
      key: 'domicile',
      header: 'Domicile',
      width: '0.76fr',
      render: (value: string, row: any) => (
        <div>
          <TeamLogoWithName
            teamName={value}
            logoUrl={row.logoEquipeDomicile}
          />
        </div>
      )
    },
    {
      key: 'resultat',
      header: 'Résultat',
      width: '1fr',
      align: 'center' as const,
      render: (value: string, row: any) => (
        <div className="flex items-center justify-center w-full">
          <MatchScore
            status={row.statut}
            score={value}
          />
        </div>
      )
    },
    {
      key: 'exterieur',
      header: 'Extérieur',
      width: '1fr',
      align: 'right' as const,
      render: (value: string, row: any) => (
        <div className="flex items-center justify-end w-full">
          <TeamLogoWithName
            teamName={value}
            logoUrl={row.logoEquipeExterieure}
            isReversed
          />
        </div>
      )
    },
    {
      key: 'ventes',
      header: 'Ventes',
      width: '1fr',
      align: 'center' as const,
      render: (value: string) => (
        <div className="flex items-center justify-center">
          <span className="text-sm font-medium text-slate-900">{value}</span>
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '0.8fr',
      align: 'center' as const,
      render: (_: any, row: any) => (
        <BoutonPrimaire
          onClick={() => window.open('https://www.fan-xp.com/fr/', '_blank')}
          className="!py-1.5 !px-3 !text-sm !bg-white !text-black border border-gray-200 hover:!bg-gray-50 whitespace-nowrap"
        >
          Suivre ventes ↗
        </BoutonPrimaire>
      )
    }
  ];

  // Configuration des colonnes pour la table d'historique
  const historyColumns: DataTableColumn<HistoryTableRow>[] = [
    {
      key: 'dateCreation',
      header: 'DATE DE CRÉATION',
      width: '0.7fr',
      render: (value: string) => (
        <div className="text-sm font-medium text-slate-900">{value}</div>
      )
    },
    {
      key: 'heure',
      header: 'HEURE',
      width: '0.4fr',
      align: 'center' as const,
      render: (value: string) => (
        <div className="text-sm text-slate-600 text-center">{value}</div>
      )
    },
    {
      key: 'segments',
      header: 'SEGMENTS',
      width: '0.5fr',
      align: 'center' as const,
      render: (value: number) => (
        <div className="text-sm font-medium text-slate-900 text-center">{value}</div>
      )
    },
    {
      key: 'fans',
      header: () => <div className="text-center w-full">FANS CIBLÉS</div>,
      width: '0.7fr',
      align: 'center' as const,
      render: (value: string) => (
        <div className="flex justify-center w-full">
          <span className="text-sm font-medium text-slate-900">{value}</span>
        </div>
      )
    },
    {
      key: 'status',
      header: () => <div className="text-center w-full">STATUS</div>,
      width: '0.7fr',
      align: 'center' as const,
      render: (value: string) => {
        const statusDisplay: Record<string, string> = {
          'draft': 'Draft',
          'creee': 'Créée',
          'lancee': 'Lancée'
        };
        return (
          <div className="flex justify-center w-full">
            <BadgeStatut statut={statusDisplay[value.toLowerCase()] || value} />
          </div>
        );
      }
    },
    {
      key: 'billetsVendus',
      header: () => <div className="text-center w-full">BILLETS VENDUS</div>,
      width: '0.7fr',
      align: 'center' as const,
      render: (value: string) => (
        <div className="flex justify-center w-full">
          <span className="text-sm text-slate-600">{value}</span>
        </div>
      )
    },
    {
      key: 'actions',
      header: () => <div className="text-center w-full pl-8">ACTIONS</div>,
      width: '1.1fr',
      align: 'center' as const,
      render: (_: string, row: { status: string; dateCreation: string; heure: string; segments: number; fans: string; billetsVendus: string; }) => (
        <div className="flex justify-end w-full">
          <BoutonPrimaire
            onClick={() => navigate('/performance-segmentation', { 
              state: { 
                match: match,
                segmentation: row
              }
            })}
            className="!py-1.5 !px-3 !text-sm !bg-white !text-black border border-gray-200 hover:!bg-gray-50 whitespace-nowrap flex items-center gap-2 !w-auto"
          >
            <ChartBarIcon className="h-5 w-5" />
            Suivre performances
          </BoutonPrimaire>
        </div>
      )
    }
  ];

  // Générer l'historique des segmentations
  const generateSegmentationHistory = () => {
    // Pour les 3 premiers matchs (ID 1, 2, 3), pas d'historique
    if (parseInt(id || '0', 10) <= 3) {
      return [];
    }
    // Pour les autres matchs, afficher l'historique avec différents statuts
    const statuses = ['draft', 'creee', 'lancee'];
    return Array(3).fill(null).map((_, index) => ({
      ...mockData.segmentationHistory.template,
      status: statuses[index]
    }));
  };

  return (
    <PageBackground imagePath="/background_picture.png">
      <UserMenuWrapper>
        <AppHeader />
      </UserMenuWrapper>
      
      {/* Contenu principal */}
      <div className="px-8 pb-32 flex-1 flex flex-col items-center">
        {/* Table des détails du match */}
        <DataTable
          columns={columns}
          data={[match]}
          className="w-[90%]"
          rowsPerPage={1}
        />
        
        {/* Section historique des segmentations - toujours affichée */}
        <div className="w-[90%] mt-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <ClockIcon className="h-6 w-6 mr-2 text-slate-600" />
            Historique des segmentations intelligentes créées pour ce match :
          </h2>
          {generateSegmentationHistory().length > 0 ? (
            <DataTable
              columns={historyColumns}
              data={generateSegmentationHistory()}
              className="w-full"
              rowsPerPage={10}
            />
          ) : (
            <LoadingFootballAnimation />
          )}
        </div>
      </div>
      
      {/* Barre d'actions fixe en bas */}
      <StickyButtonContainer>
        <BoutonPrimaire
          onClick={handleRetourClick}
          className="!bg-white !text-black border border-gray-200 hover:!bg-gray-50 !px-6 !w-auto"
        >
          ← Retour
        </BoutonPrimaire>
        <BoutonPrimaire
          onClick={() => navigate('/ciblage-transition', { state: { match } })}
          className="!bg-black hover:!bg-slate-800 !px-6 !w-auto flex items-center gap-2"
        >
          <SparklesIcon className="h-5 w-5" />
          Lancer un ciblage intelligent →
        </BoutonPrimaire>
      </StickyButtonContainer>
      
      <div className="mt-auto">
        <Copyright />
      </div>
    </PageBackground>
  );
};

export default MatchDetails; 