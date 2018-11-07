import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { ProdutoProvider } from '../../providers/produto/produto';
import { AdegaDetalhePage } from '../adega-detalhe/adega-detalhe';
import { AvatarProvider } from '../../providers/avatar/avatar';

@IonicPage()
@Component({
  selector: 'page-adega',
  templateUrl: 'adega.html',
})
export class AdegaPage {

  produtos: any[] = [];
  textoBuscar: string = null;
  inativos: boolean = false;
  empty: boolean = false;
  /* tslint:disable:no-unused-variable */
  private avatar: string = AvatarProvider.avatarGrande();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public events: Events,
    private produtoProvider: ProdutoProvider,
    private sanitizer: DomSanitizer
  ) {
    events.subscribe('adega', () => {
      this.getProdutos();
    });
  }

  ionViewDidLoad() {
    this.getProdutos();
  }

  getProdutos() {
    this.produtoProvider.getAll(!this.inativos, this.textoBuscar).then((result: any[]) => {
      this.produtos = result;
      this.validaEmpty();
    });
  }

  doRefresh(refresher) {
    this.getProdutos();
    refresher.complete();
  }

  openFicha(id) {
    const modal = this.modalCtrl.create(AdegaDetalhePage, { id: id });
    modal.present();
  }

  validaEmpty() {
    (this.produtos.length === 0 ? this.empty = true : this.empty = false)
  }

  converteImagem(imagem) {
    return this.sanitizer.bypassSecurityTrustUrl(imagem);
  }
}
