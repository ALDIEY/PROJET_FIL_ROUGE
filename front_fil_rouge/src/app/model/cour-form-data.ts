export class CoursFormData {
    modules_id: number;
    semestres_id: number;
    professeurs_id: number;
    nbr_heure: number;
    classes: number[];

    constructor() {
        this.modules_id = 0; 
        this.semestres_id = 0; 
        this.professeurs_id = 0; 
        this.nbr_heure = 0; 
        this.classes = []; // Vous pouvez également initialiser classes avec des valeurs par défaut si nécessaire
    }
}

