import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Pokemon {
  id: number;
  name: string;
  eliminado?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  private pokemonsSubject = new BehaviorSubject<Pokemon[]>([]);
  pokemons$ = this.pokemonsSubject.asObservable();

  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokedex/2/';

  constructor(private http: HttpClient) {
    this.pokemonsApi();
  }

  private pokemonsApi() {
    this.http.get<any>(this.apiUrl).pipe(
      map(data => data.pokemon_entries.map((entry: any) => ({
        id: entry.entry_number,
        name: entry.pokemon_species.name
      })))
    ).subscribe((pokemons: Pokemon[]) => {
      this.pokemonsSubject.next(pokemons);
    });
  }


}
