import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { ProdutoProvider, Produto } from '../../providers/produto/produto';
import { AvatarProvider } from '../../providers/avatar/avatar';

@IonicPage()
@Component({
  selector: 'page-adega-detalhe',
  templateUrl: 'adega-detalhe.html',
})
export class AdegaDetalhePage {

  vinho: string = "ficha";
  model: Produto;
  private avatar: string = AvatarProvider.avatarGrande();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private produtoProvider: ProdutoProvider,
    private sanitizer: DomSanitizer
  ) {
    this.model = new Produto();
    if (this.navParams.data.id) {
      let loading = this.loadingCtrl.create();
      loading.present();
      this.produtoProvider.get(this.navParams.data.id).then((result: any) => {
        this.model = result;
        if(!this.model.foto) {
          this.model.foto = this.avatar;
        }
        loading.dismiss();
      });
    }
  }

  converteImagem(imagem) {
    return this.sanitizer.bypassSecurityTrustUrl(imagem);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
