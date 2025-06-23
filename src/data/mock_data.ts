// ================================================================
// DATAXX FRONTEND - CENTRALIZED MOCK DATA
// ================================================================
// This file contains ALL mock data for the Dataxx frontend project.
// Backend developer: Replace these data structures with real API calls.
//
// Project Context: LOSC Football Club AI-powered ticketing optimization
// Platform analyzes fan data + contextual data to create targeted campaigns
// ================================================================

// TODO: Replace with real API calls when backend is ready

export const mockData = {
  // Fan segments, team data, campaigns, etc. will be added here
  // as components are developed
  
  // Splashscreen Configuration
  splashscreen: {
    duration: 3000, // 3 seconds - will be adjustable later
    defaultRoute: '/signin', // Default route for first-time users
    storageKeys: {
      lastVisitedPage: 'dataxx_last_page',
      hasVisitedBefore: 'dataxx_has_visited'
    },
    animation: {
      logoGrowDelay: 200, // Dataxx logo starts growing after 200ms
      slideDelay: 1800, // Logo slides left and club logo appears after 1.8s
      logoSize: 'h-[20vh]', // 20% of screen height for logos (doubled)
      separatorSize: '8rem', // Large X separator (custom size)
      separatorWeight: '100', // Ultra-thin X separator
      separatorAnimation: '360deg rotation', // Cool rotation effect for X
      centerOffset: '15vw', // Distance logos move from center for perfect alignment
    }
  },

  // Contact administrateur pour support technique
  supportAdministrateur: {
    telephone: "06 95 42 08 38",
    email: "louis@dataxx.fr",
    nom: "Contactez Louis, votre administrateur Dataxx"
  },

  // Template de données pour intégration backend - Structure pour données réelles
  // IMPORTANT: Les développeurs backend doivent remplacer ces templates par de vraies données API
  
  // Templates de base pour chaque type de colonne
  templateData: {
    // Colonnes avec une seule valeur template
    date: "20/07/2025",           // Format: DD/MM/YYYY
    heure: "21:00",               // Format: HH:MM
    domicile: "LOSC",             // Toujours LOSC pour l'équipe à domicile
    logoEquipeDomicile: "/home_club_logo.png", // Logo LOSC fixe
    exterieur: "PARIS SAINT-GERMAIN",          // Nom équipe adverse (variable selon match)
    logoEquipeExterieure: "/opponent_club_logo.png", // Logo équipe adverse (variable selon match)
    
    // Colonnes avec choix multiples selon le contexte
    statuts: {
      aVenir: "À venir",          // Badge violet - matchs futurs
      prochain: "Prochain",       // Badge jaune - prochain match
      joue: "Joué"                // Badge vert - matchs terminés
    },
    resultats: {
      aVenir: "VS",               // Pour statut "À venir"
      prochain: "VS",             // Pour statut "Prochain"  
      joue: "2 - 1"               // Pour statut "Joué" - score réel
    },
    ventes: {
      aVenir: "---",              // Pour statut "À venir" - pas de ventes
      prochain: "18 450",         // Pour statut "Prochain" - pré-ventes
      joue: "28 347"              // Pour statut "Joué" - affluence finale
    }
  },

  // Templates de match - Un pour chaque statut
  // Ces templates servent de base pour générer les données de match dans l'interface
  // Pour créer un nouveau match, copier et adapter le template correspondant au statut souhaité
  matchTemplates: {
    // Template pour match "À venir"
    aVenir: {
      id: 1,
      date: "20/07/2025",
      heure: "21:00",
      statut: "À venir",
      domicile: "LOSC",
      logoEquipeDomicile: "/home_club_logo.png",
      exterieur: "PARIS SAINT-GERMAIN",
      logoEquipeExterieure: "/opponent_club_logo.png",
      resultat: "VS",
      ventes: "---"
    },
    
    // Template pour match "Prochain"
    prochain: {
      id: 2,
      date: "20/07/2025",
      heure: "21:00",
      statut: "Prochain",
      domicile: "LOSC",
      logoEquipeDomicile: "/home_club_logo.png",
      exterieur: "PARIS SAINT-GERMAIN",
      logoEquipeExterieure: "/opponent_club_logo.png",
      resultat: "VS",
      ventes: "18 450"
    },
    
    // Template pour match "Joué"
    joue: {
      id: 3,
      date: "20/07/2025",
      heure: "21:00",
      statut: "Joué",
      domicile: "LOSC",
      logoEquipeDomicile: "/home_club_logo.png",
      exterieur: "PARIS SAINT-GERMAIN",
      logoEquipeExterieure: "/opponent_club_logo.png",
      resultat: "2 - 1",
      ventes: "28 347"
    }
  },

  // Templates pour l'historique des segmentations
  segmentationHistory: {
    // Template unique pour une segmentation
    template: {
      dateCreation: "15/03/2024",
      heure: "14:30",
      segments: 3,
      fans: "2 450",
      status: "lancee",
      billetsVendus: "890",
    }
  }
};

import type { MarketingChannel } from '../components/ReusableComponents';

// Templates pour les segments
export const segmentTemplates = {
  // Template pour les fans des grands matchs
  bigMatchFans: {
    title: "Fans des grands matchs",
    dotColor: "#4F46E5", // Indigo
    fansCount: 12500,
    totalFansPercentage: 15,
    marketingChannel: "Meta Ads" as MarketingChannel,
    averageSpending: 45,
    tribune: "Tribunes Nord et Sud",
    optimalSendTime: {
      date: "15/03/2024",
      time: "18:30"
    },
    optimalFollowUp: {
      date: "17/03/2024",
      time: "10:00"
    },
    description: "Segment composé de supporters occasionnels qui privilégient les matchs à fort enjeu. Historique d'achats concentré sur les rencontres contre les équipes du top 5 et les derbys. Forte réactivité aux campagnes sur les réseaux sociaux."
  },

  // Template pour les abonnés fidèles
  loyalSubscribers: {
    title: "Abonnés fidèles",
    dotColor: "#059669", // Emerald
    fansCount: 8300,
    totalFansPercentage: 10,
    marketingChannel: "Newsletter" as MarketingChannel,
    averageSpending: 120,
    tribune: "Tribune Honneur",
    optimalSendTime: {
      date: "12/03/2024",
      time: "09:00"
    },
    optimalFollowUp: "none" as const,
    description: "Supporters réguliers avec un historique d'abonnement sur les dernières saisons. Préfèrent être contactés par email et ont un taux de réponse élevé aux newsletters. Pas besoin de relance car très réactifs aux premières communications."
  },

  // Template pour les nouveaux supporters
  newSupporters: {
    title: "Nouveaux supporters",
    dotColor: "#DC2626", // Red
    fansCount: 5000,
    totalFansPercentage: 6,
    marketingChannel: "Google Ads" as MarketingChannel,
    averageSpending: 35,
    tribune: "Tribune Est",
    optimalSendTime: {
      date: "14/03/2024",
      time: "12:00"
    },
    optimalFollowUp: {
      date: "16/03/2024",
      time: "15:00"
    },
    description: "Segment de nouveaux supporters identifiés via leur première interaction avec le club cette saison. Fort potentiel de conversion via Google Ads, notamment sur les recherches locales. Nécessite une approche pédagogique et un suivi rapproché."
  },

  // Template pour les familles
  familyFans: {
    title: "Familles supporters",
    dotColor: "#0EA5E9", // Sky blue
    fansCount: 7200,
    totalFansPercentage: 9,
    marketingChannel: "Newsletter" as MarketingChannel,
    averageSpending: 85,
    tribune: "Tribune Famille",
    optimalSendTime: {
      date: "13/03/2024",
      time: "14:00"
    },
    optimalFollowUp: {
      date: "15/03/2024",
      time: "16:00"
    },
    description: "Segment composé de familles avec enfants, sensibles aux offres groupées et aux animations d'avant-match. Forte présence lors des matchs le week-end. Préfèrent les communications par email avec des offres adaptées aux enfants."
  },

  // Template pour les étudiants
  studentFans: {
    title: "Étudiants supporters",
    dotColor: "#8B5CF6", // Purple
    fansCount: 4800,
    totalFansPercentage: 6,
    marketingChannel: "Meta Ads" as MarketingChannel,
    averageSpending: 25,
    tribune: "Tribune Est",
    optimalSendTime: {
      date: "14/03/2024",
      time: "16:00"
    },
    optimalFollowUp: {
      date: "16/03/2024",
      time: "11:00"
    },
    description: "Jeunes supporters étudiants, très actifs sur les réseaux sociaux. Sensibles aux tarifs préférentiels et aux offres de dernière minute. Fort potentiel de conversion via Instagram et Facebook. Excellents ambassadeurs sur les campus."
  }
}; 