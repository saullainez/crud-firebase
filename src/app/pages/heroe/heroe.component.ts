import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  new = true;

  constructor(private heroesService: HeroesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id !== 'nuevo'){
      this.heroesService.getHeroe(id).subscribe((resp: HeroeModel) => {
        this.new = false;
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
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
