import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pokemon } from 'src/app/models/pokemon.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit,AfterViewInit {

  pokemons: Pokemon[] = [];
  dataSource = new MatTableDataSource<Pokemon>;
  displayedColumns: string[] = ['img', 'name'];

  //toggle vistas
  showList: boolean = true;
  showCards: boolean = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private pokemonService: PokemonService) {
    this.dataSource = new MatTableDataSource<Pokemon>(this.pokemons);
  }

  viewList() {
    this.showList = true;
    this.showCards = false;
  }

  viewCards() {
    this.showList = false;
    this.showCards = true;
  }
 
  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
  }

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
          this.dataSource.data = this.pokemons
        }
      );
    }
    
  }
}