import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PokedexService, Pokemon } from '../../services/pokedex.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  encabezados: string[] = ['id', 'name', 'actions'];
  PokemonsG1 = new MatTableDataSource<Pokemon>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.pokedexService.pokemons$.subscribe(pokemons => {
      this.PokemonsG1.data = pokemons;
      this.PokemonsG1.paginator = this.paginator;
      this.PokemonsG1.sort = this.sort;
    });
  }



  applyFilter (event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.PokemonsG1.filter = filterValue.trim().toLowerCase();

      if (this.PokemonsG1.paginator) {
        this.PokemonsG1.paginator.firstPage();
      }
  }

  eliminarPokemon(id: number): void {
    const pokemon = this.PokemonsG1.data.find(p => p.id === id);
        if (pokemon) {
          pokemon.eliminado = true;
          this.PokemonsG1.data = this.PokemonsG1.data.filter(p => !p.eliminado); 
        }
  }

  

}
