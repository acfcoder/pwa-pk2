import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.interface';
import { PokemonService } from 'src/app/services/pokemon.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit{

  pokemons: Pokemon[] = [];

  //constructor(private pokemonService: PokemonService) {}
  constructor(private http: HttpClient) {};
  ngOnInit(): void {

    let pokemonData;
   /*
    for(let i = 1; i <= 100; i++){
      this.pokemonService
          .getAllPokemons(i)
          .subscribe((pokemons:any) => {
           const data = pokemons.results;
            console.log (data);
          });

        }
*/
for(let i = 1; i <= 100; i++){
this.http.get(`https://pokeapi.co/api/v2/pokemon/${i}`).subscribe((data: any) => {
  const results = data.sprites.other.dream_world.front_default;
  console.log(results); // Aquí puedes realizar las operaciones que necesites con el array "results"
});
}
    }





}