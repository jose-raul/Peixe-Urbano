import {Oferta} from './shared/oferta.model';
import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {URL_API} from './app.api';
import 'rxjs/operator/toPromise';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class OfertasService {

  constructor(private http: Http) {}

  public getOfertas(): Promise<Array<Oferta>> {
    return this.http.get(`${URL_API}/ofertas?destaque=true`)
      .toPromise()
      .then((resposta: Response) => resposta.json());
  }

  public getOfertasPorCategoria(categoria: string): Promise<Array<Oferta>> {
    return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
      .toPromise()
      .then((resposta: Response) => resposta.json());
  }

  public getOfertaPorId(id: number): Promise<Oferta> {
    return this.http.get(`${URL_API}/ofertas?id=${id}`)
      .toPromise()
      .then((resposta: Response) => resposta.json()[0]);
  }

  public getComoUsarOfertaPorID(id: number): Promise<string> {
    return this.http.get(`${URL_API}/como-usar?id=${id}`)
      .toPromise()
      .then((resposta: Response) => {

          return resposta.json()[0].descricao;
        });
  }

  public getOndeFicaOfertaPorId(id: number): Promise<string> {
    return this.http.get(`${URL_API}/onde-fica?id=${id}`)
      .toPromise()
      .then((resposta: Response) => {
        return resposta.json()[0].descricao;
      });

  }

  public pesquisaOfertas(termo: string): Observable<Array<Oferta>> {
    return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
      .retry(10)
      .map((resposta: any) => resposta.json());

  }

}
