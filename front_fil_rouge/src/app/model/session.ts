
export interface Session {
    id: number;
    mode: string;
    date: string; 
    heure_debut: string; 
    heure_fin: string; 
    duree: string; 
    etat: string;
    coursId: number; 
    attacheId: number |null; 
    responsableId: number | null; 
    salleId: number | null; 
  }
  
  