import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs';
import { Item, Livro } from 'src/app/models/interfaces';
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
  livro: Livro;

  constructor(
    private livroService: LivroService
  ) { }

  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
      debounceTime(PAUSA),
      filter((valorDigitado) => valorDigitado.length >= 3),
      tap(() => console.log('Fluxo inicial')),
      switchMap((valorDigitado) => this.livroService.buscar(valorDigitado)),
      tap((retornoAPI) => console.log(retornoAPI)),
      map((itens: Item[]) => this.livrosResultadoParaLivros(itens))
    )

  livrosResultadoParaLivros(itens: Item[]): LivroVolumeInfo[] {
    return itens.map(item => {
      return new LivroVolumeInfo(item)
    })
  }


}



