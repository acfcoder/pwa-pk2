import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.interface';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  pokemon: Pokemon[] = [];
  pokeData2: any[] = [];
  type: string[] = [];
  moves: string[] = [];
 

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
          this.type.push(typeList);
        }

        for (let i = 0; i < pokeData2.moves.length; i++) {
          const movesList = pokeData2.moves[i].move.name;
          this.moves.push(movesList);
        }
        console.log (this.type);

        const pokemonData = {
          id: pokeData2.id,
          img: pokeData2.sprites.other.home.front_default,
          name: pokeData2.name,
          height: pokeData2.height,
          weight: pokeData2.weight,
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