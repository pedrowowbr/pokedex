import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PokemonService } from '../../core/services/pokemon';
import { FavoritesService } from '../../core/services/favorites';
import { PokemonDetail } from '../../models/pokemon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pokemons: PokemonDetail[] = [];
  isLoading = false;
  currentPage = 1;
  readonly pageSize = 20;

  constructor(
    private pokemonService: PokemonService,
    public favoritesService: FavoritesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }

  loadPage(page: number): void {
    this.isLoading = true;
    const offset = (page - 1) * this.pageSize;
    this.pokemonService.getPokemonList(this.pageSize, offset).subscribe({
      next: pokemons => {
        this.pokemons = pokemons;
        this.currentPage = page;
        this.isLoading = false;
      },
      error: err => {
        console.error('Erro ao buscar pokémons', err);
        this.isLoading = false;
      },
    });
  }

  nextPage(): void {
    this.loadPage(this.currentPage + 1);
  }

  previousPage(): void {
    if (this.currentPage > 1) this.loadPage(this.currentPage - 1);
  }

  goToDetails(pokemon: PokemonDetail): void {
    this.router.navigate(['/details', pokemon.id]);
  }

  toggleFavorite(pokemon: PokemonDetail, event: Event): void {
    event.stopPropagation();
    this.favoritesService.toggle(pokemon.id);
  }
}