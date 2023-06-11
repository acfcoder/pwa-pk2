import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.interface';
import { PokemonService } from 'src/app/services/pokemon.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    NgIf,
    MatProgressSpinnerModule,
    MatTableModule,
  ],

})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  displayedColumns: string[] = ['order', 'name'];
  dataSource: MatTableDataSource<Pokemon>;

  constructor(
    private pokemonService: PokemonService) {
    this.dataSource = new MatTableDataSource<Pokemon>(this.pokemons);
  }

  ngOnInit(): void {
    for (let i = 1; i < 15; i++) {
      this.pokemonService.getAllPokemons(i).subscribe(pokeData => {
        const pokemon: Pokemon = {
          id: pokeData.id,
          img: pokeData.sprites.other.home.front_default,
          name: pokeData.name,
          height: pokeData.height,
          weight: pokeData.weight,
          order: pokeData.order,
          type: pokeData.types,
          moves: pokeData.moves
        };
        this.pokemons.push(pokemon);
        this.dataSource.data = this.pokemons;
      });
    }
  }
}
