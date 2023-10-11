export interface Cours {
    id: number;
    module: string;
    etat:string;
    modules_id: number;
    nbr_heure: string;
    professeurs: string;
    professeurs_id: number;
    semestre: string;
    semestres_id: number;
  }
  export interface Session {
    id: number;
    mode: string;
    date: string;
    heure_debut: string;
    heure_fin: string;
    duree: string;
    etat: string;
    attache_id: number | null;
    responsables_id: number | null;
    salles_id: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    cour_classes_id: number;
    // Ajoutez d'autres propriétés si nécessaire
  }
  