import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

import { CategoriaTipoProvider, CategoriaTipo } from '../../providers/categoria-tipo/categoria-tipo';

@IonicPage()
@Component({
  selector: 'page-categoria-tipo',
  templateUrl: 'categoria-tipo.html',
})
export class CategoriaTipoPage {

  model: CategoriaTipo;
  categorias: any[] = [];
  empty: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private toast: ToastController,
    private categoriaTipoProvider: CategoriaTipoProvider
  ) {
    this.model = new CategoriaTipo();
  }

  ionViewDidLoad() {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaTipoProvider.getAll().then((result: any[]) => {
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
    return this.categoriaTipoProvider.insert(this.model);
  }

  removeCategoria(categoria: CategoriaTipo) {
    this.categoriaTipoProvider.remove(categoria.id).then(() => {
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
