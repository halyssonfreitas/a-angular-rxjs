import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item, Livro, LivrosResultado } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: LivroVolumeInfo[];
  campoBusca : string = '';
  subscription: Subscription;
  livro: Livro;

  constructor(
    private livroService : LivroService
  ) { }

  buscarLivros() {
    this.subscription = this.livroService
      .buscar(this.campoBusca)
      .subscribe({
        next: (itens:Item[]) => {
          this.listaLivros = this.livrosResultadoParaLivros(itens)
        },
        error: erro => console.error(erro),
        complete: () => console.log('Observable completado')
      })
  }

  livrosResultadoParaLivros(itens: Item[]): LivroVolumeInfo[] {
    return itens.map(item => {
      return new LivroVolumeInfo(item)
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}



