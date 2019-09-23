import {Component, OnInit} from '@angular/core';

//Improtaciones de formularios
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {Observable} from "rxjs/index";


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  //Contendra toda la info del group
  forma:FormGroup;


  //Variable objeto de pruebas con la misma estructura del Form
  usuario:Object = {
    nombre: "Gustavito",
    apellido: "Prieto",
    correo: "ing.gustavo@gmail.com",
    // pasaTiempos: ["Correr","Dormir","Programar"]
  }

  constructor() {

    console.log("Usuario = ", this.usuario);

    //Asignamos las variable sque tendra el formulario de tipo FormControl
    //new FormControl('Valor por defecto', validaciones);
    // si son varias validaciones se encirra en [] como un arreglo separado por comas
    /*
     * Validators.required  // le indica que el campo debe ser requerido
     *
     * */

    this.forma = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'apellido': new FormControl('', [Validators.required, this.noApellidoMarquez]),  // this.noApellidoMarquez -> validacion personalizada
      'correo': new FormControl('',
        [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]
      ),

      /*Arreglo FormArray, que contendra elementos de tipo FormControl*/
      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required)
      ]),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl(),  // dejamos en balnbco los parametros para despues colocarlos
      'username': new FormControl('', Validators.required, this.existeUsuario)  // this.existeUsuario  -> le pasamos una validacion personalizada
    });


    //Asignamos las validaciones al campo password2
    this.forma.controls['password2'].setValidators([
      Validators.required,

      //.bind( this.forma )  -> con bin le especifico que quiero que apunte el this
      this.passwordNoIgual.bind(this.forma)
    ]);

    //Escuahdno los cambios en el DOM a un elemento puntual
    //valueCahnges -> escuchara los cambios y con subscribe lo suscribimos
    this.forma.controls['username'].valueChanges
      .subscribe(data => {
        //Imprimie el nuevo valor
        console.log(data);
      });

    //Escucahndo el status de un elemento puntual
    this.forma.controls['username'].statusChanges
      .subscribe(data => {
        //Imprime el status
        console.log(data);
      });


    //Asignado valores por defecto al Formulario, this.forma // Solo se puede si tiene la misma estructura de indices
    //   this.forma.setValue( this.usuario );


  }


  guardarCambios() {
    console.log("Forma : ", this.forma);
    console.log("Forma Value : ", this.forma.value);
  }

  resetearFormulario() {

    //.reset()  vuelve a su estado nativo el formulario
    this.forma.reset();

    //Si queremos que se carguen valores por dault, le pasamos un objeto con las mismo indices del formulario
    //similar al .setValue( nuevosValores )
  }


  //Funcion que añadira un nuevo objeto al arreglo de pasatiempos en el this.forma
  agregarPasatiempos() {

    /*
     * (<FormArray>this.forma.controls['pasatiempo'])
     * Utilizamos la expresion <FormArray>, para que sea tomado como un formlario de arreglos
     * */
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }


  /*
   * Funcion ejemplo de validacion
   *
   * Recibie un parametro de tipo FormControl
   *
   * :{[s:string]:boolean}   // le espeficamos que retornara un string booleano
   * */
  noApellidoMarquez(control:FormControl):{[s:string]:boolean} {

    //Validamos el valor del campo que use la funcion
    if (control.value === "marquez") {
      //Retornamos la funcion como booleano
      return {
        noApellidoMarquez: true
      }
    }

    return null;
  }


  passwordNoIgual(control:FormControl):{[s:string]:boolean} {
    //Validamos el valor del campo que use la funcion es diferente


    // control.value === this.forma.controls['password1'].value  -> que es el otro campo a comparar
    // para este caso el this -> ya hace referencia a this.forma, y se la agregamos a la variable formaVariable

    let formaVariable:any = this;
    if (control.value !== formaVariable.controls['password1'].value) {
      //Retornamos la funcion como booleano
      return {
        passwordNoIgual: true
      }
    }

    return null;
  }


  /*Funcion que realizara un proceso asincrono
   *
   * Simulando una peticion
   * */
  existeUsuario(control:FormControl):Promise<any>|Observable<any> {
    //Creamos una promesa, que realizara la simulacion de la peticion
    let promesa = new Promise(
      //(param1, param2) => {}
      //param1 -> por su funciona
      //param2 -> por si falla
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === "killer") {
            resolve({
              existe: true
            })
          } else {
            resolve(null)
          }
        }, 3000);
      }
    )
    return promesa;
  }


}
