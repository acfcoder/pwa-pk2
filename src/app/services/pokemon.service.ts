import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pokemon } from '../models/pokemon.interface';



@Injectable({
	providedIn: 'root',	
})
export class PokemonService {
	
	
	constructor(private http: HttpClient) {}
	
	getAllPokemons(index: number): Observable<any> {
		return this.http.get<Pokemon[]>(`https://pokeapi.co/api/v2/pokemon/${index}`);
	}

	getPokemonById(id: string): Observable<any> {
		return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
	}

}

