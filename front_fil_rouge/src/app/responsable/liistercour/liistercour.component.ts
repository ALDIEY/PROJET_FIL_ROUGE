import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../../service/resposable.service';
import { Cours } from 'src/app/cours';
import { MatDialog } from '@angular/material/dialog';
import { PlanifiercourComponent } from '../planifiercour/planifiercour.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuccesModal } from '../../modal/modal-succes/modal-succes.component';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { ProfserviceService } from 'src/app/service/profservice.service';

@Component({
  selector: 'app-liistercour',
  templateUrl: './liistercour.component.html',
  styleUrls: ['./liistercour.component.css'],
})
export class LiistercourComponent implements OnInit {
  courId: number = 0;
  p: number = 1;
  aucunCoursTrouve: boolean = false;
  moduleId: number=0;
  modules:any[]=[]
  modalRef?: BsModalRef;
  sessionForm: FormGroup;
  salles: any[] = [];
  classes: any[] = [];
  pageSize: number = 10;
  openErreurModal: boolean = false;
 
  ngOnInit(): void {
    this.getSalles();
    // this. appliquerFiltreModule();
    this.getModule()
    this.getCours();

    
    // this.getCourClasse(this.courId)
  }
  filtre: string = '';
  coursFiltres: Cours[] = [];
  cours: Cours[] = [];
  constructor(
    private apiService: ApiService,
    private profService:ProfserviceService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private modalService: BsModalService,
    private router: Router
  ) {
    this.sessionForm = this.fb.group({
      date: ['', [Validators.required]],
      // cour_classes_id: [{ value: '', disabled: true }, Validators.required],      heure_fin: ['', Validators.required ],
      heure_debut: ['', [Validators.required, this.validateHeure('00')]],
      heure_fin: ['', [Validators.required, this.validateHeure('00')]],
   
      mode: ['', Validators.required],
      salles_id: [''], 
      cours_id: ['', Validators.required],
      classes_id: ['', Validators.required],
    });
  }
  validateHeure(minutes: string) {
    return (control: { value: string }): { [key: string]: any } | null => {
      if (control.value && control.value.split(':')[1] !== minutes) {
        return { 'invalidMinutes': true };
      }
      return null;
    };
  }
  // fetchCours() {
  //   this.apiService.getCours().subscribe((data: any) => {
  //     this.cours = data.data;
  //     this.coursFiltres = this.cours; // Initialise les cours filtrés avec tous les cours
  //   });
  // }

  filtreCoursencour() {
    this.apiService.getCoursEncour().subscribe((data: any) => {
      this.coursFiltres = data.data;
    });
  }
  getSalles() {
    this.apiService.getSalles().subscribe((data) => {
      this.salles = data;
      console.log(this.salles);

      // console.log(this.salles);
    });
  }
  filtreCoursterminer() {
    this.apiService.getCoursTerminer().subscribe((data: any) => {
      this.coursFiltres = data.data;
    });
  }

  appliquerFiltre() {
    if (this.filtre === 'en_cours') {
      this.filtreCoursencour();
    } else if (this.filtre === 'termines') {
      this.filtreCoursterminer();
    } else {
      this.coursFiltres = this.cours; 
    }
  }
  //   ouvrirModal(coursId: number) {
  //     const dialogRef = this.dialog.open(PlanifiersessionComponent, {
  //       width: '600px',
  //       height:'300px'
  //     });

  //     dialogRef.afterClosed().subscribe(result => {
  //       console.log('Modal fermé', result);
  //       // Traitez les données ici après la fermeture de la modal si nécessaire
  //     });
  // }
  // ouvrirModalee(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  // }
  ouvrirModal(courId: number) {
    // Afficher le modal
    const modal = document.getElementById('myModal');

    // Vérifier si l'élément modal existe avant d'accéder à la propriété display
    if (modal) {
      let courid = courId;
      console.log(courid);
      this.getCourClasse(courid);
      {
        // let cour=this.courId
        // console.log(cour);
        this.apiService.getClassesByCours(courid).subscribe((data: any) => {
          this.classes = data;
          console.log(this.classes);
        });
      }
      this.sessionForm.patchValue({
        cours_id: courId,
      });
      console.log(this.sessionForm);

      modal.style.display = 'block';
    }
  }

  fermerModal() {
    // Masquer le modal
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
  ouvrirModale() {
    const dialogRef = this.dialog.open(PlanifiercourComponent, {
      width: '600px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Modal fermé', result);
    });
  }
  getCourClasse(courId: number) {
    let cour = this.courId;
    console.log(cour);
    this.apiService.getClassesByCours(courId).subscribe((data) => {
      console.log(data);
    });
  }
  planifierSession() {
    if (this.sessionForm.invalid) {
      this.afficherErreur('Le formulaire est invalide.');
      this.sessionForm.reset();

      return;
    }
  
    const formData = this.sessionForm.value;
    formData.salles_id = +formData.salles_id;
  
    const dateSession = new Date(formData.date);
    const dateActuelle = new Date();
  
    if (dateSession < dateActuelle) {
      this.afficherErreur('La date de la session ne peut pas être antérieure à la date actuelle.');
      return;
    }
  
    const heureDebut = new Date(`2000-01-01 ${formData.heure_debut}:00`);
    const heureFin = new Date(`2000-01-01 ${formData.heure_fin}:00`);
    if (heureDebut.getHours() < 8) {
      this.afficherErreur('L\'heure de début ne peut pas être antérieure à 8h00.');
      return;
    }
    if (heureFin.getHours() > 18 || (heureFin.getHours() === 18 && heureFin.getMinutes() > 0)) {
      this.afficherErreur('L\'heure de fin ne peut pas être postérieure à 18h00.');
      return;
    }
  
  
    if (heureDebut >= heureFin) {
      this.afficherErreur('L\'heure de début doit être antérieure à l\'heure de fin.');
      return;
    }
    const differenceHeures = heureFin.getHours() - heureDebut.getHours();

    if (differenceHeures > 4) {
      this.afficherErreur('La différence entre l\'heure de début et l\'heure de fin ne peut pas dépasser 4 heures.');
      return;
    }
  
    if (formData.mode === 'en_ligne') {
      formData.salles_id = null;
    }
    formData.heure_debut = formData.heure_debut += ':00';
    formData.heure_fin = formData.heure_fin += ':00';
    formData.classes_id = +formData.classes_id;
  
    this.apiService.createSeesion(formData).subscribe(
      (response: any) => {
        console.log('Réponse du serveur :', response);
        if (response.message === 'Le quota horaire du cours est dépassé.') {
          this.afficherErreur('Le quota horaire du cours est épuisé!');
          this.sessionForm.controls['heure_debut'].setValue('');
          this.sessionForm.controls['heure_fin'].setValue('');
        } else if (response.message === "Le professeur est indisponible à ces heures.") {
          // this.openProfesseurNonDisponibleModal();
          this.afficherErreur('Le professeur n\'est pas disponible à ces heures.');
          this.sessionForm.controls['heure_debut'].setValue('');
          this.sessionForm.controls['heure_fin'].setValue('');
        }
        else if (response.message === "La salle est indisponible à ces heures.") {
          // this.openProfesseurNonDisponibleModal();
          this.afficherErreur('La salle n\'est pas disponible à ces heures.');
          this.sessionForm.controls['heure_debut'].setValue('');
          this.sessionForm.controls['heure_fin'].setValue('');
        } else if (response.message === "La classe n'est pas disponible à ces heures.") {
          this.afficherErreur('La classe n\'est pas disponible à ces heures.');
          this.sessionForm.controls['heure_debut'].setValue('');
          this.sessionForm.controls['heure_fin'].setValue('');
        } else if (response.message === 'Session créée avec succès') {
          this.openSuccesModal();
          this.sessionForm.reset();
        } else {
          this.openErreurModalFunction();
        }
      },
      (error) => {
        console.error('Erreur lors de la planification de la session :', error);
        this.openErreurModalFunction();
        this.sessionForm.controls['heure_debut'].setValue('');
        this.sessionForm.controls['heure_fin'].setValue('');
      }
    );
  }
  
  afficherErreur(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }
  
  

  openSuccesModal(): void {
    this.dialog.open(SuccesModal);
  }

  openErreurModalFunction() {
    this.openErreurModal = true;
  }

  // Ajoutez la méthode pour fermer le modal d'erreur
  closeErreurModal() {
    this.openErreurModal = false;
  }

  voirEtudiants(courId: number): void {
    // Naviguer vers la page des étudiants avec l'ID du cours en tant que paramètre d'URL
    this.router.navigate(['/etudiants', courId]);
  }
  
  getModule(){
  this.apiService.getModules().subscribe((data:any)=>{
  this.modules=data
  this.modules.unshift({ id: null, libelle: 'Tous les modules' });
  console.log(this.modules);
  
  
  })
  
  }
  // appliquerFiltreModule(moduleId: number|null): void {
  //   if (moduleId === 0 || moduleId === null) {
  //     // Si l'ID du module est 0, récupérez tous les cours
  //     this.apiService.getCours().subscribe((data: any) => {
  //       this.cours = data.data;
  //  this.coursFiltres = this.cours;
  //     });
  //   } else {
  //     this.apiService.getCoursParModule(moduleId).subscribe((data: any) => {
  //       this.cours = data.data;
  //       this.aucunCoursTrouve = this.cours.length === 0; // Vérifiez s'il y a des cours trouvés
  //  this.coursFiltres = this.cours;
  //  console.log(this.coursFiltres);
   
  //     });
  //   }
  // }
  getCours() {
    this.apiService.getCours().subscribe((data: any) => {
      this.cours = data.data; // Stockez les cours récupérés dans la variable cours
      this.coursFiltres = this.cours; // Initialisez les cours filtrés avec tous les cours au chargement initial
    });
  }

  appliquerFiltreModule() {
    if (this.moduleId !== null) {
      this.coursFiltres = this.cours.filter(c => c.modules_id === this.moduleId);
    } else {
      this.coursFiltres = this.cours;
    }
  }
  
  
}
