import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PokemonService } from './pokemon';
import { PokemonDetail, PokemonListResponse } from '../../models/pokemon';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve buscar a lista e resolver o detalhe de cada pokémon', () => {
    const mockList: PokemonListResponse = {
      count: 2,
      next: null,
      previous: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ],
    };
    const mockDetail1 = { id: 1, name: 'bulbasaur' } as PokemonDetail;
    const mockDetail2 = { id: 2, name: 'ivysaur' } as PokemonDetail;
    let result: PokemonDetail[] = [];

    service.getPokemonList(2, 0).subscribe(res => (result = res));

    httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=2&offset=0').flush(mockList);
    httpMock.expectOne(mockList.results[0].url).flush(mockDetail1);
    httpMock.expectOne(mockList.results[1].url).flush(mockDetail2);

    expect(result).toEqual([mockDetail1, mockDetail2]);
  });

  it('deve buscar o detalhe de um pokémon específico pelo id', () => {
    const mockDetail = { id: 25, name: 'pikachu' } as PokemonDetail;
    let result: PokemonDetail | undefined;

    service.getPokemonDetail(25).subscribe(res => (result = res));

    httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/25').flush(mockDetail);

    expect(result).toEqual(mockDetail);
  });
});