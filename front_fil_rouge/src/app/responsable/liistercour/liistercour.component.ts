import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../service/resposable.service";
import { Cours } from 'src/app/cours';
@Component({
  selector: 'app-liistercour',
  templateUrl: './liistercour.component.html',
  styleUrls: ['./liistercour.component.css']
})
export class LiistercourComponent implements OnInit  {
  ngOnInit(): void {
    this.fetchCours()
  }
  cours:Cours[]=[]
constructor(private apiService:ApiService){}
fetchCours() {
  this.apiService.getCours().subscribe((data:any) => {
    console.log(data);
    this.cours=data.data
    
    // if (Array.isArray(data)) {
    //   this.cours = data;
    // } else {
    //   this.cours = [data]; 
    //   console.log(this.cours);
      
    // }
  });
  
}

}
