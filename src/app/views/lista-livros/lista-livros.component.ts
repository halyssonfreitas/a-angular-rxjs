import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY, catchError, debounceTime, distinctUntilChanged, filter, map, of, switchMap, tap, throwError } from 'rxjs';
import { Item, Livro, LivrosResultado } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const PAUSA = 500;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  campoBusca = new FormControl();
  mensagemErro = '';
  livrosResultado: LivrosResultado;

  constructor(
    private livroService: LivroService
  ) { }

  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
      debounceTime(PAUSA),
      filter((valorDigitado) => valorDigitado.length >= 3),
      distinctUntilChanged(),
      switchMap((valorDigitado) => this.livroService.buscar(valorDigitado)),
      map(resultado => this.livrosResultado = resultado),
      tap((retornoAPI) => console.log(retornoAPI)),
      map(resultaAPI => resultaAPI.items ?? []),
      map((itens: Item[]) => this.livrosResultadoParaLivros(itens)),
      catchError((erro) => {
        this.mensagemErro = 'Ops, ocorreu um erro. REcarregue a aplicação!'
        return EMPTY
        console.log(erro)
        return throwError(() => new Error(this.mensagemErro))
      })
    )

  livrosResultadoParaLivros(itens: Item[]): LivroVolumeInfo[] {
    return itens.map(item => {
      return new LivroVolumeInfo(item)
    })
  }


}



