// import { Component } from '@angular/core';
// import * as XSXL from 'xlsx'
// @Component({
//   selector: 'app-inscription',
//   templateUrl: './inscription.component.html',
//   styleUrls: ['./inscription.component.css']
// })
// export class InscriptionComponent {
//   donnesExel:any
//   // fichierSelect:any
// upload(Event:any){
// let fichier=Event.target.files[0]
// let filreader=new FileReader()
// filreader.readAsBinaryString(fichier)
// filreader.onload=(e)=>{
// let fichierlue=XSXL.read(filreader.result,{type:"binary"})
// let feille=fichierlue.SheetNames
// this.donnesExel=XSXL.utils.sheet_to_json(fichierlue.Sheets[feille[0]])
// console.log(this.donnesExel);

// }

// }
// }
import { Binary } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/resposable.service';
// import { CoursServiceService } from 'src/app/cours-service.service';
// import { ListeInscris, Tab } from 'src/app/liste-inscris';
import * as XLSX from 'xlsx';
import { Data, Etudiant } from "../../interface";
import { Cours } from 'src/app/cours';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent  implements OnInit{
  public doc: any;
  public excelData: any
  public message!: string 
  coursData: Data | undefined;
  etudiants: Etudiant[] = [];
    coursId: number=0;
  constructor(private route: ActivatedRoute,private apiService:ApiService, private router: Router)  {

  }

ngOnInit(): void {
  // this.getEtudiant();
  this.route.params.subscribe(params => {
    const idCours = params['id'];
    this.apiService.getEtudiantCour(idCours).subscribe(data=>{
      this.coursData = data.data;
      console.log(this.coursData);
      
      if (this.coursData?.classes && this.coursData.classes.length > 0) {
        this.etudiants = this.coursData.classes[0].etudiants; 
        console.log(this.etudiants);
        
      }
    });
  })
}

  importFiles(event: any) {
    const files = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(files);

    fileReader.onload = (e) => {
      let workbook = XLSX.read(fileReader.result, { type: 'binary' })
      let sheetNames = workbook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
      this.excelData.forEach((row: any) => {
        if (row.email) {
          row.email += '@gmail.com';
        }
      });
      this.doc = {
        doc: this.excelData
      }
      console.log(this.doc);
      console.log(this.excelData);

    }
  }
  uploadFile() {
    
    console.log(this.doc);
    if (this.doc) {
      this.apiService.inscription(this.doc).subscribe(
        (response) => {
          console.log('Fichier envoyé avec succès !', response);
          // Faites quelque chose avec la réponse du serveur si nécessaire
        },
        (error) => {
          console.error('Erreur lors de l\'envoi du fichier :', error);
          // Gérez les erreurs d'envoi du fichier ici
        }
      );
    } else {
      console.error('Aucun fichier à envoyer !');
    }
  }
  
  
  
  navigateToEtudiantPage(): void {
    // Naviguer vers la route '/etudiants/:id' où id est l'ID du cours
    this.router.navigate(['/etudiants', this.coursId]);
  }
  // inscrire() {
  //   this.coursService.postInscrire(this.tab).subscribe(response => {
  //     this.message = response.message;
  //     setTimeout(() => {
  //       this.message = "";
  //     },3000);

  //   })
  // }

}