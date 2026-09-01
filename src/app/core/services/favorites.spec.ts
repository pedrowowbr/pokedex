import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    localStorage.clear(); // garante um estado limpo antes de cada teste
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve iniciar sem favoritos quando o localStorage está vazio', () => {
    expect(service.favorites()).toEqual([]);
  });

  it('deve adicionar um pokémon aos favoritos ao chamar toggle', () => {
    service.toggle(25);
    expect(service.isFavorite(25)).toBe(true);
    expect(service.favorites()).toContain(25);
  });

  it('deve remover um pokémon dos favoritos ao chamar toggle novamente', () => {
    service.toggle(25);
    service.toggle(25);
    expect(service.isFavorite(25)).toBe(false);
  });

  it('deve persistir os favoritos no localStorage', () => {
    service.toggle(1);
    service.toggle(4);
    const saved = JSON.parse(localStorage.getItem('pokedex_favorites') ?? '[]');
    expect(saved).toEqual([1, 4]);
  });
});