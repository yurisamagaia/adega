import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, ItemSliding, AlertController, Events } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { ProdutoEditarPage } from '../produto-editar/produto-editar';
import { ProdutoProvider, Produto } from '../../providers/produto/produto';
import { AvatarProvider } from '../../providers/avatar/avatar';

@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {

  produtos: any[] = [];
  textoBuscar: string = null;
  inativos: boolean = false;
  empty: boolean = false;
  /* tslint:disable:no-unused-variable */
  private avatar: string = AvatarProvider.avatar();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private toast: ToastController,
    public alertCtrl: AlertController,
    public events: Events,
    private produtoProvider: ProdutoProvider,
    private sanitizer: DomSanitizer
  ) { }

  ionViewDidEnter() {
    this.getProdutos();
  }

  getProdutos() {
    this.produtoProvider.getAll(!this.inativos, this.textoBuscar).then((result: any[]) => {
      this.produtos = result;
      this.validaEmpty();
    });
  }

  adicionar() {
    this.navCtrl.push(ProdutoEditarPage);
  }

  editarProduto(id: number, item: ItemSliding) {
    item.close();
    this.navCtrl.push(ProdutoEditarPage, { id: id });
  }

  removerProduto(produto: Produto) {
    let show = this.alertCtrl.create({
      title: 'Remover produto',
      subTitle: 'Deseja remover o produto?',
      buttons: [{
        text: 'Cancelar',
      },{
        text: 'Remover',
        handler: () => {
          this.produtoProvider.remove(produto.id).then(() => {
            var index = this.produtos.indexOf(produto);
            this.produtos.splice(index, 1);
            this.validaEmpty();
            this.events.publish('adega');
            this.toast.create({ message: 'Produto removido com sucesso', duration: 3000, position: 'botton' }).present();
          });
        }
      }]
    });
    show.present();
  }

  doRefresh(refresher) {
    this.getProdutos();
    refresher.complete();
  }

  filtrarProdutos(ev: any) {
    this.getProdutos();
  }

  openFiltro() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Listar...');

    alert.addInput({
      type: 'radio',
      label: 'Ativos',
      value: 'ativo',
      checked: this.inativos === false ? true : false
    });
    alert.addInput({
      type: 'radio',
      label: 'Inativos',
      value: 'inativo',
      checked: this.inativos === true ? true : false
    });
    alert.addButton('Cancelar');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if(data === 'ativo') {
          this.inativos = false;
        } else{
          this.inativos = true;
        }
        this.getProdutos();
      }
    });
    alert.present();
  }

  validaEmpty() {
    (this.produtos.length === 0 ? this.empty = true : this.empty = false)
  }

  converteImagem(imagem) {
    return this.sanitizer.bypassSecurityTrustUrl(imagem);
  }
}
