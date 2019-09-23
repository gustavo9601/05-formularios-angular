import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
  
    /*.ng-invalid.ng-touched:not(form)  // aplica a clases propias de angular estilos*/
    .ng-invalid.ng-touched:not(form){
      border:1px solid red;
    }
  `]
})
export class TemplateComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }


  usuario:Object = {
    nombre: null,
    apellido: null,
    email: null,
    pais: null,
    sexo: "Hombre",
    acepta: false
  }


  paises = [
    {
      codigo: "CRI",
      nombre: "Costa rica"
    },
    {
      codigo: "CO",
      nombre: "Colombia"
    },
    {
      codigo: "ESP",
      nombre: "España"
    }
  ];


  sexos:string[] = [
    "Hombre",
    "Mujer",
    "Otro"
  ]

  guardar(forma:NgForm) {
    console.log("Formulario Posteado");
    console.log("ngForm: ", forma);
    console.log("Valores del formulario: ", forma.value);

    console.log("Usuario: ", this.usuario);

  }

}
