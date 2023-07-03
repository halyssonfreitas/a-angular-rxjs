import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item, Livro, LivrosResultado } from 'src/app/models/interfaces';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: Livro[];
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

  livrosResultadoParaLivros(itens: Item[]): Livro[] {

    const livros: Livro[] = []

    itens.forEach(item => {
      livros.push(this.livro = {
        title: item.volumeInfo?.title,
        authors: item.volumeInfo?.authors,
        publisher: item.volumeInfo?.publisher,
        publishedDate: item.volumeInfo?.publishedDate,
        description: item.volumeInfo?.description,
        previewLink: item.volumeInfo?.previewLink,
        thumbnail: item.volumeInfo?.imageLinks?.thumbnail
      })
    })

    return livros
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}



