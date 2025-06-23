  // ================================================================
// DATAXX FRONTEND - COMPOSANTS RÉUTILISABLES
// ================================================================
// Ce fichier contient tous les composants réutilisables du projet Dataxx.
// Les composants utilisés sur plusieurs pages doivent être définis ici.
//
// Processus de développement des composants :
// 1. Créer d'abord le composant dans le fichier de page spécifique
// 2. Demander : "Ce composant doit-il être réutilisable ou unique ?"
// 3. Si réutilisable → Déplacer ici
// 4. Si unique → Garder dans le fichier de page
// ================================================================

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cog6ToothIcon, ArrowDownTrayIcon, ChevronLeftIcon, ChevronRightIcon, ChartBarIcon, QuestionMarkCircleIcon, ArrowRightOnRectangleIcon, DocumentMagnifyingGlassIcon, HashtagIcon } from '@heroicons/react/24/outline';

// ================================================================
// INTERFACES TYPESCRIPT
// ================================================================

interface BoutonPrimaireProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

interface BoutonSecondaireProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

interface ChampSaisieProps {
  label: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  id?: string;
  name?: string;
  className?: string;
}

interface OverlayContactProps {
  isOpen: boolean;
  onClose: () => void;
  telephone?: string;
  email?: string;
  nom?: string;
}

interface BadgeStatutProps {
  statut: string;
}

// Nouvelles interfaces pour les composants réutilisables
interface AppHeaderProps {
  circleClassName?: string;
  onSettingsClick?: () => void;
  onLogoClick?: () => void;
}

interface TeamLogoWithNameProps {
  teamName: string;
  logoUrl: string;
  isReversed?: boolean;
  className?: string;
}

export interface DataTableColumn<T> {
  key: string;
  header: string | (() => React.ReactNode);
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  rowsPerPage?: number;
  className?: string;
  onRowClick?: (row: T) => void;
}

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalRows: number;
  onPageChange: (page: number) => void;
}

interface MatchScoreProps {
  status: 'À venir' | 'Prochain' | 'Joué';
  score?: string;
}

interface SalesDisplayProps {
  value: string;
  placeholder?: string;
}

interface CopyrightProps {
  company?: string;
  year?: number;
}

interface PageBackgroundProps {
  imagePath: string;
  children: React.ReactNode;
}

interface PaginationButtonProps {
  direction: 'previous' | 'next';
  disabled: boolean;
  onClick: () => void;
}

// Type pour les canaux marketing
export type MarketingChannel = 'Google Ads' | 'Meta Ads' | 'Newsletter';

interface AppHeaderWithClassName extends React.ComponentProps<typeof AppHeader> {
  className?: string;
}

interface StickyButtonContainerProps {
  children: React.ReactNode;
  className?: string;
}

// Add this interface before SegmentCardProps
interface KeywordBubble {
  text: string;
  score: number; // Score between 0 and 1
}

interface SegmentCardProps {
  title: string;
  dotColor: string;
  fansCount: number;
  totalFansPercentage: number;
  marketingChannel: MarketingChannel;
  averageSpending: number;
  tribune: string;
  optimalSendTime: {
    date: string;
    time: string;
  };
  optimalFollowUp: {
    date: string;
    time: string;
  } | 'none';
  description: string;
  onExpand?: (cardElement: HTMLDivElement) => void;
  keywords?: KeywordBubble[]; // Add this line
}

interface ProgressStepsProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

interface Carte3DProps {
  title: string;
  value: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  borderColor?: string;
}

// ================================================================
// COMPOSANTS RÉUTILISABLES
// ================================================================

/**
 * Bouton principal noir qui devient actif selon les conditions
 * Utilisé pour les actions principales (connexion, soumission, etc.)
 */
export const BoutonPrimaire: React.FC<BoutonPrimaireProps> = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = ''
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 ${
        !disabled
          ? 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 cursor-pointer'
          : 'bg-slate-300 text-slate-500 cursor-not-allowed'
      } ${className}`}
    >
      {children}
    </button>
  );
};

/**
 * Bouton secondaire gris clair pour les actions alternatives
 * Utilisé pour les liens, actions secondaires (mot de passe oublié, etc.)
 */
export const BoutonSecondaire: React.FC<BoutonSecondaireProps> = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = ''
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 px-4 rounded-lg font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-700 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 transition-all duration-200 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
    >
      {children}
    </button>
  );
};

/**
 * Champ de saisie avec label, icône et gestion des états
 * Utilisé pour tous les inputs (email, mot de passe, texte, etc.)
 */
export const ChampSaisie: React.FC<ChampSaisieProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  icon,
  rightIcon,
  onRightIconClick,
  id,
  name,
  className = ''
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} ${
            rightIcon ? 'pr-12' : 'pr-4'
          } py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
          placeholder={placeholder}
        />
        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            disabled={disabled}
          >
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Overlay modal pour afficher les informations de contact administrateur
 * Utilisé quand l'utilisateur a besoin d'assistance technique
 */
export const OverlayContact: React.FC<OverlayContactProps> = ({
  isOpen,
  onClose,
  telephone = "06 95 42 08 38",
  email = "louis@dataxx.fr",
  nom = "Contactez Louis, votre administrateur Dataxx"
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-all duration-300 ease-in-out ${
        isOpen ? 'bg-black bg-opacity-50' : 'bg-black bg-opacity-0'
      }`}
      onClick={handleBackdropClick}
      style={{
        animation: isOpen ? 'fadeInBackground 300ms ease-in-out forwards' : undefined
      }}
    >
      <div 
        className={`bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative transform transition-all duration-300 ease-in-out ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        }`}
        style={{
          animation: isOpen ? 'slideInUp 300ms ease-out forwards' : undefined
        }}
      >
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Contenu de l'overlay */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{nom}</h2>
        </div>

        <div className="space-y-4">
          {/* Téléphone */}
          <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-slate-900">Téléphone</p>
              <a href={`tel:${telephone}`} className="text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium">
                {telephone}
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-slate-900">Email</p>
              <a href={`mailto:${email}`} className="text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium">
                {email}
              </a>
            </div>
          </div>
        </div>

        {/* Bouton de fermeture en bas */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-200 font-medium transform hover:scale-[1.02]"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

// ================================================================
// EXPORTS GROUPÉS
// ================================================================

/**
 * Badge de statut coloré pour les matchs
 * Affiche le statut avec des couleurs appropriées (UPCOMING, PROCHAIN, etc.)
 */
export const BadgeStatut: React.FC<BadgeStatutProps> = ({ statut }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      // Match statuses
      case 'À venir':
        return 'bg-purple-100 text-purple-700 border border-purple-200';
      case 'Prochain':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      case 'Joué':
        return 'bg-green-100 text-green-700 border border-green-200';
      case 'Annulé':
        return 'bg-red-100 text-red-700 border border-red-200';
      // Segmentation history statuses
      case 'Draft':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      case 'Créée':
        return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'Lancée':
        return 'bg-green-100 text-green-700 border border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(statut)}`}>
      {statut}
    </span>
  );
};

/**
 * En-tête de l'application avec les logos
 * Utilisé sur toutes les pages principales
 */
export const AppHeader: React.FC<AppHeaderProps> = ({ circleClassName = '', onSettingsClick, onLogoClick }) => {
  return (
    <header className="w-full px-8 py-6 flex items-center justify-between pointer-events-none">
      {/* Logo Dataxx à gauche */}
      <div className="flex-shrink-0">
        <div 
          onClick={onLogoClick}
          className="cursor-pointer pointer-events-auto hover:opacity-80 transition-opacity duration-200"
        >
          <img 
            src="/dataxx_logo.png" 
            alt="Dataxx Logo" 
            className="h-12 w-auto"
          />
        </div>
      </div>
      
      {/* Logo du club au centre */}
      <div className="flex-shrink-0">
        <img 
          src="/home_club_logo.png" 
          alt="LOSC Logo" 
          className="h-12 w-auto"
        />
      </div>
      
      {/* Cercle avec icône de paramètres à droite */}
      <div className="flex-shrink-0">
        <div 
          onClick={onSettingsClick}
          className={`h-12 w-12 bg-white rounded-full flex items-center justify-center border border-gray-300 cursor-pointer pointer-events-auto hover:bg-gray-50 ${circleClassName}`}
        >
          <Cog6ToothIcon className="h-6 w-6 text-gray-600" />
        </div>
      </div>
    </header>
  );
};

/**
 * Affichage d'une équipe avec son logo
 * Utilisé pour les équipes à domicile et à l'extérieur
 */
export const TeamLogoWithName: React.FC<TeamLogoWithNameProps> = ({
  teamName,
  logoUrl,
  isReversed = false,
  className = ''
}) => {
  const containerClasses = `flex items-center ${isReversed ? 'flex-row-reverse space-x-2 space-x-reverse' : 'space-x-2'} ${className}`;
  
  return (
    <div className={containerClasses}>
      <img 
        src={logoUrl} 
        alt={`Logo ${teamName}`}
        className="h-8 w-8 object-contain flex-shrink-0"
      />
      <span className="font-medium text-slate-900 truncate">{teamName}</span>
    </div>
  );
};

/**
 * Affichage du score ou "VS" selon le statut du match
 */
export const MatchScore: React.FC<MatchScoreProps> = ({ status, score }) => {
  return (
    <div className="text-lg font-medium text-center">
      {status === 'Joué' ? (
        <span className="text-pink-600">{score}</span>
      ) : (
        <span className="text-slate-500 font-medium">VS</span>
      )}
    </div>
  );
};

/**
 * Affichage des ventes avec gestion des placeholders
 */
export const SalesDisplay: React.FC<SalesDisplayProps> = ({
  value,
  placeholder = '---'
}) => {
  return (
    <div className="text-sm text-slate-600 text-center">
      {value === placeholder ? (
        <span className="text-slate-400">{placeholder}</span>
      ) : (
        value
      )}
    </div>
  );
};

/**
 * Copyright notice réutilisable
 */
export const Copyright: React.FC<CopyrightProps> = ({
  company = 'DATAXX SAS',
  year = 2025
}) => {
  return (
    <div 
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 font-space-grotesk text-sm font-extralight text-gray-400 tracking-wider whitespace-nowrap z-[1001]"
    >
      © {year} {company} - TOUS DROITS RÉSERVÉS
    </div>
  );
};

/**
 * Composant pour le fond de page avec image
 */
export const PageBackground: React.FC<PageBackgroundProps> = ({ children, imagePath }) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${imagePath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="relative z-10 flex flex-col min-h-screen backdrop-blur-sm bg-white/30">
        {children}
      </div>
    </div>
  );
};

/**
 * Bouton de pagination avec flèche
 */
export const PaginationButton: React.FC<PaginationButtonProps> = ({
  direction,
  disabled,
  onClick
}) => {
  return (
    <button 
      className={`p-2 transition-colors ${
        disabled 
          ? 'text-slate-300 cursor-not-allowed' 
          : 'text-slate-400 hover:text-slate-600 cursor-pointer'
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d={direction === 'previous' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} 
        />
      </svg>
    </button>
  );
};

/**
 * Pagination complète pour les tableaux
 */
export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalRows,
  onPageChange
}) => {
  return (
    <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
      <div className="text-sm text-slate-600">
        PAGE {currentPage}/{totalPages}
      </div>
      <div className="text-sm text-slate-600">
        MATCHS {startIndex + 1}-{endIndex}
      </div>
      <div className="flex space-x-2">
        <PaginationButton
          direction="previous"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />
        <PaginationButton
          direction="next"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </div>
    </div>
  );
};

/**
 * Table de données générique avec pagination
 */
export const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  className = '',
  rowsPerPage = 10
}: DataTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className={`overflow-hidden border border-gray-200 rounded-lg bg-white ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={column.key}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.align === 'center' ? 'text-center' : 
                  column.align === 'right' ? 'text-right' : 
                  'text-left'
                }`}
                style={{ width: column.width }}
              >
                {typeof column.header === 'function' ? column.header() : column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  className={`px-6 py-[14px] whitespace-nowrap ${
                    column.align === 'center' ? 'text-center' : 
                    column.align === 'right' ? 'text-right' : 
                    'text-left'
                  }`}
                >
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Matchs <span className="font-medium">{startIndex + 1}</span> à{' '}
                <span className="font-medium">
                  {Math.min(endIndex, data.length)}
                </span>{' '}
                sur <span className="font-medium">{data.length}</span> matchs - saison 2024/2025
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Animation de chargement avec une cible de tir
export const LoadingFootballAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full pt-8 pb-16">
      <svg width="260" height="156" viewBox="0 0 260 156" className="text-gray-300">
        {/* But de football */}
        <path
          d="M26 130 L26 52 L234 52 L234 130"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Filet vertical */}
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={`vertical-${i}`}
            d={`M52 + ${i * 26} 52 L${52 + i * 26} 130`}
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4"
          />
        ))}
        {/* Filet horizontal */}
        {Array.from({ length: 4 }).map((_, i) => (
          <path
            key={`horizontal-${i}`}
            d={`M26 ${71.5 + i * 19.5} L234 ${71.5 + i * 19.5}`}
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4"
          />
        ))}
        
        {/* Cible animée */}
        <g>
          <animateMotion
            dur="5s"
            repeatCount="indefinite"
            path="M52,62.4 C78,62.4 182,62.4 208,62.4 S182,91 130,91 S78,119.6 58.5,119.6 S182,119.6 201.5,119.6 Q221,119.6 208,91 T52,62.4"
            rotate="auto"
          />
          {/* Cercles de la cible */}
          <circle r="13" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle r="6.5" fill="none" stroke="currentColor" strokeWidth="1" />
          {/* Croix de la cible */}
          <path d="M-7.8 0 L7.8 0 M0 -7.8 L0 7.8" stroke="currentColor" strokeWidth="1" />
        </g>
      </svg>
      <p className="text-gray-400 mt-2 text-center">
        Aucune segmentation intelligente<br />
        n'a encore été créée pour ce match.
      </p>
    </div>
  );
};

// Composant pour afficher le canal marketing avec un badge coloré
export const MarketingChannelBadge: React.FC<{ channel: MarketingChannel }> = ({ channel }) => {
  const getChannelColor = (channel: MarketingChannel): string => {
    switch (channel) {
      case 'Google Ads':
        return 'bg-blue-100 text-blue-700';
      case 'Meta Ads':
        return 'bg-indigo-100 text-indigo-700';
      case 'Newsletter':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getChannelColor(channel)}`}>
      {channel}
    </span>
  );
};

/**
 * Composant pour afficher un mot-clé dans une bulle grise
 */
const KeywordBubble: React.FC<{ text: string; score: number }> = ({ text, score }) => {
  return (
    <div 
      className={`
        inline-flex items-center px-3 py-1.5 m-1
        bg-gray-100 hover:bg-gray-200 
        text-gray-700 text-sm font-medium
        rounded-full border border-gray-200
        transition-transform hover:scale-105
      `}
    >
      <HashtagIcon className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
      {text}
    </div>
  );
};

/**
 * Composant pour la carte de segment
 */
export const SegmentCard: React.FC<SegmentCardProps> = ({
  title,
  dotColor,
  fansCount,
  totalFansPercentage,
  marketingChannel,
  averageSpending,
  tribune,
  optimalSendTime,
  optimalFollowUp,
  description,
  onExpand,
  keywords = [ // Default mock keywords
    { text: "Derby du Nord", score: 0.95 },
    { text: "Places VIP", score: 0.9 },
    { text: "Tribune Nord", score: 0.85 },
    { text: "Ambiance", score: 0.8 },
    { text: "Passion", score: 0.75 },
    { text: "Supporters", score: 0.7 },
    { text: "Match crucial", score: 0.65 },
    { text: "Promotion", score: 0.6 }
  ]
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isKeywordsExpanded, setIsKeywordsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleExpand = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    setIsKeywordsExpanded(false); // Close keywords when expanding performance
    if (newExpandedState && cardRef.current && onExpand) {
      onExpand(cardRef.current);
    }
  };

  const handleKeywordsExpand = () => {
    const newExpandedState = !isKeywordsExpanded;
    setIsKeywordsExpanded(newExpandedState);
    setIsExpanded(false); // Close performance when expanding keywords
    if (newExpandedState && cardRef.current && onExpand) {
      onExpand(cardRef.current);
    }
  };

  // Function to get color based on score
  const getKeywordColor = (score: number) => {
    if (score >= 0.9) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (score >= 0.8) return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    if (score >= 0.7) return 'bg-purple-100 text-purple-800 border-purple-200';
    return 'bg-slate-100 text-slate-800 border-slate-200';
  };

  return (
    <div 
      ref={cardRef}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 mb-4 transition-all duration-300 ease-in-out flex ${
        isExpanded || isKeywordsExpanded ? 'w-[1050px]' : 'w-[350px]'
      }`}
    >
      {/* Section principale fixe (toujours 350px, ne bouge jamais) */}
      <div className="w-[350px] shrink-0 p-6">
        {/* En-tête avec titre et point coloré */}
        <div className="flex items-center mb-6">
          <div 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: dotColor }}
          />
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>

        {/* Informations empilées verticalement */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Fans ciblés</span>
            <span className="text-sm font-medium text-gray-900">
              {fansCount.toLocaleString('fr-FR')} ({totalFansPercentage}% de la base)
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Canal</span>
            <MarketingChannelBadge channel={marketingChannel} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Dépense moyenne</span>
            <span className="text-sm font-medium text-gray-900">
              {averageSpending.toLocaleString('fr-FR')}€
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Tribune</span>
            <span className="text-sm font-medium text-gray-900">{tribune}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Envoi optimal</span>
            <span className="text-sm font-medium text-gray-900">
              {optimalSendTime.date} à {optimalSendTime.time}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Relance optimale</span>
            {optimalFollowUp === 'none' ? (
              <span className="text-sm font-medium text-red-600 border border-red-200 border-dashed px-2 py-0.5 rounded">
                Pas de relance
              </span>
            ) : (
              <span className="text-sm font-medium text-gray-900">
                {optimalFollowUp.date} à {optimalFollowUp.time}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="pt-2">
            <p className="text-sm text-gray-600">{description}</p>
          </div>

          <div className="space-y-2">
            {/* Bouton mots clés optimisés */}
            <button 
              onClick={handleKeywordsExpand}
              className={`w-full flex items-center justify-center px-4 py-1.5 text-sm transition-colors duration-200 rounded-md border ${
                isKeywordsExpanded 
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200' 
                  : 'bg-white text-black hover:bg-gray-50 border-gray-200'
              }`}
            >
              <HashtagIcon className="w-4 h-4 mr-2" />
              {isKeywordsExpanded ? 'Masquer les mots clés' : 'Mots clés optimisés'}
            </button>

            {/* Bouton d'export */}
            <button 
              className="w-full flex items-center justify-center px-4 py-1.5 text-sm bg-green-500 text-white hover:bg-green-600 transition-colors duration-200 rounded-md"
              onClick={() => {
                // L'action d'export sera implémentée plus tard
                console.log(`Exporting segment: ${title}`);
              }}
            >
              <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
              Exporter le segment
            </button>

            {/* Bouton de suivi des performances */}
            <BoutonPrimaire
              onClick={handleExpand}
              className={`!w-full !py-1.5 !text-sm !rounded-md ${
                isExpanded 
                  ? '!bg-slate-100 !text-slate-700 hover:!bg-slate-200' 
                  : '!bg-black hover:!bg-slate-800'
              }`}
            >
              <ChartBarIcon className="w-5 h-5 mr-2 inline-block" />
              {isExpanded ? 'Masquer les performances' : 'Suivre les performances'}
            </BoutonPrimaire>
          </div>
        </div>
      </div>

      {/* Séparateur vertical */}
      <div className="w-px bg-gray-200"></div>

      {/* Zone étendue */}
      <div 
        className={`transition-all duration-300 ease-in-out p-6 ${
          isExpanded || isKeywordsExpanded ? 'w-[700px] opacity-100' : 'w-0 opacity-0 overflow-hidden'
        }`}
      >
        {isExpanded && (
          <div className="h-full flex items-center justify-center text-slate-400">
            Contenu des performances à venir
          </div>
        )}
        {isKeywordsExpanded && (
          <div 
            className="mt-4 h-[300px] flex items-center justify-center" 
          >
            <div className="text-center max-w-[500px] translate-y-24">
              <div className="mb-3">
                <h3 className="text-base font-semibold text-gray-900">Mots-clés optimisés</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Ces mots-clés sont identifiés comme les plus pertinents pour ce segment, basés sur l'analyse des données historiques et le contexte
              </p>
              <div className="flex flex-wrap justify-center gap-0.5">
                {keywords.map((keyword, index) => (
                  <KeywordBubble 
                    key={index} 
                    text={keyword.text} 
                    score={keyword.score}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Wrapper pour le menu utilisateur avec gestion du dropdown et de l'overlay de contact
 */
export const UserMenuWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement<AppHeaderWithClassName>(child)) {
      return React.cloneElement(child, {
        className: `${isOpen ? '!bg-blue-700' : ''} transition-colors duration-200`
      });
    }
    return child;
  });

  return (
    <div className="sticky top-0 z-50" ref={triggerRef}>
      <div className="relative">
        <AppHeader 
          circleClassName={`${isOpen ? 'bg-gray-100 !border-gray-400' : ''} transition-colors duration-200`}
          onSettingsClick={() => setIsOpen(!isOpen)}
          onLogoClick={handleLogoClick}
        />
      </div>
      
      {isOpen && (
        <div 
          ref={menuRef}
          className="absolute right-8 -mt-3 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
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

      <OverlayContact
        isOpen={showContactOverlay}
        onClose={() => setShowContactOverlay(false)}
      />
    </div>
  );
};

/**
 * Container pour les boutons collants en bas de page
 * Maintient une distance constante du bas pendant le défilement
 */
export const StickyButtonContainer: React.FC<StickyButtonContainerProps> = ({
  children,
  className = ''
}) => {
  return (
    <div style={{ pointerEvents: 'none' }} className={`sticky bottom-4 px-8 py-4 bg-transparent flex justify-between items-center w-full ${className}`}>
      {React.Children.map(children, child => (
        <div style={{ pointerEvents: 'auto' }}>
          {child}
        </div>
      ))}
    </div>
  );
};

export const ComposantsReutilisables = {
  BoutonPrimaire,
  BoutonSecondaire,
  ChampSaisie,
  OverlayContact,
  BadgeStatut,
  AppHeader,
  TeamLogoWithName,
  MatchScore,
  SalesDisplay,
  Copyright,
  PageBackground,
  PaginationButton,
  TablePagination,
  DataTable,
  LoadingFootballAnimation,
  MarketingChannelBadge,
  SegmentCard,
  UserMenuWrapper,
  StickyButtonContainer,
};

// Add this at the end of the file, before the last export
const animationKeyframes = `
  @keyframes typing {
    0% {
      width: 0;
    }
    50% {
      width: 100%;
    }
    90% {
      width: 100%;
    }
    100% {
      width: 0;
    }
  }
`;

const keyframesStyle = document.createElement('style');
keyframesStyle.textContent = `
  @keyframes expandMask {
    from {
      clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    }
    to {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }
  @keyframes expandCard {
    from {
      max-height: 0;
      opacity: 0;
    }
    to {
      max-height: 800px;
      opacity: 1;
    }
  }
  ${animationKeyframes}
`;
document.head.appendChild(keyframesStyle);

export const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps, currentStep, className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            {/* Step circle */}
            <div className={`
              flex items-center justify-center w-8 h-8 rounded-full 
              ${index + 1 === currentStep ? 'bg-black text-white' : 
                index + 1 < currentStep ? 'bg-green-500 text-white' : 
                'bg-gray-200 text-gray-500'}
              transition-colors duration-200
            `}>
              {index + 1 < currentStep ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            
            {/* Step text */}
            <span className={`ml-3 text-sm font-medium ${
              index + 1 === currentStep ? 'text-black' :
              index + 1 < currentStep ? 'text-green-500' :
              'text-gray-500'
            }`}>
              {step}
            </span>
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4">
                <div className={`h-1 w-24 ${
                  index + 1 < currentStep ? 'bg-green-500' :
                  'bg-gray-200'
                }`}></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Carte3D: React.FC<Carte3DProps> = ({
  title,
  value,
  subtitle,
  icon,
  className = '',
  borderColor = 'border-blue-500'
}) => {
  return (
    <div 
      className={`
        relative group
        bg-white/90 backdrop-blur-sm
        p-6 rounded-xl
        transform transition-all duration-300
        hover:scale-[1.02] hover:-translate-y-1
        shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)]
        border border-gray-100
        ${className}
        before:content-['']
        before:absolute before:top-0 before:left-0 before:right-0
        before:h-1 before:rounded-t-xl
        before:${borderColor}
        before:bg-current
      `}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        {icon && (
          <div className="p-2.5 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
            <div className="text-gray-600">
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 