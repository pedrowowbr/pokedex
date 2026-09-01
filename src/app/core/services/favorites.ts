import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'pokedex_favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
    favorites = signal<number[]>(this.loadFromStorage());

    private loadFromStorage(): number[] {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    }

    private saveToStorage(ids: number[]): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    }

    isFavorite(id: number): boolean {
        return this.favorites().includes(id);
    }

    toggle(id: number): void {
        const current = this.favorites();
        const updated = current.includes(id)
            ? current.filter(favId => favId !== id)
            : [...current, id];
        this.favorites.set(updated);
        this.saveToStorage(updated);
    }
}