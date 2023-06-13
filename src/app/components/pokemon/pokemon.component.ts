import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PokemonPlus } from 'src/app/models/pokemonPlus.interface';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
 /* standalone: true,
  imports: [MatCardModule, MatButtonModule],*/
})
export class PokemonComponent implements OnInit {

  pokemon: PokemonPlus[] = [];
  pokeData2: any[] = [];
  typeData: string[] = []; 
  type: string = '';
  moves: string[] = [];
  panelOpenState = false;

  showContent: boolean = false;

  toggleContent() {
    this.showContent = !this.showContent;
  }

  constructor(
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {
    }
  

  ngOnInit(): void {
    
    const identifier = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Identifier --> ', identifier);

    if (identifier) {
      this.pokemonService.getPokemonById(identifier).subscribe(
        (pokeData2) => {
        
     if (!pokeData2) {
          return this.router.navigateByUrl('/');
        }
        
        for (let i = 0; i < pokeData2.types.length; i++) {
          const typeList = pokeData2.types[i].type.name;
          this.typeData.push(typeList);
          this.type = this.typeData.join('-');
         
        }

        for (let i = 0; i < pokeData2.moves.length; i++) {
          const movesList = pokeData2.moves[i].move.name;
          this.moves.push(movesList);
        }
        console.log (this.type);

        const pokemonData = {
          id: pokeData2.id,
          img: pokeData2.sprites.other.dream_world.front_default,
          home_img: pokeData2.sprites.other.home.front_default,
          master_img: pokeData2.sprites.other['official-artwork'].front_default,
          name: pokeData2.name,
          height: (pokeData2.height*.10).toFixed(2),
          weight: (pokeData2.weight*.10).toFixed(2),
          order: pokeData2.order,
          type: this.type,
          moves: this.moves,
        };


          this.pokemon.push(pokemonData);
          return console.log(this.pokemon); 
  
        }
      )
    }
  }
}