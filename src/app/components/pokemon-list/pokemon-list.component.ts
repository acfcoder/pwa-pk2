import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[] = [];
  pokeData = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {

    for (let i = 1; i < 15; i++){
      this.pokemonService.getAllPokemons(i).subscribe(
        pokeData => {
          const pokemon = {
            id: pokeData.id,
            img: pokeData.sprites.other.home.front_default,
            name: pokeData.name,
            order: pokeData.order,
            type: pokeData.types,
            home_img: pokeData.sprites.other.home.front_default,
            master_img: pokeData.sprites.other['official-artwork'].front_default,
          };
          this.pokemons.push(pokemon);
        }
      );
    }
   console.log (this.pokemons);
  }
}