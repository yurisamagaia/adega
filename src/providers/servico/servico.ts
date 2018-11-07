import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ProdutoProvider } from '../produto/produto';

@Injectable()
export class ServicoProvider {

  private API_URL = 'https://rest.adega.api/123/';

  constructor(private http: Http, private produtoProvider: ProdutoProvider) { }

  exportar() {
    return new Promise(resolve => {
      this.produtoProvider.getAll(null, null).then((result: any[]) => {
        this.http.post(this.API_URL, JSON.stringify(result)).subscribe((res: any) => {
          resolve(res.json());
        }, (error) => {
          resolve(error.json());
        });
      });
    });
  }
}
