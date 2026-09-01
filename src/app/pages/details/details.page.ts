import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonIcon,
  IonContent, IonSpinner, IonList, IonItem, IonLabel, IonNote
} from '@ionic/angular';
import { PokemonService } from '../../core/services/pokemon';
import { FavoritesService } from '../../core/services/favorites';
import { PokemonDetail } from '../../models/pokemon';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonIcon,
    IonContent, IonSpinner, IonList, IonItem, IonLabel, IonNote
  ],
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  pokemon = signal<PokemonDetail | undefined>(undefined);
  isLoading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    public favoritesService: FavoritesService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokemonService.getPokemonDetail(id).subscribe({
        next: pokemon => {
          this.pokemon.set(pokemon);
          this.isLoading.set(false);
        },
        error: err => {
          console.error('Erro ao buscar detalhes', err);
          this.isLoading.set(false);
        },
      });
    }
  }

  toggleFavorite(): void {
    const pokemon = this.pokemon();
    if (pokemon) this.favoritesService.toggle(pokemon.id);
  }
}