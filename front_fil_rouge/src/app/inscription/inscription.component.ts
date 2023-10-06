import { Component } from '@angular/core';
import * as XSXL from 'xlsx'
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  donnesExel:any
  // fichierSelect:any
upload(Event:any){
let fichier=Event.target.files[0]
let filreader=new FileReader()
filreader.readAsBinaryString(fichier)
filreader.onload=(e)=>{
let fichierlue=XSXL.read(filreader.result,{type:"binary"})
let feille=fichierlue.SheetNames
this.donnesExel=XSXL.utils.sheet_to_json(fichierlue.Sheets[feille[0]])
console.log(this.donnesExel);

}
}
}
