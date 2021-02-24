import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  guardar(form: NgForm){

    if(form.invalid) {
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    let peticion: Observable<any>;
    let userMessage: string;

    if(this.heroe.id){
      peticion = this.heroesService.actualizarHeroe(this.heroe);
      userMessage = 'Se actualizó correctamente';
    }else{
      peticion = this.heroesService.crearHeroe(this.heroe);
      userMessage = 'Se creó correctamente';
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: userMessage,
        icon: 'success'
      })
    })



  }

}
