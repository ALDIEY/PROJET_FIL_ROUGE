export interface Root {
    data: Data
  }
  
  export interface Data {
    id: number
    modules_id: number
    semestres_id: number
    professeurs_id: number
    nbr_heure: string
    professeurs: string
    semestre: string
    module: string
    classes: Class[]
  }
  
  export interface Class {
    id: number
    nom: string
    etudiants: Etudiant[]
  }
  
  export interface Etudiant {
    id: number
    name: any
    created_at: string
    updated_at: string
    nom: string
    prenom: string
    email: string
    telephone: string
    date_naissance: string
    pivot: Pivot
  }
  
  export interface Pivot {
    classes_id: number
    etudiants_id: number
  }
  