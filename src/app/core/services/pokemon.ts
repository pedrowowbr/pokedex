import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, switchMap, of } from 'rxjs';
import { PokemonListResponse, PokemonDetail } from '../../models/pokemon';

@Injectable({ providedIn: 'root' })
export class PokemonService {
    private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';

    constructor(private http: HttpClient) { }

    getPokemonList(limit: number, offset: number): Observable<PokemonDetail[]> {
        return this.http.get<PokemonListResponse>(`${this.baseUrl}?limit=${limit}&offset=${offset}`).pipe(
            switchMap(response => {
                const chamadas = response.results.map(item => this.http.get<PokemonDetail>(item.url));
                return forkJoin(chamadas);
            })
        );
    }

    getPokemonDetail(idOrName: string | number): Observable<PokemonDetail> {
        return this.http.get<PokemonDetail>(`${this.baseUrl}/${idOrName}`);
    }

    getPokemonsByIds(ids: number[]): Observable<PokemonDetail[]> {
        if (ids.length === 0) return of([]);
        return forkJoin(ids.map(id => this.getPokemonDetail(id)));
    }
}