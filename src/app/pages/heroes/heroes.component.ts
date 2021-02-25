import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe(resp => this.heroes = resp);
  }

  deleteHeroe(heroe: HeroeModel, i: number){
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Está seguro de que desea borrar a ${heroe.nombre}?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if(resp.value ){
        this.heroesService.deleteHeroe(heroe.id).subscribe(resp => {
          this.heroes.splice(i, 1);
        });
      }
    })

  }

}
