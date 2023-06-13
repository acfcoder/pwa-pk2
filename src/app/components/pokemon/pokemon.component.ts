import { Component, OnInit } from '@angular/core';
import { PokemonPlus } from 'src/app/models/pokemonPlus.interface';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

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

  constructor(
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {
    }
  
    toggleContent() {
      this.showContent = !this.showContent;
    }
  
    identifier = this.activatedRoute.snapshot.paramMap.get('id');
    next() {
      if (this.pokemon.length > 0) {
        const lastPokemon = this.pokemon[0];
        let newId;
        if (lastPokemon.id + 1 > 1010 ) {
          newId = 1010;
        } else {
          newId = lastPokemon.id + 1;
        }
        this.identifier = newId.toString();
        this.pokeData();
      }
    }
    
    back() {
      if (this.pokemon.length > 0) {
        const lastPokemon = this.pokemon[0];
        let newId;
        if (lastPokemon.id - 1 < 1 ) {
         newId = 1;
        } else {
           newId = lastPokemon.id - 1;
        }
        this.identifier = newId.toString();
        this.pokeData();
      }
    }
    

  ngOnInit(): void {
   this.pokeData() 
   
  }

  pokeData() {
   
    if (this.identifier) {
      
      this.pokemonService.getPokemonById(this.identifier).subscribe(
        (pokeData2) => {
        
     if (!pokeData2) {
          return this.router.navigateByUrl('/');
        }
        
        this.pokemon = []; //Borrado del acumulado para permitir navegación en fichas.
        this.typeData = [];
        this.moves = [];
        for (let i = 0; i < pokeData2.types.length; i++) {
          const typeList = pokeData2.types[i].type.name;
          this.typeData.push(typeList);
          this.type = this.typeData.join('-');
        }

        for (let i = 0; i < pokeData2.moves.length; i++) {
          const movesList = pokeData2.moves[i].move.name;
          this.moves.push(movesList);
        }

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

        if (pokemonData.img == null){
          pokemonData.img = pokemonData.master_img;
         
        };

        if (pokemonData.home_img == null){
          pokemonData.home_img = pokemonData.master_img;
        } ;

         this.pokemon.push(pokemonData);
          return console.log(pokemonData)
        }
      )
    }
  }
}