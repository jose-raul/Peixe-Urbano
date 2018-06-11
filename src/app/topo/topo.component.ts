import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import {Oferta} from '../shared/oferta.model';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import '../util/rxjs-extensions';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public oferta: Observable<Oferta[]>;
  private subject: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.oferta = this.subject
      .debounceTime(1000)
      .distinctUntilChanged()
      .switchMap((termo: string) => {
        if (termo.trim() === '') {
          return Observable.of<Oferta[]>([]);
        }
        return this.ofertasService.pesquisaOfertas(termo);
      })
      .catch((err: any) => {
        return Observable.of<Oferta[]>();
      });
  }

  public pesquisa(termoDaPesquisa: string): void {
   this.subject.next(termoDaPesquisa);
  }

  public limpaPesquisa(): void {
    this.subject.next('');
  }
}
