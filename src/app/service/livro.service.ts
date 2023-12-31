import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Item, LivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes'

  constructor(
    private http : HttpClient
  ) { }

  buscar(valorDigitado: string): Observable<LivrosResultado> {
    let params = new HttpParams()
    params = params.append('q', valorDigitado)
    return this.http.get<LivrosResultado>(this.API, { params })
      // .pipe(
      //   // tap(retornoAPI => console.log("tap:", retornoAPI)),
      //   map(resultaAPI => resultaAPI.items ?? []),
      //   // tap(resultaAPI => console.log('Fluxo após o map', resultaAPI))

      // )
  }
}
