import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

import { CategoriaUvaProvider, CategoriaUva } from '../../providers/categoria-uva/categoria-uva';

@IonicPage()
@Component({
  selector: 'page-categoria-uva',
  templateUrl: 'categoria-uva.html',
})
export class CategoriaUvaPage {

  model: CategoriaUva;
  categorias: any[] = [];
  empty: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private toast: ToastController,
    private categoriaUvaProvider: CategoriaUvaProvider
  ) {
    this.model = new CategoriaUva();
  }

  ionViewDidLoad() {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaUvaProvider.getAll().then((result: any[]) => {
      this.categorias = result;
      this.validaEmpty();
    });
  }

  addCategoria() {
    this.saveCategoria().then(() => {
      this.toast.create({ message: 'Categoria salva com sucesso', duration: 3000, position: 'botton' }).present();
      this.model.nome = '';
      this.getCategorias();
    }).catch(() => {
      this.toast.create({ message: 'Erro ao salvar categoria', duration: 3000, position: 'botton' }).present();
    });
  }

  private saveCategoria() {
    return this.categoriaUvaProvider.insert(this.model);
  }

  removeCategoria(categoria: CategoriaUva) {
    this.categoriaUvaProvider.remove(categoria.id).then(() => {
      var index = this.categorias.indexOf(categoria);
      this.categorias.splice(index, 1);
      this.validaEmpty();
      this.toast.create({ message: 'Categoria removida com sucesso', duration: 3000, position: 'botton' }).present();
    })
  }

  validaEmpty() {
    (this.categorias.length === 0 ? this.empty = true : this.empty = false)
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
