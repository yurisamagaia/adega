import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

import { CategoriaPaisProvider, CategoriaPais } from '../../providers/categoria-pais/categoria-pais';

@IonicPage()
@Component({
  selector: 'page-categoria-pais',
  templateUrl: 'categoria-pais.html',
})
export class CategoriaPaisPage {

  model: CategoriaPais;
  categorias: any[] = [];
  empty: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private toast: ToastController,
    private categoriaPaisProvider: CategoriaPaisProvider
  ) {
    this.model = new CategoriaPais();
  }

  ionViewDidLoad() {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaPaisProvider.getAll().then((result: any[]) => {
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
    return this.categoriaPaisProvider.insert(this.model);
  }

  removeCategoria(categoria: CategoriaPais) {
    this.categoriaPaisProvider.remove(categoria.id).then(() => {
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
