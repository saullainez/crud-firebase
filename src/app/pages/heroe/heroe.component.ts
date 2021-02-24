import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';

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

    if(this.heroe.id){
      this.heroesService.actualizarHeroe(this.heroe).subscribe(resp => {
        console.log(resp);
      });
    }else{
      this.heroesService.crearHeroe(this.heroe).subscribe(resp => {
        console.log(resp);
      });
    }



  }

}
