import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppHeader,
  Copyright,
  PageBackground,
  BoutonPrimaire,
  OverlayContact,
  DataTable,
  BadgeStatut,
  TeamLogoWithName,
  MatchScore,
  SegmentCard,
  UserMenuWrapper,
  StickyButtonContainer,
  PaginationButton
} from '../components/ReusableComponents';
import { 
  QuestionMarkCircleIcon, 
  ArrowRightOnRectangleIcon, 
  DocumentMagnifyingGlassIcon,
  ChartPieIcon 
} from '@heroicons/react/24/outline';
import { mockData, segmentTemplates } from '../data/mock_data';
import type { DataTableColumn } from '../components/ReusableComponents';

interface AppHeaderWithClassName extends React.ComponentProps<typeof AppHeader> {
  className?: string;
}

interface HistoryTableRow {
  status: string;
  dateCreation: string;
  heure: string;
  segments: number;
  fans: string;
  billetsVendus: string;
}

const PerformanceSegmentation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [match, setMatch] = useState<any>(null);
  const [selectedSegmentation, setSelectedSegmentation] = useState<HistoryTableRow | null>(null);
  const [currentBatch, setCurrentBatch] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const CARDS_PER_BATCH = 3;
  const TOTAL_SEGMENTS = 5;
  const TOTAL_BATCHES = Math.ceil(TOTAL_SEGMENTS / CARDS_PER_BATCH);

  const handleCardExpand = (cardElement: HTMLDivElement) => {
    if (scrollContainerRef.current) {
      const containerRect = scrollContainerRef.current.getBoundingClientRect();
      const cardRect = cardElement.getBoundingClientRect();
      const scrollLeft = cardRect.left - containerRect.left + scrollContainerRef.current.scrollLeft;
      
      scrollContainerRef.current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });

      // Update the current batch based on the scroll position
      const newBatch = Math.floor(scrollLeft / (CARDS_PER_BATCH * (350 + 16))) + 1;
      setCurrentBatch(newBatch);
    }
  };

  const scrollToNextBatch = () => {
    if (currentBatch < TOTAL_BATCHES) {
      setCurrentBatch(prev => prev + 1);
      scrollContainerRef.current?.scrollTo({
        left: (currentBatch) * (CARDS_PER_BATCH * (350 + 16)), // 350px card width + 16px gap
        behavior: 'smooth'
      });
    }
  };

  const scrollToPreviousBatch = () => {
    if (currentBatch > 1) {
      setCurrentBatch(prev => prev - 1);
      scrollContainerRef.current?.scrollTo({
        left: (currentBatch - 2) * (CARDS_PER_BATCH * (350 + 16)),
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Récupérer les données du match depuis l'état de navigation
    const state = location.state as { match: any; segmentation: HistoryTableRow } | null;
    if (state?.match) {
      setMatch(state.match);
      setSelectedSegmentation(state.segmentation);
    } else {
      // Si pas de données, retourner à la page précédente
      navigate(-1);
    }
  }, [location, navigate]);

  const handleRetourClick = () => {
    navigate(-1);
  };

  // Configuration des colonnes pour le DataTable du match
  const matchColumns = [
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
    }
  ];

  return (
    <PageBackground imagePath="/background_picture.png">
      <UserMenuWrapper>
        <AppHeader />
      </UserMenuWrapper>

      {/* Contenu principal */}
      <div className="px-8 pb-32 flex-1 flex flex-col items-center">
        {/* Table des détails du match */}
        {match && (
          <DataTable
            columns={matchColumns}
            data={[match]}
            className="w-[90%]"
            rowsPerPage={1}
          />
        )}
        
        {/* Section historique de la segmentation sélectionnée */}
        {selectedSegmentation && (
          <div className="w-[90%] mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center">
                <ChartPieIcon className="h-6 w-6 mr-2 text-slate-600" />
                Segments intelligents (5) - {selectedSegmentation.dateCreation} à {selectedSegmentation.heure} :
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-600 font-medium">
                  {currentBatch}/{TOTAL_BATCHES}
                </span>
                <div className="flex gap-2">
                  <PaginationButton
                    direction="previous"
                    disabled={currentBatch === 1}
                    onClick={scrollToPreviousBatch}
                  />
                  <PaginationButton
                    direction="next"
                    disabled={currentBatch === TOTAL_BATCHES}
                    onClick={scrollToNextBatch}
                  />
                </div>
              </div>
            </div>
            <div className="relative">
              <div 
                ref={scrollContainerRef}
                className="flex overflow-x-auto pb-4 gap-4 hide-scrollbar scroll-smooth"
              >
                <SegmentCard {...segmentTemplates.bigMatchFans} onExpand={handleCardExpand} />
                <SegmentCard {...segmentTemplates.loyalSubscribers} onExpand={handleCardExpand} />
                <SegmentCard {...segmentTemplates.newSupporters} onExpand={handleCardExpand} />
                <SegmentCard {...segmentTemplates.familyFans} onExpand={handleCardExpand} />
                <SegmentCard {...segmentTemplates.studentFans} onExpand={handleCardExpand} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bouton Retour */}
      <StickyButtonContainer className="!justify-start">
        <BoutonPrimaire
          onClick={handleRetourClick}
          className="!bg-white !text-black border border-gray-200 hover:!bg-gray-50 !px-6 !w-auto shadow-sm"
        >
          ← Retour
        </BoutonPrimaire>
      </StickyButtonContainer>

      <div className="mt-auto">
        <Copyright />
      </div>
    </PageBackground>
  );
};

export default PerformanceSegmentation; 