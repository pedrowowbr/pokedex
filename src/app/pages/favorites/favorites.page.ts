import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle,
  IonContent, IonSpinner, IonList, IonItem, IonLabel, IonIcon
} from '@ionic/angular';
import { PokemonService } from '../../core/services/pokemon';
import { FavoritesService } from '../../core/services/favorites';
import { PokemonDetail } from '../../models/pokemon';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle,
    IonContent, IonSpinner, IonList, IonItem, IonLabel, IonIcon
  ],
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  pokemons = signal<PokemonDetail[]>([]);
  isLoading = signal(true);

  constructor(
    private pokemonService: PokemonService,
    public favoritesService: FavoritesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    const ids = this.favoritesService.favorites();
    if (ids.length === 0) {
      this.pokemons.set([]);
      this.isLoading.set(false);
      return;
    }
    this.isLoading.set(true);
    this.pokemonService.getPokemonsByIds(ids).subscribe({
      next: pokemons => {
        this.pokemons.set(pokemons);
        this.isLoading.set(false);
      },
      error: err => {
        console.error('Erro ao buscar favoritos', err);
        this.isLoading.set(false);
      },
    });
  }

  goToDetails(pokemon: PokemonDetail): void {
    this.router.navigate(['/details', pokemon.id]);
  }

  removeFavorite(pokemon: PokemonDetail, event: Event): void {
    event.stopPropagation();
    this.favoritesService.toggle(pokemon.id);
    this.loadFavorites();
  }
}